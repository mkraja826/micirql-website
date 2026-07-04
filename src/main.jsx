import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Code2,
  Globe2,
  Hospital,
  LayoutDashboard,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react';
import './styles.css';

const navItems = ['Home', 'About', 'Founder', 'Apps', 'Services', 'Contact'];

const apps = [
  {
    name: 'Dental Management System',
    status: 'Pilot Testing',
    icon: Hospital,
    description:
      'A mobile-first clinic management app for patients, visits, appointments, payments, staff, prescriptions, and follow-ups.',
  },
  {
    name: 'Clinic Landing Pages',
    status: 'Available',
    icon: Globe2,
    description:
      'Premium healthcare landing pages with appointment sections, service highlights, gallery, doctor profile, and contact flows.',
  },
  {
    name: 'Business Dashboard Apps',
    status: 'Custom Build',
    icon: LayoutDashboard,
    description:
      'Dashboards for leads, customers, revenue, staff, reports, and daily operations with clean owner-friendly controls.',
  },
  {
    name: 'Startup MVP Apps',
    status: 'Available',
    icon: Rocket,
    description:
      'Idea-to-launch MVP development with Android app UI, landing page, backend setup, and admin dashboard planning.',
  },
];

const services = [
  {
    title: 'Android App Development',
    icon: MonitorSmartphone,
    text: 'Modern Android apps built for real business workflows, not just screens.',
  },
  {
    title: 'Landing Page Design',
    icon: Globe2,
    text: 'Premium websites for clinics, startups, local brands, and digital products.',
  },
  {
    title: 'Business Software',
    icon: ShieldCheck,
    text: 'Simple dashboards, management tools, and automation systems for daily work.',
  },
  {
    title: 'MVP Launch Support',
    icon: Rocket,
    text: 'Fast product planning, app structure, clean UI, and launch-ready foundations.',
  },
];

const stats = [
  ['Android-first', 'Product approach'],
  ['Founder-led', 'Execution'],
  ['3D UI', 'Premium website design'],
  ['Business-ready', 'Digital systems'],
];

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Micirql Home">
        <span className="brand-mark">M</span>
        <span>Micirql</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#contact">
        Start Project
      </a>
    </header>
  );
}

function FloatingPhone() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="phone-shell">
        <div className="phone-camera" />
        <div className="phone-screen">
          <div className="screen-top">
            <span>Micirql OS</span>
            <Sparkles size={16} />
          </div>
          <div className="screen-card primary-card">
            <span>App Store</span>
            <strong>4 Products</strong>
          </div>
          <div className="screen-grid">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="screen-card">
            <span>Build status</span>
            <strong>Launch Ready</strong>
          </div>
        </div>
      </div>
      <div className="float-card float-card-one">
        <Code2 size={18} />
        <span>React + Android</span>
      </div>
      <div className="float-card float-card-two">
        <Store size={18} />
        <span>App Store</span>
      </div>
      <div className="float-card float-card-three">
        <LayoutDashboard size={18} />
        <span>Dashboards</span>
      </div>
    </div>
  );
}

function AppCard({ app }) {
  const Icon = app.icon;
  return (
    <article className="app-card">
      <div className="app-card-head">
        <div className="icon-box">
          <Icon size={24} />
        </div>
        <span className="status">{app.status}</span>
      </div>
      <h3>{app.name}</h3>
      <p>{app.description}</p>
      <a href="#contact" className="card-link">
        View App <ArrowRight size={16} />
      </a>
    </article>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <Icon size={26} />
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  );
}

function App() {
  return (
    <main>
      <Navbar />

      <section id="home" className="hero section-padding">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            Software company founded by Karthik Raja
          </div>
          <h1>Android apps and digital software built for modern businesses.</h1>
          <p>
            Micirql builds Android apps, landing pages, dashboards, and custom business software for
            startups, clinics, and growing companies that need practical products with premium design.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#apps">
              Explore Apps <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#contact">
              Start a Project
            </a>
          </div>
          <div className="stats-row">
            {stats.map(([big, small]) => (
              <div className="stat" key={big}>
                <strong>{big}</strong>
                <span>{small}</span>
              </div>
            ))}
          </div>
        </div>
        <FloatingPhone />
      </section>

      <section id="about" className="section-padding about-section">
        <div className="section-label">About Us</div>
        <div className="split-grid">
          <div>
            <h2>Micirql turns business ideas into working Android apps and web products.</h2>
          </div>
          <div className="glass-panel">
            <p>
              Micirql is a software company focused on building useful software for real-world business
              problems. We design and develop Android apps, landing pages, admin dashboards, booking flows,
              and management systems that are simple, modern, and easy to use.
            </p>
            <p>
              Our mission is to make high-quality software accessible to small businesses, clinics,
              startups, and service providers without unnecessary complexity.
            </p>
          </div>
        </div>
      </section>

      <section id="founder" className="section-padding founder-section">
        <div className="founder-card">
          <div className="founder-avatar">
            <UserRound size={72} />
          </div>
          <div className="founder-content">
            <div className="section-label">Founder Page</div>
            <h2>Karthik Raja</h2>
            <h3>Founder of Micirql</h3>
            <p>
              Karthik Raja founded Micirql with a clear vision: build practical Android apps and software
              products that help businesses move faster. Micirql is built around clean design, useful
              features, and fast execution.
            </p>
            <div className="founder-tags">
              <span>Android Apps</span>
              <span>Landing Pages</span>
              <span>Dashboards</span>
              <span>MVP Builds</span>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="section-padding apps-section">
        <div className="section-heading">
          <div className="section-label">Micirql App Store</div>
          <h2>Explore apps and digital products built by Micirql.</h2>
          <p>
            A product-style store page for Micirql apps, MVPs, clinic systems, landing pages, and custom
            business tools.
          </p>
        </div>
        <div className="apps-grid">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </section>

      <section id="services" className="section-padding services-section">
        <div className="section-heading">
          <div className="section-label">Services</div>
          <h2>Software development with a business-first approach.</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section id="contact" className="section-padding contact-section">
        <div className="contact-card">
          <div>
            <div className="section-label">Contact</div>
            <h2>Have an app idea?</h2>
            <p>
              Let Micirql help you turn it into an Android app, landing page, dashboard, or complete
              business software platform.
            </p>
          </div>
          <div className="contact-list">
            <a href="mailto:karthikraja826@gmail.com">
              <Mail size={18} /> karthikraja826@gmail.com
            </a>
            <a href="tel:+910000000000">
              <Phone size={18} /> Contact number placeholder
            </a>
            <span>
              <MapPin size={18} /> India
            </span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="brand">
          <span className="brand-mark">M</span>
          <span>Micirql</span>
        </div>
        <p>Android apps and digital software built for modern businesses.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
