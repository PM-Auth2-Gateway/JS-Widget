module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/no-cycle': 'off',
  },
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
};
