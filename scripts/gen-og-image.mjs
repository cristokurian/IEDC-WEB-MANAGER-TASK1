/**
 * Generates og-image.png from og-image.svg using the Resvg WASM renderer.
 * Run once: node scripts/gen-og-image.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // Dynamically import @resvg/resvg-js (if installed) or fall back to copying SVG
  let Resvg;
  try {
    const mod = await import('@resvg/resvg-js');
    Resvg = mod.Resvg;
  } catch {
    console.log('⚠  @resvg/resvg-js not installed — copying SVG as og-image.png placeholder.');
    const svg = readFileSync(join(__dirname, '../public/og-image.svg'));
    writeFileSync(join(__dirname, '../public/og-image.png'), svg);
    console.log('✓  public/og-image.png written (SVG bytes, rename to .svg for best quality)');
    return;
  }

  const svg = readFileSync(join(__dirname, '../public/og-image.svg'), 'utf-8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  writeFileSync(join(__dirname, '../public/og-image.png'), pngBuffer);
  console.log('✓  public/og-image.png written (1200×630 PNG)');
}

main().catch(console.error);
