import sharp from "sharp";
import fs from "fs";

const candidates = [
  "public/brand-mark.png",
  "public/icon-512.png",
  "src/app/icon.png",
  "src/app/apple-icon.png",
];
let source = "src/app/icon.png";
let best = 0;
for (const c of candidates) {
  if (!fs.existsSync(c)) continue;
  const m = await sharp(c).metadata();
  const w = m.width ?? 0;
  if (w > best) {
    best = w;
    source = c;
  }
}

const meta = await sharp(source).metadata();
console.log("using source", source, meta.width, meta.height);

const buf = await sharp(source).ensureAlpha().png().toBuffer();

// Preserve a high-res brand mark for future regenerations
await sharp(buf).resize(512, 512).png().toFile("public/brand-mark.png");
await sharp(buf).resize(48, 48).png().toFile("public/favicon-48x48.png");
await sharp(buf).resize(96, 96).png().toFile("public/favicon-96x96.png");
await sharp(buf).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(buf).resize(512, 512).png().toFile("public/icon-512.png");

// App Router icons — 96 is a Google-friendly multiple of 48
await sharp(buf).resize(96, 96).png().toFile("src/app/icon.png");
await sharp(buf).resize(180, 180).png().toFile("src/app/apple-icon.png");

const png48 = await sharp(buf).resize(48, 48).png().toBuffer();
const png32 = await sharp(buf).resize(32, 32).png().toBuffer();
const png16 = await sharp(buf).resize(16, 16).png().toBuffer();

function pngToIco(pngs, sizes) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const data = pngs[i];
    entries.push({ size, data, offset });
    offset += data.length;
  }
  const bufIco = Buffer.alloc(offset);
  bufIco.writeUInt16LE(0, 0);
  bufIco.writeUInt16LE(1, 2);
  bufIco.writeUInt16LE(count, 4);
  for (let i = 0; i < count; i++) {
    const e = entries[i];
    const o = 6 + i * 16;
    bufIco.writeUInt8(e.size === 256 ? 0 : e.size, o);
    bufIco.writeUInt8(e.size === 256 ? 0 : e.size, o + 1);
    bufIco.writeUInt8(0, o + 2);
    bufIco.writeUInt8(0, o + 3);
    bufIco.writeUInt16LE(1, o + 4);
    bufIco.writeUInt16LE(32, o + 6);
    bufIco.writeUInt32LE(e.data.length, o + 8);
    bufIco.writeUInt32LE(e.offset, o + 12);
    e.data.copy(bufIco, e.offset);
  }
  return bufIco;
}

const ico = pngToIco([png16, png32, png48], [16, 32, 48]);
fs.writeFileSync("src/app/favicon.ico", ico);
fs.writeFileSync("public/favicon.ico", ico);

const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="100%" stop-color="#0a1218"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="220" fill="#67e8f9" fill-opacity="0.12"/>
  <circle cx="200" cy="520" r="180" fill="#67e8f9" fill-opacity="0.08"/>
  <text x="96" y="290" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="#f4f4f5">Zyntaks</text>
  <text x="96" y="370" font-family="Arial, sans-serif" font-size="36" fill="#67e8f9">think. build. evolve.</text>
  <text x="96" y="450" font-family="Arial, sans-serif" font-size="28" fill="#a1a1aa">Software development studio for web apps, cloud, and digital products</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile("public/og.png");
console.log("SEO assets written");
