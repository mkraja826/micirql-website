import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './blogs.css';

const micirqlLogoUrl = 'https://pub-a30eed1be922456381eeec57b51e396a.r2.dev/brand/micirql.png';

const blogs = [
  {
    id: 'dental-clinic-management-system',
    category: 'Dental Software',
    readTime: '5 min read',
    title: 'Why Every Growing Dental Clinic Needs a Simple Digital Management System',
    description: 'A practical guide for dental clinics that still depend on paper files, manual follow-ups, and scattered patient records.',
    keywords: ['Dental Management System', 'Clinic Software', 'Patient Records'],
    paragraphs: [
      'Many dental clinics do not fail because the doctor is not skilled. They struggle because the daily workflow depends too much on memory, notebooks, paper files, and manual communication. When patient details, medical history, prescription photos, X-rays, payments, and follow-up dates are stored in different places, the clinic slowly becomes difficult to manage.',
      'A simple dental management system helps the receptionist, doctor, and owner work from the same patient record. The receptionist can register the patient, collect the consultation fee, and update basic medical history. The doctor can quickly view previous visits, add treatment notes, upload prescription images, add charges, and set the next appointment. The owner can see revenue, pending payments, staff activity, and patient flow without asking everyone separately.',
      'The best clinic software should not make doctors type too much. In a busy dental clinic, speed matters. A practical DMS should support quick chief complaint selection, direct camera upload for prescription and X-ray images, simple payment tracking, and WhatsApp-ready follow-up reminders. This keeps the software close to the real workflow instead of forcing the clinic to change everything on day one.',
      'For growing clinics, digital records also create long-term value. A returning patient can be handled faster because the doctor can instantly check previous treatment, medical conditions, pending balance, and appointment history. This improves patient experience and reduces mistakes. Micirql builds clinic software with this exact goal: simple digital systems for real clinic problems.'
    ]
  },
  {
    id: 'mvp-planning',
    category: 'Startup MVP',
    readTime: '4 min read',
    title: 'How to Plan an MVP Before Spending Money on Full App Development',
    description: 'Before building a full product, founders should validate the smallest useful version that can solve one real problem.',
    keywords: ['MVP Development', 'Startup App', 'Product Planning'],
    paragraphs: [
      'A common mistake founders make is trying to build the full dream app in the first version. They imagine every screen, every automation, every subscription plan, and every advanced feature before the first user has even tested the product. This increases cost, delays launch, and makes the product harder to improve.',
      'A better approach is to define the MVP: the minimum valuable product. This is not a low-quality version. It is the smallest useful version that solves one clear problem for one specific type of user. For example, a clinic app MVP may only need patient registration, visit entry, payment tracking, and follow-up reminders. A service booking MVP may only need owner listing, customer request, location, and WhatsApp contact.',
      'Good MVP planning starts with three questions: Who is the user? What problem are they facing daily? What is the fastest digital workflow that makes their work easier? Once these answers are clear, the first version can be designed with fewer screens, cleaner navigation, and better testing speed.',
      'Micirql focuses on MVP development for founders, clinics, local businesses, and service providers who want practical software without unnecessary complexity. The goal is simple: launch the usable core first, collect feedback, then improve based on real users instead of assumptions.'
    ]
  },
  {
    id: 'android-app-development',
    category: 'Android Apps',
    readTime: '5 min read',
    title: 'Android App Development for Small Businesses: What to Build First',
    description: 'Small businesses should not start with a huge app. They should start with the workflow that saves time or brings customers.',
    keywords: ['Android App Development', 'Business App', 'Mobile App'],
    paragraphs: [
      'For many small businesses in India, Android is the most practical first platform. Staff, owners, field workers, and customers already use Android phones every day. A good Android app can help a business collect orders, manage appointments, track payments, record customer details, or communicate faster.',
      'The first version of a business Android app should focus on one important workflow. A dental clinic may need visit records and reminders. A JCB service business may need booking requests and owner availability. A wholesaler may need product lists and multilingual communication. A startup may need user onboarding and one core feature. Building everything at once often creates confusion.',
      'The best small business apps are simple, fast, and role-based. The owner should see reports and controls. Staff should see only the actions they need. Customers should complete their task in very few steps. This reduces training time and makes the app easier to adopt.',
      'Micirql builds Android-first apps with a business workflow approach. Instead of designing only attractive screens, we map the actual daily work and create a product that helps people complete tasks faster. This is what makes an app useful after launch.'
    ]
  },
  {
    id: 'business-dashboards',
    category: 'Dashboards',
    readTime: '4 min read',
    title: 'Business Dashboards: Turning Daily Work Into Clear Decisions',
    description: 'A dashboard is useful only when it helps owners understand customers, revenue, staff activity, and pending work quickly.',
    keywords: ['Business Dashboard', 'Admin Panel', 'Reports'],
    paragraphs: [
      'A business dashboard is not just a page with charts. It is the control room of a business. For a clinic, it can show today’s patients, completed visits, pending payments, follow-ups, and staff activity. For a startup, it can show users, leads, transactions, feedback, and growth signals. For a local service business, it can show bookings, requests, revenue, and customer status.',
      'The biggest value of a dashboard is clarity. Owners should not spend time asking different people for updates. A dashboard should answer important questions quickly: How much revenue came today? Who added this entry? Which payment is pending? Which customer needs follow-up? Which service is getting more demand?',
      'A good admin panel should also protect the workflow. Not every staff member needs every permission. Owners may need delete rights, financial reports, exports, and staff management. Staff may only need entry, update, and daily work tools. Role-based design keeps the system safer and easier to use.',
      'Micirql creates dashboards that are simple, practical, and owner-friendly. The focus is not on complicated visuals. The focus is on useful information, clean controls, and faster decisions for real businesses.'
    ]
  },
  {
    id: 'landing-pages',
    category: 'Websites',
    readTime: '4 min read',
    title: 'Landing Pages That Convert: What Local Businesses Should Include',
    description: 'A landing page should clearly explain who you help, what you offer, why people should trust you, and how to contact you.',
    keywords: ['Landing Page Design', 'Business Website', 'Local SEO'],
    paragraphs: [
      'A landing page is often the first impression of a business. For clinics, service providers, factories, consultants, and startups, the website should not only look modern. It should help visitors understand the business quickly and take action without confusion.',
      'A strong landing page usually needs a clear hero section, service highlights, trust points, contact options, location details, images, reviews or proof, and a simple call-to-action. For a dental clinic, this may include doctor profile, treatments, equipment quality, gallery, appointment button, and map. For a software company, it may include services, apps, client projects, founder vision, and project request form.',
      'Mobile design is especially important because many visitors open websites from phones. Buttons should be easy to tap, text should be readable, contact options should be visible, and the page should load fast. A beautiful desktop page is not enough if the mobile experience is weak.',
      'Micirql designs landing pages with a practical conversion approach. The goal is to make the business look trustworthy, explain the offer clearly, and help users contact the business faster.'
    ]
  },
  {
    id: 'clinic-follow-up-reminders',
    category: 'Clinic Growth',
    readTime: '4 min read',
    title: 'Why Clinic Follow-Up Reminders Improve Patient Experience',
    description: 'Follow-up reminders help clinics reduce missed reviews, improve continuity of care, and maintain better patient relationships.',
    keywords: ['Clinic Follow-Up', 'Patient Reminder', 'WhatsApp Reminder'],
    paragraphs: [
      'In clinics, treatment does not always end on the first visit. Dental reviews, braces adjustments, root canal sittings, extraction checks, cleaning follow-ups, and pending treatment plans all need proper reminders. When reminders depend only on memory or paper notes, patients can easily be missed.',
      'A simple follow-up system helps the clinic know who needs to be contacted and when. The receptionist or doctor can set the next appointment date and time during the visit. Later, the clinic can open a ready-to-send message through WhatsApp or another contact method. This saves time and makes communication consistent.',
      'Follow-up reminders also improve patient trust. Patients feel that the clinic is organized and responsible. For doctors, it improves continuity because the previous visit, prescription, X-ray, treatment plan, and pending amount can be checked before the patient returns.',
      'Micirql’s clinic software direction gives importance to reminders because they connect patient care with daily clinic operations. A good reminder feature should be simple, fast, and connected to the patient profile instead of being managed separately.'
    ]
  },
  {
    id: 'custom-software-vs-ready-made',
    category: 'Custom Software',
    readTime: '5 min read',
    title: 'Custom Software vs Ready-Made Software: Which Is Better for Your Business?',
    description: 'Ready-made tools are faster to start, but custom software can match the exact workflow of a business when operations become specific.',
    keywords: ['Custom Software', 'Ready-Made Software', 'Business Automation'],
    paragraphs: [
      'Many businesses face the same question: should we buy ready-made software or build custom software? The answer depends on the workflow, budget, urgency, and how unique the business process is. Ready-made tools are useful when the requirement is common and the business can adjust to the software. Custom software is useful when the software must adjust to the business.',
      'For example, a simple billing tool may be enough for a small shop. But a clinic that wants role-based patient records, prescription photo uploads, OP fee collection, medication fee tracking, staff permissions, pending amounts, and follow-up reminders may need a system built around its exact workflow. The same applies to factories, local service businesses, and startups with unique operating models.',
      'Custom software should not mean overbuilding. A smart approach is to start with the core workflow, launch it, test it with real users, and then add advanced modules. This reduces risk and keeps cost under control. The business gets a system that grows with actual usage instead of guesswork.',
      'Micirql helps businesses choose the practical path. Sometimes a landing page is enough. Sometimes an admin dashboard is needed. Sometimes an Android app or complete business software system makes sense. The goal is always to solve the problem in the simplest useful way.'
    ]
  }
];

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand brand-with-logo" href="/" aria-label="Micirql Home">
        <img className="brand-logo" src={micirqlLogoUrl} alt="Micirql" />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/dental-management-system/">DMS Clinic</a>
        <a href="/apps/">Apps</a>
        <a href="/blogs/">Blogs</a>
        <a href="/#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="/#contact">Start Project</a>
    </header>
  );
}

