// Creates a static HTML entry for each extra route so that hosts serving a real
// 404.html (Cloudflare Pages, GitHub Pages) load the app at those URLs instead of 404.
// Each copy gets its own <title>, description and canonical URL for search engines.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/codixy-web/browser';
const SITE = 'https://codixytechnologies.com';

const routes = [
  {
    file: 'privacy-policy.html',
    path: '/privacy-policy',
    title: 'Privacy Policy | CODIXY Technologies',
    description: 'Learn how CODIXY Technologies collects, uses and protects your personal information when you visit our website or engage our software development services.',
  },
  {
    file: 'terms-of-service.html',
    path: '/terms-of-service',
    title: 'Terms of Service | CODIXY Technologies',
    description: 'Read the Terms of Service for CODIXY Technologies, covering website use, project engagements, payments, intellectual property, confidentiality and liability.',
  },
];

const index = readFileSync(join(DIST, 'index.html'), 'utf8');

const replaceOrFail = (html, re, value, label) => {
  if (!re.test(html)) throw new Error(`prerender-routes: could not find ${label} in index.html`);
  return html.replace(re, value);
};

for (const r of routes) {
  const url = SITE + r.path;
  let html = index;
  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${r.title}</title>`, 'title');
  html = replaceOrFail(html, /(<meta name="description" content=")[^"]*(")/, `$1${r.description}$2`, 'description');
  html = replaceOrFail(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical');
  html = replaceOrFail(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url');
  html = replaceOrFail(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${r.title}$2`, 'og:title');
  html = replaceOrFail(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${r.title}$2`, 'twitter:title');
  writeFileSync(join(DIST, r.file), html);
  console.log(`prerender-routes: wrote ${r.file}`);
}
