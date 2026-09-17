"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionDirector() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.querySelector("main");
    if (!root || reduced) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      const element = trigger.trigger;
      if (element instanceof Element && root.contains(element)) trigger.kill();
    });

    const staleTargets = gsap.utils.toArray<HTMLElement>(
      ".nav,.eyebrow,.hero-foot > *,.edit-window,.playhead,[data-reveal],.project,.project-visual,.service,.marquee-track",
    );

    gsap.killTweensOf(staleTargets);
    gsap.set(staleTargets, { clearProps: "transform,opacity,clipPath,filter" });

    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

    intro
      .fromTo(
        ".nav",
        { clipPath: "inset(0 100% 0 0)", y: -10 },
        { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.95 },
      )
      .from(".eyebrow span", { yPercent: 160, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.55")
      .from(
        ".hero-foot p",
        { clipPath: "inset(0 0 100% 0)", y: 28, duration: 0.7 },
        "-=0.28",
      )
      .from(".hero-foot .btn", { x: 28, opacity: 0, stagger: 0.07, duration: 0.55 }, "-=0.46");

    const editorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".editor",
        start: "top 92%",
        end: "bottom 24%",
        scrub: 0.8,
      },
    });

    editorTimeline
      .fromTo(
        ".edit-window",
        {
          y: 92,
          scale: 0.93,
          rotateX: 5,
          clipPath: "inset(12% 7% 12% 7%)",
          transformPerspective: 1200,
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power3.out",
          duration: 0.45,
        },
        0,
      )
      .from(
        ".stage-copy > *",
        { x: -38, opacity: 0, stagger: 0.08, ease: "power2.out", duration: 0.32 },
        0.08,
      )
      .from(
        ".stage-art .frame",
        {
          yPercent: (index) => (index % 2 === 0 ? 36 : -32),
          xPercent: (index) => (index === 1 ? 22 : -18),
          rotate: (index) => (index - 1) * 7,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          duration: 0.42,
        },
        0.12,
      )
      .from(
        ".clip",
        { scaleX: 0, transformOrigin: "left center", stagger: 0.06, ease: "none", duration: 0.3 },
        0.28,
      )
      .fromTo(".playhead", { left: "11%" }, { left: "86%", ease: "none", duration: 0.56 }, 0.28);

    const revealTimeline = (
      trigger: string,
      build: (timeline: gsap.core.Timeline) => void,
      start = "top 80%",
    ) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end: "bottom 18%",
          toggleActions: "restart none restart reverse",
        },
      });
      build(timeline);
      return timeline;
    };

    revealTimeline("#about", (timeline) => {
      timeline
        .from("#about > .index", { x: -42, opacity: 0, duration: 0.38, ease: "power3.out" })
        .from(
          "#about .two-col",
          { clipPath: "inset(0 100% 0 0)", duration: 0.82, ease: "expo.inOut" },
          "-=0.12",
        )
        .from(
          "#about h2",
          { xPercent: -9, skewX: -3, duration: 0.72, ease: "expo.out" },
          "-=0.62",
        )
        .from(
          "#about .copy > p",
          { y: 34, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          "#about .chips span",
          { y: 14, scale: 0.82, opacity: 0, stagger: 0.035, duration: 0.34, ease: "back.out(1.8)" },
          "-=0.24",
        );
    });

    revealTimeline("#work .work-head", (timeline) => {
      timeline
        .from("#work .work-head .index", { x: -36, opacity: 0, duration: 0.35 })
        .from(
          "#work .work-head h2",
          { clipPath: "inset(0 0 100% 0)", yPercent: 30, skewY: 4, duration: 0.78, ease: "expo.out" },
          "-=0.15",
        )
        .from("#work .work-head > p", { x: 42, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.42");
    });

    const hoverCleanups: Array<() => void> = [];

    gsap.utils.toArray<HTMLElement>(".project").forEach((card, index) => {
      const visual = card.querySelector<HTMLElement>(".project-visual");
      const direction = index % 2 === 0 ? -1 : 1;

      gsap.fromTo(
        card,
        {
          xPercent: 7 * direction,
          rotate: 1.2 * direction,
          scale: 0.97,
          clipPath: direction < 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        },
        {
          xPercent: 0,
          rotate: 0,
          scale: 1,
          clipPath: "inset(0 0% 0 0%)",
          duration: 0.82,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "restart reverse restart reverse",
          },
        },
      );

      if (!visual) return;

      gsap.fromTo(
        visual,
        { y: 18 },
        {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      const enter = () =>
        gsap.to(visual, {
          y: -10,
          scale: 1.018,
          rotate: 0,
          duration: 0.32,
          ease: "power3.out",
          overwrite: "auto",
        });

      const leave = () =>
        gsap.to(visual, {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.36,
          ease: "power3.out",
          overwrite: "auto",
        });

      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      hoverCleanups.push(() => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      });
    });

    revealTimeline("#services", (timeline) => {
      timeline
        .from("#services .services-head .index", { x: -32, opacity: 0, duration: 0.34 })
        .from(
          "#services .services-head h2",
          { clipPath: "inset(0 0 100% 0)", yPercent: 26, duration: 0.72, ease: "expo.out" },
          "-=0.12",
        );
    });

    gsap.utils.toArray<HTMLElement>("#services .service").forEach((row, index) => {
      gsap.from(row, {
        x: index % 2 === 0 ? -42 : 42,
        clipPath: index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        duration: 0.62,
        ease: "expo.out",
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "restart reverse restart reverse",
        },
      });
    });

    revealTimeline("#contact", (timeline) => {
      timeline
        .from("#contact > .index", { x: -36, opacity: 0, duration: 0.35 })
        .from("#contact .contact-kicker", { x: 34, opacity: 0, duration: 0.42 }, "-=0.12")
        .from(
          "#contact h2",
          { clipPath: "inset(0 0 100% 0)", yPercent: 32, skewY: 4, duration: 0.86, ease: "expo.out" },
          "-=0.18",
        )
        .from(
          "#contact .contact-links a",
          { y: 24, opacity: 0, stagger: 0.07, duration: 0.42, ease: "power3.out" },
          "-=0.42",
        );
    });

    gsap.to(".marquee-track", { xPercent: -50, duration: 15, repeat: -1, ease: "none" });

    ScrollTrigger.refresh();

    return () => hoverCleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
