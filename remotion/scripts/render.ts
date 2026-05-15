/**
 * Scene-level incremental + parallel video build.
 *
 * Each scene composition is hashed against its inputs (its source files +
 * the shared design baseline + the case params it consumes + its narration
 * mp3). Cache hits skip rendering. Misses render in parallel, then ffmpeg
 * concat stitches the scene mp4s into out/video.mp4. Writes the provenance
 * sidecar (schema / template / TTS versions, render time) beside the output.
 *
 * Usage:
 *   npm run build                        # full build, BUILD_CONCURRENCY parallel
 *   npm run build -- --clean             # ignore the cache and re-render all
 *   BUILD_CONCURRENCY=4 npm run build    # change the parallel-render cap
 *   npm run build -- --browser-executable=/path/to/chrome
 *     (any flag we don't consume is forwarded to each `remotion render`)
 */
import { spawn } from "child_process";
import { createHash } from "crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import os from "os";
import path from "path";
import { sceneFilenames, type SceneKey } from "../src/narration/scenes";
import { VERSIONS } from "../src/version";

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const CACHE_DIR = path.join(OUT_DIR, "scenes-cache");
const VIDEO_OUT = path.join(OUT_DIR, "video.mp4");
const META_OUT = path.join(OUT_DIR, "video.meta.json");

/** Composition id (registered in Root.tsx) for each narration scene key. */
const SCENE_COMPOSITIONS: Record<SceneKey, string> = {
  opening: "Opening",
  variantIntro: "VariantIntro",
  categories: "Categories",
  notVUS: "NotVUS",
  specificVariant: "SpecificVariant",
  whyUncertain: "WhyUncertain",
  timeline: "Timeline",
  closing: "Closing",
};

// The order matters — must match Video.tsx's sequence so the concat
// produces the right film.
const SCENE_ORDER: SceneKey[] = [
  "opening",
  "variantIntro",
  "categories",
  "notVUS",
  "specificVariant",
  "whyUncertain",
  "timeline",
  "closing",
];

/** Shared inputs — changes here invalidate every scene's cache. */
const BASELINE_PATHS = [
  "src/design",
  "src/components",
  "src/fonts.ts",
  "src/version.ts",
  "src/Root.tsx",
  "package.json",
  "package-lock.json",
];

type SceneSpec = { paths: string[]; useParams: boolean };

/** Per-scene inputs + whether the visual reads case params. */
const SCENE_SPECS: Record<SceneKey, SceneSpec> = {
  opening: { paths: ["src/scenes/Opening.tsx"], useParams: false },
  variantIntro: {
    paths: [
      "src/scenes/VariantIntro.tsx",
      "src/scenes/gene-scene",
      "src/params/notation.ts",
    ],
    useParams: true,
  },
  categories: { paths: ["src/scenes/Categories.tsx"], useParams: false },
  notVUS: { paths: ["src/scenes/NotVUS.tsx"], useParams: false },
  specificVariant: {
    paths: [
      "src/scenes/SpecificVariant.tsx",
      "src/scenes/blocks",
      "src/params/buildScene5Blocks.ts",
      "src/params/geneTypeAnalogy.ts",
    ],
    useParams: true,
  },
  whyUncertain: { paths: ["src/scenes/WhyUncertain.tsx"], useParams: false },
  timeline: { paths: ["src/scenes/Timeline.tsx"], useParams: true },
  closing: { paths: ["src/scenes/Closing.tsx"], useParams: false },
};

function hashPath(rel: string): string {
  const abs = path.resolve(ROOT, rel);
  if (!existsSync(abs)) return `${rel}:MISSING`;
  const s = statSync(abs);
  if (s.isFile()) {
    return `${rel}:${createHash("sha256").update(readFileSync(abs)).digest("hex")}`;
  }
  // Directory: walk sorted so the hash is deterministic.
  const parts: string[] = [];
  for (const entry of readdirSync(abs, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    parts.push(hashPath(path.join(rel, entry.name)));
  }
  return `${rel}/{${parts.join(",")}}`;
}

function sceneHash(scene: SceneKey): string {
  const spec = SCENE_SPECS[scene];
  const inputs: string[] = [];
  for (const p of BASELINE_PATHS) inputs.push(hashPath(p));
  for (const p of spec.paths) inputs.push(hashPath(p));
  if (spec.useParams) inputs.push(hashPath("src/params"));
  // The scene's narration audio captures its own measured duration. Including
  // the whole audio-durations.ts would invalidate unrelated scenes whenever
  // any one scene's mp3 changed.
  inputs.push(
    hashPath(path.join("public/audio", `${sceneFilenames[scene]}.mp3`)),
  );
  const combined = createHash("sha256");
  for (const s of inputs) combined.update(s);
  return combined.digest("hex").slice(0, 16);
}

function runStreaming(
  cmd: string,
  args: string[],
  label: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${label} failed with exit code ${code}`)),
    );
  });
}

async function renderScene(
  scene: SceneKey,
  outPath: string,
  passthrough: string[],
): Promise<void> {
  await runStreaming(
    "npx",
    [
      "remotion",
      "render",
      SCENE_COMPOSITIONS[scene],
      outPath,
      ...passthrough,
    ],
    `render ${SCENE_COMPOSITIONS[scene]}`,
  );
}

async function concatScenes(
  scenePaths: string[],
  output: string,
): Promise<void> {
  const listFile = path.join(OUT_DIR, "concat-list.txt");
  // ffmpeg's concat demuxer wants single-quoted paths, one per line.
  const body = scenePaths
    .map((p) => `file '${p.replace(/'/g, "'\\''")}'`)
    .join("\n");
  writeFileSync(listFile, body + "\n", "utf8");
  await runStreaming(
    "npx",
    [
      "remotion",
      "ffmpeg",
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listFile,
      "-c",
      "copy",
      "-movflags",
      "+faststart",
      output,
    ],
    "ffmpeg concat",
  );
}

