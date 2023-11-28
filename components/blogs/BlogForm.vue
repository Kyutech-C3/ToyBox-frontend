<template>
  <form
    class="m-auto max-w-[900px] w-[90vw]"
    autocomplete="off"
    @submit.prevent
  >
    <div
      class="
        flex flex-col
        items-left
        m-0
        w-full
        rounded-3xl
        px-[5vw]
        py-7
        shadow-md
        mb-5
        bg-white
      "
    >
      <form-tag :show-warning="showRequiredWarning.tagEmpty" class="mt-4" />
      <form-title
        v-model="blogData.title"
        :show-warning="showRequiredWarning.titleEmpty"
        class="mt-4"
      />
      <form-thumbnail
        v-model="blogData.thumbnail_asset_id"
        :show-warning="showRequiredWarning.thumbnailEmpty"
        :is-blog="true"
        class="mt-4"
      />
    </div>
    <div
      class="
        flex flex-col
        items-left
        m-0
        w-full
        rounded-3xl
        px-[3vw]
        py-7
        shadow-md
        bg-white
      "
    >
      <form-markdown
        v-model="blogData.body_text"
        :show-warning="showRequiredWarning.bodyTextEmpty"
        :on-file-picked="onFilePicked"
        class="mb-1"
      />
      <div class="mt-5 mr-3 z-10 cursor-pointer flex items-center justify-end">
        <form-submit-button
          class=""
          :work-visibility="blogData.visibility"
          @submit="clickSubmit($event)"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'
import { AxiosResponse } from 'axios'

import FormTag from '@/components/works/form/FormTag.vue'
import FormTitle from '@/components/works/form/FormTitle.vue'
import FormThumbnail from '@/components/works/form/FormThumbnail.vue'
import FormMarkdown from '@/components/blogs/form/FormMarkdown.vue'
import FormSubmitButton from '@/components/works/form/FormSubmitButton.vue'

import { AxiosClient } from '@/utils/axios'
import { tagSelectorStore, blogPostStore, workPostStore } from '@/store'
import { BlogAsset, PostBlog } from '@/types'

type RequiredType = {
  tagEmpty: boolean
  titleEmpty: boolean
  thumbnailEmpty: boolean
  bodyTextEmpty: boolean
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

@Component({
  components: {
    FormTag,
    FormTitle,
    FormThumbnail,
    FormMarkdown,
    FormSubmitButton
  }
})
export default class BlogForm extends Vue {
  showRequiredWarning: RequiredType = {
    tagEmpty: false,
    titleEmpty: false,
    thumbnailEmpty: false,
    bodyTextEmpty: false
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  @Prop({ type: Boolean, required: false, default: true })
  isNewBlogs!: boolean

  @VModel({ type: Object, required: true })
  blogData!: PostBlog

  submitSuccessProcess() {
    blogPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    blogPostStore.initThumbnailViewInfo()
    workPostStore.initIsBlockUnload()
    this.$router.push('/')
  }

  submitErrorProcess(error: Error) {
    console.error(error)
    alert(
      '作品投稿に失敗しました。もう一度試すか、それでもダメな場合は管理者に報告してください。'
    )
  }

  checkEmpty() {
    let isWarning = false
    if (this.blogData.tags_id.length === 0) {
      this.showRequiredWarning.tagEmpty = true
      isWarning = true
    }
    if (this.blogData.title === '') {
      this.showRequiredWarning.titleEmpty = true
      isWarning = true
    }
    if (this.blogData.thumbnail_asset_id === '') {
      this.showRequiredWarning.thumbnailEmpty = true
      isWarning = true
    }
    if (this.blogData.body_text === '') {
      this.showRequiredWarning.bodyTextEmpty = true
      isWarning = true
    }
    return isWarning
  }
  clickSubmit(visibility: string) {
    this.blogData.tags_id.splice(0)
    this.getSelectedTags.map((tag) => {
      this.blogData.tags_id.push(tag.id)
    })
    if (!this.checkEmpty()) {
      // バリデーションをクリアしたときのみ実行される
      // バックエンドにPOSTを記述
      this.blogData.visibility = visibility
      try {
        if (this.isNewBlogs) {
          AxiosClient.client('POST', `/blogs`, true, this.blogData)
            .then((result) => {
              this.submitSuccessProcess()
            })
            .catch((error) => {
              this.submitErrorProcess(error)
              return
            })
        } else {
          AxiosClient.client(
            'PUT',
            `/blogs/${this.$route.params.id}`,
            true,
            this.blogData
          )
            .then((result) => {
              this.submitSuccessProcess()
            })
            .catch((error) => {
              this.submitErrorProcess(error)
              return
            })
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      setTimeout(() => {
        this.showRequiredWarning.tagEmpty = false
        this.showRequiredWarning.titleEmpty = false
        this.showRequiredWarning.thumbnailEmpty = false
        this.showRequiredWarning.bodyTextEmpty = false
      }, 5000)
    }
  }

  onFilePicked(event: Event) {
    workPostStore.setPostAssetStatus('posting')
    const file = (event.target as HTMLInputElement).files as FileList
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
                let assetText = ''
                if (result.data.asset_type === 'image') {
                  assetText = `![${result.data.id}](${result.data.url})\n`
                } else if (result.data.asset_type === 'video') {
                  assetText = `<video width=500 controls><source src="${
                    result.data.url
                  }" type="${
                    extensionMimeType[
                      result.data.extension as keyof typeof extensionMimeType
                    ]
                  }"></video>\n`
                }
                this.blogData.body_text =
                  this.blogData.body_text.concat(assetText)
              }
              this.blogData.assets_id.push(result.data.id)
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
<style>
.v-note-wrapper.v-note-wrapper {
  min-height: 600px;
}
</style>
