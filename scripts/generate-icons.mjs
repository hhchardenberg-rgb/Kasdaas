// Generates the Kas Daas app icons from one SVG. Run: npm run icons
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const mark = (pad) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#134656"/><stop offset="1" stop-color="#082a33"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(256 256) scale(${1 - pad}) translate(-256 -256)">
    <circle cx="256" cy="226" r="84" fill="#e9c38f"/>
    <rect x="96" y="310" width="320" height="16" rx="8" fill="#fbf8f3"/>
    <rect x="156" y="352" width="200" height="12" rx="6" fill="#fbf8f3" opacity="0.6"/>
    <rect x="206" y="388" width="100" height="10" rx="5" fill="#fbf8f3" opacity="0.35"/>
  </g>
</svg>`;

mkdirSync("public/icons", { recursive: true });
writeFileSync("public/icons/favicon.svg", mark(0.05));
const out = [
  ["icon-192.png", 192, 0.05],
  ["icon-512.png", 512, 0.05],
  ["icon-maskable-512.png", 512, 0.28],
  ["apple-touch-icon.png", 180, 0.12],
  ["favicon-32.png", 32, 0],
];
for (const [name, size, pad] of out) {
  await sharp(Buffer.from(mark(pad))).resize(size, size).png().toFile(`public/icons/${name}`);
}
await sharp(Buffer.from(mark(0))).resize(32, 32).png().toFile("app/icon.png");
console.log("Icons generated.");
