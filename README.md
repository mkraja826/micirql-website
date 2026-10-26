# MiCirql Website

This repository contains the public product website for the MiCirql industry website builder.

MiCirql turns verified business facts and supplied brand assets into researched, responsive website directions. The public website deliberately mirrors the product's current release state:

- Dental and Physiotherapy are independently certified local industry packs.
- Restaurants, cafes, and consulting are planned and remain unavailable in the Builder.
- Builder workflow, publishing, export, and media-storage work are described by their actual validation status rather than as finished commercial capabilities.

## Product Website

The single-page experience includes:

- real Builder captures for the structured brief, ranked design review, and responsive editor;
- the verified Dental example and certified Physiotherapy availability;
- the one-industry-at-a-time release roadmap;
- a factual capability-status section;
- the design contract separating fixed business truth from direction-specific presentation;
- an evidence-backed `/apps/` portfolio for CapDent, Builder, Tools, and assisted engineering;
- accessible FAQ, navigation, and enquiry controls;
- responsive layouts tested at 320, 390, 768, 1024, and 1440 pixels.

The release labels used by the page are defined in `src/release-status.js` so public claims remain explicit and reviewable.

## Tech Stack

- React
- Vite
- Custom CSS
- Playwright
- axe-core accessibility checks
- lucide-react icons

## Run Locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
npm run test:ui
```

The UI suite checks the homepage and `/apps/` portfolio for factual release claims, the official brand mark, responsive behavior, document overflow, keyboard navigation, mobile target sizes, reduced-motion behavior, runtime errors, accessibility, and visual snapshots.

It also builds against test-only Supabase values and verifies that the enquiry form sends a constrained payload with a publishable key in the `apikey` header, does not expose backend error bodies, and can retry safely. The test endpoint is intercepted; the suite never writes to an external project.

The matching insert-only RLS setup is in `supabase/public_site_leads_setup.sql`. Applying it and configuring production environment values are explicit release actions, not part of a local build. See `docs/marketing-release-handoff.md` for preflight, smoke-test, and rollback steps.

## Cloudflare Pages Settings

```txt
Build command: npm run build
Output directory: dist
```

Deployment is a separate release action. Passing local build and UI checks does not publish this repository or expand the Builder's certified industry availability.
