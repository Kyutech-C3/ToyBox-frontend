<template>
  <form class="flex flex-col items-left m-auto w-3/4 max-w-7xl" autocomplete="off" @submit.prevent>
    <form-community v-model="workData.communityId" class="my-5" />
    <form-tag class="my-5" />
    <form-title v-model="workData.title" class="my-5" />
    <form-assets v-model="workData.thumbnailImg" class="my-5" />
    <form-u-r-l v-model="workData.url" class="my-5" />
    <form-markdown v-model="workData.description" class="my-5" />
    <form-submit-button class="my-5 z-10" @submit="clickSubmit($event)" />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import FormAssets from '~/components/form/FormAssets.vue'
import FormTitle from '~/components/form/FormTitle.vue'
import FormMarkdown from '~/components/form/FormMarkdown.vue'
import FormCommunity from '~/components/form/FormCommunity.vue'
import FormURL from '~/components/form/FormURL.vue'
import ToyboxButton from '~/components/ToyboxButton.vue'

@Component({
  components: {
    FormAssets,
    FormTitle,
    FormMarkdown,
    FormCommunity,
    FormURL,
    ToyboxButton
  }
})
export default class WorksForm extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  isNew!: boolean

  workData = {
    title: '',
    description: '',
    communityId: '',
    thumbnailImg: '',
    url: []
  }

  created () {
    if (this.isNew) {
      return
    }
    // ここでaxiosでworksの内容からデータ取得
  }

  clickSubmit (option: number) {
    // バリデーションをクリアしたときのみ実行される
    // バックエンドにPOSTを記述
    console.log(this.workData, option)
  }
}
</script>
