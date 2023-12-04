import Vue from 'vue'

export default (context: any, inject: any) => {
  Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
    context.$gtag('event', 'exception', {
      name: err.name,
      description: err.message,
      fatal: false
    })
    console.error(err)
  }
}
