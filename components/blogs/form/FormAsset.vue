<template>
  <div class="px-3 flex flex-row-reverse">
    <div
      :class="`rounded-md w-72 max-w-[70%] h-8 flex justify-center items-center relative ${buttonClass}`"
    >
      <span>{{ buttonLabel }}</span>
      <input
        id="pickimg"
        ref="pickimg"
        type="file"
        accept="image/png, image/jpeg, image/gif, image/bmp, video/mp4, video/quicktime"
        :multiple="true"
        class="absolute w-full h-full inset-0 opacity-0"
        @change="onFilePicked"
        :disabled="assetStatus === 'posting'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { workPostStore } from '@/store'

@Component
export default class FormAsset extends Vue {
  @Prop({ type: Function, required: true })
  fileUploadHandler!: (files: File[]) => Promise<void>

  get assetStatus() {
    return workPostStore.getPostAssetStatus
  }

  get buttonClass() {
    return this.assetStatus === 'posting'
      ? 'bg-base-light-text-color text-hover-base-text-color'
      : 'bg-hover-base-button-color text-base-text-color'
  }

  get buttonLabel() {
    return this.assetStatus === 'posting'
      ? 'アセット追加中…'
      : '画像・動画の挿入'
  }

  async onFilePicked(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files !== null) {
      const fileArray = Array.from(files)
      await this.fileUploadHandler(fileArray)
    }
    target.value = ''
  }
}
</script>
