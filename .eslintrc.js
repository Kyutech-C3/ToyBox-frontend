module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended'],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    quotes: [2, 'single'],
    'keyword-spacing': ['error'],
    'vue/html-self-closing': 'off'
  }
}
