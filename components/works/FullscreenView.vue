<template>
  <div
    class="
      m-0
      overflow-hidden
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-screen
      svh-full
      z-40
      bg-black
    "
  >
    <hooper
      :settings="hooperSettings"
      class="bg-black overflow-hidden relative isolate w-screen svh-full"
    >
      <slide
        v-for="asset in getAssets"
        :key="asset.id"
        class="flex justify-center items-center relative w-full h-full"
        :class="{ 'bg-white': asset.asset_type === 'model' }"
      >
        <item-image-view v-if="asset.asset_type === 'image'" :image="asset" />
        <video
          v-else-if="asset.asset_type === 'video'"
          controls
          class="h-full w-full"
        >
          <source :src="asset.url" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <item-audio-viewer
          v-else-if="asset.asset_type === 'music'"
          controls
          :src="asset.url"
        >
          Your browser does not support the <code>audio</code> element.
        </item-audio-viewer>
        <ModelViewer
          v-else-if="asset.asset_type === 'model'"
          :model="asset"
          :enable-fullscreen="false"
          ref="modelViewer"
        />
        <div v-else>{{ asset.asset_type }} file is not supported.</div>
      </slide>
      <hooper-pagination slot="hooper-addons" />
      <hooper-navigation slot="hooper-addons" />
    </hooper>
    <span
      class="
        material-symbols-outlined
        cursor-pointer
        transition-all
        text-3xl
        select-none
        absolute
        bottom-3
        right-5
        z-50
        text-white
        bg-black bg-opacity-30
        rounded-full
        px-1
      "
      @click="exitFullscreen()"
    >
      fullscreen_exit
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Asset } from '@/types'
import { fullscreenStore } from '@/store'
import ModelViewer from '@/components/works/ModelViewer.vue'

import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper'
import 'hooper/dist/hooper.css'
import ItemImageView from '@/components/works/carouselItem/ImageView.vue'
import ItemAudioViewer from '@/components/works/carouselItem/AudioView.vue'

@Component({
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
    ItemImageView,
    ModelViewer,
    ItemAudioViewer
  }
})
export default class WorksCarousel extends Vue {
  hooperSettings: any = {
    infiniteScroll: false,
    centerMode: true,
    keysControl: false,
    itemsToShow: 1,
    mouseDrag: false,
    transition: 500,
    wheelControl: false
  }

  get getFullscreen() {
    return fullscreenStore.getFullscreen
  }

  get getAssets(): Asset[] {
    return fullscreenStore.getAssets
  }

  setFullscreen(boolean: boolean) {
    fullscreenStore.setFullscreen(boolean)
  }

  exitFullscreen() {
    fullscreenStore.setFullscreen(false)
    fullscreenStore.initAssets()
  }

  mounted() {
    window.addEventListener('popstate', this.exitFullscreen)
  }

  beforeDestroy() {
    window.removeEventListener('popstate', this.exitFullscreen)
  }
}
</script>
