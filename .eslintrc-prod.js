const path = require('path');
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // parserOptions: { project: './tsconfig.json' },
  env: { es6: true },
  ignorePatterns: ['node_modules', 'build', 'coverage', '.eslintrc*.js', '*.spec.ts'],
  plugins: ['import', 'eslint-comments', 'unused-imports'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  globals: { BigInt: true, console: true, WebAssembly: true },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used',
      },
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-useless-constructor': 'off',
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
    'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  settings: {
    /**
     * ESLint import resolver for ESM modules via package.json exports map
     * https://gist.github.com/danielweck/cd63af8e9a8b3492abacc312af9f28fd
     */
    'import/resolver': {
      // optionally, if TypeScript project:
      // https://github.com/alexgorbatchev/eslint-import-resolver-typescript
      typescript: {
        alwaysTryTypes: true,
        project: 'packages/*/tsconfig.json',
      },
      [path.resolve(__dirname, 'eslint-plugin-import-resolver.js')]: { someConfig: 1 },
    },
  },
};
