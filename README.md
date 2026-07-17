# Interactive GCP Pursuit Builder

A static React 18 + Vite 5 app that turns DACH customer pain points into a buildable
Google Cloud pursuit — assemble compatible solution blocks into a sales-ready stack.
No backend; the app and its catalog data are fully static and public.

## About & methodology

Independent portfolio project. Not affiliated with or endorsed by Google LLC.
**Based on OSINT and AI-assisted research.** The catalog references named DACH
enterprises. Where a public source for the Google Cloud engagement exists, it is
cited in the app's per-account **Sources & methodology** panel and in the exported
brief. Where no public source is on file, the account's footprint and pursuit angle
are **AI-assisted hypotheses that require independent verification** — labelled as
such in the UI and output. The content is illustrative, not authoritative, and does
not represent confidential or private customer information.

## Local development

```bash
npm ci        # install exact dependencies from package-lock.json
npm run dev   # start the Vite dev server
```

## Build

```bash
# Standard build (relative base "./") — used for the Perplexity preview / root deploys.
npm run build

# GitHub Pages build (base path /stackwerk/) for the project site.
npm run build:pages

npm run preview   # serve the built dist/ locally
```

The base path is configured per-build rather than globally:

- `vite.config.js` keeps `base: './'` so the standard build works from any root
  (e.g. the Perplexity preview deploy).
- `npm run build:pages` passes `--base=/stackwerk/` so assets resolve correctly
  under the GitHub Pages project subpath.

## Stress / regression test

An automated Playwright stress test lives in `tests/stress.spec.js`. It cycles
all presets, all 22 named DACH customers, all 14 pain points, rapid theme toggles, repeated
block add/remove, library expand/collapse, brief copy/download, and mobile nav
across four viewports (1440×900, 1280×720, 768×1024, 390×844), asserting no
uncaught/console/React-key errors, no horizontal overflow, that the pain list is
bounded and scrollable, that the add-on library sits close to the block stack, and
that the independence disclaimer, OSINT methodology note and per-account
sources/hypothesis labelling render.

```bash
npm run test:stress
```

## GitHub Pages deployment

Deployed automatically via `.github/workflows/deploy-pages.yml` on pushes to
`main`/`master`. The workflow runs `npm ci`, builds with `npm run build:pages`,
uploads the `dist/` artifact, and deploys with the official GitHub Pages actions.

Live URL: **https://ellaroyce.github.io/stackwerk/**

After first push, enable Pages in the repository settings:
**Settings → Pages → Build and deployment → Source: GitHub Actions.**

## Independence from the root Pages site

This repository is completely independent from
[`ellaroyce/ellaroyce.github.io`](https://github.com/ellaroyce/ellaroyce.github.io)
(Pruna Secura), the user's root Pages site. Deploying this project site at
`/stackwerk/` does not modify or affect that separate repository or its content.
