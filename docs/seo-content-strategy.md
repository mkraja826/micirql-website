# Micirql and CapDent SEO strategy

## Objective

Build search authority at two connected levels:

1. **CapDent product authority** for dental clinic management and Android app searches.
2. **Micirql company authority** for Android product engineering and operational software, so future Micirql products launch from an established domain and brand.

The domains should reinforce each other without publishing duplicate pages:

- `micirql.com` — company, engineering expertise, portfolio, founder vision and broader Android software topics.
- `capdent.in` — CapDent product, dental workflows, product features, pricing, guides and product-intent content.

---

## 1. Primary keyword clusters

### A. CapDent product-category keywords

High product intent:

- free dental clinic management software
- dental clinic management app
- dental management app for Android
- dental patient management software
- dental appointment and billing software
- dental treatment tracking app
- dental clinic software India
- dental practice management software for small clinics
- dental clinic receptionist software
- dental patient records Android app
- dental payment and pending dues software

Comparison and discovery intent:

- best dental clinic management app
- free dental management software for dentists
- dental clinic software alternatives
- paper register vs dental clinic software
- affordable dental practice management software

### B. Micirql branded and company keywords

- Micirql
- Micirql software
- Micirql Android development
- Micirql product engineering
- Micirql India
- Micirql CapDent
- Android software company India
- Android product development company India
- operational software development
- business workflow app development
- founder-led software company India

### C. Problem-aware long-tail keywords

Dental clinic problems:

- how to manage dental patient records digitally
- how to track multiple dental treatment sittings
- how to manage pending payments in a dental clinic
- how to organise dental X-rays and patient photos
- how to manage walk-ins and appointments in a dental clinic
- dental clinic receptionist daily workflow
- how to remind dental patients about follow-ups
- how much cloud storage do dental X-rays need
- how to move a dental clinic from paper to digital

Broader Micirql authority:

- how to turn a manual business workflow into an Android app
- when a business should replace spreadsheets with software
- how to design role-based access for a small business app
- Android app MVP checklist for founders
- Expo vs native Android for business applications
- how to design operational dashboards people actually use
- Play Store release checklist for business apps
- how to validate an internal software product before building

---

## 2. On-page SEO plan

### Micirql homepage

**URL:** `https://micirql.com/`

**Title:**

> Micirql | Android Software Products Built for Real Work

**Meta description:**

> Micirql is an Android software company building focused products for real operational problems. CapDent is its flagship dental clinic management product.

**H1:**

> We build Android software with a longer horizon.

**Recommended H2 structure:**

1. CapDent proves the operating model
2. Products, systems and the infrastructure around them
3. Build once, learn deeply, and make every product strengthen the next
4. Proof across different business contexts
5. Small team now, serious product ambition

### CapDent product homepage

**URL:** `https://capdent.in/`

**Title:**

> Free Dental Clinic Management Software for India | CapDent

**Meta description:**

> Manage dental patient records, appointments, treatments, payments, follow-ups and clinical files with CapDent. All current clinic features are free with 1 GB cloud storage.

**H1:**

> Free dental clinic management software built for everyday practice

**Recommended H2 structure:**

1. Manage the complete dental clinic workflow
2. Patient records, treatments and payments stay connected
3. Built for owners, doctors and receptionists
4. Every feature is free with 1 GB storage
5. Questions dental clinics ask before starting

### Micirql About / Vision page

Create `/about/` when the company history has enough depth for a dedicated page.

**Title:**

> About Micirql | Building a Portfolio of Android Software Products

**Meta description:**

> Learn why Micirql was founded, how CapDent became its first live product and how the company is building toward a focused portfolio of Android software.

**H1:**

> A software company designed to outgrow its first product

**Recommended H2 structure:**

1. Micirql started with a real clinic problem
2. Why Android is the first platform
3. The product principles behind every Micirql release
4. What Micirql is building toward
5. Founder and company information

---

## 3. Technical SEO checklist

### Crawl and indexing

- Maintain separate XML sitemaps for `micirql.com` and `capdent.in`.
- Reference each sitemap in the matching `robots.txt` file.
- Add both properties to Google Search Console.
- Use canonical URLs on every indexable page.
- Return real 404 status codes for missing pages.
- Prevent authenticated dashboard routes from being indexed with `noindex` and access control.

### Performance and Core Web Vitals

- Keep the homepage JavaScript bundle small.
- Avoid decorative libraries and unnecessary animation packages.
- Use SVG for company branding and diagrams.
- Compress CapDent screenshots to modern WebP or AVIF when real screenshots are added.
- Declare image dimensions to prevent layout shift.
- Limit above-the-fold fonts and avoid blocking third-party font requests.
- Target mobile LCP below 2.5 seconds, INP below 200 ms and CLS below 0.1.
- Cache fingerprinted assets for one year.

### Structured data

Micirql:

- `Organization`
- `WebSite`
- `BreadcrumbList` on internal pages
- `Article` for engineering and product articles
- `JobPosting` only when a genuine vacancy is open

CapDent:

