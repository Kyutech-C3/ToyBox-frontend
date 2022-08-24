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
      h-screen
      z-40
      bg-black
    "
  >
    <img
      v-if="getAsset.asset_type === 'image'"
      class="
        w-full
        h-full
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        object-contain
      "
      :src="getURL(getAsset)"
      alt="asset image"
    />
    <model-viewer
      v-if="getAsset.asset_type === 'model'"
      :model="getAsset"
      :fullscrean="true"
    />
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
      @click="exitFullscrean()"
    >
      fullscreen_exit
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Asset } from '@/types'
import { fullscreanStore } from '@/store'
import ModelViewer from '@/components/works/ModelViewer.vue'

@Component({
  components: { ModelViewer }
})
export default class WorksCarousel extends Vue {
  get getFullscrean() {
    return fullscreanStore.getFullscrean
  }

  get getAsset() {
    return fullscreanStore.getAsset
  }

  setFullscrean(boolean: boolean) {
    fullscreanStore.setFullscrean(boolean)
  }

  exitFullscrean() {
    fullscreanStore.setFullscrean(false)
    fullscreanStore.initAsset()
  }

  getURL(asset: Asset): string {
    return `${process.env.ASSET_BASE_URL}/${asset.asset_type}/${asset.id}/origin.${asset.extention}`
  }

  mounted() {
    window.addEventListener('popstate', this.exitFullscrean)
  }

  beforeDestroy() {
    window.removeEventListener('popstate', this.exitFullscrean)
  }
}
</script>
