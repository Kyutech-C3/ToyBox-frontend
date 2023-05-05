<template>
  <div class="flex">
    <form-label
      name="アセット"
      :required="true"
      :info="info"
      :show-warning="showWarning"
    />
    <div class="asset-preview-grid w-full" style="--card-w: 8rem">
      <div
        v-for="(asset, i) in assets"
        :key="i"
        class="
          relative
          w-[var(--card-w)]
          h-[var(--card-w)]
          rounded-xl
          overflow-hidden
          border border-gray-300
          bg-black
        "
      >
        <span
          class="
            material-symbols-outlined
            cursor-pointer
            transition-all
            text-base
            select-none
            absolute
            top-1
            right-1
            rounded-full
            px-1
            text-black
            bg-white bg-opacity-30
            z-10
          "
          @click="deleteAsset(i)"
        >
          close
        </span>
        <form-image-preview
          v-if="asset.asset_type === 'image'"
          :image-url="asset.url"
          :asset="asset"
        />
        <form-video-preview
          v-else-if="asset.asset_type === 'video'"
          :image-url="asset.url"
        />
        <item-audio-view
          v-else-if="asset.asset_type === 'music'"
          controls
          :src="asset.url"
          :show-audio-time="false"
          element-name="carousel-post-asset"
          size="small"
        >
          Your browser does not support the <code>audio</code> element.
        </item-audio-view>
        <form-zip-preview v-else-if="asset.asset_type === 'zip'" />
        <model-viewer
          v-else-if="asset.asset_type === 'model'"
          :model="asset"
          :mouse-control="false"
        />
        <span
          class="
            material-symbols-outlined
            cursor-pointer
            transition-all
            text-base
            select-none
            absolute
            bottom-1
            right-1
            rounded-full
            px-1
            text-black
            bg-white bg-opacity-30
          "
          @click="showPreview(i)"
        >
          fullscreen
        </span>
      </div>
      <div
        v-if="getPostAssetStatus === 'posting'"
        class="
          relative
          w-full
          h-full
          rounded-xl
          overflow-hidden
          border border-gray-300
        "
      >
        <loading />
      </div>
      <form-input-assets v-model="assetImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop, Watch } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/assetPreviewItems/FormImagePreview.vue'
import FormVideoPreview from '@/components/works/form/assetPreviewItems/FormVideoPreview.vue'
import FormZipPreview from '@/components/works/form/assetPreviewItems/FormZipPreview.vue'
import ItemAudioView from '@/components/works/AudioView.vue'
import ModelViewer from '@/components/works/ModelViewer.vue'
import FormInputAssets from '@/components/works/form/FormInputAssets.vue'
import Loading from '@/components/commons/Loading.vue'
import { workPostStore, previewStore } from '@/store'
import { Asset } from '~/types'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputAssets,
    FormVideoPreview,
    FormZipPreview,
    ItemAudioView,
    ModelViewer,
    Loading
  }
})
export default class FormAssets extends Vue {
  info: string = `
対応形式：
  画像 [ .png .jpg .jpeg .bmp .gif ]
  動画 [ .mp4 mov ]
  音源 [ .mp3 .wav .m4a ]
  モデル [ .gltf .fbx ]
  zip [ .zip ]
`
  assets: Asset[] = []

  get getAssetsViewInfo() {
    return workPostStore.getAssetsViewInfo
  }

  get getPostAssetStatus() {
    return workPostStore.getPostAssetStatus
  }

  @VModel({ type: Array })
  assetImage!: string[]

  @Prop({ type: Boolean, required: true })
  showWarning!: boolean

  created() {
    this.assets = this.getAssetsViewInfo
  }

  mounted() {
    this.assets = this.getAssetsViewInfo
  }

  @Watch('getAssetsViewInfo')
  onChangeThumbnailViewInfo() {
    workPostStore.setPostAssetStatus('')
  }

  deleteAsset(number: number) {
    this.assetImage = this.assetImage.filter((_, index) => {
      return number !== index
    })
    workPostStore.deleteAssetsViewInfo(number)
    workPostStore.setPostAssetStatus('')
    this.assets = workPostStore.getAssetsViewInfo
    workPostStore.changeIsBlockUnload()
  }

  showPreview(assetIndex: number) {
    previewStore.setAssetType('asset')
    previewStore.setAsset(assetIndex)
    previewStore.setIsPreview(true)
  }
}
</script>

<style scoped>
.asset-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  grid-row-gap: 15px;
  row-gap: 15px;
  grid-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
  justify-items: center;
}
</style>
