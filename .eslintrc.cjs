module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: ".",
    sourceType: "module",
  },
  env: {
    es2022: true,
    node: true,
    // jest: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  plugins: ["@typescript-eslint"],
  ignorePatterns: [
    "node_modules/**/*",
    "dest/**/*",
    "tmp/**/*",
    "coverage/**/*",
    ".eslintrc.cjs",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
  },
};
