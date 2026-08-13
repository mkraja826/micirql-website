import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

const capDentUrl = 'https://capdent.in/';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Website Preview', href: '#preview-studio' },
  { label: 'Process', href: '#process' },
  { label: 'Company', href: '#company' },
  { label: 'Journal', href: '/blogs/' },
];

const services = [
  {
    number: '01',
    title: 'Website design & development',
    description: 'High-trust websites for companies, clinics, founders and products, designed around conversion, performance and a clear brand story.',
    meta: 'Strategy · UX · React · Vite · SEO',
  },
  {
    number: '02',
    title: 'Web apps & SaaS platforms',
    description: 'Authenticated products, portals, dashboards and subscription-ready software with practical workflows and production foundations.',
    meta: 'Product · Auth · Database · Billing-ready',
  },
  {
    number: '03',
    title: 'Mobile app development',
    description: 'Cross-platform and Android-focused apps shaped around real user behaviour, roles, notifications, data and release requirements.',
    meta: 'React Native · Expo · Android · Release',
  },
  {
    number: '04',
    title: 'AI integration',
    description: 'Useful AI inside real products: assistants, retrieval, workflow automation, model routing, guardrails and usage-aware experiences.',
    meta: 'LLMs · RAG · APIs · Automation',
  },
  {
    number: '05',
    title: 'Healthcare & dental software',
    description: 'Clinic websites, patient systems, dental workflows, doctor portfolios, treatment content and healthcare-focused digital products.',
    meta: 'Clinics · Dental · Patient UX · Operations',
  },
  {
    number: '06',
    title: 'Business portals & dashboards',
    description: 'Role-based internal tools that replace scattered spreadsheets, registers and repeated manual work with one clear operational view.',
    meta: 'Admin · CRM · Inventory · Reporting',
  },
  {
    number: '07',
    title: 'UI/UX & product design',
    description: 'Interface systems designed for the actual user — from patients and doctors to children, operators and enterprise teams.',
    meta: 'Flows · Systems · Responsive · Prototyping',
  },
  {
    number: '08',
    title: 'SEO & AI discoverability',
    description: 'Technical SEO, structured content and search architecture built so Google and AI systems can understand what your business does.',
    meta: 'Technical SEO · Schema · Content · AEO',
  },
];

const previewSites = [
  {
    id: 'dental',
    label: 'Healthcare',
    name: 'Premium Dental Clinic',
    description: 'Doctor-first trust, treatment discovery, case proof and appointment conversion.',
    kind: 'dental',
  },
  {
    id: 'saas',
    label: 'SaaS',
    name: 'B2B Product Launch',
    description: 'Clear value proposition, product UI, proof, pricing and a focused demo funnel.',
    kind: 'saas',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    name: 'Technology Company',
    description: 'International corporate positioning with services, capabilities and case-study depth.',
    kind: 'corporate',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    name: 'Modern Product Brand',
    description: 'Editorial product storytelling, collections, trust signals and conversion-led commerce.',
    kind: 'commerce',
  },
];

const processSteps = [
  ['01', 'Discover', 'We map the business, user, market and the action the product must make easier.'],
  ['02', 'Structure', 'We turn requirements into information architecture, flows, screens and a build plan.'],
  ['03', 'Design', 'We create a visual system that feels specific to the brand instead of template-generated.'],
  ['04', 'Build', 'We develop responsive interfaces, backend workflows, integrations and production behaviour.'],
  ['05', 'Validate', 'We test important journeys across device sizes and remove friction before launch.'],
  ['06', 'Launch & improve', 'We deploy, monitor real usage and improve the product using evidence rather than guesses.'],
];

const clientOutcomes = [
  {
    company: 'B.G. Reddy Dental Clinic',
    sector: 'Dental healthcare',
    title: 'A clearer digital front door for a real clinic.',
    body: 'The website was shaped around treatment discovery, doctor credibility and appointment intent, while the clinic also became the real-world environment behind Micirql’s dental product work.',
  },
  {
    company: 'Sicada Digital',
    sector: 'Technology services',
    title: 'Corporate positioning without the generic agency look.',
    body: 'The engagement focused on a stronger enterprise presentation for AI, software and cybersecurity services, with a cleaner hierarchy and more confident digital presence.',
  },
  {
    company: 'Clinicaprollc',
    sector: 'US staffing',
    title: 'A service website built around clarity and trust.',
    body: 'The website organises staffing capabilities for both businesses and candidates, giving visitors a direct path to understand the company and start a conversation.',
  },
];

function Arrow({ down = false }) {
  return <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
}

