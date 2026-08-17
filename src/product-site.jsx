import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RequestForm } from './RequestForm';
import './product-site.css';
import './RequestForm.css';

const BUILDER_URL = 'https://builder.micirql.com/';

const industries = ['Clinic', 'Restaurant', 'Real estate', 'SaaS', 'Construction', 'Professional services'];
const steps = [
  ['01','Tell us about the business','Services, audience, location, goals, languages and the functionality you need become a structured brief.'],
  ['02','MiCirql chooses the system','The engine selects page structure, design direction, components and capabilities from a maintained library.'],
  ['03','Choose a direction','Compare complete visual directions using the same business content instead of guessing from tiny theme swatches.'],
  ['04','Edit on the website','Click text, replace images, drag sections, switch themes and tune typography, spacing and motion visually.'],
  ['05','Add real functionality','Forms, authentication, databases, dashboards and business workflows can be connected when the website needs them.'],
  ['06','Publish or export','Use a custom domain with MiCirql hosting or export the finished site and publish it wherever you want.'],
];

const faqs = [
  ['Is this just another prompt-to-website generator?','No. AI helps decide what to use, while layouts, controls and section systems come from a reusable library designed to stay editable and maintainable.'],
  ['Can I edit the generated website myself?','Yes. The editor is canvas-first: change text in place, replace images, reorder sections and switch complete design systems without touching code.'],
  ['Can MiCirql add a backend?','Yes. The platform is being built for forms, authentication, databases, dashboards and other business functionality—not only static pages.'],
  ['Do I have to host with MiCirql?','No. Managed hosting and maintenance are optional. The product is designed so the website can also be exported and hosted elsewhere.'],
];

function Logo(){return <a className="brand" href="#top" aria-label="MiCirql home"><img src="/micirql-mark-new.webp?v=3" alt=""/><span>MICIRQL</span></a>}

