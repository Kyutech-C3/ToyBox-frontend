<template>
  <form
    class="m-auto max-w-[900px] w-[90vw]"
    :class="{ 'svh-full overflow-y-hidden': getIsPreview }"
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
        v-model="workData.title"
        :show-warning="showRequiredWarning.titleEmpty"
        class="mt-4"
      />
      <form-thumbnail
        v-model="workData.thumbnail_asset_id"
        :show-warning="showRequiredWarning.thumbnailEmpty"
        class="mt-4"
      />
      <form-assets
        v-model="workData.assets_id"
        :show-warning="showRequiredWarning.assetsEmpty"
        class="mt-4"
      />
      <form-url v-model="workData.urls" class="mt-4" />
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
        v-model="workData.description"
        :show-warning="showRequiredWarning.descriptionEmpty"
        class="mb-1"
      />
      <div class="mt-5 mr-3 z-10 cursor-pointer flex items-center justify-end">
        <div
          class="flex items-center mr-3"
          @click="shareDiscord = !shareDiscord"
        >
          <span class="text-sm">Discordの「みんなの作品」に共有</span>
          <font-awesome-icon
            v-if="shareDiscord"
            :icon="['far', 'check-circle']"
            class="w-5 ml-3 text-red-500"
          />
          <font-awesome-icon
            v-else
            :icon="['far', 'circle']"
            class="w-5 ml-3"
          />
        </div>
        <form-submit-button
          class=""
          :work-visibility="workData.visibility"
          @submit="clickSubmit($event)"
        />
      </div>
    </div>
    <form-asset-preview v-if="getIsPreview" />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'

import FormTag from '@/components/works/form/FormTag.vue'
import FormTitle from '@/components/works/form/FormTitle.vue'
import FormAssets from '@/components/works/form/FormAssets.vue'
import FormThumbnail from '@/components/works/form/FormThumbnail.vue'
import FormUrl from '@/components/works/form/FormUrl.vue'
import FormMarkdown from '@/components/works/form/FormMarkdown.vue'
import FormSubmitButton from '@/components/works/form/FormSubmitButton.vue'
import FormAssetPreview from '@/components/works/form/FormAssetPreview.vue'

import { AxiosClient } from '@/utils/axios'
import { previewStore, tagSelectorStore, workPostStore } from '@/store'
import { PostWork } from '@/types'

type RequiredType = {
  tagEmpty: boolean
  titleEmpty: boolean
  thumbnailEmpty: boolean
  assetsEmpty: boolean
  descriptionEmpty: boolean
}

@Component({
  components: {
    FormTag,
    FormTitle,
    FormAssets,
    FormThumbnail,
    FormUrl,
    FormMarkdown,
    FormSubmitButton,
    FormAssetPreview
  }
})
export default class WorksForm extends Vue {
  showRequiredWarning: RequiredType = {
    tagEmpty: false,
    titleEmpty: false,
    thumbnailEmpty: false,
    assetsEmpty: false,
    descriptionEmpty: false
  }

  shareDiscord: boolean = true

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getIsPreview(): boolean {
    return previewStore.getIsPreview
  }

  @Prop({ type: Boolean, required: false, default: true })
  isNewWorks!: boolean

  @VModel({ type: Object, required: true })
  workData!: PostWork

  checkEmpty() {
    if (this.workData.tags_id.length === 0) {
      this.showRequiredWarning.tagEmpty = true
    }
    if (this.workData.title === '') {
      this.showRequiredWarning.titleEmpty = true
    }
    if (this.workData.thumbnail_asset_id === '') {
      this.showRequiredWarning.thumbnailEmpty = true
    }
    if (this.workData.assets_id.length === 0) {
      this.showRequiredWarning.assetsEmpty = true
    }
    if (this.workData.description === '') {
      this.showRequiredWarning.descriptionEmpty = true
    }
  }

  submitSuccessProcess() {
    workPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    workPostStore.initThumbnailViewInfo()
    workPostStore.initIsBlockUnload()
    this.$router.push('/')
  }

  submitErrorProcess(error: Error) {
    console.error(error)
    alert(
      '作品投稿に失敗しました。もう一度試すか、それでもダメな場合は管理者に報告してください。'
    )
  }

  clickSubmit(visibility: string) {
    this.workData.tags_id.splice(0)
    this.getSelectedTags.map((tag) => {
      this.workData.tags_id.push(tag.id)
    })
    this.checkEmpty()
    if (
      !this.showRequiredWarning.tagEmpty &&
      !this.showRequiredWarning.titleEmpty &&
      !this.showRequiredWarning.thumbnailEmpty &&
      !this.showRequiredWarning.assetsEmpty &&
      !this.showRequiredWarning.descriptionEmpty
    ) {
      // バリデーションをクリアしたときのみ実行される
      // バックエンドにPOSTを記述
      this.workData.visibility = visibility
      try {
        if (this.isNewWorks) {
          AxiosClient.client(
            'POST',
            `/works?post_discord=${this.shareDiscord}`,
            true,
            this.workData
          )
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
            `/works/${this.$route.params.id}`,
            true,
            this.workData
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
        this.showRequiredWarning.assetsEmpty = false
        this.showRequiredWarning.descriptionEmpty = false
      }, 5000)
    }
  }
}
</script>