- `SoftwareApplication`
- `Organization` or `Brand`
- `FAQPage` where visible FAQs exist
- `Article` for guides
- `BreadcrumbList`

The SoftwareApplication schema should include:

- app name: CapDent
- operating system: Android
- category: BusinessApplication
- price: ₹0 for the current free product
- Play Store download URL
- publisher: Micirql

### Mobile-first quality

- Test all pages at 360 px width.
- Keep tap targets at least 44 px.
- Do not hide meaningful SEO content only behind animation or interaction.
- Use semantic headings in logical order.
- Keep product screenshots readable without horizontal scrolling.
- Ensure the burger menu is keyboard accessible and closes with Escape.

---

## 4. Content strategy

### CapDent product-authority content

Publish practical articles based on real clinic workflows:

1. How to digitise dental patient records without disrupting the clinic
2. A practical dental receptionist workflow for appointments and walk-ins
3. How to track root canal and multi-sitting dental treatments
4. How dental clinics can manage pending payments professionally
5. How to organise X-rays, prescriptions and patient photos
6. A first-90-days dental clinic management checklist
7. How much storage a dental clinic needs for clinical files
8. Dental clinic software for owners, doctors and receptionists
9. Paper registers versus dental clinic management software
10. How to prepare a dental clinic for digital patient records

Each article should:

- answer a specific operational question;
- include an original checklist or framework;
- link naturally to the relevant CapDent feature;
- identify fictional examples clearly;
- be reviewed by a practising dentist where clinical context is involved.

### Micirql Android-development authority

Publish engineering articles under the company domain:

1. What we learned shipping a real Android clinic product
2. How to design an Android app around a changing daily workflow
3. Role-based access patterns for small business software
4. Building an offline-tolerant workflow for field and clinic apps
5. Expo and React Native release lessons from a production Android app
6. Designing payment and pending-balance interfaces without confusion
7. How to structure a Supabase-backed multi-tenant business application
8. Why focused products often beat feature-heavy platforms
9. The product decisions behind CapDent
10. From one Android product to a multi-product company

This content should sound like engineers who have shipped and supported software. Include specific decisions, constraints, failures and improvements rather than generic tutorials.

### Publishing rhythm

Initial 90-day plan:

- 2 CapDent workflow articles per month
- 1 Micirql engineering article per month
- 1 product update or release note per month

Every quarter:

- update the strongest existing articles;
- add original product screenshots;
- review Search Console queries;
- improve pages receiving impressions but low click-through rates.

---

## 5. Internal linking

Micirql homepage should link to:

- CapDent product site
- company About / Vision content
- Android engineering articles
- selected client work
- future product announcements

CapDent pages should link back to Micirql using descriptive company text such as:

> CapDent is built by Micirql, an Android software company focused on real operational workflows.

Avoid placing exact-match keyword links repeatedly in site-wide footers.

---

## 6. Backlink strategy

### Product launch and directories

- Google Play product listing
- Product Hunt launch when the website and onboarding are mature
- AlternativeTo and relevant software directories
- Indian startup directories
- dental technology directories
- founder and company LinkedIn profiles

### Community and editorial links

- Write technical case studies for React Native, Expo and Supabase communities.
- Share useful workflow templates with dental associations and clinic communities.
- Contribute non-promotional articles to Android and product-development publications.
- Publish a transparent CapDent build story that developer newsletters can reference.
- Ask genuine client companies to credit Micirql from their website footer or case-study page where appropriate.

### Avoid

- bulk paid backlink packages;
- irrelevant directory submissions;
- copied guest posts;
- forum spam;
- fake product reviews;
- exchanging links at scale.

---

## 7. Play Store ASO alignment

Website and Play Store language should reinforce the same concepts.

### Recommended app title direction

> CapDent: Dental Clinic Manager

Subject to Play Store character limits and listing-policy review.

### Short-description themes

- dental patient records
- appointments and walk-ins
- treatment progress
- payments and pending dues
- follow-ups
- owner, doctor and receptionist workflows

### Shared website and Play Store keywords

Use naturally in both channels:

- dental clinic management
- dental patient records
- dental appointments
- dental treatment tracking
- dental payments
- dental follow-ups
- clinic staff workflow

### Screenshot alignment

Play Store screenshots and the CapDent website should use the same feature order:

1. daily clinic dashboard;
2. patient records;
3. appointment and waiting workflow;
4. ongoing treatments;
5. payments and pending dues;
6. follow-ups and reminders;
7. owner tools and reports.

Do not claim ranking, user counts or financial outcomes unless they are verifiable.

---

## 8. Measurement

Track separately for Micirql and CapDent:

- indexed pages;
- non-branded impressions;
- branded impressions;
- click-through rate;
- average position by keyword cluster;
- Google Play listing visits from the website;
- product downloads attributed to organic search;
- enquiry submissions from Micirql content;
- referring domains earned through technical and dental content.

The first realistic milestone is page-one visibility for specific long-tail dental workflow searches. Broader phrases such as “dental management software” require sustained content quality, product credibility and relevant links over time.