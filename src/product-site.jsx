import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { RequestForm } from "./RequestForm";
import {
  CAPABILITY_RELEASES,
  INDUSTRY_RELEASES,
  RELEASE_STATUS,
  TOOL_RELEASES,
} from "./release-status";
import "./product-site.css";
import "./RequestForm.css";

const BUILDER_URL = "https://builder.micirql.com/";
const FEATURED_INDUSTRY_IDS = new Set([
  "clinic-dental",
  "clinic-physiotherapy",
  "restaurant-restaurant",
]);

const BUILDER_STAGES = [
  {
    number: "01",
    title: "Lock the business truth",
    description:
      "Industry, services, location, goals and exact brand assets become constraints before generation.",
  },
  {
    number: "02",
    title: "Compare certified directions",
    description:
      "Review responsive structures ranked for brief fit—not one visual style presented as universally better.",
  },
  {
    number: "03",
    title: "Refine the same project",
    description:
      "Edit pages and sections with responsive preview, undo and redo, plus visible saved or conflict state.",
  },
  {
    number: "04",
    title: "Check before release",
    description:
      "Review Search and SEO, functions, domain and publish readiness while the commercial boundary stays explicit.",
  },
];

const EDITOR_CAPABILITIES = [
  "Pages and sections",
  "Undo, redo and save status",
  "Mobile, tablet and desktop",
  "Exact logo and brand binding",
  "Search and SEO readiness",
  "Functions and publish checks",
];

const FAQS = [
  [
    "Which industries can I build today?",
    "Dental and Physiotherapy are certified. Restaurants are the next certification target, but remain unavailable in the Builder until that gate is complete.",
  ],
  [
    "Does Rank 1 mean the best-looking design?",
    "No. Rank means strongest fit for the supplied brief. Every direction in a certified pack must pass the same technical and visual checks.",
  ],
  [
    "Will MiCirql keep my logo and facts?",
    "Yes. Supplied facts and brand assets are constraints. An uploaded logo must resolve to the exact stored asset; it is not silently replaced with text.",
  ],
  [
    "Can I publish or export immediately?",
    "Publishing, export and production media storage are still in commercial validation. The website reports that boundary instead of presenting unfinished paths as generally available.",
  ],
];

