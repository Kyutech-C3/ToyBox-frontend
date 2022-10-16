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
        "
      >
        <font-awesome-icon
          class="
            w-6
            h-6
            rounded-full
            absolute
            top-1.5
            right-1.5
            opacity-60
            cursor-pointer
            bg-white
            z-10
          "
          :icon="['fas', 'times']"
          @click="deleteAsset(i)"
        />
        <form-image-preview
          v-if="asset.asset_type === 'image'"
          :image-url="asset.url"
          :asset="asset"
        />
        <form-video-preview
          v-else-if="asset.asset_type === 'video'"
          :image-url="asset.url"
        />
        <form-zip-preview v-else-if="asset.asset_type === 'zip'" />
        <model-viewer
          v-else-if="asset.asset_type === 'model'"
          :model="asset"
          :mouse-control="false"
        />
      </div>
      <loading
        v-if="getPostAssetStatus === 'posting'"
        class="rounded-xl overflow-hidden border border-gray-300"
      />
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
import ModelViewer from '@/components/works/ModelViewer.vue'
import FormInputAssets from '@/components/works/form/FormInputAssets.vue'
import Loading from '@/components/commons/Loading.vue'
import { workPostStore } from '@/store'
import { Asset } from '~/types'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputAssets,
    FormVideoPreview,
    FormZipPreview,
    ModelViewer,
    Loading
  }
})
export default class FormAssetsPreview extends Vue {
  info: string = `
対応形式：
  画像 [ .png, .jpg, .jpeg, .bmp ]
  動画 [ .mp4 ]
  音源 [ .mp3, .wav, .m4a ]
  モデル [ .gltf, .fbx ]
  zip [.zip ]
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
    workPostStore.initPostAssetStatus()
  }

  deleteAsset(number: number) {
    this.assetImage = this.assetImage.filter((_, index) => {
      return number !== index
    })
    workPostStore.deleteAssetsViewInfo(number)
    workPostStore.initPostAssetStatus()
    this.assets = workPostStore.getAssetsViewInfo
    workPostStore.changeIsBlockUnload()
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
