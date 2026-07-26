import fs from "fs";
import path from "path";
import { readPsd, initializeCanvas } from "ag-psd";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

initializeCanvas((width, height) => createCanvas(width, height));

const brandDir = path.resolve("public/brand");
fs.mkdirSync(brandDir, { recursive: true });

const psdPath = "d:\\Zyntaks\\zyntaks-logo-new.psd";
const psd = readPsd(fs.readFileSync(psdPath));

const layer =
  psd.children?.find((c) => c.name === "Layer 2" && c.canvas) ||
  psd.children?.find((c) => !c.hidden && c.canvas && c.name !== "Background") ||
  null;

const canvas = layer?.canvas ?? psd.canvas;
if (!canvas) throw new Error("No canvas in zyntaks-logo-new.psd");

console.log("Using", layer?.name ?? "composite", "from zyntaks-logo-new.psd");

let pngBuffer = canvas.toBuffer("image/png");
const { data, info } = await sharp(pngBuffer)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  if (data[i] <= 18 && data[i + 1] <= 18 && data[i + 2] <= 18) {
    data[i + 3] = 0;
  }
}

pngBuffer = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .extend({
    top: 4,
    bottom: 4,
    left: 8,
    right: 8,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .resize({ height: 200, fit: "inside", withoutEnlargement: false })
  .png()
  .toBuffer();

const targets = [
  path.join(brandDir, "logo.png"),
  path.resolve("public/images/zyntaks-logo-new.png"),
  path.resolve("public/images/zyntaks-logo.png"),
];

for (const file of targets) {
  await sharp(pngBuffer).toFile(file);
}

const meta = await sharp(pngBuffer).metadata();
const cacheKey = Date.now().toString(36);
fs.writeFileSync(
  path.join(brandDir, "logo-meta.json"),
  JSON.stringify(
    {
      source: "d:\\\\Zyntaks\\\\zyntaks-logo-new.psd",
      layer: layer?.name ?? "composite",
      width: meta.width,
      height: meta.height,
      exportedAt: new Date().toISOString(),
      cacheKey,
    },
    null,
    2
  )
);

console.log("Wrote", meta.width, "x", meta.height, "cacheKey", cacheKey);
