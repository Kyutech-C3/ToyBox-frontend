<template>
  <form
    class="m-auto max-w-[750px] w-[90vw]"
    autocomplete="off"
    @submit.prevent
  >
    <div
      class="
        flex flex-col
        items-left
        m-0
        w-full
        border
        rounded-3xl
        border-gray-200
        px-[5vw]
        py-7
        shadow-md
        mb-5
      "
    >
      <form-tag
        v-model="workData.tags_id"
        :show-warning="showRequiredWarning.tagEmpty"
        class="my-3"
      />
      <form-title
        v-model="workData.title"
        :show-warning="showRequiredWarning.titleEmpty"
        class="my-3"
      />
      <form-thumbnail-preview
        v-model="workData.thumbnail_asset_id"
        :show-warning="showRequiredWarning.thumbnailEmpty"
        class="mt-3"
      />
      <form-assets-preview
        v-model="workData.assets_id"
        :show-warning="showRequiredWarning.assetsEmpty"
        class="mt-3"
      />
      <form-url v-model="workData.urls" />
    </div>
    <div
      class="
        flex flex-col
        items-left
        m-0
        w-full
        border
        rounded-3xl
        border-gray-200
        px-[3vw]
        py-7
        shadow-md
      "
    >
      <form-markdown
        v-model="workData.description"
        :show-warning="showRequiredWarning.descriptionEmpty"
        class="mb-1"
      />
      <form-submit-button class="mt-5 z-10" @submit="clickSubmit($event)" />
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'
import axios from 'axios'
import FormTag from '@/components/works/form/FormTag.vue'
import FormTitle from '@/components/works/form/FormTitle.vue'
import FormAssetsPreview from '@/components/works/form/FormAssetsPreview.vue'
import FormThumbnailPreview from '@/components/works/form/FormThumbnailPreview.vue'
import FormUrl from '@/components/works/form/FormUrl.vue'
import FormMarkdown from '@/components/works/form/FormMarkdown.vue'
import FormSubmitButton from '@/components/works/form/FormSubmitButton.vue'

import { authStore, workPostStore } from '@/store'
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

  @Prop({ type: Boolean, required: false, default: true })
  isNewWorks!: boolean

  @VModel({ type: Object, required: true })
  workData!: PostWork

  checkEmpty() {
    console.log(this.workData.tags_id.length)
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
          axios
            .post('/works', this.workData, {
              headers: {
                Authorization: `Bearer ${authStore.getAccessToken}`
              }
            })
            .then((result) => {
              console.log(result)

              this.$router.push('/')
            })
        } else {
          axios
            .put(`/works/${this.$route.params.id}`, this.workData, {
              headers: {
                Authorization: `Bearer ${authStore.getAccessToken}`
              }
            })
            .then((result) => {
              console.log(result)
              this.$router.push('/')
            })
        }
        workPostStore.initAssetsViewInfo()
        workPostStore.initSelectedTags()
        workPostStore.initThumbnailViewInfo()
        workPostStore.initIsBlockUnload()
      } catch (error) {
        console.log(error)
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
