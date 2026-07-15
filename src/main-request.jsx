import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './hero-polish.css';
import './RequestForm.css';

const micirqlLogoUrl = 'https://pub-a30eed1be922456381eeec57b51e396a.r2.dev/brand/micirql.png';

const navItems = [
  { label: 'What we build', href: '#work' },
  { label: 'CapDent', href: '/capdent/' },
  { label: 'Apps', href: '/apps/' },
  { label: 'Blogs', href: '/blogs/' },
];

const capabilities = [
  {
    number: '01',
    title: 'Product engineering',
    description: 'Focused Android apps and web products shaped around the real workflow, not a generic template.',
    tags: ['React', 'Expo', 'Supabase'],
  },
  {
    number: '02',
    title: 'Operational systems',
    description: 'Dashboards, clinic software, internal tools, and automation that remove repetitive work.',
    tags: ['Dashboards', 'Cloud', 'Automation'],
  },
  {
    number: '03',
    title: 'Digital presence',
    description: 'High-conversion landing pages and company websites with speed, clarity, and strong visual identity.',
    tags: ['Web', 'SEO', 'Brand'],
  },
];

const process = [
  ['Discover', 'Understand the people, bottlenecks, and business outcome before choosing technology.'],
  ['Prototype', 'Turn the workflow into a clear, testable product experience without unnecessary complexity.'],
  ['Build & evolve', 'Ship a reliable first version, measure real usage, and improve the system continuously.'],
];

const contactLinks = [
  { label: 'Email', value: 'karthikraja826@gmail.com', icon: '↗', href: 'mailto:karthikraja826@gmail.com?subject=Project%20Request%20for%20Micirql' },
  { label: 'WhatsApp', value: '+91 94415 81114', icon: '↗', href: 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.' },
  { label: 'LinkedIn', value: 'Micirql company page', icon: '↗', href: 'https://www.linkedin.com/company/micirql/' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.toggle('menu-open', menuOpen);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <a className="brand brand-with-logo" href="#home" aria-label="Micirql home" onClick={closeMenu}>
          <img className="brand-logo" src={micirqlLogoUrl} alt="Micirql" />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>

        <a className="nav-cta desktop-nav-cta" href="#contact">Start a project <span>↗</span></a>

        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu-backdrop${menuOpen ? ' is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <nav id="mobile-navigation" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-menu-label">Navigate / Micirql</div>
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <a href={item.href} key={item.label} onClick={closeMenu}>
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <i>↗</i>
            </a>
          ))}
        </div>
        <a className="mobile-menu-cta" href="#contact" onClick={closeMenu}>Start a project <span>↗</span></a>
        <p>Focused Android apps, clinic systems, dashboards and websites built around real workflows.</p>
      </nav>
    </>
  );
}

function HeroSystemBoard() {
  return (
    <div className="studio-board" aria-label="Micirql product studio workflow preview">
      <div className="studio-board-top">
        <div><span className="board-live-dot" /> MICIRQL / PRODUCT SYSTEM</div>
        <strong>ACTIVE</strong>
      </div>

      <div className="studio-board-grid">
        <section className="board-primary-card">
          <div className="board-card-label">Current focus</div>
          <h2>Turn a real bottleneck into a product people can use.</h2>
          <div className="board-flow" aria-label="Product workflow">
            <div><span>01</span><strong>Problem</strong><small>Observe the daily friction</small></div>
            <i>→</i>
            <div><span>02</span><strong>System</strong><small>Design the simplest useful flow</small></div>
            <i>→</i>
            <div><span>03</span><strong>Outcome</strong><small>Ship, learn and improve</small></div>
          </div>
        </section>

        <a className="board-product-card" href="/capdent/">
          <div className="board-card-label">Flagship product</div>
          <strong>CapDent</strong>
          <p>Dental clinic workflow, records, payments and follow-ups in one focused Android product.</p>
          <span>Explore product ↗</span>
        </a>

        <div className="board-metric-card">
          <div className="board-card-label">Build principle</div>
          <strong>Clarity first.</strong>
          <p>Fewer screens. Faster actions. Better decisions.</p>
        </div>

        <div className="board-stack-card">
          <div className="board-card-label">Delivery stack</div>
          <div><span>Android</span><span>Web</span><span>Cloud</span><span>SEO</span></div>
        </div>
      </div>

      <div className="board-status-row">
        <span><i /> Founder-led</span>
        <span><i /> Product-first</span>
        <span><i /> Built for real use</span>
      </div>
    </div>
  );
}

