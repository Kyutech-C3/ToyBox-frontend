<template>
  <div
    class="w-full"
    :class="[
      {
        'absolute top-1/2 -translate-y-1/2 h-full':
          !$device.isMobileOrTablet && isFullscreen
      },
      {
        'fixed top-0 left-0 svh-full z-50':
          $device.isMobileOrTablet && isFullscreen
      },
      { relative: !isFullscreen }
    ]"
  >
    <!-- top swiper -->
    <div
      class="swiper bg-black overflow-hidden relative min-h-[250px] isolate"
      :class="[
        { 'h-full': isFullscreen },
        { 'max-h-[500px] !h-[56vw] rounded-t-2xl': !isFullscreen }
      ]"
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
            select-none
          "
          :class="{ 'bg-white': asset.asset_type === 'model' }"
        >
          <item-image-view v-if="asset.asset_type === 'image'" :image="asset" />
          <item-video-view
            v-else-if="asset.asset_type === 'video'"
            :options="getVideoOptions(asset.url)"
          />
          <item-audio-view
            v-else-if="asset.asset_type === 'music'"
            controls
            :src="asset.url"
            element-name="carousel-main"
          >
            Your browser does not support the <code>audio</code> element.
          </item-audio-view>
          <ModelViewer
            v-else-if="asset.asset_type === 'model'"
            :model="asset"
            :enable-fullscreen="false"
            :fullscreen="isFullscreen"
            ref="modelViewer"
          />
          <div v-else>{{ asset.asset_type }} file is not supported.</div>
        </div>
      </div>
    </div>
    <!-- swiper navigation -->
    <div
      v-if="$device.isDesktop"
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
      v-if="$device.isDesktop"
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
      v-if="$device.isDesktop"
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
      v-if="$device.isDesktop"
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
        bottom-0
        right-3
        rounded-full
        px-1
        text-white
        bg-black bg-opacity-30
        z-30
      "
      @click="showFullscreen()"
    >
      fullscreen
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync, Watch } from 'nuxt-property-decorator'

import { Swiper, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.js'

import ItemImageView from '@/components/works/carouselItem/ImageView.vue'
import ItemVideoView from '@/components/works/carouselItem/VideoView.vue'
import ItemAudioView from '@/components/works/AudioView.vue'
import ModelViewer from '@/components/works/ModelViewer.vue'

import { Asset } from '@/types'
import { VideoJSOptions } from '@/types/common'

@Component({
  components: {
    ItemImageView,
    ItemAudioView,
    ModelViewer,
    ItemVideoView
  }
})
export default class WorksCarouselMain extends Vue {
  [x: string]: any
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
    grabCursor: false,
    allowTouchMove: this.$device.isMobileOrTablet,
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

  fullscreenTarget!: HTMLElement

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  @ModelSync('slideNumberValue', 'changeSlideNumber', {
    type: Number,
    required: true
  })
  slideNumber!: number

  @ModelSync('isFullscreenValue', 'changeIsFullscreen', {
    type: Boolean,
    required: true
  })
  isFullscreen!: boolean

  @Watch('slideNumber')
  moveSlide(index: number) {
    this.swiper.slideTo(index)
  }

  mounted() {
    this.swiper.init()
    this.swiper.on('slideChange', () => {
      this.slideNumber = this.swiper.realIndex
    })
    this.fullscreenTarget = document.getElementById(
      'works-carousel'
    ) as HTMLElement
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = document.fullscreenElement ? true : false
    })
  }

  getVideoOptions(url: string): VideoJSOptions {
    return {
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      playsinline: true,
      preload: 'auto',
      poster: '',
      sources: [
        {
          src: url,
          type: 'video/mp4'
        },
        {
          src: url,
          type: 'video/quicktime'
        }
      ]
    }
  }

  showFullscreen() {
    if (this.$device.isMobileOrTablet) {
      this.isFullscreen = !this.isFullscreen
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        this.fullscreenTarget?.requestFullscreen()
      }
    }
  }
}
</script>

<style scoped></style>
