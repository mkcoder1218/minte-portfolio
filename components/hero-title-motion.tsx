"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accentColors = ["#c9c1ff", "#dcff36", "#ffb29d", "#b4dafa"];

export default function HeroTitleMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const headline = hero?.querySelector<HTMLElement>("h1");
    const lines = hero ? Array.from(hero.querySelectorAll<HTMLElement>(".hero-line")) : [];

    if (!hero || !headline || lines.length < 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const originals = lines.map((line) => line.textContent ?? "");

    lines.forEach((line, lineIndex) => {
      if (line.dataset.heroSplit === "true") return;
      const text = line.textContent ?? "";
      line.textContent = "";
      line.dataset.heroSplit = "true";
      line.dataset.line = String(lineIndex);

      Array.from(text).forEach((character, index) => {
        const span = document.createElement("span");
        span.className = `hero-char${character === "." ? " hero-char--dot" : ""}`;
        span.dataset.charIndex = String(index);
        span.textContent = character;
        line.appendChild(span);
      });
    });

    const firstLineChars = Array.from(lines[0].querySelectorAll<HTMLElement>(".hero-char"));
    const secondLineChars = Array.from(lines[1].querySelectorAll<HTMLElement>(".hero-char"));
    const allChars = [...firstLineChars, ...secondLineChars];
    const dot = lines[1].querySelector<HTMLElement>(".hero-char--dot");

    if (reduced) {
      return () => {
        lines.forEach((line, index) => {
          line.textContent = originals[index];
          delete line.dataset.heroSplit;
          delete line.dataset.line;
        });
      };
    }

    gsap.killTweensOf(lines);
    gsap.killTweensOf(allChars);
    gsap.set(lines, { clearProps: "transform,opacity,filter,clipPath" });
    gsap.set(allChars, {
      transformPerspective: 900,
      transformOrigin: "50% 100%",
      backfaceVisibility: "hidden",
    });

    const intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.12 });

    intro
      .fromTo(
        firstLineChars,
        {
          yPercent: (index) => 125 + (index % 3) * 16,
          rotateX: (index) => (index % 2 === 0 ? -88 : 88),
          rotateZ: (index) => (index % 2 === 0 ? -7 : 7),
          scale: 0.68,
          opacity: 0,
          filter: "blur(9px)",
          color: (index) => accentColors[index % accentColors.length],
        },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          color: "#111111",
          duration: 1.02,
          stagger: { each: 0.042, from: "edges" },
        },
      )
      .fromTo(
        secondLineChars,
        {
          yPercent: (index) => 140 + (index % 4) * 13,
          rotateX: (index) => (index % 2 === 0 ? 92 : -92),
          rotateZ: (index) => (index % 2 === 0 ? 6 : -6),
          scale: 0.64,
          opacity: 0,
          filter: "blur(10px)",
          color: (index) => accentColors[(index + 1) % accentColors.length],
        },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          color: "#111111",
          duration: 1.08,
          stagger: { each: 0.036, from: "center" },
        },
        "-=0.72",
      );

    if (dot) {
      intro.fromTo(
        dot,
        { scale: 0, rotate: 180, color: accentColors[1] },
        { scale: 1, rotate: 0, color: "#111111", duration: 0.5, ease: "back.out(2.7)" },
        "-=0.28",
      );
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    scrollTimeline
      .to(lines[0], { xPercent: -4.5, scaleX: 1.045, skewX: -1.1, ease: "none" }, 0)
      .to(lines[1], { xPercent: 4.5, scaleX: 0.96, skewX: 1.1, ease: "none" }, 0)
      .to(
        allChars,
        {
          yPercent: (index) => (index % 2 === 0 ? -8 : 8),
          rotateZ: (index) => (index % 3 === 0 ? -1.2 : index % 3 === 1 ? 1.2 : 0),
          ease: "none",
        },
        0,
      );

    const onPointerMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const rect = headline.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width - 0.5, -0.5), 0.5);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height - 0.5, -0.5), 0.5);

      gsap.to(lines[0], {
        x: x * 18,
        y: y * -7,
        rotateZ: x * -0.8,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(lines[1], {
        x: x * -18,
        y: y * 7,
        rotateZ: x * 0.8,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onPointerLeave = () => {
      gsap.to(lines, {
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 0.65,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    headline.addEventListener("pointermove", onPointerMove);
    headline.addEventListener("pointerleave", onPointerLeave);
    ScrollTrigger.refresh();

    return () => {
      headline.removeEventListener("pointermove", onPointerMove);
      headline.removeEventListener("pointerleave", onPointerLeave);
      intro.kill();
      scrollTimeline.kill();
      gsap.killTweensOf(lines);
      gsap.killTweensOf(allChars);
      lines.forEach((line, index) => {
        line.textContent = originals[index];
        delete line.dataset.heroSplit;
        delete line.dataset.line;
      });
    };
  }, []);

  return null;
}
