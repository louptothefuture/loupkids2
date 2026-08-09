"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GLB3 — textured product turntable.
 * Camera stays put; model rotates so each face is flat head-on.
 * Six story frames: front → back → top → dial → USB → volume.
 */
const MODEL_SRC = "/models/stripped_down_glb3.glb";
const EINK_LIST_SRC = "/models/loup-eink-list.svg";
const EINK_CALL_SRC = "/models/loup-eink-calling.svg";
const PIXEL_RATIO_CAP = 1.5;
const DIST = 4.4;
const TRANSITION_MS = 1200;
const HOLD_MS = 200;
/** Dwell on each face before auto-advance in embed mode. */
const EMBED_DWELL_MS = 2200;
const MODEL_SCALE = 1.3;
/** Warm off-white — white phone needs a slightly darker stage to lift. */
const STAGE_BG = "#f6f5f2"; // matches --lk-bg / --lk-cream
/** CSS SVG noise — faint paper grain over the stage. */
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Grey e-ink panel crop inside the SVG artboard (correct tall aspect). */
const EINK_CROP = { x: 49.61, y: 0, w: 82.2, h: 189.92 };
const EINK_W = 246;
const EINK_H = 570;
/** Matches SVG panel fill (`#4d4d4d`). */
const EINK_BG = "#4d4d4d";
/** Soft form key on front only. */
const FRONT_FORM_I = 0.45;
/** Back-plate showcase on face 1 ("Make it your own"). */
const PLATE_FACE = 1;
const PLATE_STEP_MS = 850;
/** "hi" Y stops in full SVG space — Mom → Mila → Ridley. */
const HI_YS = [52.66, 87.43, 122.16];
const HI_X = 52.72;
const HI_STEP_MS = 650;
const HI_HOLD_MS = 800;
const HI_SCROLL_MS = HI_YS.length * HI_STEP_MS + HI_HOLD_MS;
const DOT_STEP_MS = 400;
/** Calling-dots in full SVG space (right of handset), mapped through crop. */
const DOT_SVG = { xs: [96.12, 101.52, 106.93], y: 111.66, r: 1.15 };

/** Export ships back-up; flip to screen-up, then yaw so USB faces +Z. */
const MODEL_FLIP_X = Math.PI;
const MODEL_YAW = Math.PI;

/**
 * Extra rotation on the oriented model so that face points at +Y (camera).
 * Model basis after base orient: screen +Y, USB +Z, right +X (dial).
 */
const FACES: {
  title: string;
  body: string;
  rot: [number, number, number];
  up: [number, number, number];
}[] = [
  {
    title: "Scroll. Click. Call.",
    body: "It's pretty simple really, because that's the point.",
    rot: [0, 0, 0],
    up: [0, 0, -1],
  },
  {
    title: "Make it yours",
    body: "Swap the back plate whenever you want a new look.",
    rot: [0, 0, Math.PI],
    up: [0, 0, -1],
  },
  {
    title: "Clear power",
    body: "Hardware on/off — obvious when Loup is awake.",
    rot: [Math.PI / 2, 0, 0],
    up: [0, 0, -1],
  },
  {
    title: "Anodized Aluminium",
    body: "Machined metal sides and dial — built like gear, not a toy.",
    rot: [0, 0, Math.PI / 2],
    up: [0, 0, -1],
  },
  {
    title: "USB-C",
    body: "Charges in ~70 minutes. Runs about five days.",
    rot: [-Math.PI / 2, 0, 0],
    up: [0, 0, -1],
  },
  {
    title: "Volume + mute",
    body: "Limiter on board. Mute switch when you need quiet.",
    rot: [0, 0, -Math.PI / 2],
    up: [0, 0, -1],
  },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type PlateLook = {
  color: number;
  map: import("three").Texture | null;
  roughness: number;
  metalness?: number;
};

/**
 * CAD atlas UVs only use a sliver of the plate face (looks insanely zoomed).
 * Rewrite to planar XZ so full-bleed art covers the rectangle.
 */
function planarizePlateUVs(mesh: import("three").Mesh) {
  const geo = mesh.geometry;
  const pos = geo.getAttribute("position");
  const uv = geo.getAttribute("uv");
  if (!pos || !uv || uv.count !== pos.count) return;
  let xMin = Infinity;
  let xMax = -Infinity;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    xMin = Math.min(xMin, x);
    xMax = Math.max(xMax, x);
    zMin = Math.min(zMin, z);
    zMax = Math.max(zMax, z);
  }
  const xSpan = Math.max(1e-8, xMax - xMin);
  const zSpan = Math.max(1e-8, zMax - zMin);
  for (let i = 0; i < pos.count; i++) {
    // Invert V — CAD +Z reads opposite the art's "up" when viewing the back.
    uv.setXY(i, (pos.getX(i) - xMin) / xSpan, 1 - (pos.getZ(i) - zMin) / zSpan);
  }
  uv.needsUpdate = true;
}

