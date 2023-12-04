import MarkdownIt from 'markdown-it'
import { Dayjs } from 'dayjs'
import { Device } from '@nuxtjs/device'

declare module 'katex'

declare module 'vue/types/vue' {
  // Vueインスタンス(this)の型追加
  interface Vue {
    // @nuxtjs/markdownit
    $md: MarkdownIt
    // dayjs
    $dayjs: (string: string) => Dayjs
    // @nuxtjs/device
    $device: Device
    // @nuxtjs/google-gtag
    $gtag: any
  }
}

declare module '@nuxt/types' {
  // Nuxt Contextへの型追加
  interface Context {
    // @nuxtjs/markdownit
    $md: MarkdownIt
    // dayjs
    $dayjs: (string: string) => Dayjs
    // @nuxtjs/device
    $device: Device
    // @nuxtjs/google-gtag
    $gtag: any
  }
}