function BlogCard({ blog }) {
  return (
    <a className="blog-card" href={`#${blog.id}`}>
      <div className="blog-card-top">
        <span className="blog-category">{blog.category}</span>
        <span className="blog-read-time">{blog.readTime}</span>
      </div>
      <h2>{blog.title}</h2>
      <p>{blog.description}</p>
      <div className="blog-keywords">{blog.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
      <strong>Read article →</strong>
    </a>
  );
}

function BlogArticle({ blog, index }) {
  return (
    <article className="blog-article" id={blog.id}>
      <div className="article-meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{blog.category}</span>
        <span>{blog.readTime}</span>
      </div>
      <h2>{blog.title}</h2>
      <p className="article-summary">{blog.description}</p>
      {blog.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className="blog-keywords article-tags">{blog.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
    </article>
  );
}

function App() {
  return (
    <main>
      <Navbar />
      <section className="blog-hero section-padding">
        <div className="blog-hero-copy">
          <div className="eyebrow">✦ Micirql Blogs</div>
          <h1>Helpful software guides for clinics, startups, and growing businesses.</h1>
          <p>Practical articles about Android app development, dental clinic software, MVP planning, dashboards, landing pages, follow-up systems, and custom business software.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#blog-list">Explore Blogs <span>→</span></a>
            <a className="secondary-button" href="/#contact">Request a Project</a>
          </div>
        </div>
        <div className="blog-hero-panel" aria-hidden="true">
          <span>SEO Topics</span>
          <strong>7 helpful guides</strong>
          <p>Built around real business software problems Micirql solves.</p>
        </div>
      </section>

      <section id="blog-list" className="section-padding blog-list-section">
        <div className="section-heading">
          <div className="section-label">Latest Guides</div>
          <h2>Read practical software articles from Micirql.</h2>
          <p>Each blog is written to help business owners, clinic teams, and founders understand what to build and why it matters.</p>
        </div>
        <div className="blog-card-grid">
          {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </section>

      <section className="section-padding blog-articles-section">
        {blogs.map((blog, index) => <BlogArticle key={blog.id} blog={blog} index={index} />)}
      </section>

      <section className="section-padding blog-cta-section">
        <div className="contact-card blog-cta-card">
          <div>
            <div className="section-label">Build With Micirql</div>
            <h2>Need software for your clinic, startup, or business?</h2>
            <p>Micirql can help you plan and build Android apps, landing pages, dashboards, clinic systems, and custom workflow software.</p>
          </div>
          <a className="primary-button" href="/#contact">Start a Project <span>→</span></a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
