import axios from 'axios'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ToyBox',
    htmlAttrs: {
      lang: 'ja',
      prefix:
        'og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# website: https://ogp.me/ns/website#'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'copyright',
        content:
          '© 2022' + new Date().getFullYear() + ' Composite Computer Club'
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'ToyBoxは九州工業大学情報工学部の Composite Computer Club（C3）の作品ポータルサイトです。C3部員が製作した作品の閲覧が出来ます。'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'Cache-Control', content: 'no-cache' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@c3_kyutech' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ToyBox'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ToyBox - ホーム'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'ToyBoxは九州工業大学情報工学部の Composite Computer Club（C3）の作品ポータルサイトです。C3部員が製作した作品の閲覧が出来ます。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://simo-c3.github.io/image_url/c3_logo_circled.png' // ロゴができたら置き換え
      }
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
    { src: '~/plugins/mavonEditor.ts', mode: 'client' },
    { src: '~/plugins/localStorage.ts', mode: 'client' },
    { src: '~/plugins/three.ts', mode: 'client' }
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

  router: { base: '/' },

  watchers: {
    webpack: {
      ignored: /.git/
    }
  },

  generate: {
    fallback: true,
    async routes() {
      return Promise.all([
        await axios.get(process.env.API_URL + '/users?limit=9999'),
        await axios.get(process.env.API_URL + '/works?limit=9999')
      ]).then(([users, works]) => {
        const urls = []
        users.data.map((user) => urls.push({ route: `/users/${user.id}` }))
        works.data.map((work) => urls.push({ route: `/works/${work.id}` }))
        return urls
      })
    }
  }
}
