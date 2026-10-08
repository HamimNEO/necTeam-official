import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { pages } from '../src/policies.js';
import { site } from '../src/config.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const base = process.env.GITHUB_PAGES ? '/necTeam-official/' : '/';
const policyLinks = Object.entries(pages).map(([path, page]) => `<a href="${base}${path.slice(1)}/">${escape(page.title)}</a>`).join('');
const header = `<header class="site-header"><div class="container nav-row"><a href="${base}" class="brand"><img src="${site.logo}" alt="NEC TEAM logo" width="40" height="40"><span>NEC TEAM<small>by NEONECY</small></span></a><nav class="static-nav" aria-label="Main navigation"><a href="${base}#features">Features</a><a href="${base}privacy-policy/">Privacy</a><a href="${base}support/">Contact</a></nav></div></header>`;
const footer = `<footer class="site-footer container"><div class="footer-brand">NEC TEAM <span>by NEONECY</span></div><nav class="footer-links" aria-label="Policy links">${policyLinks}<a href="${site.website}" target="_blank" rel="noopener noreferrer">Company website ↗</a></nav><div class="footer-bottom"><span>© 2026 NEONECY. All rights reserved.</span><div class="footer-bottom-links"><a href="${site.website}" target="_blank" rel="noopener noreferrer">neonecy.com</a><span>·</span><a href="mailto:${site.email}">${site.email}</a></div></div></footer>`;
const sections = page => page.sections.map((section, index) => `<section id="section-${index}" class="policy-section"><h2>${escape(section.title)}</h2>${(section.paragraphs ?? []).map(text => `<p>${escape(text)}</p>`).join('')}${section.items ? `<ul>${section.items.map(text => `<li>${escape(text)}</li>`).join('')}</ul>` : ''}${(section.links ?? []).map(link => `<p><a href="${escape(link.href)}" rel="noopener noreferrer">${escape(link.label)}</a></p>`).join('')}</section>`).join('');
const policy = page => `${header}<main id="main" class="container policy-layout"><aside class="policy-sidebar"><p class="eyebrow">INFORMATION CENTER</p><nav aria-label="Information pages">${policyLinks}</nav><a class="back-home" href="${base}">← Back to home</a></aside><article class="policy-article"><span class="eyebrow">${escape(page.label)}</span><h1>${escape(page.title)}</h1><p class="policy-description">${escape(page.description)}</p><div class="policy-meta">Updated ${site.updated} · ${site.app}</div><div class="policy-intro">${escape(page.intro)}</div>${sections(page)}${page.requestForm ? `<section class="policy-section"><h2>Send a deletion request</h2><p>Email <a href="mailto:${site.email}?subject=NEC%20TEAM%20data%20deletion%20request">${site.email}</a> with your work email and the records you want removed. You do not need to sign in. Send the email to submit your request.</p></section>` : ''}<div class="policy-contact"><h3>Have a question?</h3><p>Contact NEONECY at <a href="mailto:${site.email}">${site.email}</a>.</p></div></article></main>${footer}`;
function html(page) {
  const title = page ? `${page.title} — NEC TEAM` : 'NEC TEAM — A clearer workday';
  const description = page?.description ?? 'People, leads, tasks and everyday team operations in one workspace. Meet NEC TEAM by NEONECY.';
  const content = page ? policy(page) : `${header}<main id="main" class="container static-home"><span class="eyebrow">NEC TEAM BY NEONECY</span><h1>Your team.<br>One clear workspace.</h1><p>${description}</p><p>Public downloads coming soon. Explore our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/data-deletion/">Data Deletion</a> information.</p></main>${footer}`;
  return `<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#3435ed"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><link rel="icon" type="image/png" href="${site.logo}"><link rel="stylesheet" href="/src/styles.css"></head><body><div id="root">${content}</div><script type="module" src="/src/main.jsx"></script></body></html>\n`;
}
await mkdir(resolve(root, 'public/assets'), {recursive:true});
for (const [from, to] of [
  ['NEC app icon — Rounded — 512 × 512.png', 'app-icon.png'],
  ['playstore.png', 'playstore.png'],
  ['apple-logo.png', 'apple-logo.png'],
  ['login.png', 'login.png'],
  ['employee_dashboard.png', 'employee_dashboard.png'],
  ['admin_dashboard.png', 'admin_dashboard.png'],
  ['NEC TEAM — Featured Screen.png', 'featured-screen.png']
]) {
  await copyFile(resolve(root, 'assets', from), resolve(root, 'public/assets', to));
}
await writeFile(resolve(root, 'index.html'), html());
for (const [path, page] of Object.entries(pages)) {
  const folder = resolve(root, path.slice(1));
  await mkdir(folder, {recursive:true});
  await writeFile(resolve(folder, 'index.html'), html(page));
}
const redirects = Object.keys(pages).map(path => `${path} ${path}/index.html 200`).join('\n');
await writeFile(resolve(root, 'public/_redirects'), `${redirects}\n/* /index.html 200\n`);
console.log('Created homepage, five readable policy/contact pages and public app assets.');
