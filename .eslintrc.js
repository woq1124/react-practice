module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'airbnb-base', // includes plugin: import
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended', // includes plugin: jest
    'plugin:jest/style',
    'plugin:prettier/recommended', // includes plugin: prettier
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-default-export': 'off',
    'import/extensions': ['error', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.*', '**/*.stories.*'] }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', 'ts', 'tsx'],
    'import/parsers': { '@typescript-eslint/parser': ['.ts', 'tsx'] },
    'import/resolver': { node: { extensions: ['.js', 'jsx', 'ts', 'tsx', '.json'] } },
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
  overrides: [{ files: ['*.ts', '*.tsx'], rules: { 'import/no-unresolved': 'off' } }],
};
