# Minte Portfolio

A light, editorial Next.js portfolio for **Mintesnot Saleamlak**, designed around the visual language of a video-editing timeline. The experience uses GSAP for cinematic entrances, scroll-linked timeline motion, project-card interactions and capability marquees.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- GSAP + ScrollTrigger + `@gsap/react`
- Native Next.js metadata, sitemap, robots and dynamic Open Graph image

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production

Set the public site URL before deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Then build:

```bash
npm run build
npm start
```

## Content source

Portfolio information, project categories, services and public social/contact links were migrated from the previous Mintesnot portfolio at `https://mintesale.netlify.app/` and redesigned into a new visual-storytelling experience.
