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
    "prettier",
  ],
  rules: {
    "no-unused-vars": "off",
    "no-irregular-whitespace": "off",
  },
};