/** kawaii → ohtani → bright blue → black */
async function makePlateLooks(THREE: typeof import("three")) {
  const loader = new THREE.TextureLoader();
  const load = async (url: string) => {
    const map = await loader.loadAsync(url);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.wrapS = THREE.ClampToEdgeWrapping;
    map.wrapT = THREE.ClampToEdgeWrapping;
    map.flipY = true;
    map.repeat.set(1, 1);
    map.offset.set(0, 0);
    map.needsUpdate = true;
    return map;
  };

  const [kawaii, ohtani] = await Promise.all([
    load("/images/plates/kawaii.png"),
    load("/images/plates/ohtani-cartoon.png"),
  ]);

  // Last look is white — hold it before leaving "Make it yours"
  const looks: PlateLook[] = [
    { color: 0xffffff, map: kawaii, roughness: 0.55, metalness: 0 },
    { color: 0xffffff, map: ohtani, roughness: 0.55, metalness: 0 },
    { color: 0x2888ff, map: null, roughness: 0.48, metalness: 0 }, // bright blue
    { color: 0x121212, map: null, roughness: 0.5, metalness: 0 }, // black
    { color: 0xf2f2f0, map: null, roughness: 0.52, metalness: 0 }, // white
  ];

  return {
    looks,
    dispose: () => {
      for (const l of looks) l.map?.dispose();
    },
  };
}

/** Soft oval under the phone — vanilla stand-in for drei <ContactShadows />. */
function makeContactShadow(THREE: typeof import("three")) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d");
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(0,0,0,0.82)");
  g.addColorStop(0.32, "rgba(0,0,0,0.42)");
  g.addColorStop(0.65, "rgba(0,0,0,0.14)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const map = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    toneMapped: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  // Camera looks down +Y — plane faces the lens, just behind the phone
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = -1;
  mesh.frustumCulled = false;
  return mesh;
}

