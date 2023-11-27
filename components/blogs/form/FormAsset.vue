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
        @change="onFilePicked($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'nuxt-property-decorator'

import { AxiosClient } from '@/utils/axios'
import { workPostStore, blogPostStore } from '@/store'
import { BlogAsset } from '~/types'
import { AxiosResponse } from 'axios'

interface Event<T = EventTarget> {
  target: T
}

type baseAssetExtensionType = {
  image: string[]
  video: string[]
}

const baseAssetExtension: baseAssetExtensionType = {
  image: ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'],
  video: ['mp4', 'mov', 'avi', 'flv']
}

const extensionMimeType = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  bmp: 'image/bmp',
  gif: 'image/gif',
  webp: 'image/webp',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  flv: 'video/x-flv'
}

@Component
export default class FormAsset extends Vue {
  @VModel({
    type: String,
    required: true
  })
  description!: string

  @VModel({
    type: Array,
    required: false
  })
  assets!: string[]

  onFilePicked(event: Event<HTMLInputElement>) {
    workPostStore.setPostAssetStatus('posting')
    const file = event.target.files as FileList
    if (file.length !== 0 || file !== null) {
      for (let i = 0; i < file.length; i++) {
        const params = new FormData()
        params.append('file', file[i])
        const assetType = this.getAssetType(file[i].name as string)
        if (['image', 'video'].includes(assetType)) {
          params.append('asset_type', assetType)
          try {
            AxiosClient.client(
              'POST',
              '/blogs/assets',
              true,
              params,
              'multipart/form-data'
            ).then((result: AxiosResponse<BlogAsset>) => {
              if (result.data.url !== undefined) {
                if (result.data.asset_type === 'image') {
                  this.description = this.description.concat(
                    `![${result.data.id}](${result.data.url})\n`
                  )
                } else if (result.data.asset_type === 'video') {
                  this.description = this.description.concat(
                    `<video width=500 controls><source src="${
                      result.data.url
                    }" type="${
                      extensionMimeType[
                        result.data.extension as keyof typeof extensionMimeType
                      ]
                    }"></video>\n`
                  )
                }
              }
              this.assets.push(result.data.id)
              blogPostStore.addAssetsViewInfo(result.data)
            })
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            workPostStore.setPostAssetStatus('error')
          }
        } else {
          workPostStore.setPostAssetStatus('')
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
        if (assetType[i] === assetName.split('.').pop()?.toLowerCase()) {
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
