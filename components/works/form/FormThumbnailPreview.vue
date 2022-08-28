<template>
  <div class="flex">
    <form-label
      name="サムネイル"
      :required="true"
      :info="info"
      :show-warning="showWarning"
    />

    <div v-if="getThumbnailViewInfo" class="relative mb-5 mr-5">
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
      <form-image-preview :image-url="getThumbnailViewInfo" />
    </div>
    <form-input-thumbnail v-model="thumbnail" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/FormImagePreview.vue'
import FormVideoPreview from '@/components/works/form/FormVideoPreview.vue'
import FormInputThumbnail from '@/components/works/form/FormInputThumbnail.vue'
import { workPostStore } from '@/store'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormInputThumbnail,
    FormVideoPreview
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