function Brand({ footer = false }) {
  return (
    <span className={`brand${footer ? ' brand-footer' : ''}`}>
      <img src="/micirql-mark.svg" width="42" height="42" alt="" />
      <span>
        <strong>MICIRQL</strong>
        {footer ? <small>Product engineering company</small> : <small>Build useful things</small>}
      </span>
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand-link" href="#home" aria-label="Micirql home" onClick={close}><Brand /></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="button button-dark desktop-enquiry" href="#contact">Start a project</a>
            <button
              className={`menu-toggle${open ? ' is-open' : ''}`}
              type="button"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
            ><span /><span /></button>
          </div>
        </div>
      </header>
      <div className={`menu-backdrop${open ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <nav className={`mobile-menu${open ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-menu-top"><Brand /><button type="button" onClick={close} aria-label="Close menu">×</button></div>
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <a href={item.href} onClick={close} key={item.label}>
              <small>0{index + 1}</small><strong>{item.label}</strong><Arrow />
            </a>
          ))}
        </div>
        <div className="mobile-menu-actions">
          <a className="button button-cobalt" href="#contact" onClick={close}>Start a project</a>
        </div>
      </nav>
    </>
  );
}

function HeroSignal() {
  return (
    <aside className="hero-signal" aria-label="Micirql capabilities">
      <div className="signal-top"><span>MICIRQL / BUILD SYSTEM</span><strong>2026</strong></div>
      <div className="signal-main">
        <div className="signal-ring"><span>M</span></div>
        <p>From first idea to production release.</p>
      </div>
      <div className="signal-grid">
        <div><small>01</small><strong>Web</strong><span>Brand + conversion</span></div>
        <div><small>02</small><strong>Mobile</strong><span>Apps + workflows</span></div>
        <div><small>03</small><strong>SaaS</strong><span>Portals + systems</span></div>
        <div><small>04</small><strong>AI</strong><span>Useful intelligence</span></div>
      </div>
      <div className="signal-bottom"><span>INDIA</span><span>REMOTE / GLOBAL</span></div>
    </aside>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card" data-reveal>
      <div className="service-top"><span>{service.number}</span><Arrow /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <small>{service.meta}</small>
    </article>
  );
}

function WorkCard({ client, index }) {
  const href = `https://${client.website.replace(/^https?:\/\//, '')}`;
  return (
    <article className="work-card" data-reveal>
      <div className="work-card-top"><span>0{index + 1}</span><small>{client.status}</small></div>
      <div className="work-card-window" aria-hidden="true">
        <div className="work-browser"><i /><i /><i /><b>{client.website}</b></div>
        <div className="work-screen">
          <span className="work-kicker">{client.name}</span>
          <strong>{client.status}</strong>
          <div className="work-lines"><i /><i /><i /></div>
          <div className="work-panels"><span /><span /><span /></div>
        </div>
      </div>
      <h3>{client.name}</h3>
      <p>{client.description}</p>
      <a href={href} target="_blank" rel="noreferrer" className="text-link">Open live website <Arrow /></a>
    </article>
  );
}

function ProductCard() {
  return (
    <article className="product-proof" data-reveal>
      <div className="proof-index"><span>PRODUCT / 01</span><small>LIVE SOFTWARE</small></div>
      <div className="proof-copy">
        <div><span className="capdent-badge">CD</span><h3>CapDent</h3></div>
        <p>Dental practice software built around real clinic operations: patients, visits, staff, payments, clinical records and the workflows people repeat every day.</p>
      </div>
      <div className="proof-ui" aria-hidden="true">
        <div className="proof-ui-top"><strong>Clinic overview</strong><span>Today</span></div>
        <div className="proof-ui-metrics"><span><small>Waiting</small><b>06</b></span><span><small>Visits</small><b>18</b></span><span><small>Due</small><b>₹18k</b></span></div>
        <div className="proof-ui-table"><i /><i /><i /><i /></div>
      </div>
      <a href={capDentUrl} target="_blank" rel="noreferrer" className="button button-capdent">Explore CapDent <Arrow /></a>
    </article>
  );
}

