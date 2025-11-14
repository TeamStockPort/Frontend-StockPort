// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules", "build"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Prettier와 충돌하는 ESLint 규칙 비활성화
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",

      "@typescript-eslint/no-explicit-any": "warn",

      "react/jsx-key": "error",

      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "off",

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "no-debugger": "warn",
      "no-console": "warn",
    },
  },
];
