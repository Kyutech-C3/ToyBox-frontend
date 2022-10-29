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
        v-model="workData.title"
        :show-warning="showRequiredWarning.titleEmpty"
        class="mt-4"
      />
      <form-thumbnail-preview
        v-model="workData.thumbnail_asset_id"
        :show-warning="showRequiredWarning.thumbnailEmpty"
        class="mt-4"
      />
      <form-assets-preview
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
      <form-submit-button
        class="mt-5 z-10"
        :work-visibility="workData.visibility"
        @submit="clickSubmit($event)"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'

import FormTag from '@/components/works/form/FormTag.vue'
import FormTitle from '@/components/works/form/FormTitle.vue'
import FormAssetsPreview from '@/components/works/form/FormAssetsPreview.vue'
import FormThumbnailPreview from '@/components/works/form/FormThumbnailPreview.vue'
import FormUrl from '@/components/works/form/FormUrl.vue'
import FormMarkdown from '@/components/works/form/FormMarkdown.vue'
import FormSubmitButton from '@/components/works/form/FormSubmitButton.vue'

import { AxiosClient } from '@/utils/axios'
import { tagSelectorStore, workPostStore } from '@/store'
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
    FormAssetsPreview,
    FormThumbnailPreview,
    FormUrl,
    FormMarkdown,
    FormSubmitButton
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

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
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
          AxiosClient.client('POST', '/works', true, this.workData).then(
            (result) => {
              this.$router.push('/')
            }
          )
        } else {
          AxiosClient.client(
            'PUT',
            `/works/${this.$route.params.id}`,
            true,
            this.workData
          ).then((result) => {
            this.$router.push('/')
          })
        }
        workPostStore.initAssetsViewInfo()
        tagSelectorStore.initSelectedTags()
        workPostStore.initThumbnailViewInfo()
        workPostStore.initIsBlockUnload()
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
