<template>
  <div>
    <input v-if="thumbnailImg === ''" type="file" accept="image/*" required @change="onFilePicked($event)">
    <img v-if="thumbnailImg !== ''" :src="thumbnailImg">
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'

@Component
export default class FromThumbnail extends Vue {
  @VModel({ type: String })
  thumbnailImg!: string

  onFilePicked (e:any) {
    const file = (e.target.files || e.dataTransfer.files)
    if (file.length !== 0) {
      // 本番環境では何らかのサービスに画像を保存する
      this.thumbnailImg = URL.createObjectURL(file[0])
    }
  }
}
</script>
