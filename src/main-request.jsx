import React from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

const principles = [
  'Problem-first product thinking',
  'Simple interfaces for real users',
  'Fast MVP execution',
  'Long-term scalable systems',
];

const contactLinks = [
  {
    label: 'Email',
    value: 'karthikraja826@gmail.com',
    icon: '✉️',
    href: 'mailto:karthikraja826@gmail.com?subject=Project%20Request%20for%20Micirql',
    active: true,
  },
  {
    label: 'WhatsApp',
    value: '+91 94415 81114',
    icon: '💬',
    href: 'https://wa.me/919441581114?text=Hi%20Karthik%2C%20I%20want%20to%20discuss%20a%20project%20with%20Micirql.',
    active: true,
  },
  {
    label: 'LinkedIn',
    value: 'Add LinkedIn profile',
    icon: '💼',
    href: '#contact',
    active: false,
  },
  {
    label: 'Instagram',
    value: 'Add Instagram profile',
    icon: '📸',
    href: '#contact',
    active: false,
  },
];

function Card({ item }) {
  return (
    <article className="app-card">
      <div className="app-card-head">
        <div className="icon-box"><span className="mini-icon">{item.icon}</span></div>
        <span className="status">{item.status}</span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function ContactLinks() {
  return (
    <div className="quick-contact-grid">
      {contactLinks.map((link) => (
        <a className={link.active ? 'quick-contact-card' : 'quick-contact-card inactive'} href={link.href} key={link.label} target={link.active ? '_blank' : undefined} rel="noreferrer">
          <span className="quick-contact-icon">{link.icon}</span>
          <span><strong>{link.label}</strong><small>{link.value}</small></span>
        </a>
      ))}
    </div>
  );
}

function App() {
  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home"><span className="brand-mark">M</span><span>Micirql</span></a>
        <nav className="nav-links"><a href="#vision">Vision</a><a href="/apps.html.html">Apps</a><a href="#clients">Clients</a><a href="#contact">Contact</a></nav>
        <a className="nav-cta" href="/apps.html.html">Open App Store</a>
      </header>

      <section id="home" className="hero section-padding">
        <div className="hero-copy">
          <div className="eyebrow">✦ Founded by Karthik Raja</div>
          <h1>Building problem-focused digital solutions for modern businesses.</h1>
          <p>Micirql is a software company focused on Android apps, business dashboards, clinic systems, landing pages, and custom software that solve real operational problems.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/apps.html.html">Visit Micirql Apps <span>→</span></a>
            <a className="secondary-button" href="#contact">Request a Solution</a>
          </div>
          <div className="stats-row">
            <div className="stat"><strong>Founder-led</strong><span>Direct execution</span></div>
            <div className="stat"><strong>Problem-focused</strong><span>Useful software</span></div>
            <div className="stat"><strong>Android-first</strong><span>Business apps</span></div>
            <div className="stat"><strong>Scalable</strong><span>Future products</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="phone-shell"><div className="phone-camera" /><div className="phone-screen"><div className="screen-top"><span>Micirql</span><span>✦</span></div><div className="screen-card primary-card"><span>Vision</span><strong>Problem → Product</strong></div><div className="screen-grid"><span /><span /><span /><span /></div><div className="screen-card"><span>Separate Page</span><strong>Micirql Apps</strong></div></div></div>
        </div>
      </section>

      <section id="vision" className="section-padding about-section">
        <div className="section-label">Vision</div>
        <div className="split-grid">
          <div><h2>Micirql exists to build software around real business problems, not unnecessary complexity.</h2></div>
          <div className="glass-panel">
            <p>Founded by Karthik Raja, Micirql is built with a clear vision: identify practical problems faced by businesses and turn them into focused, reliable, and easy-to-use digital solutions.</p>
            <p>Our approach is simple: understand the workflow, remove friction, build the product, and keep improving it based on real usage.</p>
            <div className="founder-tags">{principles.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="clients" className="section-padding">
        <div className="section-heading"><div className="section-label">Clients</div><h2>Brands and projects connected with Micirql.</h2><p>Micirql supports clinics, service businesses, and startups with websites, dashboards, and software products.</p></div>
        <div className="apps-grid">{clients.map((client) => <Card key={client.name} item={client} />)}</div>
      </section>

      <section id="contact" className="section-padding contact-section">
        <div className="contact-card">
          <div><div className="section-label">Contact</div><h2>Reach Micirql directly or send a project request.</h2><p>Choose a direct contact option or submit the form for Android apps, landing pages, dashboards, clinic systems, and custom software.</p></div>
          <ContactLinks />
          <RequestForm />
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
