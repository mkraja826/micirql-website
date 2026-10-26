import React from "react";
import { createRoot } from "react-dom/client";
import {
  INDUSTRY_RELEASES,
  PRODUCT_RELEASES,
  RELEASE_STATUS,
  TOOL_RELEASES,
} from "./release-status";
import "./apps-page.css";

const PRODUCT_RELEASE_BY_ID = new Map(
  PRODUCT_RELEASES.map((product) => [product.id, product]),
);
const CERTIFIED_PACK_COUNT = INDUSTRY_RELEASES.filter(
  (industry) => industry.status === "certified",
).length;
const INDUSTRY_RELEASE_BY_ID = new Map(
  INDUSTRY_RELEASES.map((industry) => [industry.id, industry]),
);

function releaseState(id) {
  const release = PRODUCT_RELEASE_BY_ID.get(id);
  if (!release) throw new Error(`Missing product release state for ${id}`);
  return {
    status: RELEASE_STATUS[release.status],
    tone: release.status,
  };
}

function industryFact(id) {
  const release = INDUSTRY_RELEASE_BY_ID.get(id);
  if (!release) throw new Error(`Missing industry release state for ${id}`);
  return `${release.name} — ${RELEASE_STATUS[release.status]}`;
}

const products = [
  {
    id: "capdent",
    number: "01",
    name: "CapDent",
    eyebrow: "Flagship Android product",
    ...releaseState("capdent"),
    statement: "Dental clinic work, kept in one operational record.",
    description:
      "CapDent brings patient records, waiting flow, visits, payments, prescriptions, clinical media, follow-ups, staff access and reports into one Android-first clinic system.",
    facts: ["Google Play", "Android-first", "Clinic operations"],
    actions: [
      {
        label: "Explore CapDent",
        href: "/dental-management-system/",
      },
      {
        label: "Open Google Play",
        href: "https://play.google.com/store/apps/details?id=com.dms.clinic",
        external: true,
      },
    ],
  },
  {
    id: "builder",
    number: "02",
    name: "MiCirql Builder",
    eyebrow: "Industry website system",
    ...releaseState("builder"),
    statement: "Start with business truth. Choose from certified directions.",
    description:
      "The Builder turns a structured brief into ranked, responsive website directions from certified industry packs, then keeps the chosen project editable through readiness checks.",
    facts: [
      industryFact("clinic-dental"),
      industryFact("clinic-physiotherapy"),
      industryFact("restaurant-restaurant"),
    ],
    actions: [
      {
        label: "Open Builder",
        href: "https://builder.micirql.com/",
      },
      {
        label: "See how it works",
        href: "/#workflow",
      },
    ],
  },
  {
    id: "tools",
    number: "03",
    name: "MiCirql Tools",
    eyebrow: "Website inspection workspace",
    ...releaseState("tools"),
    statement: "Inspect an existing website without changing a Builder draft.",
    description:
      "Separate tools help inspect SEO structure, important journeys, typography, spacing, contrast and visual hierarchy. Tool status remains independent from Builder certification.",
    facts: TOOL_RELEASES.map((tool) => tool.name),
    actions: [
      {
        label: "Explore Tools",
        href: "https://tools.micirql.com/tools/",
        external: true,
      },
    ],
  },
  {
    id: "assisted",
    number: "04",
    name: "Assisted engineering",
    eyebrow: "Scoped product work",
    ...releaseState("assisted"),
    statement:
      "Custom product requirements stay custom—not disguised as automation.",
    description:
      "Custom websites, operational dashboards, product interfaces and backend requirements are scoped directly around the business problem and delivery boundary.",
    facts: ["Defined scope", "Explicit handoff", "No self-serve claim"],
    actions: [
      {
        label: "Discuss the work",
        href: "/#contact",
      },
    ],
  },
];

const releasePrinciples = [
  {
    number: "01",
    title: "State before promotion",
    body: "Live, certified, beta, validation and assisted work are labelled separately.",
  },
  {
    number: "02",
    title: "Evidence before claims",
    body: "Responsive, accessibility and workflow gates must support what a product page says.",
  },
  {
    number: "03",
    title: "Boundaries stay visible",
    body: "A local quality gate is not presented as a deployment or commercial release.",
  },
];

function Brand({ compact = false }) {
  return (
    <span className={`apps-brand${compact ? " apps-brand-compact" : ""}`}>
      <img src="/micirql-mark.svg" alt="" width="36" height="36" />
      <span>
        <strong>MiCirql</strong>
        {!compact ? <small>Products</small> : null}
      </span>
    </span>
  );
}

