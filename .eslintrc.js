module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:vue/vue3-recommended",
    // "plugin:vue/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/vue",
  ],
  rules: {
    "no-unused-vars": "off",
    "no-irregular-whitespace": "off",
  },
};
