<template>
  <div
    class="overflow-x-hidden"
    :class="{ 'overflow-y-hidden h-screen': getFullscreen }"
  >
    <div class="bg-bg-color w-[100vw] h-[100vh] fixed top-0 left-0 -z-10">
      <!-- container log (:particlesLoaded="particlesLoaded") -->
      <Particles
        v-if="useCustomTheme"
        id="tsparticles"
        :particlesInit="particlesInit"
        :options="particleOptions"
      />
    </div>
    <Header />
    <Nuxt class="mx-auto mb-12 mt-10 max-w-[90rem]" />
    <Footer />
    <modal />
    <fullscreen-view v-if="getFullscreen" />
  </div>
</template>

<script lang="ts">
import Modal from '@/components/commons/Modal.vue'
import FullscreenView from '@/components/works/FullscreenView.vue'
import { Vue, Component, Watch } from 'nuxt-property-decorator'
// @ts-ignore
import Particles from 'vue2-particles'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine/types'

import { fullscreenStore, authStore } from '@/store'

Vue.use(Particles)

@Component({
  components: { Modal, FullscreenView }
})
export default class Default extends Vue {
  head() {
    return {
      bodyAttrs: {
        class: this.themeClass
      }
    }
  }

  nowDate: Date = new Date()
  themeClass: string = 'theme-base'
  useCustomTheme: boolean = false
  particleOptions = require('@/assets/winter/theme_config.json')

  get nowMonth() {
    const month = this.nowDate.getMonth() + 1
    return month.toString()
  }

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getFullscreen() {
    return fullscreenStore.getFullscreen
  }

  @Watch('getNowLogin')
  handleChangeNowLogin() {
    this.initTheme()
  }

  created() {
    this.initTheme()
  }

  initTheme() {
    if (this.getNowLogin) {
      const winter = ['1', '12']
      if (winter.includes(this.nowMonth)) {
        this.themeClass = 'theme-winter'
      } else {
        this.themeClass = 'theme-base'
      }
      this.useCustomTheme = this.themeClass !== 'theme-base'
    }
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine)
  }

  // particlesLoaded = async (container: undefined) => {
  //   console.log('Particles container loaded', container)
  // }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
