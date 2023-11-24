module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  globals: {
    __BUILD_VERSION__: true,
    __BUILD_COMMIT_HASH__: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'vue/require-default-prop': 'off',
  },
};
