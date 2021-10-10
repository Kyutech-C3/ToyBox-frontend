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
    '~/assets/css/tailwind.css',
    '~/assets/css/markdown.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/nuxt-simplemde.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
     '@nuxtjs/tailwindcss'
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

  styleResources: {
    scss: './assets/stylesheets/*.scss'
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
    AUTHENTICATION_URL: process.env.AUTHENTICATION_URL,
    SERVER_URL: process.env.SERVER_URL
  },
  ssr: false,

  router: {
    middleware: 'auth'
  }
}
