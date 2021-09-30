<template>
  <form class="flex flex-col items-center m-auto w-3/4 max-w-xl" autocomplete="off" @submit.prevent>
    <form-thumbnail v-model="workData.thumbnailImg" class="mb-5" />
    <form-title v-model="workData.title" class="mb-5" />
    <form-description v-model="workData.description" class="mb-5" />
    <form-community v-model="workData.communityId" class="mb-5" />
    <toybox-button title="送信" type="submit" class="mb-5" @click="clickSubmit" />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import FormThumbnail from '~/components/form/FormThumbnail.vue'
import FormTitle from '~/components/form/FormTitle.vue'
import FormDescription from '~/components/form/FormDescription.vue'
import FormCommunity from '~/components/form/FormCommunity.vue'
import ToyboxButton from '~/components/ToyboxButton.vue'

@Component({
  components: {
    FormThumbnail,
    FormTitle,
    FormDescription,
    FormCommunity,
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
    thumbnailImg: ''
  }

  created () {
    if (this.isNew) {
      return
    }
    // ここでaxiosでworksの内容からデータ取得
  }

  clickSubmit () {
    // バリデーションをクリアしたときのみ実行される
    // バックエンドにPOSTを記述
    console.log(this.workData)
  }
}
</script>
