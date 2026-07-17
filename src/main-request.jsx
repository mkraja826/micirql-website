import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

const capDentUrl = 'https://capdent.micirql.com/';
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.dms.clinic';

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'Principles', href: '#principles' },
  { label: 'Company', href: '#company' },
  { label: 'Work', href: '#work' },
  { label: 'Journal', href: '/blogs/' },
];

const disciplines = [
  {
    number: '01',
    title: 'Android products',
    description: 'Focused mobile products designed around the work people repeat every day.',
    meta: 'Strategy · UX · React Native · Release',
  },
  {
    number: '02',
    title: 'Operational systems',
    description: 'Role-based software that replaces scattered registers, spreadsheets and message threads.',
    meta: 'Workflows · Data · Access · Reporting',
  },
  {
    number: '03',
    title: 'Product presence',
    description: 'Websites, launch systems and search foundations that help useful software earn trust.',
    meta: 'Web · Content · SEO · Distribution',
  },
];

const principles = [
  ['01', 'Observe the work', 'Before drawing screens, understand where time is lost, where mistakes happen and what people are trying to remember.'],
  ['02', 'Remove before adding', 'A useful product is not the one with the most features. It is the one that makes the next important action obvious.'],
  ['03', 'Ship a complete loop', 'Release the smallest version that solves the full workflow, then improve it using evidence from real use.'],
  ['04', 'Build knowledge that compounds', 'Every product should leave the company with stronger systems, sharper judgement and reusable engineering foundations.'],
];

const journalItems = [
  {
    number: 'FIELD NOTE 01',
    title: 'Why the first version should solve one complete workflow',
    href: '/blogs/',
  },
  {
    number: 'PRODUCT NOTE 02',
    title: 'What a working dental clinic taught us about software design',
    href: '/blogs/',
  },
  {
    number: 'ENGINEERING NOTE 03',
    title: 'Designing Android software for teams with mixed technical confidence',
    href: '/blogs/',
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
        {footer ? <small>Independent software company</small> : null}
      </span>
    </span>
  );
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
          <a className="brand-link" href="#home" aria-label="Micirql home" onClick={close}>
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>

          <div className="nav-actions">
            <a className="nav-capdent" href={capDentUrl}>CapDent <Arrow /></a>
            <a className="button button-dark desktop-enquiry" href="#contact">Start a project</a>
            <button
              className={`menu-toggle${open ? ' is-open' : ''}`}
              type="button"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((current) => !current)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-backdrop${open ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <nav id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-menu-top"><Brand /><span>MENU / 2026</span></div>
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <a href={item.href} onClick={close} key={item.label}>
              <small>0{index + 1}</small>
              <strong>{item.label}</strong>
              <Arrow />
            </a>
          ))}
        </div>
        <div className="mobile-menu-actions">
          <a className="button button-outline" href={capDentUrl} onClick={close}>Explore CapDent</a>
          <a className="button button-cobalt" href="#contact" onClick={close}>Start a project</a>
        </div>
      </nav>
    </>
  );
}

function ShippingRecord() {
  return (
    <aside className="shipping-record" aria-label="Micirql shipping record">
      <div className="record-top">
        <span>MICIRQL / SHIPPING RECORD</span>
        <strong>01—03</strong>
      </div>
      <a className="record-row record-live" href={capDentUrl}>
        <span className="record-number">01</span>
        <div>
          <small>LIVE PRODUCT · ANDROID</small>
          <strong>CapDent</strong>
          <p>Dental clinic operations, designed from the workflow outward.</p>
        </div>
        <Arrow />
      </a>
      <div className="record-row">
        <span className="record-number">02</span>
        <div>
          <small>PRIVATE DEVELOPMENT</small>
          <strong>Operational software</strong>
          <p>A second focused workflow is being researched and shaped.</p>
        </div>
        <span className="record-status">BUILDING</span>
      </div>
      <div className="record-row record-open">
        <span className="record-number">03</span>
        <div>
          <small>PORTFOLIO SPACE</small>
          <strong>The next useful product</strong>
          <p>Micirql is structured to become more valuable with every release.</p>
        </div>
        <span className="record-status">OPEN</span>
      </div>
      <div className="record-bottom">
        <span>Founder-led</span>
        <span>Android-first</span>
        <span>India</span>
      </div>
    </aside>
  );
}

