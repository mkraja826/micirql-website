import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

const capDentUrl = 'https://capdent.micirql.com/';

const navItems = [
  { label: 'Company', href: '#company' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Products', href: '#products' },
  { label: 'Work', href: '#work' },
  { label: 'Insights', href: '/blogs/' },
];

const capabilities = [
  {
    number: '01',
    title: 'Product engineering',
    description: 'Android and web products designed around the actual work people need to complete every day.',
    detail: 'Product strategy · UX architecture · Application development',
  },
  {
    number: '02',
    title: 'Operational systems',
    description: 'Clinic software, internal platforms and business dashboards that bring scattered work into one reliable system.',
    detail: 'Workflow design · Role-based access · Reporting',
  },
  {
    number: '03',
    title: 'Digital platforms',
    description: 'Professional websites and customer-facing platforms built for credibility, clarity, performance and growth.',
    detail: 'Corporate websites · SEO foundations · Conversion design',
  },
];

const deliverySteps = [
  {
    number: '01',
    title: 'Understand the operation',
    description: 'We map the people, decisions, information and friction before deciding what should be built.',
  },
  {
    number: '02',
    title: 'Design the useful system',
    description: 'We reduce the workflow to a clear product structure, test the critical paths and remove unnecessary complexity.',
  },
  {
    number: '03',
    title: 'Build and evolve',
    description: 'We ship a dependable first version, observe real use and improve the product around evidence rather than assumptions.',
  },
];

const contactLinks = [
  {
    label: 'Email',
    value: 'support@micirql.com',
    href: 'mailto:support@micirql.com?subject=Project%20Request%20for%20Micirql',
  },
  {
    label: 'WhatsApp',
    value: '+91 94415 81114',
    href: 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.',
  },
  {
    label: 'LinkedIn',
    value: 'Micirql company page',
    href: 'https://www.linkedin.com/company/micirql/',
  },
];

function Brand({ footer = false }) {
  return (
    <span className={`brand-lockup${footer ? ' footer-brand' : ''}`}>
      <img src="/micirql-mark.svg" alt="" width="42" height="42" />
      <span>
        <strong>Micirql</strong>
        {footer ? <small>Product & engineering company</small> : null}
      </span>
    </span>
  );
}

function Arrow({ direction = 'right' }) {
  return <span aria-hidden="true">{direction === 'down' ? '↓' : '↗'}</span>;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', closeWithEscape);
    document.body.classList.toggle('menu-open', menuOpen);

    return () => {
      document.removeEventListener('keydown', closeWithEscape);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand-link" href="#home" aria-label="Micirql home" onClick={closeMenu}>
            <Brand />
          </a>

          <nav className="desktop-navigation" aria-label="Primary navigation">
            {navItems.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>

          <div className="nav-actions">
            <a className="nav-product-link" href={capDentUrl}>CapDent</a>
            <a className="button button-dark desktop-contact" href="#contact">Start a project</a>
            <button
              className={`menu-button${menuOpen ? ' is-open' : ''}`}
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-backdrop${menuOpen ? ' is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <nav id="mobile-menu" className={`mobile-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-menu-heading"><span>Micirql</span><small>Navigate</small></div>
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <a href={item.href} key={item.label} onClick={closeMenu}>
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <Arrow />
            </a>
          ))}
        </div>
        <div className="mobile-menu-actions">
          <a className="button button-outline" href={capDentUrl} onClick={closeMenu}>Explore CapDent</a>
          <a className="button button-primary" href="#contact" onClick={closeMenu}>Start a project</a>
        </div>
      </nav>
    </>
  );
}

