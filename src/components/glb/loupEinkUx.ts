/**
 * Canvas e-ink UX for the GLB phone screen.
 * Flow: LOUP boot → contact select → calling → in call → hang up → loop.
 * Draws with Atkinson; asymmetric insets (extra right); no SVG full-blit flicker.
 */

export const EINK_W = 246;
export const EINK_H = 570;
export const EINK_BG = "#4d4d4d";
export const EINK_FG = "#ffffff";

const FONT =
  '"Atkinson Hyperlegible", "Atkinson Hyperlegible Next", Helvetica, Arial, sans-serif';

/** Content safe area — extra right border (was tight against bezel). */
const PAD = { top: 28, left: 26, right: 46, bottom: 36 };

const CONTACTS = [
  { name: "Mom", status: "On" },
  { name: "Mila", status: "Away" },
  { name: "Ridley", status: "On" },
  { name: "Grandma", status: "On" },
] as const;

/** Demo select stops on Ridley, then places the call. */
const SELECT_COUNT = 3;
const CALL_IDX = 2;

const BOOT_MS = 1600;
const SELECT_STEP_MS = 700;
const SELECT_HOLD_MS = 1000;
const CALLING_MS = 2200;
const ACTIVE_MS = 4200;
const HANGUP_MS = 1100;
const SELECT_CYCLE_MS = SELECT_COUNT * SELECT_STEP_MS + SELECT_HOLD_MS;

type Phase = "boot" | "select" | "calling" | "active" | "hangup";

function phaseAt(t: number): { phase: Phase; local: number; contactIdx: number } {
  const loop =
    BOOT_MS + SELECT_CYCLE_MS + CALLING_MS + ACTIVE_MS + HANGUP_MS;
  const e = ((t % loop) + loop) % loop;
  if (e < BOOT_MS) return { phase: "boot", local: e, contactIdx: 0 };
  let x = e - BOOT_MS;
  if (x < SELECT_CYCLE_MS) {
    const idx = Math.min(SELECT_COUNT - 1, Math.floor(x / SELECT_STEP_MS));
    return { phase: "select", local: x, contactIdx: idx };
  }
  x -= SELECT_CYCLE_MS;
  if (x < CALLING_MS)
    return { phase: "calling", local: x, contactIdx: CALL_IDX };
  x -= CALLING_MS;
  if (x < ACTIVE_MS) return { phase: "active", local: x, contactIdx: CALL_IDX };
  x -= ACTIVE_MS;
  return { phase: "hangup", local: x, contactIdx: CALL_IDX };
}

async function ensureAtkinson() {
  try {
    const faces = [
      new FontFace(
        "Atkinson Hyperlegible",
        "url(/fonts/AtkinsonHyperlegible-Regular.woff2)",
        { weight: "400" },
      ),
      new FontFace(
        "Atkinson Hyperlegible",
        "url(/fonts/AtkinsonHyperlegible-Bold.woff2)",
        { weight: "700" },
      ),
    ];
    const loaded = await Promise.all(faces.map((f) => f.load()));
    for (const f of loaded) document.fonts.add(f);
    await document.fonts.ready;
  } catch {
    // system sans fallback
  }
}

function clockLabel(d = new Date()) {
  const h = d.getHours();
  const m = d.getMinutes();
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}`;
}

function drawStatusBar(
  ctx: CanvasRenderingContext2D,
  W: number,
  time: string,
) {
  const y = PAD.top + 18;
  ctx.fillStyle = EINK_FG;
  ctx.font = `700 ${Math.round(W * 0.078)}px ${FONT}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(time, PAD.left, y);

  // Signal bars — sit inside right pad
  const barRight = W - PAD.right;
  const barBase = y - 2;
  const bw = 3.2;
  const gap = 2.4;
  const heights = [6, 9, 12, 15];
  let bx = barRight - heights.length * (bw + gap) + gap;
  for (const h of heights) {
    ctx.fillRect(bx, barBase - h, bw, h);
    bx += bw + gap;
  }
}