function ProductInterface() {
  return (
    <div className="product-interface" aria-label="CapDent interface preview using fictional data">
      <div className="interface-toolbar">
        <div><span className="capdent-symbol">+</span><strong>CapDent</strong></div>
        <span>OWNER VIEW · TODAY</span>
      </div>
      <div className="interface-body">
        <aside className="interface-sidebar">
          <strong>Clinic</strong>
          <span className="active">Overview</span>
          <span>Patients</span>
          <span>Appointments</span>
          <span>Treatments</span>
          <span>Payments</span>
          <span>Reports</span>
          <small>Demo workspace</small>
        </aside>
        <div className="interface-main">
          <div className="interface-heading">
            <div><small>WEDNESDAY · 17 JULY</small><strong>Good morning, Doctor.</strong></div>
            <button type="button">+ Add patient</button>
          </div>
          <div className="metric-row">
            <article><small>Waiting</small><strong>06</strong><span>2 ready for doctor</span></article>
            <article><small>Completed</small><strong>18</strong><span>Today’s visits</span></article>
            <article><small>Collected</small><strong>₹42.6k</strong><span>Today</span></article>
            <article><small>Pending</small><strong>₹18.4k</strong><span>Across 4 patients</span></article>
          </div>
          <div className="interface-columns">
            <section className="queue-table">
              <header><div><small>PATIENT FLOW</small><strong>Waiting queue</strong></div><span>06 waiting</span></header>
              <div className="patient-line"><i>AM</i><div><strong>Anita M.</strong><small>Root canal · Sitting 2</small></div><b className="ready">Ready</b><time>10:20</time></div>
              <div className="patient-line"><i>RV</i><div><strong>Rahul V.</strong><small>Review appointment</small></div><b>Waiting</b><time>10:35</time></div>
              <div className="patient-line"><i>SP</i><div><strong>Shreya P.</strong><small>New consultation</small></div><b className="checkin">Check-in</b><time>10:50</time></div>
              <div className="patient-line"><i>RK</i><div><strong>Rohan K.</strong><small>Crown fitting</small></div><b>Waiting</b><time>11:10</time></div>
            </section>
            <aside className="attention-panel">
              <header><small>OWNER REVIEW</small><strong>Needs attention</strong></header>
              <article><span>01</span><div><strong>4 pending bills</strong><small>₹18,400 to follow up</small></div></article>
              <article><span>02</span><div><strong>7 follow-ups</strong><small>Due this week</small></div></article>
              <article><span>03</span><div><strong>2 staff edits</strong><small>Waiting for review</small></div></article>
              <a href={capDentUrl}>Open product site <Arrow /></a>
            </aside>
          </div>
        </div>
      </div>
      <p className="interface-disclosure">Interface preview uses fictional demonstration data.</p>
    </div>
  );
}

