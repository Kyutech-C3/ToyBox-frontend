import MarkdownIt from 'markdown-it'

declare module 'vue/types/vue' {
  // Vueインスタンス(this)の型追加
  interface Vue {
    // @nuxtjs/markdownit
    $md: MarkdownIt
  }
}

declare module '@nuxt/types' {
  // Nuxt Contextへの型追加
  interface Context {
    // @nuxtjs/markdownit
    $md: MarkdownIt
  }
}
