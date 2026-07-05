/**
 * One-shot asset pipeline: pulls curated brand photography from the parent
 * assets folder, crops watermarks where needed, resizes and re-encodes
 * everything to web-friendly sizes in public/images.
 *
 * Run: node scripts/prepare-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve(process.cwd(), "..");
const OUT = path.resolve(process.cwd(), "public/images");

// crop: fraction of height to trim from the bottom (removes AI watermarks)
const MANIFEST = [
  // ---- product ----
  { src: "transparent background loup_.png", out: "product/loup-silver-front.png", w: 900, keepAlpha: true },
  { src: "front off_ copy.png", out: "product/loup-silver-front-off.png", w: 900, keepAlpha: true },
  { src: "red just loup.png", out: "product/loup-red-hero.jpg", w: 1200 },
  { src: "black just loup.png", out: "product/loup-black-hero.jpg", w: 1200 },
  { src: "Phone Red Front.jpg", out: "product/loup-red-front.jpg", w: 1200 },
  { src: "Phone Black Front.jpg", out: "product/loup-black-front.jpg", w: 1200 },
  { src: "three quarter .jpg", out: "product/loup-three-quarter.jpg", w: 1400 },
  { src: "low profile no usb.jpg", out: "product/loup-ports.jpg", w: 1400 },
  { src: "red side.png", out: "product/loup-red-side.jpg", w: 1400 },
  { src: "black side.png", out: "product/loup-black-side.jpg", w: 1400 },
  { src: "replaceble back plates.png", out: "product/loup-back-plate.jpg", w: 1200 },
  { src: "hi in box .jpg", out: "product/loup-box.jpg", w: 1400 },
  { src: "hi.png", out: "product/loup-hi.jpg", w: 1200 },
  { src: "vertical flat 2.jpg", out: "product/loup-flat.jpg", w: 1400 },

  // ---- custom plates ----
  { src: "Cusotm Plates/friends.png", out: "plates/friends.png", w: 800, keepAlpha: true },
  { src: "Cusotm Plates/baseball.png", out: "plates/baseball.png", w: 800, keepAlpha: true },
  { src: "Cusotm Plates/gymnastics.png", out: "plates/gymnastics.png", w: 800, keepAlpha: true },
  { src: "Cusotm Plates/palm trees.png", out: "plates/palm-trees.png", w: 800, keepAlpha: true },
  { src: "Cusotm Plates/panda.png", out: "plates/panda.png", w: 800, keepAlpha: true },
  { src: "Cusotm Plates/purple pattern.png", out: "plates/purple-pattern.png", w: 800, keepAlpha: true },

  // ---- street / editorial (b&w flash) ----
  { src: "phone throw.png", out: "street/phone-throw.jpg", w: 1600 },
  { src: "jean jacket.png", out: "street/jean-jacket.jpg", w: 1400 },
  { src: "kid black and white.png", out: "street/kid-bw.jpg", w: 1400 },
  { src: "two kids holding phone out .png", out: "street/two-kids-hi.jpg", w: 1400 },
  { src: "solo teenager holding phone out.png", out: "street/teen-holdout.jpg", w: 1400 },
  { src: "kiss shirt.png", out: "street/kiss-shirt.jpg", w: 1400 },
  { src: "kid candid smile.png", out: "street/kid-candid.jpg", w: 1400 },
  { src: "kid side shot.png", out: "street/kid-side.jpg", w: 1400 },

  // ---- lifestyle (warm) ----
  { src: "two girls talking .png", out: "lifestyle/two-girls-room.jpg", w: 1600 },
  { src: "Talking crisscross.jpg", out: "lifestyle/girl-crisscross.jpg", w: 1400 },
  { src: "Kids on stoop.jpg", out: "lifestyle/kids-stoop.jpg", w: 1600 },
  { src: "kid tent.png", out: "lifestyle/kid-tent.jpg", w: 1400 },
  { src: "kids ambient .jpg", out: "lifestyle/kids-ambient.jpg", w: 1400 },
  { src: "teenager in kitchen.png", out: "lifestyle/teen-kitchen.jpg", w: 1400 },
  { src: "girl carpet 2 .jpg", out: "lifestyle/girl-carpet.jpg", w: 1400 },
  { src: "Phone in sweatshirt.jpg", out: "lifestyle/pocket-sweatshirt.jpg", w: 1400 },
  { src: "backpack pocket.png", out: "lifestyle/backpack-mesh.jpg", w: 1200 },
  { src: "blue bag red phone.png", out: "lifestyle/backpack-red.jpg", w: 1400, cropBottom: 0.06 },
  { src: "Phone on Desk.jpg", out: "lifestyle/phone-desk.jpg", w: 1400 },
  { src: "on books.jpg", out: "lifestyle/on-books.jpg", w: 1400 },
  { src: "girl on bed.png", out: "lifestyle/girl-bed.jpg", w: 1400 },
  { src: "Boy in Bedroom.jpg", out: "lifestyle/boy-bedroom.jpg", w: 1400 },
];

let ok = 0;
for (const item of MANIFEST) {
  const srcPath = path.join(SRC, item.src);
  const outPath = path.join(OUT, item.out);
  await mkdir(path.dirname(outPath), { recursive: true });
  try {
    let img = sharp(srcPath).rotate();
    const meta = await img.metadata();
    if (item.cropBottom) {
      const h = Math.round(meta.height * (1 - item.cropBottom));
      img = img.extract({ left: 0, top: 0, width: meta.width, height: h });
    }
    img = img.resize({ width: item.w, withoutEnlargement: true });
    if (item.keepAlpha) {
      await img.png({ compressionLevel: 9, palette: false }).toFile(outPath);
    } else {
      await img.flatten({ background: "#ffffff" }).jpeg({ quality: 78, mozjpeg: true }).toFile(outPath);
    }
    ok++;
  } catch (e) {
    console.error(`FAILED ${item.src}: ${e.message}`);
  }
}
console.log(`done: ${ok}/${MANIFEST.length} images written to public/images`);
