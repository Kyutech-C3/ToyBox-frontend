<template>
  <div class="flex">
    <form-label
      name="アセット"
      :required="true"
      :info="info"
      :show-warning="showWarning"
    />
    <div class="flex flex-wrap">
      <div v-for="(imageURL, i) in assets" :key="i" class="relative mb-5 mr-5">
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
          v-if="imageURL.asset_type === 'image'"
          :image-url="imageURL.url"
        />
        <form-video-preview
          v-if="imageURL.asset_type === 'video'"
          :image-url="imageURL.url"
        />
      </div>
      <form-input-assets v-model="assetImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/FormImagePreview.vue'
import FormVideoPreview from '@/components/works/form/FormVideoPreview.vue'
import FormInputAssets from '@/components/works/form/FormInputAssets.vue'
import { workPostStore } from '@/store'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputAssets,
    FormVideoPreview
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
  assets: { url: string; asset_type: string }[] =
    workPostStore.getAssetsViewInfo

  @VModel({ type: Array })
  assetImage!: string[]

  @Prop({ type: Boolean, required: true })
  showWarning!: boolean

  mounted() {
    this.assets = workPostStore.getAssetsViewInfo
  }

  deleteAsset(number: number) {
    this.assetImage = this.assetImage.filter((_, index) => {
      return number !== index
    })
    workPostStore.deleteAssetsViewInfo(number)
    this.assets = workPostStore.getAssetsViewInfo
    workPostStore.changeIsBlockUnload()
  }
}
</script>
