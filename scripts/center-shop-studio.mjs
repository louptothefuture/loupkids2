/**
 * Square shop gallery: pad originals, keep the product centred.
 * Does not overwrite source files. Run: node scripts/center-shop-studio.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/renders/shop/studio");
const SIZE = 1400;

const JOBS = [
  { src: "public/images/renders/shop/a_9.jpg", out: "01-three-quarter.jpg" },
  { src: "public/images/renders/shop/a_1.jpg", out: "02-volume.jpg" },
  { src: "public/images/renders/shop/a_3.jpg", out: "03-scroll.jpg" },
  { src: "public/images/renders/shop/a_11.jpg", out: "04-back.jpg" },
  { src: "public/images/renders/shop/a_bottom.jpg", out: "05-usb.jpg" },
  { src: "public/images/renders/shop/a_4.jpg", out: "06-three-quarter-left.jpg" },
];

async function sampleBg(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pts = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [Math.floor(width / 2), 0],
    [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const [x, y] of pts) {
    const i = (y * width + x) * channels;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const n = pts.length;
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
}

await mkdir(OUT_DIR, { recursive: true });
for (const job of JOBS) {
  const src = path.join(ROOT, job.src);
  const dest = path.join(OUT_DIR, job.out);
  const bg = await sampleBg(src);
  await sharp(src)
    .rotate()
    .resize(SIZE, SIZE, { fit: "contain", background: bg, position: "centre" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(dest);
  console.log("ok", job.out);
}
