<template>
  <div class="px-3 flex flex-row-reverse">
    <div
      class="
        rounded-md
        bg-base-button-color
        text-hover-base-text-color
        w-72
        max-w-[70%]
        h-8
        flex
        justify-center
        items-center
        relative
      "
    >
      <span>画像・動画の挿入</span>
      <input
        id="pickimg"
        ref="pickimg"
        type="file"
        accept="image/png, image/jpeg, image/gif, image/bmp, video/mp4, video/quicktime"
        :multiple="true"
        class="absolute w-full h-full inset-0 opacity-0"
        @change="onFilePicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class FormAsset extends Vue {
  @Prop({ type: Function, required: true })
  fileUploadHandler!: (files: File[]) => Promise<void>

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
