import fs from "fs";
import { readPsd, initializeCanvas } from "ag-psd";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import path from "path";

initializeCanvas((width, height) => createCanvas(width, height));

const src = "d:\\Zyntaks\\zyntaks-logo-new.psd";
const outDir = path.resolve("tmp-logo-layers");
fs.mkdirSync(outDir, { recursive: true });

const psd = readPsd(fs.readFileSync(src));
console.log("root", psd.width, psd.height, "children", psd.children?.length);

function walk(node, depth = 0) {
  const pad = "  ".repeat(depth);
  const name = node.name ?? "(root)";
  const hidden = node.hidden ? " [hidden]" : "";
  const hasCanvas = node.canvas ? " canvas" : "";
  console.log(
    `${pad}- ${name}${hidden}${hasCanvas}`,
    node.left,
    node.top,
    node.right,
    node.bottom
  );
  if (node.children) {
    for (const c of node.children) walk(c, depth + 1);
  }
}

walk(psd);

async function exportNode(node, file) {
  if (!node.canvas) return false;
  const buf = node.canvas.toBuffer("image/png");
  await sharp(buf).png().toFile(file);
  return true;
}

if (psd.canvas) {
  await sharp(psd.canvas.toBuffer("image/png")).toFile(
    path.join(outDir, "00-composite.png")
  );
}

let i = 1;
async function exportAll(node) {
  if (node.name && node.canvas && !node.children?.length) {
    const safe = String(node.name).replace(/[^\w.-]+/g, "_");
    const file = path.join(outDir, `${String(i).padStart(2, "0")}-${safe}.png`);
    await exportNode(node, file);
    console.log("exported", file);
    i++;
  }
  if (node.children) {
    for (const c of node.children) await exportAll(c);
  }
}

await exportAll(psd);
console.log("done ->", outDir);
