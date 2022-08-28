import { build } from "esbuild";
import { globby } from "globby";

const entryPoints = await globby("./src/controllers/**/*Controller.ts");

await build({
  entryPoints,
  bundle: true,
  format: "esm",
  outExtension: { ".js": ".mjs" },
  outbase: "./src",
  outdir: "./dest",
  platform: "node",
  external: [],
  watch: false,
  // cf. https://github.com/evanw/esbuild/issues/1921#issuecomment-1152991694
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
});
