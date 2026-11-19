import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
await fs.mkdir(publicDir, { recursive: true });

const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B1220"/>
      <stop offset="55%" stop-color="#12324A"/>
      <stop offset="100%" stop-color="#0B3D2E"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="160" fill="#229ED9" fill-opacity="0.25"/>
  <circle cx="180" cy="520" r="180" fill="#00FFA3" fill-opacity="0.18"/>
  <text x="80" y="250" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="#FFFFFF">
    Сайты и TG Mini Apps
  </text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-size="36" fill="#C9D4E3">
    пиши в Telegram
  </text>
  <rect x="80" y="400" rx="18" ry="18" width="320" height="64" fill="#229ED9"/>
  <text x="120" y="442" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF">
    @mangerssh
  </text>
</svg>
`;

const faviconSvg = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#0B1220"/>
  <circle cx="32" cy="32" r="18" fill="#229ED9"/>
  <circle cx="40" cy="24" r="7" fill="#00FFA3"/>
</svg>
`;

await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og.png"));
await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, "favicon-32.png"));
await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .toFormat("png")
  .toFile(path.join(publicDir, "icon.png"));

// ICO-compatible PNG fallback used as favicon.ico for simplicity in Next
await sharp(Buffer.from(faviconSvg))
  .resize(48, 48)
  .png()
  .toFile(path.join(publicDir, "favicon.ico"));

console.log("Generated og.png and favicon assets");
