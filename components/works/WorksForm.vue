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
      <form-tag v-model="workData.tags_id" class="my-3" />
      <form-title v-model="workData.title" class="my-3" />
      <form-assets v-model="workData.assets_id" class="mt-3" />
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
      <form-markdown v-model="workData.description" class="mb-1" />
      <form-submit-button class="mt-5 z-10" @submit="clickSubmit($event)" />
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'
import axios from 'axios'
import FormTag from '@/components/works/form/FormTag.vue'
import FormTitle from '@/components/works/form/FormTitle.vue'
import FormAssets from '@/components/works/form/FormAssets.vue'
import FormUrl from '@/components/works/form/FormUrl.vue'
import FormMarkdown from '@/components/works/form/FormMarkdown.vue'
import FormSubmitButton from '@/components/works/form/FormSubmitButton.vue'

import { authStore, workPostStore } from '@/store'
import { PostWork, Tag } from '@/types'

@Component({
  components: {
    FormTag,
    FormTitle,
    FormAssets,
    FormUrl,
    FormMarkdown,
    FormSubmitButton
  }
})
export default class WorksForm extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  isNewWorks!: boolean

  @VModel({ type: Object, required: true })
  workData!: PostWork

  clickSubmit(visibility: string) {
    workPostStore.initAssetsViewInfo()
    workPostStore.initIsBlockUnload()
    // バリデーションをクリアしたときのみ実行される
    // バックエンドにPOSTを記述
    this.workData.thumbnail_asset_id = this.workData.assets_id[0]
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
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
