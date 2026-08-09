"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GLB2 — saved /glb rest pose, then two scroll acts:
 * 1) full clockwise yaw (screen still up)
 * 2) ease into a flip — back panel flat to camera, portrait (vertical)
 */
const MODEL_SRC = "/models/test_3d.web.glb";
const DAMP = 10;
const PIXEL_RATIO_CAP = 1.5;
/** Clockwise finishes here; flip gets the rest (longer = smoother). */
const YAW_SHARE = 0.42;
/** Tip/camera begin before yaw ends so the handoff isn’t a hard cut. */
const FLIP_START = 0.36;
const FULL_TURN = Math.PI * 2;

const PRESENT_TIP = 0.28;
const PRESENT_YAW = 0.35;
const MODEL_FLIP_X = 0;
const MODEL_YAW = 0;
const CAM = { x: -1.9, y: 1.15, z: 2.05 };
/** Overhead arc mid — keeps the lens off the mesh during the tumble. */
const CAM_ARC = { x: -0.6, y: 2.35, z: 1.05 };
/** Overhead end — back flat to lens (tiny Z = stable lookAt). */
const CAM_BACK = { x: 0, y: 2.85, z: 0.1 };
/** Screen-up → back-up. */
const BACK_TIP = Math.PI;
/** Portrait (vertical) back-flat — landscape was −π/2 from square. */
const BACK_YAW = FULL_TURN - PRESENT_YAW - Math.PI;

