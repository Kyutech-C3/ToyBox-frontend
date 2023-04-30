<template>
  <div id="works-carousel" class="relative bg-gray-700">
    <!-- main swiper -->
    <works-carousel-main :assets="showAssets" v-model="slideNumber" />
    <!-- thumb swiper -->
    <works-carousel-thumb
      v-if="showAssets.length > 1 && !isFullscreen"
      :assets="showAssets"
      v-model="slideNumber"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import WorksCarouselThumb from '@/components/works/WorksCarouselThumb.vue'
import WorksCarouselMain from '@/components/works/WorksCarouselMain.vue'

import { Asset } from '@/types'

@Component({
  components: {
    WorksCarouselThumb,
    WorksCarouselMain
  }
})
export default class WorksCarousel extends Vue {
  showAssets: Asset[] = []
  showAssetsType: string[] = ['image', 'video', 'music', 'model']

  slideNumber: number = 0

  isFullscreen: boolean = false

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = document.fullscreenElement ? true : false
    })
  }

  created() {
    this.assets.map((asset) => {
      if (this.showAssetsType.includes(asset.asset_type)) {
        this.showAssets.push(asset)
      }
    })
  }
}
</script>

<style scoped></style>
