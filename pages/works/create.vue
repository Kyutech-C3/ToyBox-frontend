<template>
  <works-form v-model="workData" :is-new="true" />
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'nuxt-property-decorator'
import axios from 'axios'
import WorksForm from '~/components/form/WorksForm.vue'
import { PostWork, Community } from '~/types'

@Component({
  components: {
    WorksForm
  },
  async asyncData() {
    const response = await axios.get('/communities')
    if (response.data.length === 0) {
      alert('コミュニティーが登録されていません')
    } else if (!response.data) {
      alert('コミュニティーのデータ取得に失敗しました')
    }

    return { communityList: response.data }
  }
})
export default class Create extends Vue {
  workData = {
    title: '',
    description: '',
    community_id: '',
    visibility: '',
    thumbnail_asset_id: '',
    assets_id: [],
    urls: [],
    tags_id: ['6337f6d5-500a-446d-a3ab-dcf438a00f9f'] // 仮置き
  } as PostWork

  @Provide() communityList: Array<Community> = []
}
</script>
