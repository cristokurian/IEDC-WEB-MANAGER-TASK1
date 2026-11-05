/**
 * Post-build script to generate route-specific static HTML for /register.
 * Provides pre-rendered HTML metadata (title, canonical, OG, Twitter)
 * over the wire to non-JavaScript crawlers and social unfurlers.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const indexHtmlPath = join(distDir, 'index.html');

if (!existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const html = readFileSync(indexHtmlPath, 'utf-8');

// Replacement configurations for the /register route
const registerMetadata = {
  title: 'Register | IEDC IDEA SPRINT 2026',
  canonical: 'https://iedc-idea-sprint.vercel.app/register',
  description:
    'Register for IEDC IDEA SPRINT 2026 — Join the 24-hour student ideathon by IEDC BOOTCAMP CEC. Bring a problem worth solving, build solutions and collaborate with fellow creators.',
};

let registerHtml = html
  // Replace title
  .replace(
    /<title>.*?<\/title>/,
    `<title>${registerMetadata.title}</title>`
  )
  // Replace canonical URL
  .replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${registerMetadata.canonical}" />`
  )
  // Replace meta description
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${registerMetadata.description}" />`
  )
  // Replace og:title
  .replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${registerMetadata.title}" />`
  )
  // Replace og:description
  .replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${registerMetadata.description}" />`
  )
  // Replace og:url
  .replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${registerMetadata.canonical}" />`
  )
  // Replace twitter:title
  .replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${registerMetadata.title}" />`
  )
  // Replace twitter:description
  .replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${registerMetadata.description}" />`
  );

// Write dist/register/index.html
const registerDir = join(distDir, 'register');
mkdirSync(registerDir, { recursive: true });
writeFileSync(join(registerDir, 'index.html'), registerHtml, 'utf-8');

// Also write dist/register.html for cleanUrls / fallback routing
writeFileSync(join(distDir, 'register.html'), registerHtml, 'utf-8');

console.log('✓ Generated static route HTML: dist/register/index.html and dist/register.html');
