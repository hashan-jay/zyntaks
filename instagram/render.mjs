import { chromium } from "playwright";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlName = process.argv[2] || "poster-showcase.html";
const outName = process.argv[3] || "zyntaks-showcase-2030x2700.png";
const scale = Number(process.argv[4] || 2);

const cssWidth = 1015;
const cssHeight = 1350;
const outWidth = cssWidth * scale;
const outHeight = cssHeight * scale;

const htmlPath = path.resolve(__dirname, htmlName);
const outPath = path.resolve(__dirname, outName);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: outWidth, height: outHeight, deviceScaleFactor: 1 },
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(async (s) => {
  document.documentElement.style.zoom = String(s);
  if (document.fonts?.ready) await document.fonts.ready;
}, scale);
await page.waitForTimeout(800);
await page.screenshot({
  path: outPath,
  type: "png",
  clip: { x: 0, y: 0, width: outWidth, height: outHeight },
});
await browser.close();
console.log(`Saved ${outPath} (${outWidth}x${outHeight})`);
