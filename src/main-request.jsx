import React from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import { ThreeHero } from './ThreeHero';
import './styles.css';
import './RequestForm.css';

const micirqlLogoUrl = 'https://pub-a30eed1be922456381eeec57b51e396a.r2.dev/brand/micirql.png';

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
  { label: 'Email', value: 'karthikraja826@gmail.com', icon: '↗', href: 'mailto:karthikraja826@gmail.com?subject=Project%20Request%20for%20Micirql', active: true },
  { label: 'WhatsApp', value: '+91 94415 81114', icon: '↗', href: 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.', active: true },
  { label: 'LinkedIn', value: 'Micirql company page', icon: '↗', href: 'https://www.linkedin.com/company/micirql/', active: true },
];

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

      <header className="navbar">
        <a className="brand brand-with-logo" href="#home" aria-label="Micirql home">
          <img className="brand-logo" src={micirqlLogoUrl} alt="Micirql" />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#work">What we build</a>
          <a href="/dental-management-system/">DMS Clinic</a>
          <a href="/apps/">Apps</a>
          <a href="/blogs/">Insights</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a project <span>↗</span></a>
      </header>

      <section id="home" className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> Independent product studio · India</div>
          <h1>We turn real-world friction into <span>digital momentum.</span></h1>
          <p>Micirql designs and builds focused software products for clinics, service businesses, and ambitious founders—combining sharp product thinking with reliable execution.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/dental-management-system/">Explore DMS Clinic <span>↗</span></a>
            <a className="text-button" href="#work">See our capabilities <span>↓</span></a>
          </div>
          <div className="hero-signal-row" aria-label="Studio strengths">
            <span><strong>01</strong> Founder-led</span>
            <span><strong>02</strong> Product-first</span>
            <span><strong>03</strong> Built to scale</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Interactive three-dimensional Micirql product core">
          <ThreeHero />
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
          <h2>DMS Clinic turns everyday dental work into one clear system.</h2>
          <p>Patient records, appointments, clinical photos, follow-ups, staff workflows, and billing—designed for practical clinic use without enterprise-level complexity.</p>
          <div className="feature-list">
            <span>Fast patient workflow</span>
            <span>Clinic team access</span>
            <span>Android-first experience</span>
            <span>Affordable by design</span>
          </div>
          <a className="primary-button" href="/dental-management-system/">Enter DMS Clinic <span>↗</span></a>
        </div>
        <div className="product-console" aria-hidden="true">
          <div className="console-top"><span>DMS / OPERATING SYSTEM</span><span className="console-live">● LIVE</span></div>
          <div className="console-grid">
            <div className="console-patient"><small>ACTIVE PATIENT</small><strong>Clinical workflow</strong><span>Record synced · Follow-up ready</span></div>
            <div className="console-orbit"><div className="orbit-center">DMS</div><i /><i /><i /></div>
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
        <div><a href="/blogs/">Insights</a><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