function App(){
  const [menu,setMenu]=useState(false);
  const [industry,setIndustry]=useState('Clinic');
  const [faq,setFaq]=useState(0);
  return <div className="site-shell" id="top">
    <header className="topbar"><Logo/><nav className={menu?'open':''}><a href="#how" onClick={()=>setMenu(false)}>How it works</a><a href="#designs" onClick={()=>setMenu(false)}>Design system</a><a href="#backend" onClick={()=>setMenu(false)}>Backend</a><a href="#faq" onClick={()=>setMenu(false)}>FAQ</a><a className="nav-login" href={BUILDER_URL}>Sign in</a><a className="nav-cta" href={BUILDER_URL}>Start building</a></nav><button className="menu" onClick={()=>setMenu(v=>!v)} aria-label="Toggle navigation"><span/><span/></button></header>

    <main>
      <section className="hero">
        <div className="hero-copy"><div className="pill"><i/> Website building, rethought</div><h1>Describe your business.<br/><em>Get a website built around it.</em></h1><p>MiCirql chooses the structure, design system and functionality. You refine it visually, then publish with us or export the finished website.</p><div className="hero-actions"><a className="primary" href={BUILDER_URL}>Start building <span>↗</span></a><a className="secondary" href="#how">See how it works</a></div><div className="hero-proof"><span>No code required</span><span>Backend-ready</span><span>Exportable</span></div></div>
        <div className="builder-demo" aria-label="MiCirql builder preview"><div className="demo-head"><span><i/><i/><i/></span><b>builder.micirql.com</b><small>LIVE</small></div><div className="demo-body"><aside><strong>M</strong><button className="active">⌂</button><button>◇</button><button>◫</button><button>⚙</button></aside><div className="demo-canvas"><div className="canvas-top"><span>Homepage</span><div><button>Mobile</button><button className="active">Desktop</button></div></div><div className="website-card"><div className="mini-nav"><strong>ARC DENTAL</strong><span>About &nbsp; Treatments &nbsp; Cases</span><button>Book visit</button></div><div className="mini-hero"><div><small>ADVANCED IMPLANT DENTISTRY</small><h2>Confident smiles,<br/>planned precisely.</h2><p>Guided implant care with a clear treatment journey.</p><button>Request assessment</button></div><div className="mini-art"><span>25+</span><small>years experience</small></div></div><div className="mini-strip"><span>Implants</span><span>Guided surgery</span><span>Full-mouth care</span></div></div></div><div className="demo-panel"><small>DESIGN</small><strong>Premium Clinic</strong><label>Palette<div className="swatches"><i/><i/><i/><i/></div></label><label>Density<select><option>Balanced</option></select></label><label>Motion<select><option>Subtle</option></select></label><button>Apply design</button></div></div></div>
      </section>

      <section className="logo-line"><span>BUILT FOR</span>{industries.map(x=><button key={x} className={industry===x?'active':''} onClick={()=>setIndustry(x)}>{x}</button>)}</section>

      <section className="section intro" id="how"><div className="section-label">01 / HOW IT WORKS</div><div className="section-title"><h2>AI makes the decisions.<br/>The system keeps them usable.</h2><p>Instead of generating an entire interface from nothing every time, MiCirql combines structured discovery with a maintained component and design library.</p></div><div className="steps">{steps.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

      <section className="section dark" id="designs"><div className="section-label light">02 / DESIGN SYSTEM</div><div className="section-title light"><h2>One business brief.<br/>Multiple credible directions.</h2><p>Choose complete design systems instead of wrestling with isolated fonts, colors and template fragments.</p></div><div className="direction-grid"><article className="direction violet"><header><span>01</span><b>Recommended</b></header><div className="direction-preview"><small>PREMIUM / CLINIC</small><h3>Precision feels reassuring.</h3><p>Editorial typography, restrained motion and high-trust spacing.</p></div><footer>Premium Implant Clinic <span>↗</span></footer></article><article className="direction blue"><header><span>02</span><b>Alternative</b></header><div className="direction-preview"><small>MODERN / CLINIC</small><h3>Clear. Calm. Clinical.</h3><p>Bright surfaces, direct navigation and approachable patient journeys.</p></div><footer>Modern Dental Clinic <span>↗</span></footer></article><article className="direction warm"><header><span>03</span><b>Alternative</b></header><div className="direction-preview"><small>HUMAN / CARE</small><h3>Healthcare with warmth.</h3><p>Organic shapes, softer contrast and content-led storytelling.</p></div><footer>Human Care <span>↗</span></footer></article></div></section>

      <section className="section backend" id="backend"><div className="backend-copy"><div className="section-label">03 / BEYOND THE PAGE</div><h2>A website is only useful when it can do the work.</h2><p>MiCirql is designed to continue past the visual layer. Add the functions your business actually needs, while keeping the website experience in one system.</p><a className="primary" href={BUILDER_URL}>Start with your business <span>↗</span></a></div><div className="backend-grid"><article><span>01</span><h3>Forms & enquiries</h3><p>Capture leads directly into a secure backend instead of losing them in static forms.</p></article><article><span>02</span><h3>Authentication</h3><p>Add customer, staff or member access when the product needs private experiences.</p></article><article><span>03</span><h3>Database workflows</h3><p>Store structured business data and connect real operational workflows.</p></article><article><span>04</span><h3>Publishing & domains</h3><p>Take the finished project to a custom domain or export it for another host.</p></article></div></section>

      <section className="section compare"><div className="section-label">04 / WHAT CHANGES</div><div className="compare-grid"><div><small>TYPICAL AI BUILDER</small><h3>Prompt → generated page → fight the output.</h3><ul><li>One-off generated structure</li><li>Generic visual decisions</li><li>Functionality becomes a separate problem</li><li>Hard to build a reusable design library</li></ul></div><div className="ours"><small>MICIRQL</small><h3>Discover → decide → design → function → ship.</h3><ul><li>Structured business understanding</li><li>Curated sections and industry systems</li><li>Canvas-first visual editing</li><li>Backend, domain and export path included</li></ul></div></div></section>

      <section className="section faq" id="faq"><div><div className="section-label">05 / FAQ</div><h2>The important questions.</h2></div><div className="faq-list">{faqs.map(([q,a],i)=><button key={q} className={faq===i?'active':''} onClick={()=>setFaq(faq===i?-1:i)}><span><b>0{i+1}</b>{q}<em>{faq===i?'−':'+'}</em></span>{faq===i&&<p>{a}</p>}</button>)}</div></section>

      <section className="section contact"><div className="contact-copy"><div className="section-label light">06 / TALK TO US</div><h2>Need the builder—or something beyond it?</h2><p>Use MiCirql yourself, or tell us what needs custom backend, integration or product engineering.</p><div className="contact-actions"><a href={BUILDER_URL}>Open builder ↗</a><a href="mailto:support@micirql.com">support@micirql.com</a></div></div><div className="form-wrap"><RequestForm/></div></section>
    </main>

    <footer><Logo/><p>Website builder + product engineering.</p><div><a href={BUILDER_URL}>Builder</a><a href="#how">How it works</a><a href="#backend">Backend</a><a href="mailto:support@micirql.com">Contact</a></div><small>© 2026 MiCirql · India</small></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
