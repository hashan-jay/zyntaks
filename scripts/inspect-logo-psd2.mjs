import fs from "fs";
import { readPsd, initializeCanvas } from "ag-psd";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import path from "path";

initializeCanvas((width, height) => createCanvas(width, height));

const src = "d:\\Zyntaks\\zyntaks-logo.psd";
const outDir = path.resolve("tmp-logo-layers-main");
fs.mkdirSync(outDir, { recursive: true });

const psd = readPsd(fs.readFileSync(src));
console.log("root", psd.width, psd.height, "children", psd.children?.length);

function walk(node, depth = 0) {
  const pad = "  ".repeat(depth);
  console.log(
    `${pad}- ${node.name ?? "(root)"}${node.hidden ? " [hidden]" : ""}${node.canvas ? " canvas" : ""}`
  );
  if (node.children) for (const c of node.children) walk(c, depth + 1);
}
walk(psd);

let i = 0;
async function exportAll(node) {
  if (node.canvas && (!node.children || !node.children.length)) {
    const safe = String(node.name ?? "layer").replace(/[^\w.-]+/g, "_");
    const file = path.join(outDir, `${String(++i).padStart(2, "0")}-${safe}.png`);
    await sharp(node.canvas.toBuffer("image/png")).png().toFile(file);
    console.log("exported", file, "hidden=", !!node.hidden);
  }
  if (node.children) for (const c of node.children) await exportAll(c);
}
if (psd.canvas) {
  await sharp(psd.canvas.toBuffer("image/png")).toFile(path.join(outDir, "00-composite.png"));
}
await exportAll(psd);
