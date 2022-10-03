<template>
  <div class="m-0 relative overflow-hidden h-full w-full">
    <img
      class="
        w-full
        h-full
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        object-contain
      "
      :src="getURL(image)"
      alt="asset image"
    />
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
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Asset } from '@/types'
import { fullscreenStore } from '@/store'

@Component({
  components: {}
})
export default class ImageView extends Vue {
  setFullscreen(boolean: boolean) {
    fullscreenStore.setFullscreen(boolean)
  }

  setAsset(asset: Asset) {
    fullscreenStore.setAsset(asset)
  }

  showFullscreen() {
    this.setAsset(this.image)
    this.setFullscreen(true)
  }

  @Prop({ type: Object, required: true })
  image!: Asset

  getURL(asset: Asset): string {
    return `${process.env.ASSET_BASE_URL}/${asset.asset_type}/${asset.id}/origin.${asset.extention}`
  }
}
</script>