function Logo({ compact = false }) {
  return (
    <a
      className="brand"
      href="#top"
      aria-label={compact ? "MiCirql home" : "MiCirql Website systems home"}
    >
      <img src="/micirql-mark.svg" alt="" width="34" height="34" />
      <span>MiCirql</span>
      {!compact ? <small aria-hidden="true">Website systems</small> : null}
    </a>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status status-${status}`}>{RELEASE_STATUS[status]}</span>
  );
}

function ProductScreenshot({
  desktop,
  mobile,
  alt,
  eager = false,
  mobileMedia = "(max-width: 640px)",
}) {
  return (
    <picture>
      <source media={mobileMedia} srcSet={mobile} />
      <img
        src={desktop}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const menuButtonRef = useRef(null);
  const industries = INDUSTRY_RELEASES.filter((industry) =>
    FEATURED_INDUSTRY_IDS.has(industry.id),
  );

  useEffect(() => {
    if (!menuOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="topbar">
        <Logo />
        <nav
          id="site-navigation"
          className={menuOpen ? "open" : ""}
          aria-label="Primary navigation"
        >
          <a href="#proof" onClick={closeMenu}>
            Proof
          </a>
          <a href="#workflow" onClick={closeMenu}>
            How it works
          </a>
          <a href="#industries" onClick={closeMenu}>
            Industries
          </a>
          <a href="#tools" onClick={closeMenu}>
            Tools
          </a>
          <a href="#status" onClick={closeMenu}>
            Status
          </a>
          <a className="nav-login" href={BUILDER_URL}>
            Sign in
          </a>
          <a className="nav-cta" href={BUILDER_URL}>
            Open Builder
          </a>
        </nav>
        <button
          ref={menuButtonRef}
          className="menu"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <i /> Dental + Physiotherapy certified
            </div>
            <h1 id="hero-title">
              A website shaped by your industry.{" "}
              <em>Not by a generic template.</em>
            </h1>
            <p>
              MiCirql turns verified business facts into ranked, responsive
              website directions—then keeps the same project ready for editing
              and release checks.
            </p>
            <div className="hero-actions">
              <a className="primary" href={BUILDER_URL}>
                Start a certified website <span aria-hidden="true">↗</span>
              </a>
              <a className="secondary" href="#proof">
                See the product proof
              </a>
            </div>
            <dl
              className="outcome-strip"
              aria-label="Current certified product evidence"
            >
              <div>
                <dt>40</dt>
                <dd>certified directions</dd>
              </div>
              <div>
                <dt>2</dt>
                <dd>independent industry packs</dd>
              </div>
              <div>
                <dt>5</dt>
                <dd>responsive widths checked</dd>
              </div>
              <div>
                <dt>Exact</dt>
                <dd>supplied facts and logo</dd>
              </div>
            </dl>
          </div>

          <figure className="hero-product-shot">
            <div className="shot-toolbar">
              <Logo compact />
              <span>Actual Builder QA capture</span>
            </div>
            <div className="shot-window shot-window-brief">
              <ProductScreenshot
                desktop="/product-proof/builder-brief-desktop.png"
                mobile="/product-proof/builder-brief-mobile.png"
                alt="MiCirql Builder business brief review screen for a Dental project"
                eager
              />
            </div>
            <figcaption>
              01 · Structured brief · exact inputs · review before generation
            </figcaption>
          </figure>
        </section>

        <section
          className="proof-band"
          id="proof"
          aria-labelledby="proof-title"
        >
          <div className="proof-copy">
            <div className="section-kicker">REAL PRODUCT PROOF</div>
            <h2 id="proof-title">
              Choose with evidence, not a thumbnail guess.
            </h2>
            <p>
              The Builder shows ranked directions in responsive previews before
              a full site is created. Recommendation means brief fit—not that
              one visual style is universally better.
            </p>
            <ul>
              <li>Four directions compared at a time</li>
              <li>Mobile, tablet and desktop views</li>
              <li>Supplied facts and brand kept constant</li>
            </ul>
          </div>
          <figure className="review-shot">
            <div className="shot-window shot-window-review">
              <ProductScreenshot
                desktop="/product-proof/design-review-desktop.png"
                mobile="/product-proof/design-review-mobile.png"
                alt="MiCirql design review showing four ranked Dental website directions"
              />
            </div>
            <figcaption>
              02 · Certified Dental design review · ranks 1–4 of 20
            </figcaption>
          </figure>
        </section>

        <section
          className="section workflow"
          id="workflow"
          aria-labelledby="workflow-title"
        >
          <div className="section-heading">
            <div className="section-kicker">INSIDE THE ACTUAL BUILDER</div>
            <h2 id="workflow-title">
              Brief to editor, without losing the business truth.
            </h2>
            <p>
              The selected direction stays inside one project. Product controls
              remain consistent while each certified industry keeps its own
              anatomy, conversion journey and responsive behavior.
            </p>
          </div>
          <p className="sequence-swipe-note">
            Swipe through all four Builder stages →
          </p>
          <ol
            className="builder-stage-rail"
            aria-label="MiCirql Builder workflow"
            tabIndex="0"
          >
            {BUILDER_STAGES.map((stage) => (
              <li key={stage.number}>
                <span>{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>

          <div className="editor-proof">
            <div className="editor-proof-copy">
              <div className="section-kicker">03 · ACTUAL EDITOR EVIDENCE</div>
              <h3>Edit the selected site—not a disconnected mockup.</h3>
              <p>
                Choose a page or section, inspect the generated site at three
                responsive sizes and keep the project state visible while you
                work.
              </p>
              <ul>
                {EDITOR_CAPABILITIES.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <small>
                Editor and readiness gates pass locally. Deployment and general
                commercial publishing remain in validation.
              </small>
            </div>
            <figure className="editor-shot">
              <div className="shot-window shot-window-editor">
                <ProductScreenshot
                  desktop="/product-proof/builder-editor-desktop.png"
                  mobile="/product-proof/builder-editor-mobile.png"
                  alt="MiCirql Builder editor showing page and section controls with a responsive Radhika Dental preview"
                  mobileMedia="(max-width: 640px)"
                />
              </div>
              <figcaption>
                03 · Actual Builder editor QA capture · responsive preview
                selected
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className="section industries"
          id="industries"
          aria-labelledby="industries-title"
        >
          <div className="section-heading compact">
            <div className="section-kicker">ONE INDUSTRY AT A TIME</div>
            <h2 id="industries-title">
              Certified only after the full system passes.
            </h2>
            <p>
              A new industry does not enter the Builder until its own
              structures, journeys, imagery and responsive gates are complete.
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((industry, index) => (
              <article
                key={industry.id}
                className={`industry-card industry-${industry.status}`}
              >
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <StatusBadge status={industry.status} />
                </header>
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
                {industry.status === "certified" ? (
                  <a href={BUILDER_URL}>
                    Build with this pack <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <small>Next certification target · not selectable yet</small>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          className="section products"
          id="tools"
          aria-labelledby="products-title"
        >
          <div className="section-heading inverse">
            <div className="section-kicker">
              THREE WAYS TO WORK WITH MICIRQL
            </div>
            <h2 id="products-title">
              Build, inspect, or scope the work together.
            </h2>
            <p>
              These are related products with different jobs. Only verified tool
              routes are linked here.
            </p>
          </div>
          <div className="product-family">
            <article className="family-card family-builder">
              <div>
                <span>01</span>
                <StatusBadge status="validation" />
              </div>
              <h3>Builder</h3>
              <p>
                Create a certified Dental or Physiotherapy website from a
                structured brief, ranked directions and one editable project.
              </p>
              <a href={BUILDER_URL}>
                Open Builder <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="family-card family-tools">
              <div>
                <span>02</span>
                <StatusBadge status="beta" />
              </div>
              <h3>Tools</h3>
              <p>
                Inspect an existing website in a separate workspace. These beta
                tools do not modify a Builder draft.
              </p>
              <div className="tool-list">
                {TOOL_RELEASES.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <strong>{tool.name}</strong>
                      <small>{tool.description}</small>
                    </span>
                    <em aria-hidden="true">↗</em>
                  </a>
                ))}
              </div>
            </article>

            <article className="family-card family-assisted">
              <div>
                <span>03</span>
                <StatusBadge status="assisted" />
              </div>
              <h3>Assisted engineering</h3>
              <p>
                Custom websites, product work and backend requirements are
                scoped directly. They are not presented as automatic Builder
                features.
              </p>
              <a href="#contact">
                Discuss a scoped project <span aria-hidden="true">↓</span>
              </a>
            </article>
          </div>
        </section>

        <section
          className="section evidence"
          id="status"
          aria-labelledby="status-title"
        >
          <div className="status-heading">
            <div className="section-kicker">EVIDENCE-BACKED STATUS</div>
            <h2 id="status-title">
              What is ready—and what is still being proven.
            </h2>
            <p>
              Local quality gates are not the same as a commercial release.
              MiCirql keeps that boundary visible.
            </p>
          </div>
          <div className="status-list">
            {CAPABILITY_RELEASES.map((capability) => (
              <article key={capability.name}>
                <div>
                  <h3>{capability.name}</h3>
                  <StatusBadge status={capability.status} />
                </div>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section faq-contact" id="contact">
          <div className="faq-panel" id="faq">
            <div className="section-kicker">FAQ</div>
            <h2>Know the boundary before you start.</h2>
            <div className="faq-list">
              {FAQS.map(([question, answer], index) => {
                const expanded = openFaq === index;
                const answerId = `faq-answer-${index}`;
                return (
                  <article key={question}>
                    <button
                      type="button"
                      aria-controls={answerId}
                      aria-expanded={expanded}
                      onClick={() => setOpenFaq(expanded ? -1 : index)}
                    >
                      <span>{question}</span>
                      <em aria-hidden="true">{expanded ? "−" : "+"}</em>
                    </button>
                    {expanded ? <p id={answerId}>{answer}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>

          <div className="contact-panel">
            <div className="section-kicker">START WITH THE TRUTH</div>
            <h2>Build a certified clinic site—or scope something custom.</h2>
            <p>
              Use Builder for Dental or Physiotherapy. For the next industry or
              a custom product, tell us what must work.
            </p>
            <RequestForm />
          </div>
        </section>
      </main>

      <footer>
        <Logo />
        <p>Industry-specific website systems, released with evidence.</p>
        <nav aria-label="Footer navigation">
          <a href={BUILDER_URL}>Builder</a>
          <a href="#tools">Tools</a>
          <a href="#status">Status</a>
          <a href="mailto:support@micirql.com">Contact</a>
        </nav>
        <small>© 2026 MiCirql · India</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