function scrollProgress(track: HTMLElement) {
  const rect = track.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const total = rect.height - viewH;
  if (total <= 1) return 0;
  return Math.min(1, Math.max(0, -rect.top / total));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function bezier(a: number, b: number, c: number, t: number) {
  const u = 1 - t;
  return u * u * a + 2 * u * t * b + t * t * c;
}

function targetsFromProgress(p: number) {
  // Act 1 yaw, then ease toward portrait back yaw
  let yaw: number;
  if (p <= YAW_SHARE) {
    yaw = (p / YAW_SHARE) * FULL_TURN;
  } else {
    const t = easeInOutCubic((p - YAW_SHARE) / (1 - YAW_SHARE));
    yaw = lerp(FULL_TURN, BACK_YAW, t);
  }

  // Flip overlaps the end of the spin — one continuous motion
  const flipRaw = (p - FLIP_START) / (1 - FLIP_START);
  const flip = easeInOutCubic(Math.min(1, Math.max(0, flipRaw)));

  return {
    yaw,
    tip: lerp(PRESENT_TIP, BACK_TIP, flip),
    camX: bezier(CAM.x, CAM_ARC.x, CAM_BACK.x, flip),
    camY: bezier(CAM.y, CAM_ARC.y, CAM_BACK.y, flip),
    camZ: bezier(CAM.z, CAM_ARC.z, CAM_BACK.z, flip),
  };
}

export function Glb2ScrollStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!canvas || !track || !stage) return;

    let disposed = false;
    let raf = 0;
    let resizeObs: ResizeObserver | null = null;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let pivot: import("three").Group | null = null;

    let targetYaw = 0;
    let targetTip = PRESENT_TIP;
    let targetCamX = CAM.x;
    let targetCamY = CAM.y;
    let targetCamZ = CAM.z;
    let yaw = 0;
    let tip = PRESENT_TIP;
    let camX = CAM.x;
    let camY = CAM.y;
    let camZ = CAM.z;
    let lastT = performance.now();
    let needsRender = true;
    let reduce = false;

    const setHud = (p: number) => {
      const pct = Math.round(p * 100);
      if (progressRef.current) progressRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (phaseRef.current) {
        phaseRef.current.textContent =
          p <= YAW_SHARE ? "Act 1 · clockwise" : "Act 2 · vertical back";
      }
    };

    const onScroll = () => {
      const p = reduce ? 0.4 : scrollProgress(track);
      const t = targetsFromProgress(p);
      targetYaw = t.yaw;
      targetTip = t.tip;
      targetCamX = t.camX;
      targetCamY = t.camY;
      targetCamZ = t.camZ;
      setHud(p);
      needsRender = true;
    };

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { MeshoptDecoder } = await import(
        "three/examples/jsm/libs/meshopt_decoder.module.js"
      );

      if (disposed) return;
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      scene = new THREE.Scene();
      scene.background = new THREE.Color("#0b0b0f");

      camera = new THREE.PerspectiveCamera(32, 1, 0.05, 50);
      camera.position.set(CAM.x, CAM.y, CAM.z);
      camera.lookAt(0, 0.05, 0);

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
      renderer.toneMappingExposure = 1.05;

      scene.add(new THREE.AmbientLight("#ffffff", 0.55));
      const key = new THREE.DirectionalLight("#ffffff", 1.2);
      key.position.set(2.2, 3, 2.4);
      scene.add(key);
      const fill = new THREE.DirectionalLight("#c5d4ff", 0.4);
      fill.position.set(-2, 0.4, -1.2);
      scene.add(fill);

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
        model.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.frustumCulled = true;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          const mat = mesh.material as import("three").MeshStandardMaterial;
          if (mat && "envMapIntensity" in mat) mat.envMapIntensity = 0.6;
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.position.sub(center);
        model.scale.setScalar(1.55 / maxDim);

        model.rotation.order = "YXZ";
        const thinY = size.y <= size.x * 0.55 && size.y <= size.z * 0.55;
        if (!thinY) model.rotation.x = -Math.PI / 2;
        model.rotation.x += MODEL_FLIP_X;
        model.rotation.y = MODEL_YAW;
        model.rotation.z = 0;
        model.updateMatrixWorld(true);
        const recentered = new THREE.Box3()
          .setFromObject(model)
          .getCenter(new THREE.Vector3());
        model.position.sub(recentered);

        pivot = new THREE.Group();
        pivot.rotation.order = "YXZ";
        pivot.rotation.x = PRESENT_TIP;
        pivot.rotation.y = PRESENT_YAW;
        pivot.add(model);
        model.traverse((obj) => {
          obj.matrixAutoUpdate = false;
          obj.updateMatrix();
        });
        scene.add(pivot);
        setStatus("ready");
        onScroll();
      } catch {
        if (!disposed) setStatus("error");
        return;
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });

      const damp = (cur: number, tgt: number, k: number) => cur + (tgt - cur) * k;

      const tick = (now: number) => {
        if (disposed || !renderer || !scene || !camera) return;
        const dt = Math.min(0.05, (now - lastT) / 1000);
        lastT = now;

        if (!reduce) {
          const k = 1 - Math.exp(-DAMP * dt);
          const nextYaw = damp(yaw, targetYaw, k);
          const nextTip = damp(tip, targetTip, k);
          const nextCamX = damp(camX, targetCamX, k);
          const nextCamY = damp(camY, targetCamY, k);
          const nextCamZ = damp(camZ, targetCamZ, k);
          const moved =
            Math.abs(nextYaw - yaw) > 1e-5 ||
            Math.abs(nextTip - tip) > 1e-5 ||
            Math.abs(nextCamX - camX) > 1e-5 ||
            Math.abs(nextCamY - camY) > 1e-5 ||
            Math.abs(nextCamZ - camZ) > 1e-5;
          if (moved) {
            yaw = nextYaw;
            tip = nextTip;
            camX = nextCamX;
            camY = nextCamY;
            camZ = nextCamZ;
            needsRender = true;
          } else if (
            Math.abs(targetYaw - yaw) > 1e-4 ||
            Math.abs(targetTip - tip) > 1e-4 ||
            Math.abs(targetCamX - camX) > 1e-4
          ) {
            yaw = targetYaw;
            tip = targetTip;
            camX = targetCamX;
            camY = targetCamY;
            camZ = targetCamZ;
            needsRender = true;
          }
        } else {
          yaw = targetYaw;
          tip = targetTip;
          camX = targetCamX;
          camY = targetCamY;
          camZ = targetCamZ;
        }

        if (needsRender && pivot) {
          pivot.rotation.y = PRESENT_YAW + yaw;
          pivot.rotation.x = tip;
          camera.position.set(camX, camY, camZ);
          // Blend camera up as we go overhead — no hard cut
          const u = Math.min(
            1,
            Math.max(0, (tip - PRESENT_TIP) / (BACK_TIP - PRESENT_TIP || 1)),
          );
          const ue = u * u * (3 - 2 * u);
          camera.up.set(0, 1 - ue, -ue).normalize();
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
          needsRender = false;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObs?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      renderer?.dispose();
      scene?.traverse((obj) => {
        const mesh = obj as import("three").Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, []);

  return (
    <div ref={trackRef} className="relative h-[420vh] bg-[#0b0b0f] text-white">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-6 sm:px-10">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/50">
              GLB2 · yaw → back
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Full clockwise, then ease into a vertical back-flat.
            </p>
            <p ref={phaseRef} className="mt-2 text-xs text-white/40">
              Act 1 · clockwise
            </p>
          </div>
          <span
            ref={progressRef}
            className="font-mono text-sm tabular-nums text-white/60"
          >
            0%
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-8 sm:px-10">
          <div className="h-px w-full bg-white/15">
            <div ref={barRef} className="h-px bg-white" style={{ width: "0%" }} />
          </div>
          <p className="mt-3 text-xs text-white/45">
            {status === "loading" && "Loading optimized model…"}
            {status === "error" && "Couldn’t load /models/test_3d.web.glb"}
            {status === "ready" && "Scroll · spin, then flip ↓"}
          </p>
        </div>
      </div>
    </div>
  );
}
