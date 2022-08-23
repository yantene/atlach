import { build } from "esbuild";
import { globby } from "globby";
import fs from "fs/promises";

const entryPoints = await globby("./src/{controllers,batch}/**/*.ts");

await build({
  entryPoints,
  outbase: "./src",
  outdir: "./dest",
  platform: "node",
  external: [],
  watch: false,
});

await fs.copyFile("./src/package.json", "./dest/package.json");
