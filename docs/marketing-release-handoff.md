# Marketing release handoff

This is the release boundary for the public MiCirql product website. It does not authorize a deployment, a database change, or a Builder release.

## Truth contract

- Dental and Physiotherapy are independently certified in the local Builder source/runtime.
- Pack certification does not approve a specific customer's facts, identity, deployment, or publication.
- Restaurants, cafés, and consulting remain `Planned` and receive no Builder CTA.
- The public Tools surface links only the verified beta routes for SEO Studio, QA Testing Lab, and UI/UX Inspector.
- Screenshot Studio is not linked or advertised as usable until its direct route works without redirecting to the Tools index.
- Builder workflow and publish/export claims distinguish locally gated paths from deployed commercial operation.
- The durable private upload-to-render path and Dental cross-surface gate are locally verified; neither claim implies deployment.
- Pricing is intentionally absent from this product page.

The public labels live in `src/release-status.js`. Change those labels only after the matching Builder evidence is current.

## Required preflight

1. Confirm the release branch and review every working-tree change.
2. Run `npm ci`, `npm run build`, and `npm run test:ui`.
3. Confirm all Builder links resolve to `https://builder.micirql.com/` and that the deployed Builder state supports both certified industry handoffs before publishing these claims.
4. Confirm the three Tools links resolve to `/tools/seo/`, `/tools/qa/`, and `/tools/ui-ux/`; do not add a Screenshot Studio link until its direct route is verified.
5. Confirm `robots.txt`, `sitemap.xml`, the canonical URL, and social metadata resolve from the built output.
6. In a non-production Supabase project, review and apply `supabase/public_site_leads_setup.sql`. Verify anonymous insert succeeds and anonymous select/update/delete fail.
7. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the deployment environment. Never place a secret or service-role key in a `VITE_` variable.
8. Add an abuse-control decision for the public form before commercial launch (for example, a server/Edge Function with rate limiting and bot protection). RLS limits data access but does not stop automated inserts.
9. Obtain an approved privacy notice for the name, phone, email, company, message, page URL, and referrer collected by the form.

## Cloudflare Pages handoff

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Required environment names: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

Record the commit SHA, Cloudflare deployment ID/URL, environment-key names (never values), test output, and reviewer before promoting a deployment.

## Post-deploy smoke test

- Load `/` at 390px and desktop width; check the official logo, navigation, roadmap labels, FAQ, form, and document overflow.
- Check `/robots.txt` and `/sitemap.xml` return 200.
- Follow every Builder CTA and confirm it reaches the expected authentication/onboarding path with Dental and Physiotherapy certified and Restaurant non-actionable.
- Submit one clearly labelled release-test enquiry only with approval to create that external record. Confirm it appears once, contains `source = micirql.com` and `status = new`, and does not expose any lead through an anonymous read.
- Confirm no planned-industry control implies availability and no local certification claim implies that a customer site was approved or published.

## Rollback

1. In Cloudflare Pages, identify the last known-good deployment recorded during the previous release.
2. Promote/rollback to that exact deployment; do not rebuild an unverified commit as a substitute.
3. Re-run the homepage, Builder-link, robots, sitemap, and form-availability smoke checks.
4. If the failure is limited to the enquiry backend, disable the production form configuration or restore the previous backend route while leaving stored leads intact.
5. Do not drop or rewrite `public_site_leads` during a website rollback. Database rollback requires a separately reviewed data-preserving plan.
6. Record the incident, failed deployment ID, rollback deployment ID, and remaining follow-up.

## Current release boundary

The repository can be prepared and verified locally. Deployment, production Supabase setup, a real enquiry submission, and rollback selection are external changes and require an explicit release action.
