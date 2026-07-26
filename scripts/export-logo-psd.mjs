import fs from "fs";
import path from "path";
import { readPsd, initializeCanvas } from "ag-psd";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

initializeCanvas((width, height) => createCanvas(width, height));

const src = "d:\\Zyntaks\\zyntaks-logo.psd";
const outDir = path.resolve("public/images");
const outPng = path.join(outDir, "zyntaks-logo-new.png");
const outLegacy = path.join(outDir, "zyntaks-logo.png");

fs.mkdirSync(outDir, { recursive: true });

const psd = readPsd(fs.readFileSync(src));
if (!psd.canvas) throw new Error("No composite canvas");

let pngBuffer = psd.canvas.toBuffer("image/png");

const { data, info } = await sharp(pngBuffer)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= 18 && g <= 18 && b <= 18) data[i + 3] = 0;
}

pngBuffer = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer();

// Mild trim + small padding so accent mark isn't clipped
const trimmed = await sharp(pngBuffer)
  .trim({ threshold: 1 })
  .extend({ top: 8, bottom: 8, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(trimmed)
  .resize({ height: 180, fit: "inside", withoutEnlargement: false })
  .png()
  .toFile(outPng);

await sharp(outPng).toFile(outLegacy);

const final = await sharp(outPng).metadata();
console.log("Wrote", outPng, final.width, "x", final.height);
