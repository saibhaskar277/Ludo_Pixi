import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  // REQUIRED for GitHub Pages: use "./" so asset URLs are relative.
  // If your repo is at  https://user.github.io/my-game/  this keeps every
  // script/asset import relative to the HTML file rather than the domain root.
  base: "./",

  build: {
    outDir: "dist",
    emptyOutDir: true,

    // FIX 1 — CSP / eval error
    // "inline" sourcemaps embed a data-URI into the .js file and cause GitHub
    // Pages' CSP to block eval().  "hidden" writes separate .map files that
    // DevTools can load on demand without any eval() call in the bundle.
    sourcemap: command === "build" ? "hidden" : true,

    rollupOptions: {
      // FIX 2 — MIME-type error
      // Explicitly tell Rollup where your HTML entry point is.  Vite will then
      // rewrite every <script src="…ts"> reference in that file to the compiled
      // .js output path, so the browser never receives a raw .ts URL.
      input: resolve(__dirname, "index.html"),
    },

    // Keep compatible with modern Android WebViews (Chromium 85+).
    target: "es2020",
  },

  // Only files placed here are copied verbatim to dist/.
  // Never put .ts source files in public/ — they would be served as-is and
  // trigger the video/mp2t MIME error.
  publicDir: "public",
}));
