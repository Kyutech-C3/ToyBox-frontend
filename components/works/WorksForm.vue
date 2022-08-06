<template>
  <form
    class="
      flex flex-col
      items-left
      m-auto
      w-3/4
      max-w-7xl
      border-2
      rounded-3xl
      border-gray-400
      px-16
      py-7
    "
    autocomplete="off"
    @submit.prevent
  >
    <form-tag class="my-3" />
    <form-title v-model="workData.title" class="my-3" />
    <form-assets v-model="workData.assets_id" class="mt-3" />
    <form-url v-model="workData.urls" class="mb-5" />
    <form-markdown v-model="workData.description" class="my-5" />
    <form-submit-button class="mt-5 z-10" @submit="clickSubmit($event)" />
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
import { authStore } from '@/store'
import { PostWork } from '@/types'

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
    // バリデーションをクリアしたときのみ実行される
    // バックエンドにPOSTを記述
    this.workData.thumbnail_asset_id = this.workData.assets_id[0]
    this.workData.visibility = visibility
    try {
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
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
