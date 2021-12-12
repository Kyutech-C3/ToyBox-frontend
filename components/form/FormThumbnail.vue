<template>
  <label
    for="pickimg"
    class="mr-10 p-3 w-32 h-32 border-2 rounded-xl border-gray-400 flex justify-center items-center cursor-pointer"
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
    <font-awesome-icon class="w-10" :icon="['fas', 'plus']" />
  </label>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { AuthStore } from '~/store'

interface Event<T = EventTarget> {
  target: T;
}

@Component
export default class FromThumbnail extends Vue {
  @VModel({ type: Array })
  assetImage!: string[]

  onFilePicked (event: Event<HTMLInputElement>) {
    const file = event.target.files as FileList
    if (file.length !== 0) {
      // 本番環境では何らかのサービスに画像を保存する
      const params = new FormData()
      params.append('file', file[0])
      params.append('asset_type', 'image')
      try {
        axios.post('/assets', params, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${AuthStore.getAccessToken}`
          }
        }).then((result) => {
          this.assetImage.push(result.data.id)
        })
      } catch (error) {
        console.log(error)
      }
    }
    const refs = this.$refs.pickimg as any
    refs.value = ''
  }
}
</script>
