import React from 'react';
import { createRoot } from 'react-dom/client';
import { clients } from './clients';
import { RequestForm } from './RequestForm';
import './styles.css';
import './RequestForm.css';

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

function App() {
  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home"><span className="brand-mark">M</span><span>Micirql</span></a>
        <nav className="nav-links"><a href="#clients">Clients</a><a href="#contact">Requests</a></nav>
        <a className="nav-cta" href="#contact">Start Project</a>
      </header>

      <section id="home" className="hero section-padding">
        <div className="hero-copy">
          <div className="eyebrow">✦ Software company founded by Karthik Raja</div>
          <h1>Android apps and digital software built for modern businesses.</h1>
          <p>Micirql builds Android apps, landing pages, dashboards, clinic software, and custom business software.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">Send Request <span>→</span></a>
            <a className="secondary-button" href="#clients">View Clients</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="phone-shell"><div className="phone-camera" /><div className="phone-screen"><div className="screen-top"><span>Micirql</span><span>✦</span></div><div className="screen-card primary-card"><span>Requests</span><strong>Supabase Ready</strong></div><div className="screen-grid"><span /><span /><span /><span /></div></div></div>
        </div>
      </section>

      <section id="clients" className="section-padding">
        <div className="section-heading"><div className="section-label">Clients</div><h2>Brands and projects connected with Micirql.</h2></div>
        <div className="apps-grid">{clients.map((client) => <Card key={client.name} item={client} />)}</div>
      </section>

      <section id="contact" className="section-padding contact-section">
        <div className="contact-card">
          <div><div className="section-label">Project Request</div><h2>Tell Micirql what you want to build.</h2><p>Your request will be saved in the Veil Supabase table after env keys are configured.</p></div>
          <RequestForm />
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
