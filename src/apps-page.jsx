import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './apps-page.css';

const menu = ['Home', 'Apps', 'Clinic', 'Dashboards', 'MVP', 'More'];

const featured = [
  { name: 'DMS Dental Management System', icon: '🏥', tag: 'Clinic Management', status: 'APK Coming Soon', rating: 'Pilot', desc: 'Patients, queue, visits, payments, prescriptions and follow-ups for dental clinics.' },
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
      {menu.map((item, index) => <a className={index === 1 ? 'active' : ''} key={item} href={index === 0 ? '/' : '#apps'}><span>{['⌂','▦','🏥','📊','🚀','⋯'][index]}</span>{item}</a>)}
    </aside>
  );
}

function HeroApp({ app }) {
  return (
    <article className="hero-app-card">
      <div className="hero-art"><span>{app.icon}</span></div>
      <div className="hero-app-bottom">
        <div className="small-icon">{app.icon}</div>
        <div><h3>{app.name}</h3><p>★ {app.rating}</p></div>
        <button disabled>{app.status.includes('Coming') ? 'COMING SOON' : 'REQUEST'}</button>
      </div>
    </article>
  );
}

function AppTile({ app }) {
  return (
    <article className="market-app-tile">
      <div className="tile-art"><span>{app.icon}</span></div>
      <div className="tile-info">
        <div className="small-icon">{app.icon}</div>
        <div><h3>{app.name}</h3><p>★ {app.rating}</p></div>
      </div>
      <p className="tile-desc">{app.desc}</p>
      <button disabled={app.status.includes('Coming')}>{app.status.includes('Coming') ? 'COMING SOON' : 'REQUEST'}</button>
    </article>
  );
}

function AppsPage() {
  return (
    <main className="market-page">
      <TopBar />
      <div className="market-layout">
        <Sidebar />
        <section className="market-content" id="apps">
          <div className="market-banner">
            <div><strong>Micirql Business Apps</strong><span>Problem-focused Android apps, dashboards, clinic systems and future downloads.</span></div>
            <a href="/">Back to Website</a>
          </div>

          <section className="market-section dark-showcase">
            <div className="section-title"><div><h2>Featured Apps</h2><p>DMS and future Micirql products</p></div><a href="/#contact">MORE</a></div>
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
