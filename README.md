# Personal Portfolio

## Overview

Single-page portfolio for Bharadwaj Karthikeya built with Vite + React. It merges the former multipage experience into one scroll-driven layout with anchor navigation, section-aware navbar, external project CTAs, and a contact form that sends via EmailJS.

## Key Features

- **Single scroll experience** covering hero, about, skills, experience, projects, education, and connect sections.
- **Theme-aware UI** with Satoshi + General Sans typography, sandy daytime palette, and dark-mode auto-inverted icons.
- **Projects modal & CTAs** include “Go to Behance / GitHub” buttons per requirement.
- **EmailJS-powered contact form** with optimistic status messaging and graceful failure states.
- **Legacy multipage archive** preserved inside `frontend/archive-multipage/` for reference.

## Tech Stack

- Vite + React 19
- Tailwind (utility layer) + custom CSS tokens in `src/index.css`
- Framer Motion for hero/section reveals
- EmailJS browser SDK for contact form delivery

## Project Structure

- `frontend/` – Vite app root (primary workspace)
  - `src/pages/SinglePage.jsx` – main page composing all sections
  - `src/components/` – Navbar, Footer, etc.
  - `src/sections/` – hero intro and other isolated blocks
  - `src/content/` – structured data (projects, navigation, socials, etc.)
  - `src/archive-pages/` – React versions of the retired multipage views
  - `public/media/` – image assets
- `frontend/archive-multipage/` – original static HTML/CSS/JS + media for historical reference

## Getting Started

```bash
cd frontend
npm install

# Local dev server
npm run dev

# Production build
npm run build
```

## Environment Variables

Create `frontend/.env` (already gitignored) with your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_xxx
```

These values are baked into the Vite build, so re-run `npm run dev` after changes.

## Deployment

- **Vercel** (recommended): import the repo, set the project root to `frontend`, keep build command `npm run build`, output `dist`, and add the `VITE_EMAILJS_*` env vars under Project Settings → Environment Variables.
- **GitHub Pages** (alternative): run `npm run build` and publish the `frontend/dist` folder via GitHub Actions or manual upload; remember that env vars must be provided at build time.

## Notes

- Design tokens, typography, and gradients live in `src/index.css`; tweak these to shift the theme globally.
- The navbar relies on section IDs defined in `src/content/navigation.js`; keep IDs in sync when adding/removing sections.
- Archived static files are untouched—do not delete if you still need the previous multipage reference.
