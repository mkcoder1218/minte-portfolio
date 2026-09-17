"use client";

import { useEffect, useRef } from "react";

const sequences = [
  ["01", "TIMELINE", ".editor"],
  ["02", "ABOUT", "#about"],
  ["03", "WORK", "#work"],
  ["04", "SERVICES", "#services"],
  ["05", "CONTACT", "#contact"],
] as const;

function formatTimecode(progress: number) {
  const totalFrames = Math.floor(progress * 48 * 25);
  const seconds = Math.floor(totalFrames / 25);
  const frames = totalFrames % 25;
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;

  return `TC ${String(minutes).padStart(2, "0")}:${String(secondsInMinute).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export default function EditorialTexture() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const sequenceRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollFrame = 0;
    let pointerFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let cursorActive = false;

    const updateScrollUI = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

      if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;
      if (percentRef.current) percentRef.current.textContent = `${String(Math.round(progress * 100)).padStart(2, "0")}%`;
      if (timecodeRef.current) timecodeRef.current.textContent = formatTimecode(progress);

      let activeSequence = "SEQ 00 / INTRO";
      const threshold = window.innerHeight * 0.55;
      for (const [number, label, selector] of sequences) {
        const element = document.querySelector<HTMLElement>(selector);
        if (element && element.getBoundingClientRect().top <= threshold) {
          activeSequence = `SEQ ${number} / ${label}`;
        }
      }
      if (sequenceRef.current) sequenceRef.current.textContent = activeSequence;
    };

    const scheduleScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollUI);
    };

    const updateCursor = () => {
      pointerFrame = 0;
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%) scale(${cursorActive ? 1 : 0.72})`;
      cursor.dataset.active = cursorActive ? "true" : "false";
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      cursorActive = Boolean(target?.closest(".project > button"));
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updateCursor);
    };

    updateScrollUI();
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate, { passive: true });

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);
      window.removeEventListener("pointermove", onPointerMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <div className="edit-hud" aria-hidden="true">
      <div className="edit-hud__timecode">
        <i />
        <span ref={timecodeRef}>TC 00:00:00</span>
      </div>

      <div className="edit-hud__rail">
        <span className="edit-hud__sequence" ref={sequenceRef}>SEQ 00 / INTRO</span>
        <div className="edit-hud__track"><span ref={progressRef} /></div>
        <span className="edit-hud__percent" ref={percentRef}>00%</span>
      </div>

      <div className="view-cut-cursor" ref={cursorRef} data-active="false">
        <span>VIEW</span>
        <b>CUT ↗</b>
      </div>
    </div>
  );
}
