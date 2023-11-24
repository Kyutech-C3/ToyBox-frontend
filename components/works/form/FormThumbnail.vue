<template>
  <div class="flex">
    <form-label
      name="サムネイル"
      :required="true"
      :info="info"
      :show-warning="showWarning"
    />

    <div
      v-if="
        (getThumbnailViewInfo && getThumbnailViewInfo.id !== '') ||
        getPostThumbnailStatus === 'posting'
      "
      class="
        relative
        w-[var(--card-w)]
        h-[var(--card-w)]
        rounded-xl
        overflow-hidden
        border border-gray-300
      "
      style="--card-w: 8rem"
    >
      <div
        v-if="getThumbnailViewInfo && getThumbnailViewInfo.id !== ''"
        class="relative w-full h-full"
      >
        <!-- <font-awesome-icon
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
        /> -->
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
          @click="deleteAsset()"
        >
          close
        </span>
        <form-image-preview
          :image-url="getThumbnailViewInfo.url"
          :asset="getThumbnailViewInfo"
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
          @click="showPreview()"
        >
          fullscreen
        </span>
      </div>
      <loading v-if="getPostThumbnailStatus === 'posting'" />
    </div>
    <form-input-thumbnail v-model="thumbnail" :is-blog="isBlog" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop, Watch } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/assetPreviewItems/FormImagePreview.vue'
import FormInputThumbnail from '@/components/works/form/FormInputThumbnail.vue'
import Loading from '@/components/commons/Loading.vue'
import { workPostStore, previewStore, blogPostStore } from '@/store'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputThumbnail,
    Loading
  }
})
export default class FormThumbnail extends Vue {
  info: string = `
対応形式：
  画像 [ .png .jpg .jpeg .bmp .gif ]
`
  get getThumbnailViewInfo() {
    return this.isBlog
      ? blogPostStore.getThumbnailViewInfo
      : workPostStore.getThumbnailViewInfo
  }

  get getPostThumbnailStatus() {
    return workPostStore.getPostThumbnailStatus
  }

  @VModel({ type: String })
  thumbnail!: string

  @Prop({ type: Boolean, required: true })
  showWarning!: boolean

  @Prop({ type: Boolean, required: false })
  isBlog!: boolean

  @Watch('getThumbnailViewInfo')
  onChangeThumbnailViewInfo() {
    if (this.getThumbnailViewInfo.id !== '') {
      workPostStore.setPostThumbnailStatus('')
    }
  }

  deleteAsset() {
    this.thumbnail = ''
    if (this.isBlog) {
      blogPostStore.initThumbnailViewInfo()
    } else {
      workPostStore.initThumbnailViewInfo()
    }
    workPostStore.setPostThumbnailStatus('')
    workPostStore.changeIsBlockUnload()
  }

  showPreview() {
    previewStore.setAssetType('thumbnail')
    previewStore.setIsPreview(true)
  }
}
</script>
