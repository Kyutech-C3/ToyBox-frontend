import Vue from 'vue'
import * as THREE from 'three'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE
  }
})
