<template>
  <div class="relative w-full h-full">
    <img class="w-full h-full object-cover" :src="imageUrl" />
    <span
      class="
        material-symbols-outlined
        cursor-pointer
        transition-all
        text-2xl
        select-none
        absolute
        bottom-3
        right-3
        rounded-full
        px-1
        text-black
        bg-white bg-opacity-30
      "
      @click="showFullscreen()"
    >
      fullscreen
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { Asset } from '~/types'
import { fullscreenStore } from '@/store'

@Component
export default class FormImagePreview extends Vue {
  @Prop({ type: String, required: true })
  imageUrl!: string
  @Prop({ type: Object, required: true })
  asset!: Asset

  setFullscreen(boolean: boolean) {
    fullscreenStore.setFullscreen(boolean)
  }

  setAsset(asset: Asset) {
    fullscreenStore.setAssets([asset])
  }
  showFullscreen() {
    this.setAsset(this.asset)
    this.setFullscreen(true)
  }
}
</script>
