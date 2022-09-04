<template>
  <div class="flex">
    <form-label
      name="サムネイル"
      :required="true"
      :info="info"
      :show-warning="showWarning"
    />

    <div
      v-if="getThumbnailViewInfo"
      style="--card-w: 8rem"
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
        @click="deleteAsset()"
      />
      <form-image-preview
        :image-url="getURL"
        :asset="getThumbnailViewInfo[0]"
      />
    </div>
    <form-input-thumbnail v-model="thumbnail" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/assetPreviewItems/FormImagePreview.vue'
import FormInputThumbnail from '@/components/works/form/FormInputThumbnail.vue'
import { workPostStore } from '@/store'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputThumbnail
  }
})
export default class FormThumbnailPreview extends Vue {
  info: string = `
対応形式：
  画像 [ .png, .jpg, .jpeg, .bmp ]
`
  get getThumbnailViewInfo() {
    return workPostStore.getThumbnailViewInfo
  }

  get getURL(): string {
    return `${process.env.ASSET_BASE_URL}/${this.getThumbnailViewInfo[0].asset_type}/${this.getThumbnailViewInfo[0].id}/origin.${this.getThumbnailViewInfo[0].extention}`
  }

  @VModel({ type: String })
  thumbnail!: string

  @Prop({ type: Boolean, required: true })
  showWarning!: boolean

  deleteAsset() {
    this.thumbnail = ''
    workPostStore.initThumbnailViewInfo()
    workPostStore.changeIsBlockUnload()
  }
}
</script>