function WorkRow({ client, index }) {
  const href = `https://${client.website.replace(/^https?:\/\//, '')}`;
  return (
    <a className="work-row" href={href} target="_blank" rel="noreferrer" data-reveal>
      <span className="work-number">0{index + 1}</span>
      <div className="work-name"><small>{client.status}</small><strong>{client.name}</strong></div>
      <p>{client.description}</p>
      <span className="work-domain">{client.website}</span>
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
    }, { threshold: 0.12 });

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
              <p className="eyebrow">Independent software company · India</p>
              <h1>We build Android software that <em>outlives the launch.</em></h1>
              <p className="hero-intro">Micirql turns overlooked operational problems into focused products people can depend on. One real workflow at a time. One durable product at a time.</p>
              <div className="hero-actions">
                <a className="button button-cobalt" href="#product">See what we shipped <Arrow /></a>
                <a className="button button-text" href="#company">Why Micirql exists <Arrow down /></a>
              </div>
              <div className="hero-index">
                <span>PRODUCT STRATEGY</span>
                <span>ANDROID ENGINEERING</span>
                <span>OPERATIONAL DESIGN</span>
              </div>
            </div>
            <ShippingRecord />
          </div>
        </section>

        <section className="statement-section">
          <div className="container statement-grid" data-reveal>
            <span className="section-index">00 / POSITION</span>
            <blockquote>Useful software begins where people are still compensating for a broken workflow with memory, paper and repeated effort.</blockquote>
            <p>That is the territory Micirql chooses: specific work, clear responsibility and products that become more useful through daily use.</p>
          </div>
        </section>

        <section className="section product-section" id="product">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="eyebrow cobalt">Product 01 · Live on Android</p><h2>CapDent is proof that the model works.</h2></div>
              <div className="heading-note"><span>SHIPPED / 2026</span><p>Built from a live clinic workflow, not a hypothetical feature list.</p></div>
            </div>

            <div className="product-story" data-reveal>
              <div className="product-copy">
                <div className="product-title"><span>01</span><h3>CapDent</h3></div>
                <p className="product-lead">Dental clinic management without enterprise complexity.</p>
                <p>CapDent connects patient records, appointments, treatment sittings, payments, pending dues, follow-ups, clinical files and staff responsibilities in one practical workflow.</p>
                <dl>
                  <div><dt>Roles</dt><dd>Owner, doctor, receptionist</dd></div>
                  <div><dt>Platform</dt><dd>Android · Web dashboard direction</dd></div>
                  <div><dt>Access</dt><dd>All current features free · 1 GB included</dd></div>
                </dl>
                <div className="product-actions">
                  <a className="button button-capdent" href={capDentUrl}>Explore CapDent <Arrow /></a>
                  <a className="button button-ghost" href={playStoreUrl} target="_blank" rel="noreferrer">Google Play <Arrow /></a>
                </div>
              </div>
              <ProductInterface />
            </div>
          </div>
        </section>

        <section className="section disciplines-section" id="principles">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <div><p className="eyebrow">What we take responsibility for</p><h2>From the recurring problem to the released product.</h2></div>
              <p>Micirql joins product thinking, interface design, engineering and distribution so the final experience feels like one system—not work handed between disconnected vendors.</p>
            </div>
            <div className="discipline-list">
              {disciplines.map((item) => (
                <article key={item.number} data-reveal>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>{item.meta}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section principles-section">
          <div className="container principles-grid">
            <div className="principles-intro" data-reveal>
              <p className="eyebrow cobalt">Operating principles</p>
              <h2>Less theatre.<br />More product judgement.</h2>
              <p>These principles guide what Micirql builds, what it removes and what it refuses to pretend is finished.</p>
            </div>
            <div className="principles-list">
              {principles.map(([number, title, description]) => (
                <article key={number} data-reveal>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section company-section" id="company">
          <div className="container company-grid">
            <div className="company-title" data-reveal>
              <span className="section-index">02 / COMPANY</span>
              <h2>One shipped product.<br /><em>A much longer horizon.</em></h2>
            </div>
            <div className="company-copy" data-reveal>
              <p className="company-lead">Micirql started with a problem close enough to observe properly: the daily operation of a dental clinic.</p>
              <p>That problem became CapDent. The product taught us how real teams adopt software, how role-based workflows fail, how mobile interfaces must behave under pressure and how support shapes the roadmap.</p>
              <p>The company is being built so that this knowledge compounds. Future products will serve different workflows, but they will inherit stronger product judgement, reusable infrastructure and a clearer path from observation to distribution.</p>
              <div className="founder-note">
                <span>FOUNDER NOTE</span>
                <blockquote>“I do not want Micirql to be known for producing a large number of disposable apps. I want it to be known for understanding a problem deeply enough to build the product people keep.”</blockquote>
                <strong>Karthik Raja · Founder</strong>
              </div>
            </div>
            <div className="company-timeline" data-reveal>
              <article><span>NOW</span><strong>CapDent in active use</strong><p>Improve the product around real clinic workflows and prepare the web dashboard.</p></article>
              <article><span>NEXT</span><strong>Reusable product foundation</strong><p>Strengthen identity, billing, support, analytics and release systems for future products.</p></article>
              <article><span>THEN</span><strong>A focused portfolio</strong><p>Build a small family of Android products for specific operational problems.</p></article>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <div><p className="eyebrow">Selected work</p><h2>Clarity applied across different businesses.</h2></div>
              <p>Micirql has also shaped digital platforms for staffing, software and healthcare organisations while developing its own product practice.</p>
            </div>
            <div className="work-list">{clients.map((client, index) => <WorkRow client={client} index={index} key={client.name} />)}</div>
          </div>
        </section>

        <section className="section journal-section">
          <div className="container journal-grid">
            <div className="journal-intro" data-reveal>
              <p className="eyebrow cobalt">Field notes</p>
              <h2>What we learn while shipping.</h2>
              <p>Product decisions, clinic workflow observations and engineering lessons written by the people doing the work.</p>
              <a className="button button-outline-dark" href="/blogs/">Open the journal <Arrow /></a>
            </div>
            <div className="journal-list">
              {journalItems.map((item) => (
                <a href={item.href} key={item.number} data-reveal><small>{item.number}</small><strong>{item.title}</strong><Arrow /></a>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-section" id="careers">
          <div className="container careers-grid" data-reveal>
            <span className="section-index">03 / PEOPLE</span>
            <h2>Small team now.<br />Serious product ambition.</h2>
            <p>Micirql is not hiring at scale. We are open to thoughtful Android engineers, product designers and operators who care about real workflows more than fashionable features.</p>
            <a className="button button-light" href="mailto:support@micirql.com?subject=Working%20with%20Micirql">Introduce yourself <Arrow /></a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow light">Start with the problem</p>
              <h2>Bring the workflow that keeps breaking.</h2>
              <p>Tell us what repeatedly takes too long, gets forgotten, depends on one person or still lives across paper, spreadsheets and messages.</p>
              <ContactLinks />
            </div>
            <div className="form-panel" data-reveal>
              <div className="form-panel-heading"><span>PROJECT ENQUIRY</span><small>Direct founder response</small></div>
              <RequestForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Brand footer /><p>Focused Android software for work that matters.</p></div>
          <nav aria-label="Footer navigation"><a href={capDentUrl}>CapDent</a><a href="/apps/">Products</a><a href="/blogs/">Journal</a><a href="#home">Top ↑</a></nav>
          <small>© 2026 Micirql · Founder-led software company, India.</small>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