function BrowserPreview({ site, compact = false }) {
  return (
    <div className={`demo-browser ${compact ? 'compact' : ''} demo-${site.kind}`}>
      <div className="demo-toolbar"><span><i /><i /><i /></span><b>preview.micirql.com/{site.id}</b><em>↗</em></div>
      <div className="demo-page">
        <header className="demo-nav"><strong>{site.kind === 'dental' ? 'ARC DENTAL' : site.kind === 'saas' ? 'NORTHSTAR' : site.kind === 'corporate' ? 'AXIOM' : 'FORM / 08'}</strong><span>Services &nbsp; Work &nbsp; About</span><button type="button">Contact</button></header>
        {site.kind === 'dental' ? (
          <>
            <div className="demo-hero split"><div><small>ADVANCED DENTAL CARE</small><h4>Confidence starts with a healthier smile.</h4><p>Modern dentistry, clear treatment plans and a calm patient experience.</p><b>Book consultation →</b></div><div className="demo-portrait"><span>25+</span><small>Years of care</small></div></div>
            <div className="demo-strip"><span>Implants</span><span>Smile design</span><span>Guided surgery</span><span>Full-mouth care</span></div>
          </>
        ) : null}
        {site.kind === 'saas' ? (
          <>
            <div className="demo-hero centered"><small>OPERATIONS, WITHOUT THE NOISE</small><h4>One workspace for the work that keeps moving.</h4><p>Plan, assign, review and understand your operation from a single live view.</p><b>Start free →</b></div>
            <div className="demo-dashboard"><aside><i /><i /><i /><i /></aside><main><div className="dash-metrics"><span /><span /><span /></div><div className="dash-chart" /><div className="dash-row"><span /><span /><span /></div></main></div>
          </>
        ) : null}
        {site.kind === 'corporate' ? (
          <>
            <div className="demo-hero corporate"><small>ENGINEERING FOR COMPLEX CHANGE</small><h4>Technology that moves the business forward.</h4><p>Strategy, software and intelligent systems for ambitious organisations.</p><b>Explore capabilities →</b></div>
            <div className="demo-corp-grid"><article>AI systems <Arrow /></article><article>Enterprise software <Arrow /></article><article>Cyber resilience <Arrow /></article></div>
          </>
        ) : null}
        {site.kind === 'commerce' ? (
          <>
            <div className="demo-hero commerce"><div><small>COLLECTION 08</small><h4>Objects for quieter spaces.</h4><p>Considered essentials with a restrained material language.</p><b>Shop collection →</b></div><div className="demo-product"><span>01</span></div></div>
            <div className="demo-products"><article><span /><strong>Form Chair</strong></article><article><span /><strong>Studio Lamp</strong></article><article><span /><strong>Low Table</strong></article></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function PreviewStudio() {
  const [activeId, setActiveId] = useState(previewSites[0].id);
  const [device, setDevice] = useState('desktop');
  const [modalOpen, setModalOpen] = useState(false);
  const activeSite = previewSites.find((site) => site.id === activeId) || previewSites[0];

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', close);
    document.body.classList.toggle('preview-open', modalOpen);
    return () => {
      document.removeEventListener('keydown', close);
      document.body.classList.remove('preview-open');
    };
  }, [modalOpen]);

  return (
    <section className="section preview-section" id="preview-studio">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow light">Website Preview Studio</p><h2>See the direction before you start the project.</h2></div>
          <p>Browse example website directions built by Micirql. Switch the preview between desktop and mobile, then open a larger interactive concept.</p>
        </div>
        <div className="preview-studio" data-reveal>
          <div className="preview-list">
            {previewSites.map((site, index) => (
              <button className={activeId === site.id ? 'is-active' : ''} key={site.id} type="button" onClick={() => setActiveId(site.id)}>
                <span>0{index + 1}</span><div><small>{site.label}</small><strong>{site.name}</strong><p>{site.description}</p></div><Arrow />
              </button>
            ))}
          </div>
          <div className="preview-stage">
            <div className="preview-stage-top">
              <div><small>LIVE CONCEPT</small><strong>{activeSite.name}</strong></div>
              <div className="device-switch" role="group" aria-label="Preview size">
                <button type="button" className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')}>Desktop</button>
                <button type="button" className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')}>Mobile</button>
              </div>
            </div>
            <div className={`preview-device ${device}`}><BrowserPreview site={activeSite} compact /></div>
            <div className="preview-stage-bottom">
              <span>Concept preview · Content and branding are illustrative.</span>
              <button className="button button-light" type="button" onClick={() => setModalOpen(true)}>Open full preview <Arrow /></button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <div className="preview-modal" role="dialog" aria-modal="true" aria-label={`${activeSite.name} website concept`}>
          <div className="preview-modal-bar"><div><Brand /><span>{activeSite.name}</span></div><button type="button" onClick={() => setModalOpen(false)} aria-label="Close preview">Close ×</button></div>
          <div className={`preview-modal-device ${device}`}><BrowserPreview site={activeSite} /></div>
        </div>
      ) : null}
    </section>
  );
}

function ClientOutcome({ item }) {
  return (
    <article className="outcome-card" data-reveal>
      <div className="outcome-meta"><span>CLIENT STORY</span><small>{item.sector}</small></div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <footer><strong>{item.company}</strong><span>Project outcome</span></footer>
    </article>
  );
}