function ProductCard({ product }) {
  return (
    <article className={`product-card product-card-${product.tone}`}>
      <header>
        <span className="product-number" aria-hidden="true">
          {product.number}
        </span>
        <span className={`release-badge release-${product.tone}`}>
          {product.status}
        </span>
      </header>
      <div className="product-copy">
        <span className="product-eyebrow">{product.eyebrow}</span>
        <h2>{product.name}</h2>
        <p className="product-statement">{product.statement}</p>
        <p className="product-description">{product.description}</p>
      </div>
      <ul className="product-facts" aria-label={`${product.name} facts`}>
        {product.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <div className="product-actions">
        {product.actions.map((action, index) => (
          <a
            className={
              index === 0
                ? "product-action-primary"
                : "product-action-secondary"
            }
            href={action.href}
            key={action.label}
            rel={action.external ? "noreferrer" : undefined}
            target={action.external ? "_blank" : undefined}
          >
            {action.label}
            <span aria-hidden="true">{action.external ? "↗" : "→"}</span>
          </a>
        ))}
      </div>
    </article>
  );
}

function AppsPage() {
  return (
    <div className="apps-site">
      <a className="apps-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="apps-topbar">
        <a className="apps-home" href="/">
          <Brand />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#portfolio">Products</a>
          <a href="#release-standard">Release standard</a>
          <a href="/#contact">Contact</a>
          <a className="apps-nav-cta" href="https://builder.micirql.com/">
            Open Builder
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="apps-hero" aria-labelledby="apps-title">
          <div className="apps-hero-copy">
            <span className="apps-kicker">MICIRQL PRODUCT PORTFOLIO</span>
            <h1 id="apps-title">
              Products with a clear job—and a clear release state.
            </h1>
            <p>
              MiCirql builds focused software around real operational problems.
              CapDent is the flagship live product; Builder, Tools and assisted
              engineering each have a different role and readiness boundary.
            </p>
            <div className="apps-hero-actions">
              <a href="#portfolio">Explore the portfolio</a>
              <a href="/">How MiCirql builds websites</a>
            </div>
          </div>
          <aside
            className="release-ledger"
            aria-label="Current portfolio summary"
          >
            <span>Current portfolio</span>
            <dl>
              <div>
                <dt>Live flagship</dt>
                <dd>CapDent</dd>
              </div>
              <div>
                <dt>Certified packs</dt>
                <dd>{CERTIFIED_PACK_COUNT} industries</dd>
              </div>
              <div>
                <dt>Inspection workspace</dt>
                <dd>{releaseState("tools").status}</dd>
              </div>
              <div>
                <dt>Custom delivery</dt>
                <dd>{releaseState("assisted").status}</dd>
              </div>
            </dl>
            <small>
              Status is shown per product. It does not imply deployment.
            </small>
          </aside>
        </section>

        <section
          className="portfolio-section"
          id="portfolio"
          aria-labelledby="portfolio-title"
        >
          <div className="section-heading">
            <span className="apps-kicker">
              FOUR DISTINCT WAYS MICIRQL WORKS
            </span>
            <h2 id="portfolio-title">
              One company. No placeholder product cards.
            </h2>
            <p>
              Each surface is described by what can be verified today—not by a
              future roadmap presented as finished software.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </section>

        <section
          className="release-standard"
          id="release-standard"
          aria-labelledby="release-title"
        >
          <div className="release-standard-heading">
            <span className="apps-kicker">THE RELEASE STANDARD</span>
            <h2 id="release-title">A product earns its public language.</h2>
            <p>
              MiCirql keeps product identity, test evidence and commercial
              availability separate so the next step stays understandable.
            </p>
          </div>
          <ol>
            {releasePrinciples.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="apps-cta" aria-labelledby="apps-cta-title">
          <div>
            <span className="apps-kicker">START WITH THE RIGHT SURFACE</span>
            <h2 id="apps-cta-title">
              Build a certified website—or scope something custom.
            </h2>
          </div>
          <div>
            <a href="https://builder.micirql.com/">Open Builder</a>
            <a href="/#contact">Discuss a project</a>
          </div>
        </section>
      </main>

      <footer className="apps-footer">
        <a href="/">
          <Brand compact />
        </a>
        <p>Focused products, released with evidence.</p>
        <nav aria-label="Footer navigation">
          <a href="/">Website systems</a>
          <a href="https://tools.micirql.com/tools/">Tools</a>
          <a href="/#contact">Contact</a>
        </nav>
        <small>© 2026 MiCirql · India</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<AppsPage />);
