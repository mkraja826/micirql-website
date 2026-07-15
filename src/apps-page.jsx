import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './apps-page.css';

const menu = ['Home', 'Apps', 'Clinic', 'Dashboards', 'MVP', 'More'];

const featured = [
  { name: 'CapDent', icon: '🦷', tag: 'Dental Clinic Management', status: 'Google Play', rating: 'Android', desc: 'Patients, queue, visits, payments, prescriptions, X-rays, follow-ups, staff and reports for dental clinics.', href: '/dental-management-system/' },
  { name: 'ClinicPro Website Suite', icon: '🌐', tag: 'Web Product', status: 'Available', rating: 'New', desc: 'Premium clinic websites with service pages, appointment enquiry and gallery.' },
  { name: 'Owner Dashboard', icon: '📊', tag: 'Dashboard', status: 'Custom Build', rating: 'Custom', desc: 'Revenue, leads, staff, reports and business overview in one dashboard.' },
];

const apps = [
  ...featured,
  { name: 'Startup MVP Builder', icon: '🚀', tag: 'MVP', status: 'Available', rating: 'Custom', desc: 'Android app, backend, landing page and admin foundation for startup ideas.' },
  { name: 'Appointment Booking App', icon: '📅', tag: 'Healthcare', status: 'Coming Soon', rating: 'Soon', desc: 'Booking and reminder system for clinics and service businesses.' },
  { name: 'Lead Capture Landing Page', icon: '🎯', tag: 'Marketing', status: 'Available', rating: 'New', desc: 'Fast landing page for collecting enquiries and project requests.' },
];

function TopBar() {
  return (
    <header className="market-topbar">
      <a className="market-logo" href="/"><span>M</span><strong>Micirql Apps</strong></a>
      <div className="market-search">Search apps, dashboards, clinic tools</div>
      <a className="market-download" href="/#contact">Request App</a>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="market-sidebar">
      {menu.map((item, index) => <a className={index === 1 ? 'active' : ''} key={item} href={index === 0 ? '/' : '/apps.html'}><span>{['⌂','▦','🦷','📊','🚀','⋯'][index]}</span>{item}</a>)}
    </aside>
  );
}

function HeroApp({ app }) {
  const content = (
    <>
      <div className="hero-art"><span>{app.icon}</span></div>
      <div className="hero-app-bottom">
        <div className="small-icon">{app.icon}</div>
        <div><h3>{app.name}</h3><p>★ {app.rating}</p></div>
        <button>{app.href ? 'EXPLORE' : app.status.includes('Coming') ? 'COMING SOON' : 'REQUEST'}</button>
      </div>
    </>
  );

  return app.href ? <a className="hero-app-card" href={app.href}>{content}</a> : <article className="hero-app-card">{content}</article>;
}

function AppTile({ app }) {
  const content = (
    <>
      <div className="tile-art"><span>{app.icon}</span></div>
      <div className="tile-info">
        <div className="small-icon">{app.icon}</div>
        <div><h3>{app.name}</h3><p>★ {app.rating}</p></div>
      </div>
      <p className="tile-desc">{app.desc}</p>
      <button disabled={!app.href && app.status.includes('Coming')}>{app.href ? 'EXPLORE' : app.status.includes('Coming') ? 'COMING SOON' : 'REQUEST'}</button>
    </>
  );

  return app.href ? <a className="market-app-tile" href={app.href}>{content}</a> : <article className="market-app-tile">{content}</article>;
}

function AppsPage() {
  return (
    <main className="market-page">
      <TopBar />
      <div className="market-layout">
        <Sidebar />
        <section className="market-content" id="apps">
          <div className="market-banner">
            <div><strong>Micirql Business Apps</strong><span>Problem-focused Android apps, dashboards, clinic systems and future products.</span></div>
            <a href="/">Back to Website</a>
          </div>

          <section className="market-section dark-showcase">
            <div className="section-title"><div><h2>Featured Apps</h2><p>CapDent and future Micirql products</p></div><a href="/#contact">MORE</a></div>
            <div className="hero-app-row">{featured.map((app) => <HeroApp key={app.name} app={app} />)}</div>
          </section>

          <section className="market-section">
            <div className="section-title"><div><h2>Editor's Choice</h2><p>Recommended business solutions</p></div><a href="/#contact">MORE</a></div>
            <div className="market-grid">{apps.map((app) => <AppTile key={app.name} app={app} />)}</div>
          </section>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<AppsPage />);