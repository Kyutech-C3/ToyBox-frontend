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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tailwind.css',
    'github-markdown-css',
    '~/assets/css/markdown.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.ts',
    { src: '~plugins/mavonEditor.ts', mode: 'client' },
    { src: '~/plugins/localStorage.ts', mode: 'client' },
    { src: '~plugins/three.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/markdownit',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  markdownit: {
    preset: 'default',
    html: true,
    breaks: true,
    linkify: false,
    runtime: true,
    use: []
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['three'],
    babel: {
      babelrc: false,
      compact: false
    }
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
    API_URL: process.env.API_URL,
    ASSET_BASE_URL: process.env.ASSET_BASE_URL,
    BASE_URL: process.env.BASE_URL
  },
  ssr: false,

  router: {
    middleware: 'auth'
  },

  watchers: {
    webpack: {
      ignored: /.git/
    }
  }
}
