module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['standard'],
  plugins: ['svelte3', '@typescript-eslint', 'prettier'],
  overrides: [
    // this stays the same
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-multiple-empty-lines': 0,
        // https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-mutable-exports': 0,
        'import/prefer-default-export': 0,
      },
    },
  ],
  rules: {},
  settings: {
    'svelte3/typescript': true, // load TypeScript as peer dependency
  },
}