function CompanyOverview() {
  return (
    <div className="company-overview" aria-label="Micirql company overview">
      <div className="overview-header">
        <span>Micirql / Company overview</span>
        <strong>India</strong>
      </div>

      <section className="overview-primary">
        <p className="panel-label">What we build</p>
        <h2>Products and systems that make daily work clearer.</h2>
        <p>From a clinic workflow to a company website, the objective stays the same: reduce friction and create a dependable operating experience.</p>
      </section>

      <div className="overview-grid">
        <a className="overview-card product-card" href={capDentUrl}>
          <span className="panel-label">Flagship product</span>
          <strong>CapDent</strong>
          <p>Dental clinic management for patients, treatments, payments and follow-ups.</p>
          <span className="card-link">View product <Arrow /></span>
        </a>
        <div className="overview-card">
          <span className="panel-label">Delivery</span>
          <strong>Android · Web · Cloud</strong>
          <p>One accountable product partner from workflow definition to production release.</p>
        </div>
        <div className="overview-card">
          <span className="panel-label">Operating principle</span>
          <strong>Clarity before complexity</strong>
          <p>Every feature must solve a real task, support a decision or remove repeated work.</p>
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({ item }) {
  return (
    <article className="capability-card">
      <div className="capability-number">{item.number}</div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <small>{item.detail}</small>
    </article>
  );
}

function ClientCard({ client, index }) {
  const href = `https://${client.website.replace(/^https?:\/\//, '')}`;
  return (
    <a className="client-card" href={href} target="_blank" rel="noreferrer">
      <div className="client-card-top">
        <span>0{index + 1}</span>
        <Arrow />
      </div>
      <small>{client.status}</small>
      <h3>{client.name}</h3>
      <p>{client.description}</p>
      <strong>{client.website}</strong>
    </a>
  );
}

function ContactLinks() {
  return (
    <div className="quick-contact-grid">
      {contactLinks.map((link) => (
        <a className="quick-contact-card" href={link.href} key={link.label} target={link.label === 'Email' ? undefined : '_blank'} rel={link.label === 'Email' ? undefined : 'noreferrer'}>
          <span><strong>{link.label}</strong><small>{link.value}</small></span>
          <Arrow />
        </a>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Product and engineering company · India</p>
              <h1>Software that makes complex work easier to run.</h1>
              <p className="hero-intro">Micirql designs and builds focused software products, operational systems, business dashboards and professional digital platforms around real workflows.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={capDentUrl}>Explore CapDent <Arrow /></a>
                <a className="button button-outline" href="#contact">Discuss a project</a>
              </div>
              <div className="hero-facts" aria-label="Micirql working model">
                <div><strong>Founder-led</strong><span>Direct product ownership</span></div>
                <div><strong>Workflow-first</strong><span>Built around real operations</span></div>
                <div><strong>Long-term</strong><span>Designed to improve over time</span></div>
              </div>
            </div>
            <CompanyOverview />
          </div>
        </section>

        <section className="company-strip" aria-label="Micirql disciplines">
          <div className="container company-strip-inner">
            <span>Product strategy</span>
            <span>Experience design</span>
            <span>Application engineering</span>
            <span>Cloud systems</span>
            <span>Digital platforms</span>
          </div>
        </section>

        <section className="section company-section" id="company">
          <div className="container company-grid">
            <div className="section-heading">
              <p className="eyebrow">About Micirql</p>
              <h2>A product company shaped by real operational problems.</h2>
            </div>
            <div className="company-copy">
              <p className="lead-copy">Micirql works where product thinking, business operations and software engineering meet.</p>
              <p>We begin with the people doing the work: the clinic receptionist managing a changing queue, the owner reviewing daily collections, or the company trying to communicate its value clearly online. The system is then designed around what those people actually need to see, decide and complete.</p>
              <div className="company-principles">
                <article><strong>01</strong><span>Understand before designing</span></article>
                <article><strong>02</strong><span>Make important actions obvious</span></article>
                <article><strong>03</strong><span>Build for daily reliability</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Capabilities</p><h2>One partner across product, operations and digital presence.</h2></div>
              <p>Micirql connects business understanding, interface design and engineering so the final system feels coherent rather than assembled from separate vendors.</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item) => <CapabilityCard item={item} key={item.number} />)}
            </div>
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Products and systems</p><h2>CapDent is the first product in a broader Micirql portfolio.</h2></div>
              <p>Micirql is not a single-product website. CapDent demonstrates how we turn a specialised workflow into practical software, while the company also builds operational systems and digital platforms for other businesses.</p>
            </div>

            <div className="products-grid">
              <article className="capdent-feature">
                <div className="product-copy">
                  <span className="status-pill">Live product</span>
                  <p className="product-category">Dental clinic management</p>
                  <h3>CapDent</h3>
                  <p>Patient records, appointments, treatment progress, payments, follow-ups, clinical files and staff workflows in one focused clinic system.</p>
                  <ul>
                    <li>All current clinic-management features free</li>
                    <li>Owner, doctor and receptionist workflows</li>
                    <li>Android product with web-dashboard direction</li>
                  </ul>
                  <a className="button button-light" href={capDentUrl}>Visit CapDent <Arrow /></a>
                </div>
                <div className="capdent-interface" aria-label="CapDent workflow preview">
                  <div className="interface-bar"><span>CapDent / Clinic overview</span><strong>Today</strong></div>
                  <div className="interface-metrics"><div><small>Patients</small><strong>18</strong></div><div><small>Waiting</small><strong>4</strong></div><div><small>Collections</small><strong>₹42,600</strong></div></div>
                  <div className="interface-list">
                    <div className="interface-list-title"><strong>Patient workflow</strong><span>4 waiting</span></div>
                    <article><i>AM</i><span><strong>Anita M.</strong><small>Root canal · Sitting 2</small></span><b>Ready</b></article>
                    <article><i>RV</i><span><strong>Rahul V.</strong><small>Review appointment</small></span><b>Waiting</b></article>
                    <article><i>SP</i><span><strong>Shreya P.</strong><small>New consultation</small></span><b>Check-in</b></article>
                  </div>
                  <small className="demo-label">Fictional interface data</small>
                </div>
              </article>

              <article className="system-card">
                <span className="panel-label">Operational systems</span>
                <h3>Internal tools that replace fragmented work.</h3>
                <p>Role-based workflows, dashboards, approvals, reporting and automation for teams that have outgrown spreadsheets and messaging threads.</p>
                <a href="#contact">Discuss an internal system <Arrow /></a>
              </article>

              <article className="system-card">
                <span className="panel-label">Digital platforms</span>
                <h3>Corporate websites built for clarity and trust.</h3>
                <p>Professional digital presence for companies and clinics, with structured content, responsive design, performance and SEO foundations.</p>
                <a href="#work">See selected work <Arrow /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="section delivery-section">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Delivery model</p><h2>A disciplined path from problem to production.</h2></div>
              <p>The process is intentionally straightforward. Each stage creates a concrete decision before the next layer of investment begins.</p>
            </div>
            <div className="delivery-grid">
              {deliverySteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-intro">
              <div><p className="eyebrow">Selected work</p><h2>Different industries. The same standard of clarity.</h2></div>
              <p>Micirql has delivered company, staffing and clinic websites with an emphasis on professional positioning, usable information and dependable performance.</p>
            </div>
            <div className="clients-grid">
              {clients.map((client, index) => <ClientCard client={client} index={index} key={client.name} />)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow light">Start a conversation</p>
              <h2>Bring the workflow, bottleneck or product idea.</h2>
              <p>Share what needs to work better. You will communicate directly with the person shaping and building the solution.</p>
              <ContactLinks />
            </div>
            <div className="contact-form-panel">
              <div className="form-heading"><span>Project enquiry</span><small>Required fields are marked *</small></div>
              <RequestForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div><Brand footer /><p>Focused products and business systems, built with clarity.</p></div>
          <div className="footer-links"><a href={capDentUrl}>CapDent</a><a href="/apps/">Apps</a><a href="/blogs/">Insights</a><a href="#home">Back to top ↑</a></div>
          <small>© 2026 Micirql. Founder-led product and engineering company, India.</small>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
