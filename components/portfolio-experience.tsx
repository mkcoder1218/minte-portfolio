"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProjectWork = {
  label: string;
  platform: string;
  href: string;
};

type ProjectCategory = {
  n: string;
  title: string;
  icon: string;
  type: string;
  format: string;
  count: string;
  tone: string;
  copy: string;
  works: ProjectWork[];
};

const projects: ProjectCategory[] = [
  {
    n: "01",
    title: "Long Tea",
    icon: "🍵",
    type: "Brand content",
    format: "TikTok",
    count: "08 projects",
    tone: "green",
    copy: "Eight short-form brand edits created for Long Tea.",
    works: [
      { label: "Long Tea — 01", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVueMQDh/" },
      { label: "Long Tea — 02", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVuePkKa/" },
      { label: "Long Tea — 03", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVue58DG/" },
      { label: "Long Tea — 04", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVuereDc/" },
      { label: "Long Tea — 05", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVueBfsw/" },
      { label: "Long Tea — 06", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVuePnd9/" },
      { label: "Long Tea — 07", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVue8g6C/" },
      { label: "Long Tea — 08", platform: "TikTok · Brand Content", href: "https://vm.tiktok.com/ZSVue2yVf/" },
    ],
  },
  {
    n: "02",
    title: "Pizza Hut",
    icon: "🍕",
    type: "Brand video",
    format: "Instagram",
    count: "01 project",
    tone: "coral",
    copy: "A social-first Pizza Hut brand edit built for Instagram.",
    works: [
      { label: "Pizza Hut", platform: "Instagram · Brand Video", href: "https://www.instagram.com/reel/DbVEgmvDvQ3/" },
    ],
  },
  {
    n: "03",
    title: "Social Media",
    icon: "📱",
    type: "Social content",
    format: "TikTok",
    count: "12 projects",
    tone: "violet",
    copy: "Twelve platform-native short-form edits made for social audiences.",
    works: [
      { label: "Social Media — 01", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVuewU9V/" },
      { label: "Social Media — 02", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVueKTfC/" },
      { label: "Social Media — 03", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudAwDN/" },
      { label: "Social Media — 04", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVuddmuf/" },
      { label: "Social Media — 05", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudLD5y/" },
      { label: "Social Media — 06", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudAUQV/" },
      { label: "Social Media — 07", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudLkSo/" },
      { label: "Social Media — 08", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudd6X3/" },
      { label: "Social Media — 09", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudj5VG/" },
      { label: "Social Media — 10", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudVWv4/" },
      { label: "Social Media — 11", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudxXRb/" },
      { label: "Social Media — 12", platform: "TikTok · Social Content", href: "https://vm.tiktok.com/ZSVudynUR/" },
    ],
  },
  {
    n: "04",
    title: "Other Projects",
    icon: "🎬",
    type: "Video",
    format: "YouTube",
    count: "01 project",
    tone: "blue",
    copy: "Additional long-form and experimental video work.",
    works: [
      { label: "Other Project — 01", platform: "YouTube · Video", href: "https://youtu.be/gl6KID5tw0U" },
    ],
  },
];

const services = [
  ["01", "Video Editing", "Narrative structure, pacing, clean cuts and platform-ready delivery."],
  ["02", "Motion Graphics", "Titles, kinetic typography and purposeful animation in After Effects."],
  ["03", "Color & Sound", "Color polish and sound choices that make the final edit feel complete."],
  ["04", "Social Content", "Short-form edits built for attention, clarity and repeat viewing."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function PortfolioExperience() {
  const root = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.n === activeProject) ?? null;

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".nav", { y: -24, opacity: 0, duration: .65 })
      .from(".eyebrow", { y: 18, opacity: 0, duration: .5 }, "-=.25")
      .from(".hero-line", { yPercent: 110, rotate: 2, stagger: .09, duration: .85 }, "-=.15")
      .from(".hero-foot > *", { y: 20, opacity: 0, stagger: .08, duration: .55 }, "-=.35")
      .from(".edit-window", { y: 34, opacity: 0, scale: .985, duration: .8 }, "-=.35");

    gsap.to(".playhead", {
      left: "86%",
      ease: "none",
      scrollTrigger: {
        trigger: ".edit-window",
        start: "top 75%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 42,
        opacity: 0,
        duration: .75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 87%",
          end: "bottom 13%",
          toggleActions: "restart reverse restart reverse",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".project").forEach((card, i) => {
      const visual = card.querySelector(".project-visual");

      gsap.from(card, {
        y: 58,
        opacity: 0,
        duration: .7,
        delay: i * .04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      if (!visual) return;
      card.addEventListener("mouseenter", () => gsap.to(visual, { scale: 1.025, rotate: i % 2 ? .5 : -.5, duration: .35 }));
      card.addEventListener("mouseleave", () => gsap.to(visual, { scale: 1, rotate: 0, duration: .35 }));
    });

    gsap.to(".marquee-track", { xPercent: -50, duration: 22, repeat: -1, ease: "none" });
  }, { scope: root });

  useGSAP(() => {
    if (!activeProject) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.fromTo(
      ".project-work-list",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: .55, ease: "power3.out" },
    );
    gsap.from(".project-work-link", {
      y: 18,
      opacity: 0,
      duration: .45,
      stagger: .035,
      ease: "power3.out",
    });
    ScrollTrigger.refresh();
  }, { scope: root, dependencies: [activeProject] });

  return (
    <main ref={root}>
      <div className="noise" aria-hidden="true" />
      <header className="nav wrap">
        <a className="logo" href="#top">MINTESNOT.</a>
        <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a></nav>
        <a className="nav-cta" href="#contact">Start a project <Arrow /></a>
      </header>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><span>VIDEO EDITOR / VISUAL STORYTELLER</span><span>ETHIOPIA → WORLDWIDE</span></div>
        <h1 aria-label="Visual stories"><span><i className="hero-line">VISUAL</i></span><span><i className="hero-line">STORIES.</i></span></h1>
        <div className="hero-foot">
          <p>I turn footage into clean, engaging stories for brands, businesses and social platforms.</p>
          <div><a className="btn dark" href="#work">Selected work <Arrow /></a><a className="btn" href="#contact">Let&apos;s talk <Arrow /></a></div>
        </div>
      </section>

      <section className="editor wrap" aria-label="Video editing timeline">
        <div className="edit-window">
          <div className="edit-top"><span className="dots">● ● ●</span><span>MINTESNOT_STORY_01.PRPROJ</span><span>00:00:18:24</span></div>
          <div className="edit-stage">
            <div className="stage-copy"><small>PROGRAM / 01</small><strong>EDIT.<br />CREATE.<br />REPEAT.</strong><p>Story lives in the details between two cuts.</p></div>
            <div className="stage-art" aria-hidden="true"><div className="frame f1">STORY</div><div className="frame f2">MOTION</div><div className="frame f3">SOUND</div><span className="cross">+</span></div>
          </div>
          <div className="timeline">
            <div className="ticks"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span></div>
            <div className="tracks"><span className="label">V1</span><div><b className="clip c1">BRAND_FILM</b><b className="clip c2">MOTION</b></div><span className="label">V2</span><div><b className="clip c3">SOCIAL_CUTS</b><b className="clip c4">COLOR</b></div><span className="label">A1</span><div><b className="clip c5">SOUND_DESIGN.WAV</b></div><i className="playhead" /></div>
          </div>
        </div>
        <div className="caption"><span>01 / TIMELINE</span><span>EVERY STORY STARTS WITH A CUT.</span></div>
      </section>

      <section className="about wrap section" id="about" data-reveal>
        <span className="index">02 / ABOUT</span>
        <div className="two-col"><h2>BEHIND<br />THE EDIT.</h2><div className="copy"><p>I&apos;m <strong>Mintesnot Saleamlak</strong>, a video editor focused on visual stories that connect with audiences.</p><p>From brand videos to social content, I combine editing, motion, sound and storytelling so every frame feels intentional.</p><div className="chips">{["Premiere Pro","After Effects","Motion Graphics","Color Grading","Sound Design","Social Media"].map(x => <span key={x}>{x}</span>)}</div></div></div>
      </section>

      <section className="work wrap section" id="work">
        <div className="work-head" data-reveal><div><span className="index">03 / SELECTED WORK</span><h2>MY<br />PROJECTS.</h2></div><p>Choose a category to explore Mintesnot&apos;s original work. Every project below keeps the real links from the previous portfolio.</p></div>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project" key={p.n}>
              <button
                type="button"
                aria-expanded={activeProject === p.n}
                aria-controls="selected-project-work"
                onClick={() => setActiveProject((current) => current === p.n ? null : p.n)}
                style={{ all: "unset", display: "block", width: "100%", cursor: "pointer" }}
              >
                <div
                  className={`project-visual ${p.tone}`}
                  style={activeProject === p.n ? { boxShadow: "10px 10px 0 #111" } : undefined}
                >
                  <div className="project-top"><span>{p.n}</span><span>{p.icon}</span></div>
                  <strong>{p.title}</strong>
                  <div className="wave">{Array.from({ length: 30 }).map((_, i) => <i key={i} style={{ height: `${20 + ((i * 19) % 64)}%` }} />)}</div>
                  <div className="project-bottom"><span>{activeProject === p.n ? "CLOSE WORK" : "EXPLORE WORK ↓"}</span><span>{p.count}</span></div>
                </div>
                <div className="project-meta"><h3>{p.title}</h3><p>{p.copy}</p><span>{p.format}</span></div>
              </button>
            </article>
          ))}
        </div>

        {selectedProject && (
          <div id="selected-project-work" className="project-work-list" style={{ marginTop: 82 }}>
            <div className="work-head" style={{ marginBottom: 42 }}>
              <div><span className="index">{selectedProject.n} / CATEGORY</span><h2 style={{ marginTop: 28 }}>{selectedProject.title.toUpperCase()}</h2></div>
              <p>{selectedProject.count}. Select a piece to open the original published work.</p>
            </div>
            <div className="service-list">
              {selectedProject.works.map((work, index) => (
                <a
                  className="service project-work-link"
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  key={work.href}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{work.label}</h3>
                  <p>{work.platform}</p>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0,1].flatMap(loop => ["PREMIERE PRO","AFTER EFFECTS","MOTION","COLOR","SOUND DESIGN"].map(x => <span key={`${loop}-${x}`}>{x} <b>✦</b></span>))}</div></div>

      <section className="services wrap section" id="services">
        <div className="services-head" data-reveal><span className="index">04 / SERVICES</span><h2>WHAT I DO.</h2></div>
        <div className="service-list">{services.map(([n,t,c]) => <div className="service" data-reveal key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p><Arrow /></div>)}</div>
      </section>

      <section className="contact wrap section" id="contact" data-reveal>
        <span className="index">05 / CONTACT</span><p className="contact-kicker">HAVE A PROJECT IN MIND?</p><h2>LET&apos;S MAKE<br /><em>SOMETHING.</em></h2>
        <div className="contact-links"><a href="https://wa.me/251905559398" target="_blank" rel="noreferrer">WhatsApp <Arrow /></a><a href="https://www.instagram.com/outofsync.genz/" target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href="tel:+251905559398">Call +251 905 559 398 <Arrow /></a></div>
      </section>

      <footer className="footer wrap"><span>© 2026 MINTESNOT SALEAMLAK</span><span>VIDEO EDITOR / VISUAL STORYTELLER</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
