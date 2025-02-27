import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" }
  },
  {
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      globals: globals.browser
    }
  },
  eslint.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "indent": ["error", 2]
    }
  }
];
