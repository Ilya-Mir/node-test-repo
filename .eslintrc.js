module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'prettier/prettier': ['error'],
  },
};
