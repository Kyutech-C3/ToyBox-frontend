export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'c3-toybox',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  storybook: {
    stories: ['~/storybooks/*.stories.ts'],
    // Run Storybook on localhost:4000
    port: 4000,
    addons: [
      '@storybook/addon-actions/register',
      '@storybook/addon-viewport/register'
    ]
  },

  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SEACRET: process.env.CLIENT_SEACRET,
    REDIRECT_URL: process.env.REDIRECT_URL,
    C3_GUILD_ID: process.env.C3_GUILD_ID
  },

  ssr: false
}
