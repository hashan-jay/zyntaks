import fs from "fs";
import path from "path";
import { readPsd, initializeCanvas } from "ag-psd";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import pngToIco from "png-to-ico";

initializeCanvas((width, height) => createCanvas(width, height));

const psdPath = "d:\\Zyntaks\\zyntaks-favicon.psd";
if (!fs.existsSync(psdPath)) {
  throw new Error(`Missing favicon PSD: ${psdPath}`);
}

const psd = readPsd(fs.readFileSync(psdPath), { skipLayerImageData: false });

const layer =
  psd.children?.find((c) => !c.hidden && c.canvas && c.name !== "Background") ||
  null;

const canvas = layer?.canvas ?? psd.canvas;
if (!canvas) throw new Error("No canvas in zyntaks-favicon.psd");

console.log("Using", layer?.name ?? "composite", "from zyntaks-favicon.psd");

let pngBuffer = canvas.toBuffer("image/png");

const trimmed = await sharp(pngBuffer)
  .ensureAlpha()
  .trim({ threshold: 4 })
  .png()
  .toBuffer({ resolveWithObject: true });

const side = Math.max(trimmed.info.width, trimmed.info.height);
const padX = Math.floor((side - trimmed.info.width) / 2);
const padY = Math.floor((side - trimmed.info.height) / 2);

// Solid brand background — Google often skips mostly-transparent favicons.
const BG = { r: 5, g: 5, b: 5, alpha: 1 };

pngBuffer = await sharp(trimmed.data)
  .extend({
    top: padY,
    bottom: side - trimmed.info.height - padY,
    left: padX,
    right: side - trimmed.info.width - padX,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .flatten({ background: BG })
  .png()
  .toBuffer();

async function writePng(file, size) {
  await sharp(pngBuffer)
    .resize(size, size, {
      fit: "contain",
      background: BG,
    })
    .flatten({ background: BG })
    .png()
    .toFile(file);
  console.log("Wrote", file, `${size}x${size}`);
}

const publicDir = path.resolve("public");
const appDir = path.resolve("src/app");

await writePng(path.join(publicDir, "favicon-48x48.png"), 48);
await writePng(path.join(publicDir, "favicon-96x96.png"), 96);
await writePng(path.join(publicDir, "icon-192.png"), 192);
await writePng(path.join(publicDir, "icon-512.png"), 512);
await writePng(path.join(publicDir, "brand-mark.png"), 512);
await writePng(path.join(publicDir, "apple-icon.png"), 180);
await writePng(path.join(appDir, "icon.png"), 96);
await writePng(path.join(appDir, "apple-icon.png"), 180);

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(pngBuffer)
      .resize(size, size, {
        fit: "contain",
        background: BG,
      })
      .flatten({ background: BG })
      .png()
      .toBuffer()
  )
);

const icoBuffer = await pngToIco(icoPngs);
for (const file of [
  path.join(publicDir, "favicon.ico"),
  path.join(appDir, "favicon.ico"),
]) {
  fs.writeFileSync(file, icoBuffer);
  console.log("Wrote", file);
}

const meta = {
  source: psdPath,
  layer: layer?.name ?? "composite",
  background: "#050505",
  exportedAt: new Date().toISOString(),
  cacheKey: Date.now().toString(36),
};
fs.writeFileSync(
  path.join(publicDir, "favicon-meta.json"),
  JSON.stringify(meta, null, 2)
);
console.log("Done", meta.cacheKey);
