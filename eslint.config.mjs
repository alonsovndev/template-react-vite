import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  { ignores: ["dist/**", "coverage/**", "playwright-report/**", "test-results/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["{src,e2e}/**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...typescript.configs["eslint-recommended"].overrides[0].rules,
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      "react/jsx-uses-vars": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      ...jsxA11y.configs.recommended.rules,

      "no-console": ["warn", { allow: ["error", "warn"] }],
      "no-debugger": "error",
      "no-unused-vars": "off",
      "no-undef": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/mocks/**", "e2e/**"],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  prettier,
];
