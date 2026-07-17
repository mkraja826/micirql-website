import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

const capDentUrl = 'https://capdent.micirql.com/';
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.dms.clinic';

const navItems = [
  { label: 'Products', href: '#products' },
  { label: 'Company', href: '#vision' },
  { label: 'Work', href: '#work' },
  { label: 'Careers', href: '#careers' },
  { label: 'Journal', href: '/blogs/' },
];

const operatingPrinciples = [
  ['01', 'Start with the operation', 'The workflow, pressure points and decisions come before screens or technology.'],
  ['02', 'Build the smallest complete system', 'We remove decorative complexity and keep the actions that make the product useful every day.'],
  ['03', 'Release, observe, improve', 'A product earns its next feature through real use—not through a speculative feature list.'],
];

const capabilityRows = [
  {
    label: 'Android product engineering',
    detail: 'Product architecture, interaction design, Expo and React Native development, release engineering and Play Store readiness.',
    code: '01 / CORE',
  },
  {
    label: 'Operational software',
    detail: 'Role-based systems, dashboards, approvals, records, reporting and automation for teams replacing fragmented workflows.',
    code: '02 / SYSTEMS',
  },
  {
    label: 'Product websites',
    detail: 'Company and product websites that establish credibility, explain the product clearly and create a durable SEO foundation.',
    code: '03 / WEB',
  },
];

