<template>
  <div
    class="overflow-x-hidden"
    :class="{ 'overflow-y-hidden h-screen': getFullscreen }"
  >
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
import { Vue, Component } from 'nuxt-property-decorator'

import { fullscreenStore } from '@/store'
@Component({
  components: { Modal, FullscreenView }
})
export default class Default extends Vue {
  get getFullscreen() {
    return fullscreenStore.getFullscreen
  }
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

body {
  background-color: #ffeed4;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
