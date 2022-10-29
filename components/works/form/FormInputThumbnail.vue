<template>
  <label
    v-if="getThumbnailViewInfo.id === '' && getPostThumbnailStatus === ''"
    for="pickimg"
    class="
      p-3
      w-32
      h-32
      border-2
      rounded-xl
      border-gray-400
      flex
      justify-center
      items-center
      cursor-pointer
      relative
    "
  >
    <input
      id="pickimg"
      ref="pickimg"
      type="file"
      accept="image/png, image/jpeg, image/gif, image/bmp"
      class="
        absolute
        opacity-0
        w-full
        h-full
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
      "
      style="opacity: 0"
      :multiple="true"
      @change="onFilePicked($event)"
    />
    <font-awesome-icon class="w-10" :icon="['fas', 'plus']" />
  </label>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'

import { AxiosClient } from '@/utils/axios'
import { workPostStore } from '@/store'

interface Event<T = EventTarget> {
  target: T
}

type baseAssetExtensionType = {
  image: string[]
  video: string[]
  music: string[]
  zip: string[]
  model: string[]
}

const baseAssetExtension: baseAssetExtensionType = {
  image: ['png', 'jpg', 'jpeg', 'bmp'],
  video: ['mp4'],
  music: ['mp3', 'wav', 'm4a'],
  zip: ['zip'],
  model: ['gltf', 'fbx']
}

@Component
export default class FormInputThumbnail extends Vue {
  @VModel({ type: String })
  thumbnail!: string

  get getThumbnailViewInfo() {
    return workPostStore.getThumbnailViewInfo
  }

  get getPostThumbnailStatus() {
    return workPostStore.getPostThumbnailStatus
  }

  onFilePicked(event: Event<HTMLInputElement>) {
    workPostStore.setPostThumbnailStatus('posting')
    const file = event.target.files as FileList
    if (file.length !== 0 || file !== null) {
      for (let i = 0; i < file.length; i++) {
        // 本番環境では何らかのサービスに画像を保存する
        const params = new FormData()
        params.append('file', file[i])
        const assetType = this.getAssetType(file[i].name as string)
        if (baseAssetExtension.image.includes(assetType)) {
          params.append('asset_type', assetType)
          try {
            AxiosClient.client(
              'POST',
              '/assets',
              true,
              params,
              'multipart/form-data'
            ).then((result) => {
              console.log('success')
              console.log(result)
              this.thumbnail = result.data.id
              workPostStore.setThumbnailViewInfo(result.data)
            })
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            workPostStore.setPostThumbnailStatus('error')
          }
        } else {
          workPostStore.setPostThumbnailStatus('')
        }
      }
    }
    const refs = this.$refs.pickimg as any
    refs.value = ''
    workPostStore.changeIsBlockUnload()
  }

  getAssetType(assetName: string) {
    let index: number = 0
    let response: string = ''
    const assetTypeList: string[][] = Object.values(baseAssetExtension)
    assetTypeList.forEach((assetType) => {
      for (let i = 0; i < assetType.length; i++) {
        if (assetType[i] === assetName.split('.').pop()) {
          // eslint-disable-next-line no-console
          // console.log(Object.keys(baseAssetExtension)[index])
          response = Object.keys(baseAssetExtension)[index]
        }
      }
      index++
    })
    return response
  }
}
</script>
