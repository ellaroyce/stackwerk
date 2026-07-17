# Stackwerk — GCP LEGO Pursuit Constructor · Handoff

**Project path:** `/home/user/workspace/gcp-lego-constructor`
**Stack:** Static React 18 + Vite 5 (no backend). Deploy from `dist/`.
**Deploy args used:** `deploy_website(project_path="/home/user/workspace/gcp-lego-constructor/dist", site_name="Stackwerk", entry_point="index.html")`

## Key files
- `src/data.js` — curated dataset distilled from the two supplied docs: 55 GCP products (layer + capability signals), all 14 Section-C master pain points (core/add-ons/subs/narrative), 22 named DACH accounts with per-pain custom stacks, competitor substitution table (matrix D2), 3 presets, staged-pursuit generator.
- `src/App.jsx` — full app: 3-column workspace, block builder, library drawer, brief panel (copy/download), health meters, sovereignty warning, presets, mobile step nav.
- `src/icons.jsx` — inline SVG icon set + custom stacked-blocks brand logo.
- `src/styles.css` — dark-first design tokens, Google-blue accent on warm ink/off-white neutrals, block/connector styling, responsive + reduced-motion.
- `public/favicon.svg` — custom favicon; metadata/OG in `index.html`.

## Features delivered
- App shell: inline SVG logo, brand "Stackwerk", subtitle, dark/light toggle (React state only, seeded from prefers-color-scheme, **no localStorage**).
- 3-step flow visible in first desktop viewport: (1) context — named customer or industry, (2) pain point with search + industry-sensitive "Suggested" ordering, (3) block builder.
- Block assembly across 5 ordered layers (Foundation/Core/Intelligence/Experience/Governance) with connector pins/sockets, core vs add-on roles, hover blurb, remove button, add/remove microinteractions.
- Product library drawer with recommended add-ons + full catalog grouped by category; in-stack items disabled.
- Live stack-health meters (Data/Security/Sovereignty/AI/Integration) derived deterministically from selected products; red→yellow→green levels.
- Sovereignty warning for regulated industries with no sovereignty block, plus one-click "Add T-Systems Sovereign + Assured Workloads".
- Pursuit brief: customer, pain, narrative + PL angle, core stack, add-ons, competitor substitutions (strikethrough + vendor chip), DACH compliance signals (GDPR/DORA/BaFin/BSI/NIS2/EU AI Act), staged 3-phase pursuit. Copy (navigator.clipboard, inline "Copied") + Download (client-side Blob `.md`).
- 3 presets: Deutsche Bank Sovereign GenAI, BMW Manufacturing/SAP, Schwarz Retail Productivity — each fully sets context+pain+blocks.
- Responsive: 3-column desktop → stacked mobile with bottom step nav; no horizontal overflow.
- Accessibility: semantic regions, aria labels, skip link, visible focus, 44px+ targets, aria-pressed/aria-current states, prefers-reduced-motion.
- `data-testid` on all interactive/dynamic elements.

## Decisions
- Used a plain static Vite React app instead of the Express template since no persistence/backend is required — cleaner `dist`-only deploy.
- Setup column (steps 1+2) uses an internally-scrolling account list capped at 240px so the Step 2 header stays in the first viewport (fixed a deploy-validator flag about missing "step 2").
- Customer selection auto-seeds the first suggested pain + its custom stack for instant payoff; presets fully override.
- All product claims/stacks/substitutions grounded in the supplied catalog + matrix; no pricing invented. Footer note credits the source docs.

## Suggested QA controls (data-testid)
`button-theme-toggle`, `button-reset`, `preset-*`, `tab-mode-customer/industry`, `input-customer-search`, `customer-<id>`, `industry-<name>`, `input-pain-search`, `pain-p1..p14`, `col-builder`, `layer-<id>`, `block-<id>`, `button-remove-<id>`, `button-toggle-library`, `lib-add-<id>`, `meter-<signal>`, `warn-sovereignty`, `button-add-sovereignty`, `brief-core/addons/subs/compliance/phases`, `button-copy-brief`, `button-download-brief`, `mnav-setup/build/brief`.

## Verified
`npm install` ✓, `npm run build` ✓ (no errors), Playwright QA ✓ (light/dark, desktop/mobile, presets, add/remove, clipboard copy 2745 chars, download `stackwerk-brief-<slug>.md`, sovereignty warning, no console errors, no horizontal overflow). Git initialized, 2 commits.