function drawHomeIndicator(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const w = 28;
  const h = 5;
  const x = (W - w) / 2;
  const y = H - PAD.bottom + 8;
  ctx.fillStyle = EINK_FG;
  ctx.beginPath();
  const r = h / 2;
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function clearPanel(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = EINK_BG;
  ctx.fillRect(0, 0, W, H);
}

function drawBoot(ctx: CanvasRenderingContext2D, W: number, H: number) {
  clearPanel(ctx, W, H);
  ctx.fillStyle = EINK_FG;
  ctx.font = `700 ${Math.round(W * 0.14)}px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("LOUP", W / 2, H * 0.48);
}

function drawSelect(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  contactIdx: number,
  time: string,
) {
  clearPanel(ctx, W, H);
  drawStatusBar(ctx, W, time);

  const contentLeft = PAD.left;
  const contentRight = W - PAD.right;
  const rowH = Math.round(H * 0.118);
  let y = PAD.top + 56;

  ctx.textAlign = "left";
  for (let i = 0; i < CONTACTS.length; i++) {
    const c = CONTACTS[i];
    const selected = i === contactIdx;
    const rowTop = y - 22;
    if (selected) {
      // Soft selection pill — stays inside right pad
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      const rx = contentLeft - 8;
      const rw = contentRight - contentLeft + 16;
      const rh = rowH - 6;
      const rr = 10;
      ctx.beginPath();
      ctx.moveTo(rx + rr, rowTop);
      ctx.arcTo(rx + rw, rowTop, rx + rw, rowTop + rh, rr);
      ctx.arcTo(rx + rw, rowTop + rh, rx, rowTop + rh, rr);
      ctx.arcTo(rx, rowTop + rh, rx, rowTop, rr);
      ctx.arcTo(rx, rowTop, rx + rw, rowTop, rr);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = EINK_FG;
      ctx.font = `700 ${Math.round(W * 0.055)}px ${FONT}`;
      ctx.textBaseline = "middle";
      ctx.fillText("›", contentLeft - 2, rowTop + rh / 2);
    }

    ctx.fillStyle = EINK_FG;
    ctx.font = `700 ${Math.round(W * 0.078)}px ${FONT}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(c.name, contentLeft + (selected ? 14 : 0), y);
    ctx.font = `400 ${Math.round(W * 0.048)}px ${FONT}`;
    ctx.globalAlpha = selected ? 0.9 : 0.65;
    ctx.fillText(c.status, contentLeft + (selected ? 14 : 0), y + 18);
    ctx.globalAlpha = 1;
    y += rowH;
  }

  drawHomeIndicator(ctx, W, H);
}

function drawCallChrome(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  contactIdx: number,
  subtitle: string,
  time: string,
  dots?: number,
) {
  clearPanel(ctx, W, H);
  drawStatusBar(ctx, W, time);

  const name = CONTACTS[contactIdx]?.name ?? "—";
  const cx = (PAD.left + (W - PAD.right)) / 2;
  const midY = H * 0.42;

  ctx.fillStyle = EINK_FG;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${Math.round(W * 0.11)}px ${FONT}`;
  ctx.fillText(name, cx, midY - 18);

  ctx.font = `400 ${Math.round(W * 0.055)}px ${FONT}`;
  ctx.globalAlpha = 0.85;
  ctx.fillText(subtitle, cx, midY + 22);
  ctx.globalAlpha = 1;

  if (dots != null && dots > 0) {
    const r = 3.2;
    const gap = 14;
    const total = 3 * gap;
    let x = cx - total / 2 + gap / 2;
    const dy = midY + 52;
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = i < dots ? 1 : 0.25;
      ctx.beginPath();
      ctx.arc(x, dy, r, 0, Math.PI * 2);
      ctx.fill();
      x += gap;
    }
    ctx.globalAlpha = 1;
  }

  drawHomeIndicator(ctx, W, H);
}

export async function makeLoupEinkUx(THREE: typeof import("three")) {
  await ensureAtkinson();

  const W = EINK_W;
  const H = EINK_H;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d");

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  // Avoid mip regenerating every frame (helps stop “refresh” shimmer)
  texture.generateMipmaps = false;

  const started = performance.now();
  let lastKey = "";
  let lastClock = "";

  const draw = (now: number) => {
    const elapsed = now - started;
    const { phase, local, contactIdx } = phaseAt(elapsed);
    const time = clockLabel();

    let key = `${phase}-${contactIdx}`;
    if (phase === "calling") {
      const dots = (Math.floor(local / 380) % 3) + 1;
      key = `calling-${contactIdx}-${dots}`;
      if (key === lastKey && time === lastClock) return false;
      lastKey = key;
      lastClock = time;
      drawCallChrome(ctx, W, H, contactIdx, "Calling", time, dots);
      texture.needsUpdate = true;
      return true;
    }
    if (phase === "active") {
      const sec = Math.floor(local / 1000);
      const mm = String(Math.floor(sec / 60)).padStart(2, "0");
      const ss = String(sec % 60).padStart(2, "0");
      key = `active-${contactIdx}-${mm}:${ss}`;
      if (key === lastKey && time === lastClock) return false;
      lastKey = key;
      lastClock = time;
      drawCallChrome(ctx, W, H, contactIdx, `On call  ${mm}:${ss}`, time);
      texture.needsUpdate = true;
      return true;
    }
    if (phase === "hangup") {
      key = `hangup-${contactIdx}`;
      if (key === lastKey && time === lastClock) return false;
      lastKey = key;
      lastClock = time;
      drawCallChrome(ctx, W, H, contactIdx, "Call ended", time);
      texture.needsUpdate = true;
      return true;
    }
    if (phase === "boot") {
      key = "boot";
      if (key === lastKey) return false;
      lastKey = key;
      lastClock = time;
      drawBoot(ctx, W, H);
      texture.needsUpdate = true;
      return true;
    }

    // select
    key = `select-${contactIdx}`;
    if (key === lastKey && time === lastClock) return false;
    lastKey = key;
    lastClock = time;
    drawSelect(ctx, W, H, contactIdx, time);
    texture.needsUpdate = true;
    return true;
  };

  draw(started);
  return { texture, draw, dispose: () => texture.dispose() };
}
