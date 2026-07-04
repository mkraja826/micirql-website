import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './apps-page.css';

const apps = [
  {
    name: 'DMS Dental Management System',
    category: 'Clinic Management',
    status: 'APK Coming Soon',
    icon: '🏥',
    rating: 'Pilot',
    size: 'Android APK',
    description: 'Patient records, visits, appointments, queue, payments, prescriptions, and follow-ups for dental clinics.',
    features: ['Patients', 'Queue', 'Payments', 'Follow-ups'],
  },
  {
    name: 'Clinic Website System',
    category: 'Healthcare Websites',
    status: 'Available',
    icon: '🌐',
    rating: 'New',
    size: 'Web App',
    description: 'Professional clinic website package for appointment enquiries, service pages, gallery, and doctor profile.',
    features: ['Landing page', 'Gallery', 'Booking', 'SEO ready'],
  },
  {
    name: 'Business Dashboard App',
    category: 'Business Tools',
    status: 'Custom Build',
    icon: '📊',
    rating: 'Custom',
    size: 'Dashboard',
    description: 'Owner dashboard for leads, staff, revenue, reports, and daily business operations.',
    features: ['Reports', 'Leads', 'Revenue', 'Staff'],
  },
  {
    name: 'Startup MVP App',
    category: 'MVP Development',
    status: 'Available',
    icon: '🚀',
    rating: 'Custom',
    size: 'Android + Web',
    description: 'Fast MVP build for founders who need a clean app, landing page, backend, and admin panel.',
    features: ['Android', 'Backend', 'Admin', 'Launch'],
  },
];

function StoreCard({ app, featured }) {
  return (
    <article className={featured ? 'store-card featured-store-card' : 'store-card'}>
      <div className="store-icon">{app.icon}</div>
      <div className="store-info">
        <div className="store-row"><span className="store-category">{app.category}</span><span className="store-status">{app.status}</span></div>
        <h2>{app.name}</h2>
        <p>{app.description}</p>
        <div className="store-meta"><span>{app.rating}</span><span>{app.size}</span><span>Micirql</span></div>
        <div className="store-tags">{app.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
      </div>
      <div className="store-action">
        {app.name.startsWith('DMS') ? <button disabled>Coming Soon</button> : <a href="/#contact">Request</a>}
      </div>
    </article>
  );
}

function AppsPage() {
  return (
    <main className="appstore-page">
      <header className="store-nav">
        <a className="brand" href="/"><span className="brand-mark">M</span><span>Micirql</span></a>
        <a className="nav-cta" href="/">Back Home</a>
      </header>

      <section className="store-hero">
        <div>
          <div className="eyebrow">✦ Micirql Apps</div>
          <h1>Business apps built for real problems.</h1>
          <p>A professional app-store style hub for DMS and future Micirql products. Download links will appear here when apps are ready.</p>
        </div>
        <div className="store-search">Search Micirql apps</div>
      </section>

      <section className="store-section">
        <div className="section-heading"><div className="section-label">Featured</div><h2>DMS Dental Management System</h2><p>The first major Micirql app, built for clinic workflow and pilot usage.</p></div>
        <StoreCard app={apps[0]} featured />
      </section>

      <section className="store-section">
        <div className="section-heading"><div className="section-label">All Apps</div><h2>Explore Micirql products.</h2></div>
        <div className="store-list">{apps.slice(1).map((app) => <StoreCard key={app.name} app={app} />)}</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<AppsPage />);
