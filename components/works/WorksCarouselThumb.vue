<template>
  <div class="relative">
    <!-- thumb swiper -->
    <div
      class="
        thumb-slider
        bg-black
        relative
        max-h-[100px]
        min-h-[70px]
        !h-[15vw]
        isolate
        py-2
        overflow-x-auto overflow-y-hidden
        scroll-smooth
      "
      ref="SliderWrapper"
    >
      <div class="flex justify-center items-center h-full w-max" ref="Slider">
        <div
          v-for="(asset, index) in assets"
          :key="index"
          class="
            flex
            justify-center
            items-center
            relative
            border
            bg-white
            w-[18vw]
            max-w-[150px]
            min-w-[90px]
            m-1
          "
          :class="[
            { 'bg-white': asset.asset_type === 'model' },
            [
              slideNumber === index
                ? 'h-full'
                : 'h-[90%] opacity-60 cursor-pointer'
            ]
          ]"
          @click="slideNumber = index"
        >
          <item-image-view v-if="asset.asset_type === 'image'" :image="asset" />
          <video
            v-else-if="asset.asset_type === 'video'"
            :controls="false"
            webkit-playsinline
            playsinline
            muted
            autoplay
            loop
            class="h-full w-full thumbnail"
          >
            <source :src="asset.url" type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <audio
            v-else-if="asset.asset_type === 'music'"
            controls
            :src="asset.url"
          >
            Your browser does not support the <code>audio</code> element.
          </audio>
          <ModelViewer
            v-else-if="asset.asset_type === 'model'"
            :model="asset"
            :enable-fullscreen="false"
            :mouse-control="false"
            ref="modelViewer"
          />
          <div v-else>{{ asset.asset_type }} file is not supported.</div>
        </div>
      </div>
    </div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  VModel,
  Watch,
  Ref
} from 'nuxt-property-decorator'

import { Swiper } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.js'

import ItemImageView from '@/components/works/carouselItem/ImageView.vue'

import { Asset } from '@/types'
import ModelViewer from '@/components/works/ModelViewer.vue'

@Component({
  components: {
    ItemImageView,
    ModelViewer
  }
})
export default class WorksCarouselThumb extends Vue {
  @Ref() Slider!: HTMLDivElement
  @Ref() SliderWrapper!: HTMLDivElement

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  @VModel({ type: Number, required: true })
  slideNumber!: number

  @Watch('slideNumber')
  moveSlide(index: number) {
    const cardItemWidth = this.Slider.clientWidth / this.assets.length + 2
    if (index >= 2 && index <= this.assets.length - 3) {
      this.SliderWrapper.scrollLeft = cardItemWidth * (index - 2)
    } else if (index < 2) {
      this.SliderWrapper.scrollLeft = 0
    } else if (index > this.assets.length - 3) {
      this.SliderWrapper.scrollLeft = this.Slider.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.thumb-slider {
  scrollbar-width: thin;
  scrollbar-color: #fdba74 rgba(204, 204, 204, 0);
}
.thumb-slider::-webkit-scrollbar {
  height: 3px;
}

.thumb-slider::-webkit-scrollbar-thumb {
  background: #fdba74;
  border-radius: 3px;
}
</style>
