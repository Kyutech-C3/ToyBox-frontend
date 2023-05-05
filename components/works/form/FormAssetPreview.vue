<template>
  <base-fullscreen>
    <div v-if="getAsset" class="w-full h-full">
      <item-image-view
        v-if="getAsset.asset_type === 'image'"
        :image="getAsset"
      />
      <item-video-view
        v-else-if="getAsset.asset_type === 'video'"
        :options="getVideoOptions(getAsset.url)"
      />
      <item-audio-viewer
        v-else-if="getAsset.asset_type === 'music'"
        controls
        :src="getAsset.url"
        element-name="carousel-asset-preview"
      >
        Your browser does not support the <code>audio</code> element.
      </item-audio-viewer>
      <ModelViewer
        v-else-if="getAsset.asset_type === 'model'"
        :model="getAsset"
        :enable-fullscreen="false"
        ref="modelViewer"
      />
      <div v-else>{{ getAsset.asset_type }} file is not supported.</div>
    </div>
    <div
      v-else
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      表示できるアセットがありません。問題があれば、鯖缶に連絡してください！
    </div>
    <span
      class="
        material-symbols-outlined
        cursor-pointer
        transition-all
        text-2xl
        select-none
        absolute
        -bottom-[2px]
        right-[10px]
        z-50
        text-white
        px-1
      "
      @click="exitPreview()"
    >
      fullscreen_exit
    </span>
  </base-fullscreen>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Asset } from '@/types'
import { VideoJSOptions } from '@/types/common'
import { previewStore, workPostStore } from '@/store'

import ModelViewer from '@/components/works/ModelViewer.vue'
import BaseFullscreen from '@/components/commons/BaseFullscreen.vue'
import ItemImageView from '@/components/works/carouselItem/ImageView.vue'
import ItemAudioViewer from '@/components/works/AudioView.vue'
import ItemVideoView from '@/components/works/carouselItem/VideoView.vue'

@Component({
  components: {
    ItemImageView,
    ModelViewer,
    ItemAudioViewer,
    BaseFullscreen,
    ItemVideoView
  }
})
export default class FormAssetPreview extends Vue {
  get getIsPreview(): boolean {
    return previewStore.getIsPreview
  }

  get getAssetIndex(): number {
    return previewStore.getAssetIndex
  }

  get getAssetsViewInfo(): Asset[] {
    return workPostStore.getAssetsViewInfo
  }

  get getAsset(): Asset | undefined {
    if (previewStore.getAssetType === 'asset') {
      return this.getAssetsViewInfo[this.getAssetIndex]
    } else if (previewStore.getAssetType === 'thumbnail') {
      return workPostStore.getThumbnailViewInfo
    }
  }

  setIsPreview(boolean: boolean) {
    previewStore.setIsPreview(boolean)
  }

  exitPreview() {
    previewStore.setIsPreview(false)
    previewStore.initAsset()
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

  mounted() {
    window.addEventListener('popstate', this.exitPreview)
  }

  beforeDestroy() {
    window.removeEventListener('popstate', this.exitPreview)
  }
}
</script>