function ContactLinks() {
  const links = [
    ['Email', 'support@micirql.com', 'mailto:support@micirql.com?subject=Project%20Request%20for%20Micirql'],
    ['WhatsApp', '+91 94415 81114', 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.'],
    ['LinkedIn', 'Micirql company page', 'https://www.linkedin.com/company/micirql/'],
  ];
  return (
    <div className="contact-links">
      {links.map(([label, value, href]) => (
        <a href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}>
          <span><small>{label}</small><strong>{value}</strong></span><Arrow />
        </a>
      ))}
    </div>
  );
}

function App() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Product engineering company · India</p>
              <h1>We turn business ideas into <em>working digital products.</em></h1>
              <p className="hero-intro">Micirql designs and builds websites, mobile apps, SaaS platforms, AI-powered systems and custom business software — from the first product decision to production launch.</p>
              <div className="hero-actions">
                <a className="button button-cobalt" href="#preview-studio">Preview websites <Arrow /></a>
                <a className="button button-outline-dark" href="#contact">Start a project</a>
              </div>
              <div className="hero-index"><span>WEB</span><span>MOBILE</span><span>SAAS</span><span>AI</span><span>HEALTHCARE TECH</span><span>CLOUD</span></div>
            </div>
            <HeroSignal />
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner"><span>BUILT FOR</span><strong>Startups</strong><strong>Clinics</strong><strong>Service companies</strong><strong>Digital products</strong><strong>Internal teams</strong></div>
        </section>

        <section className="section statement-section">
          <div className="container statement-grid" data-reveal>
            <span className="section-index">00 / POSITION</span>
            <blockquote>Not another website factory. Micirql builds the product, system and digital presence around the problem you actually need to solve.</blockquote>
            <p>Strategy, interface, engineering, backend, AI, launch and iteration can live in one product-minded engagement.</p>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="eyebrow cobalt">Services</p><h2>One partner across the digital product stack.</h2></div>
              <p>Engage Micirql for a focused website, a complete application, or the connected system around your business.</p>
            </div>
            <div className="services-grid">{services.map((service) => <ServiceCard service={service} key={service.number} />)}</div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="eyebrow">Selected work</p><h2>Proof across websites and software products.</h2></div>
              <p>Real client websites sit alongside Micirql’s own product work, showing both brand execution and deeper software capability.</p>
            </div>
            <ProductCard />
            <div className="work-grid">{clients.map((client, index) => <WorkCard client={client} index={index} key={client.name} />)}</div>
          </div>
        </section>

        <PreviewStudio />

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <div><p className="eyebrow cobalt">How we build</p><h2>From unclear idea to clear release.</h2></div>
              <p>The process stays lean, but important product decisions happen before code becomes expensive.</p>
            </div>
            <div className="process-grid">{processSteps.map(([number, title, body]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className="section outcomes-section" id="testimonials">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="eyebrow light">Clients & testimonials</p><h2>Built around the client outcome.</h2></div>
              <p>Direct testimonial quotes are published only with client approval. Until then, Micirql shows the verified purpose and outcome of each engagement.</p>
            </div>
            <div className="outcomes-grid">{clientOutcomes.map((item) => <ClientOutcome item={item} key={item.company} />)}</div>
          </div>
        </section>

        <section className="section company-section" id="company">
          <div className="container company-grid">
            <div data-reveal><p className="eyebrow cobalt">Micirql</p><h2>Founder-led. Product-minded. Built to ship.</h2></div>
            <div className="company-copy" data-reveal>
              <p className="company-lead">Micirql is a software and product engineering company founded by Karthik Raja.</p>
              <p>The company works across web, mobile, SaaS, AI and healthcare technology, with a simple operating principle: understand the real workflow, design the right product around it, and build it well enough to be used in production.</p>
              <div className="company-facts"><span><small>FOCUS</small><strong>Useful software</strong></span><span><small>MODEL</small><strong>Founder-led execution</strong></span><span><small>BASE</small><strong>India · Global delivery</strong></span></div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow light">Start a project</p>
              <h2>Tell us what you want to build.</h2>
              <p>Website, mobile app, SaaS product, AI workflow, clinic software or an internal system — describe the problem and the outcome you need.</p>
              <ContactLinks />
            </div>
            <div className="contact-form-shell" data-reveal><RequestForm /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><Brand footer /><p>Websites, apps, SaaS, AI and digital systems built around real work.</p></div>
          <div className="footer-links"><a href="#services">Services</a><a href="#work">Work</a><a href="#preview-studio">Website Preview</a><a href="/apps/">Apps</a><a href="/blogs/">Journal</a></div>
          <div className="footer-meta"><span>© 2026 Micirql</span><a href="mailto:support@micirql.com">support@micirql.com</a><span>India</span></div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
