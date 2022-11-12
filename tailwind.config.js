module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      spacing: {
        192: '48rem'
      },
      colors: {
        'bg-color': 'var(--bg-color)',
        'base-text-color': 'var(--base-text-color)',
        'base-light-text-color': 'var(--base-light-text-color)',
        'hover-base-text-color': 'var(--hover-base-text-color)',
        'light-text-color': 'var(--light-bg-color)',
        'base-button-color': 'var(--base-button-color)',
        'hover-base-button-color': 'var(--hover-base-button-color)'
      }
    }
  },
  plugins: []
}