async function main() {
  // Forward unknown flags to remotion render; --clean is consumed locally.
  const argv = process.argv.slice(2);
  const clean = argv.includes("--clean");
  const passthrough = argv.filter((a) => a !== "--clean");

  const cpus = os.cpus().length;
  const concurrency = Math.max(
    1,
    Math.min(Number(process.env.BUILD_CONCURRENCY) || 2, cpus),
  );

  mkdirSync(CACHE_DIR, { recursive: true });
  if (clean) {
    console.log("--clean: wiping the scenes cache");
    rmSync(CACHE_DIR, { recursive: true, force: true });
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Pre-flight: every scene needs its narration mp3.
  for (const scene of SCENE_ORDER) {
    const mp3 = path.join(ROOT, "public/audio", `${sceneFilenames[scene]}.mp3`);
    if (!existsSync(mp3)) {
      throw new Error(
        `Missing narration audio: ${path.relative(ROOT, mp3)}\n` +
          `Run "npm run generate-audio" (or wait for CI) before building.`,
      );
    }
  }

  type Plan = {
    scene: SceneKey;
    hash: string;
    cachePath: string;
    cached: boolean;
  };
  const plans: Plan[] = SCENE_ORDER.map((scene) => {
    const hash = sceneHash(scene);
    const cachePath = path.join(CACHE_DIR, `${scene}-${hash}.mp4`);
    return { scene, hash, cachePath, cached: existsSync(cachePath) };
  });

  const hits = plans.filter((p) => p.cached);
  const misses = plans.filter((p) => !p.cached);

  console.log(`\nScenes: ${hits.length} cached, ${misses.length} to render`);
  for (const p of plans) {
    const mark = p.cached ? "✓ cached " : "• render ";
    console.log(`  ${mark} ${p.scene.padEnd(16)} ${p.hash}`);
  }

  // Render the cache misses with a parallel-worker pool.
  if (misses.length > 0) {
    const concurrent = Math.min(concurrency, misses.length);
    console.log(
      `\nRendering ${misses.length} scene${misses.length === 1 ? "" : "s"} with concurrency ${concurrent}...\n`,
    );
    const t0 = Date.now();
    let nextIdx = 0;
    const workers: Promise<void>[] = [];
    for (let w = 0; w < concurrent; w++) {
      workers.push(
        (async () => {
          while (true) {
            const idx = nextIdx++;
            if (idx >= misses.length) return;
            const p = misses[idx];
            const start = Date.now();
            console.log(`  → ${p.scene} starting`);
            await renderScene(p.scene, p.cachePath, passthrough);
            console.log(
              `  ✓ ${p.scene} done in ${((Date.now() - start) / 1000).toFixed(1)}s`,
            );
          }
        })(),
      );
    }
    await Promise.all(workers);
    console.log(`\nAll renders done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  }

  // Stitch in scene order. Concat demuxer with -c copy is lossless and fast.
  console.log(`\nConcat → ${path.relative(ROOT, VIDEO_OUT)}`);
  await concatScenes(
    plans.map((p) => p.cachePath),
    VIDEO_OUT,
  );

  // Provenance sidecar — same shape as the previous monolithic build.
  const meta = { ...VERSIONS, renderedAt: new Date().toISOString() };
  writeFileSync(META_OUT, JSON.stringify(meta, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${path.relative(ROOT, META_OUT)}`);
  console.log(JSON.stringify(meta, null, 2));
}

main().catch((err) => {
  console.error("\nBuild failed:", err?.message ?? err);
  process.exit(1);
});
