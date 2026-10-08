import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { site, asset } from './config.js';
import { pages } from './policies.js';

const Navigation = createContext(null);
const paths = {
  arrow: ['M7 17 17 7M7 7h10v10'],
  chevron: ['m9 5 7 7-7 7'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87','M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'],
  clock: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 6v6l4 2'],
  check: ['m5 12 4 4L19 6'],
  shield: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11','m9 12 2 2 4-4'],
  message: ['M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z'],
  task: ['M9 5H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4M9 2h6v6H9z','m8 15 3 3 5-6'],
  meal: ['M4 3v7a2 2 0 0 0 4 0V3M6 3v19M14 3v8h5M19 3v19'],
  document: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
  database: ['M20 5c0 2-3.6 3-8 3S4 7 4 5s3.6-3 8-3 8 1 8 3M4 5v14c0 2 3.6 3 8 3s8-1 8-3V5M4 12c0 2 3.6 3 8 3s8-1 8-3'],
  plus: ['M12 5v14M5 12h14'],
  menu: ['M4 6h16M4 12h16M4 18h16'],
  x: ['m6 6 12 12M6 18 18 6'],
  home: ['m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8'],
  mail: ['M3 4h18v16H3z','m3 5 9 7 9-7'],
  spark: ['m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z'],
};
function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{(paths[name] || paths.spark).map((d, i) => <path d={d} key={i} />)}</svg>;
}
const repoPrefix = '/necTeam-official';
function Link({ href, onClick, children, ...props }) {
  const navigate = useContext(Navigation);
  const isGh = typeof window !== 'undefined' && window.location.pathname.startsWith(repoPrefix);
  const targetHref = isGh && href.startsWith('/') ? `${repoPrefix}${href}` : href;
  return <a href={targetHref} {...props} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && !props.target && href.startsWith('/')) {
      event.preventDefault(); navigate(href);
    }
  }}>{children}</a>;
}
function Brand() {
  return <Link href="/" className="brand" aria-label="NEC TEAM home"><img src={site.logo} width="42" height="42" alt="NEC TEAM logo" /><span>NEC TEAM<small>by NEONECY</small></span></Link>;
}
function Header({ openStore }) {
  const [menu, setMenu] = useState(false);
  return <header className="site-header"><div className="container nav-row"><Brand />
    <button className="menu-toggle icon-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="site-nav" onClick={() => setMenu(!menu)}><Icon name={menu ? 'x' : 'menu'} /></button>
    <nav id="site-nav" className={`nav-links ${menu ? 'is-open' : ''}`} aria-label="Main navigation">
      <Link href="/#features" onClick={() => setMenu(false)}>Features</Link><Link href="/#privacy" onClick={() => setMenu(false)}>Privacy & trust</Link><Link href="/support" onClick={() => setMenu(false)}>Contact</Link>
      <button className="button button-small button-dark" onClick={() => { setMenu(false); openStore('NEC TEAM'); }}>Get the app <Icon name="arrow" size={16} /></button>
    </nav></div></header>;
}
function StoreButtons({ openStore }) {
  return (
    <div className="store-buttons">
      <button
        type="button"
        className="store-button"
        onClick={() => openStore('Google Play')}
        aria-label="Coming soon on Google Play"
      >
        <img src={asset('assets/playstore.png')} alt="Google Play" width="26" height="26" />
        <span className="store-button-text">
          <small>COMING SOON ON</small>
          <strong>Google Play</strong>
        </span>
        <Icon name="arrow" size={15} />
      </button>
      <button
        type="button"
        className="store-button"
        onClick={() => openStore('App Store')}
        aria-label="Coming soon on App Store"
      >
        <img src={asset('assets/apple-logo.png')} alt="App Store" width="26" height="26" />
        <span className="store-button-text">
          <small>COMING SOON ON</small>
          <strong>App Store</strong>
        </span>
        <Icon name="arrow" size={15} />
      </button>
    </div>
  );
}