function CapabilityCard({ item }) {
  return (
    <article className="capability-card interactive-panel">
      <div className="card-index">{item.number}</div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}

function ClientCard({ client, index }) {
  const href = `https://${client.website.replace(/^https?:\/\//, '')}`;
  return (
    <a className="client-card interactive-panel" href={href} target="_blank" rel="noreferrer">
      <div className="client-card-top">
        <span className="client-number">0{index + 1}</span>
        <span className="client-arrow">↗</span>
      </div>
      <div className="client-meta">{client.status}</div>
      <h3>{client.name}</h3>
      <p>{client.description}</p>
      <span className="client-url">{client.website}</span>
    </a>
  );
}

function ContactLinks() {
  return (
    <div className="quick-contact-grid">
      {contactLinks.map((link) => (
        <a className="quick-contact-card" href={link.href} key={link.label} target="_blank" rel="noreferrer">
          <span><strong>{link.label}</strong><small>{link.value}</small></span>
          <span className="quick-contact-icon">{link.icon}</span>
        </a>
      ))}
    </div>
  );
}

function App() {
  return (
    <main>
      <div className="page-noise" aria-hidden="true" />
      <Navbar />

      <section id="home" className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> Independent product studio · India</div>
          <h1>Useful software starts with a <span>clearer problem.</span></h1>
          <p>Micirql turns real operational friction into focused Android apps, clinic systems, dashboards and websites—designed for people who need the product to work every day.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/capdent/">Explore CapDent <span>↗</span></a>
            <a className="text-button" href="#work">See what we build <span>↓</span></a>
          </div>
          <div className="hero-signal-row" aria-label="Studio strengths">
            <span><strong>01</strong> Founder-led</span>
            <span><strong>02</strong> Workflow-first</span>
            <span><strong>03</strong> Built to evolve</span>
          </div>
        </div>

        <div className="hero-visual">
          <HeroSystemBoard />
        </div>
      </section>

      <section className="signal-strip" aria-label="Services">
        <div className="signal-track">
          <span>ANDROID PRODUCTS</span><i>✦</i><span>CLINIC SYSTEMS</span><i>✦</i><span>BUSINESS DASHBOARDS</span><i>✦</i><span>STARTUP MVPs</span><i>✦</i><span>HIGH-IMPACT WEBSITES</span>
        </div>
      </section>

      <section id="work" className="section shell">
        <div className="section-kicker">Capabilities / 2026</div>
        <div className="section-intro">
          <h2>One studio.<br />Three layers of impact.</h2>
          <p>From the first product decision to the final interface, every layer is designed to make the business simpler, faster, and more valuable.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => <CapabilityCard item={item} key={item.number} />)}
        </div>
      </section>

      <section className="product-feature shell">
        <div className="product-copy">
          <div className="section-kicker">Flagship product</div>
          <h2>CapDent turns everyday dental work into one clear system.</h2>
          <p>Patient records, appointments, clinical photos, follow-ups, staff workflows, and payments—designed for practical clinic use without enterprise-level complexity.</p>
          <div className="feature-list">
            <span>Fast patient workflow</span>
            <span>Role-based clinic access</span>
            <span>Android-first experience</span>
            <span>Free plan available</span>
          </div>
          <a className="primary-button" href="/capdent/">Enter CapDent <span>↗</span></a>
        </div>
        <div className="product-console" aria-hidden="true">
          <div className="console-top"><span>CAPDENT / CLINIC CONTROL</span><span className="console-live">● LIVE</span></div>
          <div className="console-grid">
            <div className="console-patient"><small>ACTIVE PATIENT</small><strong>Clinical workflow</strong><span>Record synced · Follow-up ready</span></div>
            <div className="console-orbit"><div className="orbit-center">CD</div><i /><i /><i /></div>
            <div className="console-metric"><small>WORKFLOW</small><strong>01:42</strong><span>Average focused action</span></div>
            <div className="console-metric"><small>STATUS</small><strong>READY</strong><span>Built for daily clinic use</span></div>
          </div>
        </div>
      </section>

      <section className="section shell process-section">
        <div className="section-kicker">How we work</div>
        <div className="section-intro compact">
          <h2>Clarity before code.</h2>
          <p>Technology is only useful when the product logic is right. Our process keeps every decision tied to a real outcome.</p>
        </div>
        <div className="process-grid">
          {process.map(([title, description], index) => (
            <article className="process-step" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="clients" className="section shell clients-section">
        <div className="section-kicker">Selected work</div>
        <div className="section-intro">
          <h2>Built across different business realities.</h2>
          <p>Every client is different. The common thread is a focused digital experience that communicates clearly and performs reliably.</p>
        </div>
        <div className="clients-grid">
          {clients.map((client, index) => <ClientCard client={client} index={index} key={client.name} />)}
        </div>
      </section>

      <section id="contact" className="contact-section shell">
        <div className="contact-dashboard">
          <div className="contact-copy">
            <div>
              <div className="section-kicker">Start a project</div>
              <h2>Bring the problem.<br /><span>We will shape the product.</span></h2>
              <p>Share your idea, current workflow, or business bottleneck. You will speak directly with the person designing and building the solution.</p>
            </div>
            <ContactLinks />
          </div>
          <div className="contact-action-panel">
            <div className="form-heading"><span>PROJECT INTAKE</span><small>Usually replies directly</small></div>
            <RequestForm />
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <img src={micirqlLogoUrl} alt="Micirql" />
        <p>Problem-focused digital products, built with intent.</p>
        <div><a href="/blogs/">Blogs</a><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
