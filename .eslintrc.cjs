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
    jest: true,
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
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: null,
        modifiers: ["unused"],
        leadingUnderscore: "require",
      },
    ],
    "import/extensions": ["error", "always", { ignorePackages: true }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
