<template>
  <label
    for="pickimg"
    class="mt-5 p-3 ring-1 rounded-full focus:outline-none focus:ring-blue-600 flex items-center"
  >
    <input
      id="pickimg"
      ref="pickimg"
      type="file"
      accept="image/*"
      style="display: none"
      :multiple="false"
      @change="onFilePicked($event)"
    >
    <div class="text-7xl text-justify p-0">+</div>
  </label>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'

@Component
export default class FromThumbnail extends Vue {
  @VModel({ type: Array })
  assetImage!: string[]

  onFilePicked (e:any) {
    const file = (e.target.files || e.dataTransfer.files)
    if (file.length !== 0) {
      // 本番環境では何らかのサービスに画像を保存する
      this.assetImage.push(URL.createObjectURL(file[0]))
    }

    const refs = this.$refs.pickimg as any
    refs.value = ''
  }
}
</script>
