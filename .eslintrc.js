module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error',
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
  },
};
