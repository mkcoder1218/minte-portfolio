"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./project-modal.module.css";

type ProjectWork = {
  label: string;
  platform: string;
  href: string;
};

type ProjectCategory = {
  n: string;
  title: string;
  icon: string;
  count: string;
  works: ProjectWork[];
};

const projects: ProjectCategory[] = [
  {
    n: "01",
    title: "Long Tea",
    icon: "🍵",
    count: "14 projects",
    works: [
      { label: "Long Tea — 01", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5ou1F/" },
      { label: "Long Tea — 02", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5tyJT/" },
      { label: "Long Tea — 03", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5Kt6W/" },
      { label: "Long Tea — 04", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5ooU8/" },
      { label: "Long Tea — 05", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5WaKS/" },
      { label: "Long Tea — 06", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp53j1j/" },
      { label: "Long Tea — 07", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqp5tGrp/" },
      { label: "Long Tea — 08", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpaFDbf/" },
      { label: "Long Tea — 09", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpaMwwp/" },
      { label: "Long Tea — 10", platform: "TikTok · Brand Content", href: "https://www.tiktok.com/@longtea.et/video/7679022110173449490" },
      { label: "Long Tea — 11", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpakApv/" },
      { label: "Long Tea — 12", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpa2DwF/" },
      { label: "Long Tea — 13", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpaFQa1/" },
      { label: "Long Tea — 14", platform: "TikTok · Brand Content", href: "https://vt.tiktok.com/ZSqpmxC5T/" },
    ],
  },
  {
    n: "02",
    title: "Golden Tulip Hotel",
    icon: "🏨",
    count: "09 projects",
    works: [
      { label: "Golden Tulip — 01", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpaAeJe/" },
      { label: "Golden Tulip — 02", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpa3JPY/" },
      { label: "Golden Tulip — 03", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpaU4dW/" },
      { label: "Golden Tulip — 04", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpax3MD/" },
      { label: "Golden Tulip — 05", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpax4Sd/" },
      { label: "Golden Tulip — 06", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpaW6jf/" },
      { label: "Golden Tulip — 07", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpaW3d2/" },
      { label: "Golden Tulip — 08", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpasBma/" },
      { label: "Golden Tulip — 09", platform: "TikTok · Hotel Content", href: "https://vt.tiktok.com/ZSqpa7fky/" },
    ],
  },
  {
    n: "03",
    title: "Coldstone",
    icon: "🍨",
    count: "05 projects",
    works: [
      { label: "Coldstone — 01", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpaVvKf/" },
      { label: "Coldstone — 02", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpatyDU/" },
      { label: "Coldstone — 03", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpa9Nph/" },
      { label: "Coldstone — 04", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpm6Jva/" },
      { label: "Coldstone — 05", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpmjYdM/" },
    ],
  },
  {
    n: "04",
    title: "Pizza Hut",
    icon: "🍕",
    count: "02 projects",
    works: [
      { label: "Pizza Hut — 01", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpm8QB2/" },
      { label: "Pizza Hut — 02", platform: "TikTok · Food Content", href: "https://vt.tiktok.com/ZSqpmYy2P/" },
    ],
  },
  {
    n: "05",
    title: "Rad Best Furniture",
    icon: "🛋️",
    count: "06 projects",
    works: [
      { label: "Rad Best Furniture — 01", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmGhJp/" },
      { label: "Rad Best Furniture — 02", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmqMTK/" },
      { label: "Rad Best Furniture — 03", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmta6f/" },
      { label: "Rad Best Furniture — 04", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmGshr/" },
      { label: "Rad Best Furniture — 05", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmXv7g/" },
      { label: "Rad Best Furniture — 06", platform: "TikTok · Product Content", href: "https://vt.tiktok.com/ZSqpmX3RS/" },
    ],
  },
];

function extractVideoId(url: string) {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

function playerUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    muted: "1",
    loop: "1",
    controls: "1",
    rel: "0",
  });
  return `https://www.tiktok.com/player/v1/${videoId}?${params.toString()}`;
}

export default function ProjectModalController() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex] ?? null;
  const activeWork = activeProject?.works[activeWorkIndex] ?? null;

  useEffect(() => {
    const section = document.getElementById("work");
    if (!section) return;

    const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>(".project > button"));
    const cleanups = buttons.map((button, index) => {
      const openModal = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveProjectIndex(index);
        setActiveWorkIndex(0);
      };

      button.addEventListener("click", openModal, true);
      return () => button.removeEventListener("click", openModal, true);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    if (activeProjectIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!activeWork) {
      setEmbedUrl(null);
      setPreviewError(false);
      return;
    }

    const directId = extractVideoId(activeWork.href);
    if (directId) {
      setEmbedUrl(playerUrl(directId));
      setPreviewError(false);
      return;
    }

    const controller = new AbortController();
    setEmbedUrl(null);
    setPreviewError(false);

    fetch(`/api/tiktok/resolve?url=${encodeURIComponent(activeWork.href)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not resolve TikTok link");
        return response.json() as Promise<{ videoId: string }>;
      })
      .then(({ videoId }) => setEmbedUrl(playerUrl(videoId)))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPreviewError(true);
      });

    return () => controller.abort();
  }, [activeWork]);

  useEffect(() => {
    if (activeProjectIndex === null || !modalRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-modal-backdrop]", { opacity: 0 }, { opacity: 1, duration: 0.28 })
        .from("[data-modal-panel]", { y: 46, scale: 0.985, opacity: 0, duration: 0.5 }, "<")
        .from("[data-modal-heading] > *", { y: 22, opcity: 0, stagger: 0.06, duration: 0.4 }, "-=0.22")
        .from("[data-modal-preview]", { x: -24, opacity: 0, duration: 0.5 }, "-=0.28")
        .from("[data-modal-item]", { y: 18, opacity: 0, stagger: 0.055, duration: 0.38 }, "-=0.3");
    }, modalRef);

    return () => ctx.revert();
  }, [activeProjectIndex]);

  const closeModal = () => {
    if (activeProjectIndex === null) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !modalRef.current) {
      setActiveProjectIndex(null);
      return;
    }

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setActiveProjectIndex(null),
    });
  };

  if (!activeProject || !activeWork) return null;

  return (
    <div
      ref={modalRef}
      className={styles.overlay}
      data-modal-backdrop
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closeModal();
      }}
    >
      <section className={styles.panel} data-modal-panel>
        <header className={styles.header} data-modal-heading>
          <div>
            <span className={styles.kicker}>{activeProject.n} / CLIENT WORK</span>
            <h2 id="project-modal-title">{activeProject.title}</h2>
            <p>{activeProject.count} · Select a cut to preview it.</p>
          </div>
          <button type="button" className={styles.close} onClick={closeModal} aria-label="Close project preview">
            <span>CLOSE</span>
            <b>×</b>
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.previewColumn} data-modal-preview>
            <div className={styles.playerShell}>
              {embedUrl ? (
                <iframe
                  key={embedUrl}
                  className={styles.player}
                  src={embedUrl}
                  title={`${activeWork.label} TikTok preview`}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className={styles.playerState}>
                  <span>{previewError ? "PREVIEW UNAVAILABLE" : "LOADING PREVIEW"}</span>
                  <strong>{previewError ? "Open this cut directly on TikTok." : "Resolving the TikTok cut…"}</strong>
                </div>
              )}
            </div>

            <div className={styles.previewMeta}>
              <div>
                <span>{String(activeWorkIndex + 1).padStart(2, "0")}</span>
                <strong>{activeWork.label}</strong>
              </div>
              <a href={activeWork.href} target="_blank" rel="noreferrer">
                Open on TikTok ↗

              </a>
            </div>
          </div>

          <div className={styles.list} aria-label={`${activeProject.title} work list`}>
            {activeProject.works.map((work, index) => (
              <button
                type="button"
                className={`${styles.item} ${index === activeWorkIndex ? styles.activeItem : ""}`}
                key={work.href}
                data-modal-item
                onClick={() => setActiveWorkIndex(index)}
                aria-pressed={index === activeWorkIndex}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{work.label}</strong>
                  <small>{work.platform}</small>
                </div>
                <b>{index === activeWorkIndex ? "PLAYING" : "PLAY"} ↗</b>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
