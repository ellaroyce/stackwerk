# Stackwerk — Google Cloud Pursuit Constructor

A static React 18 + Vite 5 app that turns DACH customer pain points into a buildable
Google Cloud pursuit — assemble compatible solution blocks into a sales-ready stack.
No backend; the app and its supplied catalog data are fully static and public.

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
