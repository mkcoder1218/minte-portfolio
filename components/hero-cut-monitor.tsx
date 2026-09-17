"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCutMonitor() {
  const [host, setHost] = useState<Element | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHost(document.querySelector(".hero"));
  }, []);

  useEffect(() => {
    if (!host || !outerRef.current || !tiltRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const outer = outerRef.current;
    const tilt = tiltRef.current;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.55 })
        .from(outer, {
          y: 54,
          rotate: 8,
          scale: 0.88,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 0.95,
        })
        .from(
          ".hero-cut__frame",
          {
            scale: 0.62,
            rotate: (index) => [-9, 8, -4][index] ?? 0,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
          },
          "-=0.55",
        )
        .from(
          ".hero-cut__track i",
          { scaleX: 0, transformOrigin: "left center", stagger: 0.05, duration: 0.35 },
          "-=0.3",
        );

      gsap.to(outer, {
        y: -72,
        rotate: -2.5,
        ease: "none",
        scrollTrigger: {
          trigger: host,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.fromTo(
        ".hero-cut__playhead",
        { left: "8%" },
        { left: "88%", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" },
      );

      gsap.to(".hero-cut__scan", {
        yPercent: 420,
        duration: 3.4,
        repeat: -1,
        ease: "none",
      });
    }, outer);

    const onMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const bounds = tilt.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(tilt, {
        rotateY: x * 8,
        rotateX: y * -7,
        x: x * 7,
        y: y * 7,
        transformPerspective: 900,
        transformOrigin: "center",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(tilt, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    };

    tilt.addEventListener("pointermove", onMove);
    tilt.addEventListener("pointerleave", onLeave);

    return () => {
      tilt.removeEventListener("pointermove", onMove);
      tilt.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, [host]);

  if (!host) return null;

  return createPortal(
    <div className="hero-cut" ref={outerRef} aria-hidden="true">
      <div className="hero-cut__tilt" ref={tiltRef}>
        <div className="hero-cut__topbar">
          <span><i /> CURRENT CUT</span>
          <span>00:00:18:24</span>
        </div>

        <div className="hero-cut__screen">
          <div className="hero-cut__grid" />
          <div className="hero-cut__scan" />
          <span className="hero-cut__corner hero-cut__corner--tl">⌜</span>
          <span className="hero-cut__corner hero-cut__corner--tr">⌝</span>
          <span className="hero-cut__corner hero-cut__corner--bl">⌞</span>
          <span className="hero-cut__corner hero-cut__corner--br">⌟</span>

          <div className="hero-cut__frame hero-cut__frame--one">
            <span>STORY</span>
            <b>01</b>
          </div>
          <div className="hero-cut__frame hero-cut__frame--two">
            <span>MOTION</span>
            <b>02</b>
          </div>
          <div className="hero-cut__frame hero-cut__frame--three">
            <span>SOUND</span>
            <b>03</b>
          </div>

          <div className="hero-cut__center">+</div>
          <div className="hero-cut__label">PROGRAM / MINTESNOT_01</div>
        </div>

        <div className="hero-cut__timeline">
          <div className="hero-cut__ticks"><span>00</span><span>05</span><span>10</span><span>15</span><span>20</span></div>
          <div className="hero-cut__track"><b>V1</b><i className="acid" /><i className="violet" /></div>
          <div className="hero-cut__track"><b>A1</b><i className="coral wide" /></div>
          <span className="hero-cut__playhead" />
        </div>

        <div className="hero-cut__footer">
          <span>EDIT / CREATE / REPEAT</span>
          <span>PLAYBACK 100%</span>
        </div>
      </div>
    </div>,
    host,
  );
}
