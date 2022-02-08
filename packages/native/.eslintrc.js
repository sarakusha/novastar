module.exports = {
  extends: '../../.eslintrc-prod.js',
  rules: {
    camelcase: 'off',
    'no-bitwise': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