const previewScreens = [
  {
    id: 'login',
    title: 'Sign In',
    badge: 'Employee Sign In',
    src: asset('assets/login.png'),
    alt: 'NEC TEAM login and authentication screen'
  },
  {
    id: 'employee',
    title: 'Staff Dashboard',
    badge: 'Attendance & Leads',
    src: asset('assets/employee_dashboard.png'),
    alt: 'NEC TEAM employee dashboard screen'
  },
  {
    id: 'admin',
    title: 'Admin Console',
    badge: 'Workforce & Lunch',
    src: asset('assets/admin_dashboard.png'),
    alt: 'NEC TEAM admin management console screen'
  }
];

function AppPreview() {
  const [activeId, setActiveId] = useState('employee');
  const activeIndex = previewScreens.findIndex(s => s.id === activeId);

  return (
    <div className="preview-scene" aria-label="Interactive preview of the NEC TEAM app">
      <div className="scene-grid" />
      <div className="scene-orbit orbit-one" />
      <div className="scene-orbit orbit-two" />

      <div className="preview-selector" role="tablist" aria-label="App screen previews">
        {previewScreens.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeId === s.id}
            className={`selector-tab ${activeId === s.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="floating-note note-top">
        <span className="note-icon green"><Icon name="check" size={16} /></span>
        <div>A little less busy.<small>A lot more organized.</small></div>
      </div>

      <div className="screens-deck">
        {previewScreens.map((screen, idx) => {
          const offset = idx - activeIndex;
          const isSelected = offset === 0;
          return (
            <div
              key={screen.id}
              className={`phone-frame pos-${offset} ${isSelected ? 'is-focused' : ''}`}
              onClick={() => setActiveId(screen.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveId(screen.id); }}
              aria-label={`View ${screen.title}`}
            >
              <div className="phone-bezel">
                <img src={screen.src} alt={screen.alt} className="phone-screen-img" />
              </div>
              <span className="screen-badge">{screen.badge}</span>
            </div>
          );
        })}
      </div>

      <div className="floating-note note-bottom">
        <span className="note-icon purple"><Icon name="spark" size={18} /></span>
        <div>One team. One workspace.<small>Made for everyday progress.</small></div>
      </div>

      <span className="preview-caption">REAL APP SCREENS · SELECT ANY VIEW TO EXPLORE</span>
    </div>
  );
}

const features = [
  ['users','People, in one place.','Employee profiles, roles and access. A clear home for the people behind your work.','purple'],
  ['clock','Make every day count.','Explore check-ins, leave requests, overtime and a monthly attendance view.','blue'],
  ['task','Keep work moving.','Organize leads, follow-ups and tasks so the next step is always easy to find.','orange'],
  ['meal','Lunch, minus the guesswork.','Staff can update their lunch choice. Admins get a simple view of the day’s needs.','green'],
  ['message','Room for conversation.','Preview messages, attachments, replies and reactions in a familiar chat interface.','pink'],
  ['shield','The right view for every role.','Separate staff and admin experiences, with management tools where they belong.','purple'],
];
const questions = [
  ['Can I download the app now?', 'Public Google Play and App Store downloads are coming soon. Internal and closed testing use the invitations or links shared by the testing organizer.'],
  ['What can I explore in the testing version?', 'The current version is a local demo of profiles, leads, tasks, attendance, lunch preferences, conversations and admin tools. Data and changes do not synchronize between devices.'],
  ['Where can I find privacy and deletion information?', 'The information center below links to our Privacy Policy, Data Collection summary, Terms & Conditions and Account & Data Deletion instructions. No app login is needed to read them.'],
];
function Home({ openStore }) {
  return <main id="main">
    <section className="hero container"><div className="hero-copy"><div className="release-pill"><span /> A clearer workday is coming</div><h1>Your team.<br />One clear<br /><span>workspace.</span></h1><p>People, leads, tasks, and all the little things that keep your team moving. Together in NEC TEAM.</p><StoreButtons openStore={openStore} /><div className="hero-note"><Icon name="check" size={15} /> Made for Android & iOS <span>·</span> By NEONECY</div></div><AppPreview /></section>
    <section className="workflow-strip container" aria-label="App areas">{[['users','People & access'],['clock','Attendance & leave'],['task','Leads & tasks'],['message','Team conversations']].map(([icon,title]) => <div key={title}><Icon name={icon} size={19} /><span>{title}</span></div>)}</section>
    <section id="features" className="features-section container"><div className="section-heading"><div><span className="eyebrow">LESS SWITCHING. MORE DOING.</span><h2>A home for your<br />team’s everyday work.</h2></div><p>Thoughtful tools for the day-to-day.<br />A familiar experience for everyone.</p></div><div className="feature-grid">{features.map(([icon,title,body,color],index) => <article className="feature-card" key={title}><div className={`feature-icon ${color}`}><Icon name={icon} size={24} /></div><span className="feature-number">0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><p className="demo-note"><span className="green-dot" /> Currently in testing. Explore these features with local demo data.</p></section>
    <section id="privacy" className="trust-section container"><div className="trust-copy"><span className="eyebrow">CLARITY, BEYOND THE INTERFACE.</span><h2>Your information.<br />No guesswork.</h2><p>Know what the app uses, understand your choices, and find help when you need it.</p><Link href="/privacy-policy" className="text-link">Read our privacy policy <Icon name="arrow" size={18} /></Link></div><div className="trust-links">{[['database','Know what is used','A plain-language overview of data and permissions.','/data-collection'],['trash','Choose what stays','Local deletion steps and an easy request route.','/data-deletion'],['message','Talk to us','Questions or feedback? We’re just an email away.','/support']].map(([icon,title,text,href]) => <Link href={href} className="trust-link" key={title}><span className="trust-icon"><Icon name={icon} /></span><span><strong>{title}</strong><small>{text}</small></span><Icon name="arrow" size={18} /></Link>)}</div></section>
    <section id="faq" className="faq-section container"><div><span className="eyebrow">A FEW GOOD QUESTIONS.</span><h2>Before you<br />get started.</h2><p>Something else on your mind?<br /><Link href="/support" className="text-link">Get in touch <Icon name="arrow" size={16} /></Link></p></div><div className="faq-list">{questions.map(([title,body]) => <details key={title}><summary>{title}<Icon name="plus" size={18} /></summary><p>{body}</p></details>)}</div></section>
    <section id="download" className="download-section container"><div className="download-orb" /><div className="download-copy"><span className="eyebrow">A LITTLE CLARITY GOES A LONG WAY.</span><h2>A clearer workday,<br />coming soon.</h2><p>Meet your team’s next favorite workspace.</p><StoreButtons openStore={openStore} /></div></section>
    <section className="featured-banner-section container" aria-label="NEC TEAM featured overview"><div className="featured-banner-card"><img src={asset('assets/featured-screen.png')} alt="NEC TEAM — Everything Your Team Needs" width="1120" height="547" loading="lazy" /></div></section>
    <section id="about" className="company-section container" aria-label="More information about NEONECY">
      <div className="company-card">
        <div className="company-orb" />
        <div className="company-copy">
          <span className="eyebrow">ABOUT NEONECY</span>
          <h2>Thoughtful technology for forward-thinking teams.</h2>
          <p>NEC TEAM is developed by NEONECY. For more info about our work, company updates, and upcoming releases, visit our official website.</p>
        </div>
        <div className="company-action">
          <a
            href={site.website}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary company-btn"
          >
            Visit neonecy.com <Icon name="arrow" size={16} />
          </a>
          <span className="company-subtext">Official homepage & updates</span>
        </div>
      </div>
    </section>
  </main>;
}
function DeletionRequest() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Account and associated data');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_22pg0de';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x1vivzb';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'jnbpVMMxod5JhAL7B';

  async function submit(event) {
    event.preventDefault();
    if (!email) return;

    setStatus('sending');
    setErrorMsg('');

    const templateParams = {
      request_type: type,
      name: name.trim() || email.split('@')[0] || 'Team Member',
      email: email.trim(),
      time: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      message: details.trim() || `Request for: ${type}`
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setName('');
      setEmail('');
      setDetails('');
    } catch (err) {
      console.error('EmailJS submission error:', err);
      setStatus('error');
      setErrorMsg(err?.text || err?.message || 'Failed to submit request. Please try again.');
    }
  }

  return (
    <section className="request-card">
      <div className="request-title">
        <span className="feature-icon purple"><Icon name="mail" /></span>
        <div>
          <h2>Prepare a deletion request</h2>
          <p>No app login needed. Sent directly to our team.</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="form-status success" role="status">
          <strong>Request submitted successfully!</strong>
          <p>We’ve received your request and will process it shortly. We will reach out to your work email if verification is needed.</p>
          <button
            type="button"
            className="button button-small button-primary"
            style={{ marginTop: '14px' }}
            onClick={() => setStatus('idle')}
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor="request-name">
            Your name <span>(optional)</span>
          </label>
          <input
            id="request-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Shahina Akter"
            maxLength={100}
          />

          <label htmlFor="request-email">Your work email</label>
          <input
            id="request-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            maxLength={254}
          />

          <label htmlFor="request-type">What would you like removed?</label>
          <select id="request-type" value={type} onChange={e => setType(e.target.value)}>
            <option>Account and associated data</option>
            <option>All available data</option>
            <option>Specific records</option>
            <option>Help clearing local demo data</option>
          </select>

          <label htmlFor="request-details">
            Additional details <span>(optional)</span>
          </label>
          <textarea
            id="request-details"
            value={details}
            onChange={e => setDetails(e.target.value)}
            rows={4}
            maxLength={1500}
            placeholder="Describe the records or help you need. Do not include passwords or sensitive documents."
          />

          <button
            className="button button-primary"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>Sending request... <Icon name="clock" size={16} /></>
            ) : (
              <>Send deletion request <Icon name="arrow" size={16} /></>
            )}
          </button>

          <p className="form-note">
            This submits your request securely to the NEONECY operations team via EmailJS.
          </p>

          {status === 'error' && (
            <div role="alert" className="form-status error">
              <strong>Error submitting request:</strong> {errorMsg}
              <p style={{ marginTop: '6px' }}>
                You can also email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          )}
        </form>
      )}
    </section>
  );
}
function PolicyPage({ page, path }) {
  return <main id="main" className="container policy-layout"><aside className="policy-sidebar"><p className="eyebrow">INFORMATION CENTER</p><nav aria-label="Information pages">{Object.entries(pages).map(([href,item]) => <Link href={href} className={path === href ? 'selected' : ''} aria-current={path === href ? 'page' : undefined} key={href}><Icon name={item.icon} size={17} />{item.title}</Link>)}</nav><Link className="back-home" href="/">← Back to home</Link><div className="sidebar-contact"><strong>A question about your data?</strong><Link href="/support">Talk to NEONECY <Icon name="arrow" size={14} /></Link></div></aside><article className="policy-article"><span className="eyebrow">{page.label}</span><h1 tabIndex="-1">{page.title}</h1><p className="policy-description">{page.description}</p><div className="policy-meta"><span>Updated {site.updated}</span><span>NEC TEAM</span></div><div className="policy-intro">{page.intro}</div>{page.sections.map((section,index) => <section className="policy-section" id={`section-${index}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(text => <p key={text}>{text}</p>)}{section.items && <ul>{section.items.map(text => <li key={text}>{text}</li>)}</ul>}{section.links?.map(link => <p key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a></p>)}</section>)}{page.requestForm && <DeletionRequest />}<div className="policy-contact"><Icon name="message" size={24} /><div><h3>Have a question?</h3><p>Contact NEONECY at <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div></div></article></main>;
}
function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><div><Brand /><p>A clearer workspace.<br />A better everyday.</p><p className="footer-more-info">For more info, visit <a href={site.website} target="_blank" rel="noopener noreferrer">neonecy.com ↗</a></p></div><nav className="footer-links" aria-label="Policy links"><span className="eyebrow">INFORMATION & SUPPORT</span>{Object.entries(pages).map(([href,page]) => <Link href={href} key={href}>{page.title}</Link>)}<a href={site.website} target="_blank" rel="noopener noreferrer">Company website ↗</a></nav></div><div className="footer-bottom"><span>© 2026 NEONECY. All rights reserved.</span><span>Made for your team, with care.</span><div className="footer-bottom-links"><a href={site.website} target="_blank" rel="noopener noreferrer">neonecy.com</a><span>·</span><a href={`mailto:${site.email}`}>{site.email}</a></div></div></footer>;
}
function ComingSoon({ platform, close }) {
  const dialog = useRef(null);
  useEffect(() => { const element = dialog.current; element.showModal(); return () => element.close(); }, []);
  return <dialog ref={dialog} className="coming-soon-dialog" aria-labelledby="coming-soon-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}><div className="dialog-content"><button className="icon-button dialog-close" onClick={close} aria-label="Close coming soon message"><Icon name="x" /></button><img className="dialog-logo" src={site.logo} alt="NEC TEAM logo" width="70" height="70" /><div className="release-pill">A little more time. A better experience.</div><h2 id="coming-soon-title">Coming soon.</h2><p>{platform === 'NEC TEAM' ? 'NEC TEAM is getting ready for its public release on Android and iOS.' : `NEC TEAM is not publicly available on ${platform} yet.`} We’re putting the finishing touches on a clearer workday.</p><button className="button button-primary" autoFocus onClick={close}>Got it <Icon name="check" size={18} /></button><small>Internal and closed testing are invitation-only.</small></div></dialog>;
}
export default function App() {
  const cleanPath = () => {
    let p = window.location.pathname.replace(/\/+$/, '') || '/';
    if (p.startsWith(repoPrefix)) {
      p = p.slice(repoPrefix.length) || '/';
    }
    return p;
  };
  const [path,setPath] = useState(cleanPath); const [modal,setModal] = useState(null);
  function syncLocation() { setPath(cleanPath()); }
  useEffect(() => { window.addEventListener('popstate',syncLocation); return () => window.removeEventListener('popstate',syncLocation); }, []);
  function navigate(href) {
    const isGh = window.location.pathname.startsWith(repoPrefix);
    const target = isGh ? (href === '/' ? `${repoPrefix}/` : `${repoPrefix}${href}`) : href;
    setModal(null); window.history.pushState({},'',target); syncLocation();
    requestAnimationFrame(() => {
      if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({behavior:'smooth'});
      else window.scrollTo({top:0,behavior:'instant'});
    });
  }
  useEffect(() => {
    const page = pages[path]; document.title = page ? `${page.title} — NEC TEAM` : path === '/' ? 'NEC TEAM — A clearer workday' : 'Page not found — NEC TEAM';
    document.querySelector('meta[name="description"]')?.setAttribute('content',page?.description ?? 'People, leads, tasks and everyday team operations in one workspace. Meet NEC TEAM by NEONECY.');
    if (!window.location.hash) window.scrollTo(0,0);
    else requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
  },[path]);
  return <Navigation.Provider value={navigate}><a className="skip-link" href="#main">Skip to content</a><Header openStore={setModal} />{path === '/' ? <Home openStore={setModal} /> : pages[path] ? <PolicyPage key={path} page={pages[path]} path={path} /> : <main id="main" className="not-found container"><span className="eyebrow">404 · A SMALL DETOUR</span><h1>Let’s get you<br />back on track.</h1><Link href="/" className="button button-primary">Back to home <Icon name="arrow" /></Link></main>}<Footer />{modal && <ComingSoon platform={modal} close={() => setModal(null)} />}</Navigation.Provider>;
}
