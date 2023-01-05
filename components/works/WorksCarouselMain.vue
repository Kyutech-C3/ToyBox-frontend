<template>
  <div class="relative">
    <!-- top swiper -->
    <div
      class="
        swiper
        bg-black
        rounded-t-2xl
        overflow-hidden
        relative
        max-h-[500px]
        min-h-[250px]
        !h-[56vw]
        isolate
        !pb-2
      "
    >
      <div class="swiper-wrapper flex justify-center items-center">
        <div
          v-for="(asset, index) in assets"
          :key="index"
          class="
            swiper-slide
            flex
            justify-center
            items-center
            relative
            bg-black
          "
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
            ref="modelViewer"
          />
          <div v-else>{{ asset.asset_type }} file is not supported.</div>
        </div>
      </div>
    </div>
    <!-- swiper navigation -->
    <div
      class="
        swiper-button-prev
        -translate-x-16
        transition-transform
        !z-20
        after:text-hover-base-button-color
      "
      :class="{
        'translate-x-0': showSwiperButtonPrev,
        'pointer-events-none after:!text-hover-base-text-color':
          swiper.isBeginning
      }"
      @mouseover="showSwiperButtonPrev = true"
    />
    <div
      class="
        swiper-button-next
        translate-x-16
        transition-transform
        !z-20
        after:text-hover-base-button-color
      "
      :class="{
        '!translate-x-0': showSwiperButtonNext,
        'pointer-events-none after:!text-hover-base-text-color': swiper.isEnd
      }"
      @mouseenter="showSwiperButtonNext = true"
    />
    <div
      class="
        absolute
        top-0
        left-0
        h-[43vw]
        min-h-[68%]
        max-h-[85%]
        w-[10%]
        z-10
      "
      :class="{ ' pointer-events-none': assets.length <= 1 }"
      @mouseover="showSwiperButtonPrev = true"
      @mouseleave="showSwiperButtonPrev = false"
    />
    <div
      class="
        absolute
        top-0
        right-0
        h-[43vw]
        min-h-[68%]
        max-h-[85%]
        w-[10%]
        z-10
      "
      :class="{ ' pointer-events-none': assets.length <= 1 }"
      @mouseenter="showSwiperButtonNext = true"
      @mouseout="showSwiperButtonNext = false"
    />
    <!-- fullscreen navigation -->
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
        z-30
      "
      @click="showFullscreen()"
    >
      fullscreen
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from 'nuxt-property-decorator'

import { Swiper, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.js'

import ItemImageView from '@/components/works/carouselItem/ImageView.vue'

import { Asset } from '@/types'
import ModelViewer from '@/components/works/ModelViewer.vue'
import { fullscreenStore } from '@/store'

@Component({
  components: {
    ItemImageView,
    ModelViewer
  }
})
export default class WorksCarouselBody extends Vue {
  showSwiperButtonPrev: boolean = false
  showSwiperButtonNext: boolean = false

  swiper: Swiper = new Swiper('.swiper', {
    // Optional parameters
    // @see https://swiperjs.com/swiper-api#parameters
    loop: false,
    initialSlide: 0,
    effect: 'flip',
    flipEffect: {
      slideShadows: false
    },
    setWrapperSize: true,
    grabCursor: true,
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  @VModel({ type: Number, required: true })
  slideNumber!: number

  @Watch('slideNumber')
  moveSlide(index: number) {
    this.swiper.slideTo(index)
  }

  mounted() {
    this.swiper.init()
    this.swiper.on('slideChange', () => {
      this.slideNumber = this.swiper.realIndex
    })
  }

  showFullscreen() {
    fullscreenStore.setAssets(this.assets)
    fullscreenStore.setFullscreen(true)
  }
}
</script>

<style scoped></style>
