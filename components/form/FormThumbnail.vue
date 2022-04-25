<template>
  <label
    for="pickimg"
    class="mr-10 p-3 w-32 h-32 border-2 rounded-xl border-gray-400 flex justify-center items-center cursor-pointer"
  >
    <input
      id="pickimg"
      ref="pickimg"
      type="file"
      accept="image/png, image/jpeg, image/gif, image/bmp, video/mp4, audio/mp4, audio/wav, audio/mpeg, application/zip, .gltf, .fbx"
      style="display: none"
      required
      :multiple="true"
      @change="onFilePicked($event)"
    />
    <font-awesome-icon class="w-10" :icon="['fas', 'plus']" />
  </label>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { AuthStore } from '~/store'

interface Event<T = EventTarget> {
  target: T
}

const baseAssetType: Object = {
  image: ['png', 'jpg', 'jpeg', 'bmp'],
  video: ['mp4'],
  music: ['mp3', 'wav', 'm4a'],
  zip: ['zip'],
  model: ['gltf', 'fbx']
}

@Component
export default class FromThumbnail extends Vue {
  @VModel({ type: Array })
  assetImage!: string[]

  onFilePicked(event: Event<HTMLInputElement>) {
    const file = event.target.files as FileList
    // eslint-disable-next-line no-console
    console.log(file.length)
    if (file.length !== 0 || file !== null) {
      for (let i = 0; i < file.length; i++) {
        // 本番環境では何らかのサービスに画像を保存する
        // eslint-disable-next-line no-console
        console.log(file[i])
        const params = new FormData()
        params.append('file', file[i])
        params.append('asset_type', this.getAssetType(file[i].name as string))
        try {
          axios
            .post('/assets', params, {
              headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${AuthStore.getAccessToken}`
              }
            })
            .then((result) => {
              this.assetImage.push(result.data.id)
            })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    }
    const refs = this.$refs.pickimg as any
    refs.value = ''
  }

  getAssetType(assetName: string) {
    let index: number = 0
    let response: string = ''
    const assetTypeList: string[][] = Object.values(baseAssetType)
    assetTypeList.forEach((assetType) => {
      for (let i = 0; i < assetType.length; i++) {
        if (assetType[i] === assetName.split('.').pop()) {
          // eslint-disable-next-line no-console
          console.log(Object.keys(baseAssetType)[index])
          response = Object.keys(baseAssetType)[index]
        }
      }
      index++
    })
    return response
  }
}
</script>
