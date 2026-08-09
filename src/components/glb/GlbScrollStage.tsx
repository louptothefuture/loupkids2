"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Playdate-style product stage:
 * - sticky WebGL canvas
 * - scroll progress → target yaw
 * - exponential damping (not 1:1 scroll scrub — that's what feels sticky/laggy)
 * - render only when the pose actually moves
 * - web-optimized GLB (joined meshes + meshopt), not the CAD export
 */
const MODEL_SRC = "/models/test_3d.web.glb";
const TURNS = 1.25;
/** Higher = snappier follow. ~12 feels like Panic's device stage. */
const DAMP = 12;
const PIXEL_RATIO_CAP = 1.5;
/**
 * Reference pose (hero render): device laid flat, screen faces UP (+Y),
 * USB on the near short edge, dial on the right long edge. Camera is a
 * low 3/4 from the USB corner looking up at the screen — never portrait
 * with the screen facing the lens.
 */
const PRESENT_TIP = 0.28; // tip screen toward camera
const PRESENT_YAW = 0.35; // USB corner near + dial long edge
/** Local corrections while laid flat (screen up). */
const MODEL_FLIP_X = 0; // screen up (π was back-up)
const MODEL_YAW = 0; // USB short edge toward camera (π put LED end near)
const CAM = { x: -1.9, y: 1.15, z: 2.05 }; // USB corner; dial reads on the right

function scrollProgress(track: HTMLElement) {
  const rect = track.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const total = rect.height - viewH;
  if (total <= 1) return 0;
  return Math.min(1, Math.max(0, -rect.top / total));
}

export function GlbScrollStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
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
    let yaw = 0;
    let lastT = performance.now();
    let needsRender = true;
    let reduce = false;

    const setHud = (p: number) => {
      const pct = Math.round(p * 100);
      if (progressRef.current) progressRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };

    const onScroll = () => {
      const p = reduce ? 0.35 : scrollProgress(track);
      targetYaw = p * Math.PI * 2 * TURNS;
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
      // Low 3/4 from USB corner — see screen (up), USB edge, and dial side
      camera.position.set(CAM.x, CAM.y, CAM.z);
      camera.lookAt(0, 0.05, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        // Playdate-ish: don't pay for MSAA thrash on every scroll frame on mobile
        stencil: false,
        depth: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      // Simple product lighting — no shadows (shadow maps kill scroll FPS)
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

        // Lay flat: screen UP. Export is already thin in Y — do NOT stand it up.
        model.rotation.order = "YXZ";
        const thinY = size.y <= size.x * 0.55 && size.y <= size.z * 0.55;
        if (!thinY) {
          // Screen was on a vertical face — lay it down onto +Y
          model.rotation.x = -Math.PI / 2;
        }
        model.rotation.x += MODEL_FLIP_X;
        model.rotation.y = MODEL_YAW;
        model.rotation.z = 0;
        model.updateMatrixWorld(true);
        const recentered = new THREE.Box3()
          .setFromObject(model)
          .getCenter(new THREE.Vector3());
        model.position.sub(recentered);

        // Pivot: slight tip + rest yaw; scroll adds more yaw
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

      const tick = (now: number) => {
        if (disposed || !renderer || !scene || !camera) return;
        const dt = Math.min(0.05, (now - lastT) / 1000);
        lastT = now;

        if (!reduce) {
          const k = 1 - Math.exp(-DAMP * dt);
          const next = yaw + (targetYaw - yaw) * k;
          if (Math.abs(next - yaw) > 1e-5) {
            yaw = next;
            needsRender = true;
          } else if (Math.abs(targetYaw - yaw) > 1e-4) {
            yaw = targetYaw;
            needsRender = true;
          }
        } else {
          yaw = targetYaw;
        }

        if (needsRender && pivot) {
          pivot.rotation.y = PRESENT_YAW + yaw;
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
    <div ref={trackRef} className="relative h-[280vh] bg-[#0b0b0f] text-white">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-6 sm:px-10">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/50">
              GLB · scroll demo
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Playdate-style stage — dampened scroll yaw on a simplified mesh.
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
            {status === "ready" && "Scroll to spin ↓"}
          </p>
        </div>
      </div>
    </div>
  );
}
