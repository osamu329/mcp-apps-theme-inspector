import { readFileSync } from "node:fs";
import { build } from "esbuild";

const html = readFileSync("dist/ui/index.html", "utf-8");

await build({
  entryPoints: ["src/server/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/server/index.js",
  platform: "browser",
  target: "es2022",
  define: {
    BUNDLED_HTML: JSON.stringify(html),
  },
  external: [],
  minify: false,
});

console.log("Server build complete — dist/server/index.js");