/** SVG rolodex → calling; time Helvetica in SVG, body Atkinson; dots loop on call. */
async function makeEinkTexture(THREE: typeof import("three")) {
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

  const loadSvg = async (src: string) => {
    const res = await fetch(src);
    let svgText = await res.text();
    // Time stays Helvetica; force clock text to Helvetica explicitly
    svgText = svgText.replace(
      /(<text[^>]*class="clock"[^>]*style=")([^"]*)(")/g,
      (_, a, style, c) =>
        `${a}${style.replace(/font-family:[^;"]+/g, "font-family:Helvetica, Arial, sans-serif")}${c}`,
    );
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error(src));
        i.src = url;
      });
      await new Promise((r) => setTimeout(r, 100));
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const [listImg, callImg] = await Promise.all([
    loadSvg(EINK_LIST_SRC),
    loadSvg(EINK_CALL_SRC),
  ]);

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

  const { x: cx, y: cy, w: cw, h: ch } = EINK_CROP;
  const toCanvas = (sx: number, sy: number) => ({
    x: ((sx - cx) / cw) * W,
    y: ((sy - cy) / ch) * H,
  });

  const blit = (img: HTMLImageElement) => {
    ctx.fillStyle = EINK_BG;
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, W, H);
  };

  const started = performance.now();
  let lastKey = "";

  const drawDots = (count: number) => {
    // Baked stroke-dots stripped from SVG — paint live dots only
    ctx.fillStyle = "#fff";
    const r = (DOT_SVG.r / cw) * W;
    for (let i = 0; i < count; i++) {
      const p = toCanvas(DOT_SVG.xs[i], DOT_SVG.y);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const draw = (now: number) => {
    const elapsed = now - started;

    // Last frame loops: calling + dots 1 → 2 → 3 → repeat
    if (elapsed >= HI_SCROLL_MS) {
      const dotCount = (Math.floor((elapsed - HI_SCROLL_MS) / DOT_STEP_MS) % 3) + 1;
      const key = `call-${dotCount}`;
      if (key === lastKey) return false;
      lastKey = key;
      blit(callImg);
      drawDots(dotCount);
      texture.needsUpdate = true;
      return true;
    }

    const step = Math.min(HI_YS.length - 1, Math.floor(elapsed / HI_STEP_MS));
    const key = `hi-${step}`;
    if (key === lastKey) return false;
    lastKey = key;
    blit(listImg);
    const p = toCanvas(HI_X, HI_YS[step]);
    ctx.fillStyle = "#fff";
    ctx.font = `700 ${Math.round(H * 0.045)}px "Atkinson Hyperlegible", Helvetica, Arial, sans-serif`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("hi", p.x, p.y);
    texture.needsUpdate = true;
    return true;
  };

  draw(started);
  return { texture, draw, dispose: () => texture.dispose() };
}

export function Glb3ScrollStage({
  mode = "page",
}: {
  /** page = full-viewport scroll-snap; embed = in-flow autoplay for homepage */
  mode?: "page" | "embed";
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stepNavRef = useRef<{ prev: () => void; next: () => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [frameIdx, setFrameIdx] = useState(0);
  const embed = mode === "embed";

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    let disposed = false;
    let raf = 0;
    let resizeObs: ResizeObserver | null = null;
    let viewObs: IntersectionObserver | null = null;
    let inView = !embed; // page mode always "active"
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let pivot: import("three").Group | null = null;
    let faceQuats: import("three").Quaternion[] = [];
    let qFrom = null as import("three").Quaternion | null;
    let qTo = null as import("three").Quaternion | null;
    let qTmp = null as import("three").Quaternion | null;
    let upFrom: [number, number, number] = [0, 0, -1];
    let upTo: [number, number, number] = [0, 0, -1];
    let upCur: [number, number, number] = [0, 0, -1];

    let faceIdx = 0;
    let animStart = 0;
    let animating = false;
    let holdUntil = 0;
    let needsRender = true;
    let reduce = false;
    let touchStartY = 0;
    let einkDraw: ((now: number) => boolean) | null = null;
    let einkDispose: (() => void) | null = null;
    let formKey: import("three").DirectionalLight | null = null;
    let formFrom = 0;
    let formTo = 0;
    let backPlateMat: import("three").MeshStandardMaterial | null = null;
    let plateLooks: Awaited<ReturnType<typeof makePlateLooks>> | null = null;
    let plateIdx = 0;
    let plateNextAt = 0;

    const formI = (idx: number) => (idx === 0 ? FRONT_FORM_I : 0);

    const applyPlateLook = (idx: number) => {
      if (!backPlateMat || !plateLooks) return;
      const look = plateLooks.looks[idx % plateLooks.looks.length];
      backPlateMat.color.setHex(look.color);
      backPlateMat.map = look.map;
      backPlateMat.roughness = look.roughness;
      backPlateMat.metalness = look.metalness ?? 0;
      backPlateMat.envMapIntensity = look.metalness ? 0.85 : 0.45;
      backPlateMat.needsUpdate = true;
      needsRender = true;
    };

    /** Progress + title/body — call at nav start so copy isn't a beat behind the orbit. */
    const syncFaceCopy = (idx: number) => {
      const pct = Math.round((idx / (FACES.length - 1)) * 100);
      if (progressRef.current) {
        progressRef.current.textContent = `${idx + 1} / ${FACES.length}`;
      }
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setFrameIdx(idx);
    };

    const applyPlateForFace = (idx: number) => {
      if (!plateLooks || !backPlateMat) return;
      if (idx === PLATE_FACE) {
        plateIdx = 0;
        applyPlateLook(0);
        plateNextAt = performance.now() + PLATE_STEP_MS;
      } else {
        // Leave customize on white (last look)
        plateIdx = plateLooks.looks.length - 1;
        applyPlateLook(plateIdx);
        plateNextAt = Number.POSITIVE_INFINITY;
      }
    };

    const applyFaceLabel = (idx: number) => {
      faceIdx = idx;
      syncFaceCopy(idx);
      applyPlateForFace(idx);
    };

    const applyCameraUp = (up: [number, number, number]) => {
      if (!camera) return;
      upCur = up;
      camera.up.set(up[0], up[1], up[2]);
      camera.lookAt(0, 0, 0);
    };

    const setPivotQuat = (idx: number) => {
      if (!pivot || !faceQuats[idx]) return;
      pivot.quaternion.copy(faceQuats[idx]);
      pivot.updateMatrixWorld(true);
      applyCameraUp(FACES[idx].up);
      needsRender = true;
    };

    const goToFace = (
      idx: number,
      opts?: { force?: boolean; wrap?: boolean },
    ) => {
      const next = opts?.wrap
        ? ((idx % FACES.length) + FACES.length) % FACES.length
        : Math.min(FACES.length - 1, Math.max(0, idx));
      if (next === faceIdx) return false;
      if (!opts?.force && performance.now() < holdUntil) return false;
      if (!pivot || !qFrom || !qTo || !faceQuats[next]) return false;

      qFrom.copy(pivot.quaternion);
      qTo.copy(faceQuats[next]);
      upFrom = [...upCur];
      upTo = FACES[next].up;
      formFrom = faceIdx;
      formTo = next;
      // Snap to white as soon as we leave customize (don't orbit away on art)
      if (
        faceIdx === PLATE_FACE &&
        next !== PLATE_FACE &&
        plateLooks &&
        backPlateMat
      ) {
        plateIdx = plateLooks.looks.length - 1;
        applyPlateLook(plateIdx);
        plateNextAt = Number.POSITIVE_INFINITY;
      }
      faceIdx = next;
      // Copy tracks the turn immediately (was waiting until orbit finished)
      syncFaceCopy(next);
      applyPlateForFace(next);

      if (reduce) {
        setPivotQuat(next);
        if (formKey) formKey.intensity = formI(next);
        holdUntil = performance.now() + HOLD_MS;
        return true;
      }

      animStart = performance.now();
      animating = true;
      holdUntil = animStart + TRANSITION_MS + HOLD_MS;
      needsRender = true;
      return true;
    };

    stepNavRef.current = {
      prev: () => {
        goToFace(faceIdx - 1, { force: true, wrap: true });
      },
      next: () => {
        goToFace(faceIdx + 1, { force: true, wrap: true });
      },
    };

    /** Page mode only — embed is autoplay, no scroll trap. */
    const onWheel = (e: WheelEvent) => {
      if (embed || reduce) return;
      e.preventDefault();
      const dir = e.deltaY === 0 ? 0 : e.deltaY > 0 ? 1 : -1;
      if (!dir) return;
      goToFace(faceIdx + dir);
    };

    const onKey = (e: KeyboardEvent) => {
      if (embed || reduce) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goToFace(faceIdx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToFace(faceIdx - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (embed) return;
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (embed || reduce) return;
      const y = e.changedTouches[0]?.clientY ?? touchStartY;
      const dy = touchStartY - y;
      if (Math.abs(dy) < 40) return;
      goToFace(faceIdx + (dy > 0 ? 1 : -1));
    };

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { MeshoptDecoder } = await import(
        "three/examples/jsm/libs/meshopt_decoder.module.js"
      );
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );

      if (disposed) return;
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      qFrom = new THREE.Quaternion();
      qTo = new THREE.Quaternion();
      qTmp = new THREE.Quaternion();
      faceQuats = FACES.map((f) => {
        const e = new THREE.Euler(f.rot[0], f.rot[1], f.rot[2], "XYZ");
        return new THREE.Quaternion().setFromEuler(e);
      });

      scene = new THREE.Scene();
      scene.background = new THREE.Color(STAGE_BG);

      // Fixed camera: looking down +Y at the face we rotate toward it
      camera = new THREE.PerspectiveCamera(34, 1, 0.05, 80);
      camera.position.set(0, DIST, 0);
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.06;

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.72;
      pmrem.dispose();

      // Calm base rig (other frames) + soft front-only form key for depth on face 1
      scene.add(new THREE.HemisphereLight("#ffffff", "#b8b0a6", 0.42));
      const key = new THREE.DirectionalLight("#ffffff", 1.3);
      key.position.set(2.4, 3.6, 2.0);
      scene.add(key);
      const fill = new THREE.DirectionalLight("#f0ebe4", 0.38);
      fill.position.set(-3.2, 1.4, -0.6);
      scene.add(fill);
      const rim = new THREE.DirectionalLight("#ffffff", 0.9);
      rim.position.set(-0.6, 1.0, -3.8);
      scene.add(rim);
      const kick = new THREE.DirectionalLight("#fff6ee", 0.4);
      kick.position.set(3.4, 0.5, -1.6);
      scene.add(kick);
      const form = new THREE.DirectionalLight("#ffffff", FRONT_FORM_I);
      form.position.set(1.6, 4.8, 2.8);
      scene.add(form);
      formKey = form;

      const fit = () => {
        if (!renderer || !camera) return;
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        needsRender = true;
      };
      fit();
      resizeObs = new ResizeObserver(fit);
      resizeObs.observe(stage);

      try {
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(MODEL_SRC);
        if (disposed) return;

        const model = gltf.scene;
        // Object wrapper so TS keeps Mesh|null across traverse callback assignment
        const found = {
          screen: null as import("three").Mesh | null,
        };
        model.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.frustumCulled = true;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          const mat = mesh.material as import("three").MeshStandardMaterial;
          if (!mat || !("metalness" in mat)) return;
          const matName = (mat.name || "").toLowerCase();

          // Front plate (export mislabels it car_paint + clearcoat — that rendered invisible)
          if (matName.includes("car_paint")) {
            const solid = new THREE.MeshStandardMaterial({
              color: 0xf2f2f0,
              metalness: 0,
              roughness: 0.48,
              envMapIntensity: 0.5,
            });
            solid.name = mat.name;
            mesh.material = solid;
            mat.dispose();
            return;
          }
          // Swappable back plate — cycled on the "Make it your own" frame
          if (matName.includes("default_cad_material3")) {
            const solid = new THREE.MeshStandardMaterial({
              color: 0xf2f2f0,
              metalness: 0,
              roughness: 0.52,
              envMapIntensity: 0.45,
            });
            solid.name = mat.name;
            planarizePlateUVs(mesh);
            mesh.material = solid;
            mat.dispose();
            backPlateMat = solid;
            return;
          }
          // Screen panel — dark bed; live UX sits on an overlay plane
          if (matName.includes("matte")) {
            found.screen = mesh;
            mat.color.setHex(0x4d4d4d);
            mat.map = null;
            mat.emissiveMap = null;
            mat.emissive.setHex(0x4d4d4d);
            mat.emissiveIntensity = 1;
            mat.metalness = 0;
            mat.roughness = 1;
            mat.envMapIntensity = 0;
            mat.toneMapped = false;
            return;
          }
          // Buttons / switches — matte black
          if (matName.includes("metal_material") || matName.includes("glow")) {
            mat.color.setHex(0x0a0a0a);
            mat.metalness = 0.25;
            mat.roughness = 0.7;
            mat.envMapIntensity = 0.12;
            return;
          }
          // Dial knurl + hardware trim
          if (matName.includes("brushed") || matName.includes("alloy")) {
            mat.color.setHex(0x141414);
            mat.metalness = 0.55;
            mat.roughness = 0.5;
            mat.envMapIntensity = 0.4;
            return;
          }
          // Shell / plastics — a bit of env so edges catch light
          mat.envMapIntensity = 0.65;
          if ("roughness" in mat && mat.roughness < 0.4) mat.roughness = 0.4;
        });

        const box0 = new THREE.Box3().setFromObject(model);
        const size0 = box0.getSize(new THREE.Vector3());
        const center0 = box0.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size0.x, size0.y, size0.z) || 1;
        model.position.sub(center0);
        model.scale.setScalar(MODEL_SCALE / maxDim);

        // Pick base euler so thickness is +Y (big face → camera) and length ≥ width on Z
        {
          const candidates: [number, number, number][] = [];
          for (const x of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
            for (const y of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
              for (const z of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
                candidates.push([x, y, z]);
              }
            }
          }
          let best: [number, number, number] = [MODEL_FLIP_X, MODEL_YAW, 0];
          let bestScore = -Infinity;
          for (const e of candidates) {
            model.rotation.set(e[0], e[1], e[2], "XYZ");
            model.updateMatrixWorld(true);
            const s = new THREE.Box3()
              .setFromObject(model)
              .getSize(new THREE.Vector3());
            const min = Math.min(s.x, s.y, s.z);
            if (s.y > min * 1.08) continue; // thickness must be Y
            // Prefer portrait (longer along Z) and maximize face area
            const portrait = s.z >= s.x * 0.95 ? 1.2 : 1;
            const score = s.x * s.z * portrait;
            if (score > bestScore) {
              bestScore = score;
              best = e;
            }
          }
          // +π Y: new GLB ships with UI inverted; yaw keeps the same face toward camera
          model.rotation.set(best[0], best[1] + Math.PI, best[2], "XYZ");
          model.updateMatrixWorld(true);
        }

        const recentered = new THREE.Box3()
          .setFromObject(model)
          .getCenter(new THREE.Vector3());
        model.position.sub(recentered);
        model.updateMatrixWorld(true);

        pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);

        // Live UX preview on the e-ink panel (SVG → canvas → plane on screen)
        // Assert: traverse assigns found.screen; TS ignores callback writes
        const screenMesh = found.screen as import("three").Mesh | null;
        if (screenMesh) {
          try {
            const eink = await makeEinkTexture(THREE);
            if (disposed) {
              eink.dispose();
              return;
            }
            einkDraw = eink.draw;
            einkDispose = eink.dispose;

            setPivotQuat(0);
            model.updateMatrixWorld(true);
            screenMesh.updateMatrixWorld(true);
            screenMesh.geometry.computeBoundingBox();
            const lb = screenMesh.geometry.boundingBox!;
            const lsize = new THREE.Vector3();
            const lcenter = new THREE.Vector3();
            lb.getSize(lsize);
            lb.getCenter(lcenter);

            // Thin axis = screen normal; other two = panel width/height
            const axes: Array<"x" | "y" | "z"> = ["x", "y", "z"];
            axes.sort((a, b) => lsize[a] - lsize[b]);
            const thin = axes[0];
            const axisU = axes[1];
            const axisV = axes[2];

            const overlay = new THREE.Mesh(
              new THREE.PlaneGeometry(lsize[axisU] * 1.02, lsize[axisV] * 1.02),
              new THREE.MeshBasicMaterial({
                map: eink.texture,
                toneMapped: false,
                depthWrite: true,
                polygonOffset: true,
                polygonOffsetFactor: -2,
                polygonOffsetUnits: -2,
              }),
            );

            // Face the camera (+Y) with texture "up" = world -Z
            const localN = new THREE.Vector3();
            localN[thin] = 1;
            let nW = localN
              .clone()
              .transformDirection(screenMesh.matrixWorld)
              .normalize();
            if (nW.dot(new THREE.Vector3(0, 1, 0)) < 0) {
              localN[thin] = -1;
              nW.negate();
            }
            const upW = new THREE.Vector3(0, 0, -1);
            const rightW = new THREE.Vector3().crossVectors(upW, nW).normalize();
            const trueUpW = new THREE.Vector3().crossVectors(nW, rightW).normalize();
            const worldQ = new THREE.Quaternion().setFromRotationMatrix(
              new THREE.Matrix4().makeBasis(rightW, trueUpW, nW),
            );
            const parentQ = new THREE.Quaternion();
            screenMesh.getWorldQuaternion(parentQ);
            overlay.quaternion.copy(parentQ).invert().multiply(worldQ);

            overlay.position.copy(lcenter);
            overlay.position[thin] +=
              Math.sign(localN[thin]) * (lsize[thin] * 0.5 + 0.0015);
            overlay.renderOrder = 2;
            screenMesh.add(overlay);
          } catch {
            // keep dark screen bed if SVG fails to load
          }
        }

        // Contact shadow — slightly behind phone; oversized so soft edge peeks
        // around the silhouette (camera looks down +Y, so a tight plane is hidden)
        {
          setPivotQuat(0);
          const wb = new THREE.Box3().setFromObject(pivot);
          const sz = wb.getSize(new THREE.Vector3());
          const sphere = wb.getBoundingSphere(new THREE.Sphere());
          const shadow = makeContactShadow(THREE);
          shadow.position.set(0, -sphere.radius * 0.55, sz.z * 0.06);
          shadow.scale.set(sz.x * 2.35, sz.z * 2.1, 1);
          scene.add(shadow);
        }

        setPivotQuat(0);
        applyFaceLabel(0);
        if (backPlateMat) {
          try {
            plateLooks = await makePlateLooks(THREE);
            if (disposed) {
              plateLooks.dispose();
              plateLooks = null;
            } else {
              applyPlateLook(0);
            }
          } catch {
            plateLooks = null;
          }
        }
        // Embed dwell starts when the model is ready (not from page open)
        holdUntil = performance.now();
        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
        return;
      }

      if (!embed) {
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKey);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
      } else {
        viewObs = new IntersectionObserver(
          ([entry]) => {
            inView = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35);
          },
          { threshold: [0, 0.35, 0.6] },
        );
        viewObs.observe(stage);
      }

      const tick = (now: number) => {
        if (disposed || !renderer || !scene || !camera || !pivot) return;

        if (einkDraw?.(now)) needsRender = true;

        // Cycle back-plate looks while parked on the customize frame — stop on white
        if (
          plateLooks &&
          backPlateMat &&
          !animating &&
          faceIdx === PLATE_FACE &&
          now >= plateNextAt
        ) {
          if (plateIdx < plateLooks.looks.length - 1) {
            plateIdx += 1;
            applyPlateLook(plateIdx);
            plateNextAt = now + PLATE_STEP_MS;
          } else {
            plateNextAt = Number.POSITIVE_INFINITY;
          }
        }

        // Embed: auto-advance faces while in view (no page-scroll trap).
        // On customize: wait until white is showing before leaving.
        const plateDone =
          faceIdx !== PLATE_FACE ||
          !plateLooks ||
          plateIdx >= plateLooks.looks.length - 1;
        if (
          embed &&
          inView &&
          !reduce &&
          !animating &&
          faceQuats.length > 0 &&
          plateDone &&
          now >= holdUntil + EMBED_DWELL_MS
        ) {
          goToFace(faceIdx + 1, { wrap: true });
        }

        if (animating && !reduce && qFrom && qTo && qTmp) {
          const u = Math.min(1, (now - animStart) / TRANSITION_MS);
          const e = easeInOutCubic(u);
          qTmp.copy(qFrom).slerp(qTo, e);
          pivot.quaternion.copy(qTmp);
          pivot.updateMatrixWorld(true);
          const up: [number, number, number] = [
            upFrom[0] + (upTo[0] - upFrom[0]) * e,
            upFrom[1] + (upTo[1] - upFrom[1]) * e,
            upFrom[2] + (upTo[2] - upFrom[2]) * e,
          ];
          applyCameraUp(up);
          if (formKey) {
            formKey.intensity = formI(formFrom) + (formI(formTo) - formI(formFrom)) * e;
          }
          needsRender = true;
          if (u >= 1) {
            pivot.quaternion.copy(qTo);
            pivot.updateMatrixWorld(true);
            applyCameraUp(upTo);
            // Copy already synced at nav start — just settle lights
            if (formKey) formKey.intensity = formI(faceIdx);
            animating = false;
          }
        }

        if (needsRender) {
          renderer.render(scene, camera);
          needsRender = false;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      disposed = true;
      stepNavRef.current = null;
      cancelAnimationFrame(raf);
      resizeObs?.disconnect();
      viewObs?.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      einkDispose?.();
      plateLooks?.dispose();
      renderer?.dispose();
      scene?.environment?.dispose?.();
      scene?.traverse((obj) => {
        const mesh = obj as import("three").Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, [embed]);

  const frame = FACES[frameIdx];

  return (
    <div
      ref={stageRef}
      className={
        embed
          ? "relative h-full w-full overflow-hidden bg-[var(--lk-cream,#f6f5f2)] text-neutral-900"
          : "relative h-[100dvh] w-full overflow-hidden bg-[var(--lk-cream,#f6f5f2)] text-neutral-900"
      }
      style={{
        position: "relative",
        height: embed ? "100%" : "100dvh",
        width: "100%",
        overflow: "hidden",
        background: STAGE_BG,
        color: "#171717",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {/* Studio paper grain — lifts the white shell without fighting it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_BG, backgroundSize: "180px 180px" }}
      />

      {embed ? (
        <>
          <button
            type="button"
            aria-label="Previous face"
            disabled={status !== "ready"}
            onClick={() => stepNavRef.current?.prev()}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-black/10 transition hover:bg-white disabled:cursor-default disabled:opacity-40 sm:left-4 sm:h-11 sm:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M12 4L6 10l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next face"
            disabled={status !== "ready"}
            onClick={() => stepNavRef.current?.next()}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-black/10 transition hover:bg-white disabled:cursor-default disabled:opacity-40 sm:right-4 sm:h-11 sm:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M8 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}

      <span
        ref={progressRef}
        className={`pointer-events-none absolute z-10 font-mono tabular-nums text-neutral-500 ${
          embed
            ? "right-4 top-4 text-xs sm:right-6 sm:top-5"
            : "right-6 top-6 text-sm sm:right-10 sm:top-8"
        }`}
      >
        1 / {FACES.length}
      </span>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 ${
          embed ? "px-4 pb-4 sm:px-6 sm:pb-5" : "px-6 pb-8 sm:px-10"
        }`}
      >
        <div className="max-w-lg">
          <p
            className={`font-medium tracking-tight text-neutral-900 ${
              embed ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {frame.title}
          </p>
          <p
            className={`mt-1 leading-snug text-neutral-600 ${
              embed ? "text-sm" : "mt-2 text-base"
            }`}
          >
            {frame.body}
          </p>
        </div>
        <div className={`h-px w-full bg-neutral-900/15 ${embed ? "mt-3" : "mt-5"}`}>
          <div
            ref={barRef}
            className="h-px bg-neutral-900"
            style={{ width: "0%" }}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          {status === "loading" && "Loading…"}
          {status === "error" &&
            (embed
              ? "Couldn’t load 3D preview"
              : "Couldn’t load /models/stripped_down_glb3.glb")}
          {status === "ready" && (embed ? null : "Scroll · snaps each face")}
        </p>
      </div>
    </div>
  );
}