function Brand({ compact = false }) {
  return (
    <span className={`brand-lockup${compact ? ' compact' : ''}`}>
      <img src="/micirql-mark.svg" width="44" height="44" alt="" />
      <span><strong>Micirql</strong><small>Android software company</small></span>
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <a href="#home" aria-label="Micirql home" onClick={close}><Brand compact /></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="product-link" href={capDentUrl}>CapDent <Arrow /></a>
            <a className="button button-light desktop-cta" href="#contact">Start a conversation</a>
            <button
              className={`menu-toggle${open ? ' is-open' : ''}`}
              type="button"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`menu-backdrop${open ? ' is-open' : ''}`} aria-hidden="true" onClick={close} />
      <nav id="mobile-navigation" className={`mobile-nav${open ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-nav-head"><Brand compact /><span>Menu</span></div>
        <div className="mobile-nav-links">
          {navItems.map((item, index) => (
            <a key={item.label} href={item.href} onClick={close}>
              <small>0{index + 1}</small><strong>{item.label}</strong><Arrow />
            </a>
          ))}
        </div>
        <div className="mobile-nav-actions">
          <a className="button button-outline" href={capDentUrl} onClick={close}>Explore CapDent</a>
          <a className="button button-primary" href="#contact" onClick={close}>Start a conversation</a>
        </div>
      </nav>
    </>
  );
}

function PortfolioLedger() {
  return (
    <div className="portfolio-ledger" aria-label="Micirql product portfolio">
      <div className="ledger-head"><span>MICIRQL / PRODUCT LEDGER</span><strong>2026—</strong></div>
      <a className="ledger-product live" href={capDentUrl}>
        <div><small>01 · LIVE</small><strong>CapDent</strong><p>Dental clinic management for patients, treatments, payments and daily workflow.</p></div>
        <span className="ledger-arrow">↗</span>
      </a>
      <div className="ledger-product future">
        <div><small>02 · IN DEVELOPMENT</small><strong>Operational product</strong><p>A focused system being shaped around another recurring business workflow.</p></div>
        <span className="ledger-state">PRIVATE</span>
      </div>
      <div className="ledger-product reserved">
        <div><small>03 · RESERVED</small><strong>Future Android product</strong><p>Micirql is being built to support a portfolio, not a single application.</p></div>
        <span className="ledger-state">NEXT</span>
      </div>
      <div className="ledger-foot"><span>Founder-led</span><span>Android-first</span><span>Portfolio-minded</span></div>
    </div>
  );
}

function DeviceMockups() {
  return (
    <div className="device-cluster" aria-label="CapDent Android product interface mockups">
      <div className="device device-left">
        <div className="device-speaker" />
        <div className="device-screen">
          <div className="app-top"><span>CapDent</span><i>•••</i></div>
          <div className="app-greeting"><small>OWNER OVERVIEW</small><strong>Good morning, Doctor</strong><span>Wednesday · 17 July</span></div>
          <div className="app-stat-grid"><div><small>Waiting</small><strong>06</strong></div><div><small>Today</small><strong>18</strong></div><div><small>Pending</small><strong>₹18.4k</strong></div><div><small>Collected</small><strong>₹42.6k</strong></div></div>
          <div className="app-section-title"><strong>Patient queue</strong><span>View all</span></div>
          <div className="app-row"><i>AM</i><span><strong>Anita M.</strong><small>Root canal · Sitting 2</small></span><b>Ready</b></div>
          <div className="app-row"><i>RV</i><span><strong>Rahul V.</strong><small>Review appointment</small></span><b>Waiting</b></div>
        </div>
      </div>
      <div className="device device-main">
        <div className="device-speaker" />
        <div className="device-screen">
          <div className="app-top"><span>Patient record</span><i>•••</i></div>
          <div className="patient-card"><i>SP</i><div><strong>Shreya P.</strong><span>Patient ID · CD-0248</span></div><b>Active</b></div>
          <div className="patient-meta"><div><small>Last visit</small><strong>12 Jul</strong></div><div><small>Balance</small><strong>₹4,500</strong></div><div><small>Next sitting</small><strong>19 Jul</strong></div></div>
          <div className="app-section-title"><strong>Ongoing treatment</strong><span>Details</span></div>
          <div className="treatment-card"><small>TOOTH 26</small><strong>Root canal treatment</strong><span>2 of 3 sittings completed</span><div><i style={{ width: '67%' }} /></div></div>
          <div className="app-section-title"><strong>Recent activity</strong><span>All</span></div>
          <div className="timeline"><article><i /><span><strong>Payment recorded</strong><small>₹2,500 · Today</small></span></article><article><i /><span><strong>Clinical photo added</strong><small>12 July</small></span></article></div>
        </div>
      </div>
      <div className="device device-right">
        <div className="device-speaker" />
        <div className="device-screen">
          <div className="app-top"><span>Payments</span><i>•••</i></div>
          <div className="payment-total"><small>THIS MONTH</small><strong>₹96,800</strong><span>Collected across 74 payments</span></div>
          <div className="payment-bars"><div><span>Consultation</span><i><b style={{ width: '82%' }} /></i><strong>₹31.2k</strong></div><div><span>Treatments</span><i><b style={{ width: '64%' }} /></i><strong>₹48.4k</strong></div><div><span>Other</span><i><b style={{ width: '31%' }} /></i><strong>₹17.2k</strong></div></div>
          <div className="app-section-title"><strong>Pending dues</strong><span>4 patients</span></div>
          <div className="due-row"><span><strong>Rohan K.</strong><small>Due 18 Jul</small></span><b>₹6,500</b></div>
          <div className="due-row"><span><strong>Meera S.</strong><small>Due 20 Jul</small></span><b>₹4,000</b></div>
        </div>
      </div>
      <p className="mockup-note">Product interface mockups use fictional demonstration data.</p>
    </div>
  );
}

function WorkCard({ client, index }) {
  const href = `https://${client.website.replace(/^https?:\/\//, '')}`;
  return (
    <a className="work-row" href={href} target="_blank" rel="noreferrer">
      <span className="work-index">0{index + 1}</span>
      <div><small>{client.status}</small><strong>{client.name}</strong></div>
      <p>{client.description}</p>
      <Arrow />
    </a>
  );
}

function ContactLinks() {
  const links = [
    ['Email', 'support@micirql.com', 'mailto:support@micirql.com?subject=Project%20Request%20for%20Micirql'],
    ['WhatsApp', '+91 94415 81114', 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.'],
    ['LinkedIn', 'Micirql company page', 'https://www.linkedin.com/company/micirql/'],
  ];
  return <div className="quick-contact-grid">{links.map(([label, value, href]) => <a className="quick-contact-card" key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><span><strong>{label}</strong><small>{value}</small></span><Arrow /></a>)}</div>;
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Independent Android software company · India</p>
              <h1>We build Android software with a <em>longer horizon.</em></h1>
              <p className="hero-intro">Micirql turns recurring operational problems into focused products people can rely on every day. CapDent is the first live proof—not the limit of the company.</p>
              <div className="hero-actions"><a className="button button-primary" href="#products">View the portfolio <Arrow /></a><a className="button button-outline" href="#vision">Read the vision</a></div>
              <div className="hero-footnote"><span>01 · ANDROID-FIRST</span><span>02 · WORKFLOW-LED</span><span>03 · BUILT TO COMPOUND</span></div>
            </div>
            <PortfolioLedger />
          </div>
        </section>

        <section className="signal-line" aria-label="Micirql capabilities"><div className="container"><span>PRODUCT STRATEGY</span><i>+</i><span>ANDROID ENGINEERING</span><i>+</i><span>OPERATIONAL SYSTEMS</span><i>+</i><span>PRODUCT WEBSITES</span></div></section>

        <section className="section product-section" id="products">
          <div className="container">
            <div className="section-heading asymmetric"><div><p className="eyebrow amber">Flagship product · Live</p><h2>CapDent proves the operating model.</h2></div><p>One focused product, built from a real clinic workflow and improved around daily use. It demonstrates how Micirql approaches specialised software without defining the entire company.</p></div>
            <div className="capdent-showcase">
              <div className="capdent-copy">
                <span className="product-badge">CAPDENT / ANDROID</span>
                <h3>Dental clinic management without enterprise complexity.</h3>
                <p>Patient records, appointments, treatments, payments, pending dues, follow-ups, clinical files and staff workflows in one practical system.</p>
                <ul><li>Owner, doctor and receptionist workflows</li><li>All current clinic-management features free</li><li>1 GB cloud storage included</li></ul>
                <div className="product-actions"><a className="button capdent-button" href={capDentUrl}>Explore CapDent <Arrow /></a><a className="text-link" href={playStoreUrl} target="_blank" rel="noreferrer">Google Play ↗</a></div>
              </div>
              <DeviceMockups />
            </div>
          </div>
        </section>

        <section className="section capabilities-section">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">What Micirql builds</p><h2>Products, systems and the infrastructure around them.</h2></div><p>Micirql can take responsibility from problem definition through interface, engineering, release and the digital presence that helps the product earn trust.</p></div>
            <div className="capability-list">{capabilityRows.map((item) => <article key={item.code}><span>{item.code}</span><h3>{item.label}</h3><p>{item.detail}</p><i>↗</i></article>)}</div>
          </div>
        </section>

        <section className="section vision-section" id="vision">
          <div className="container vision-layout">
            <div className="vision-statement"><p className="eyebrow amber">Company / Vision</p><h2>Build once. Learn deeply. Let every product make the next one stronger.</h2></div>
            <div className="vision-copy">
              <p className="lead">Micirql began by solving a real operational problem inside a dental clinic. That became CapDent.</p>
              <p>The larger ambition is to build a portfolio of focused Android products, each serving a specific workflow and each contributing reusable knowledge in product design, authentication, cloud systems, operations, distribution and support.</p>
              <p>Founder Karthik Raja remains directly involved in product decisions, interface design and engineering. The company is intentionally small today and designed to become a disciplined multi-product software business over time.</p>
              <div className="principle-list">{operatingPrinciples.map(([number, title, description]) => <article key={number}><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}</div>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Proof across different business contexts.</h2></div><p>Before and alongside its own products, Micirql has designed digital platforms for staffing, software and healthcare businesses.</p></div>
            <div className="work-list">{clients.map((client, index) => <WorkCard client={client} index={index} key={client.name} />)}</div>
          </div>
        </section>

        <section className="section careers-section" id="careers">
          <div className="container careers-layout">
            <div><p className="eyebrow amber">Careers / Future team</p><h2>Small team now. Serious product ambition.</h2></div>
            <div><p>Micirql is not hiring at scale yet. We are building the product foundation first and staying open to people who care about Android craft, product clarity and software that serves real work.</p><a className="button button-outline" href="mailto:support@micirql.com?subject=Working%20with%20Micirql">Introduce yourself <Arrow /></a></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy"><p className="eyebrow amber">Contact</p><h2>Bring the workflow, not a list of features.</h2><p>Tell us what repeatedly goes wrong, takes too long or depends on one person remembering everything. That is where useful software begins.</p><ContactLinks /></div>
            <div className="contact-form-panel"><div className="form-heading"><span>PROJECT ENQUIRY</span><small>Direct founder response</small></div><RequestForm /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-layout"><div><Brand /><p>Focused Android software and operational products.</p></div><div className="footer-links"><a href={capDentUrl}>CapDent</a><a href="/apps/">Apps</a><a href="/blogs/">Journal</a><a href="#home">Top ↑</a></div><small>© 2026 Micirql · Founder-led Android software company, India.</small></div></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
