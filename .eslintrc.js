require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: {
      ts: '@typescript-eslint/parser'
    }
  },
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'warn',
      {
        vueIndentScriptAndStyle: true,
        printWidth: 100,
        trailingComma: 'none',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ]
  }
}
