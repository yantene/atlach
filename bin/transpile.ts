import { build } from "esbuild";
import { globby } from "globby";

const entryPoints = await globby("./src/{controllers,batch}/**/*.ts");

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
});
