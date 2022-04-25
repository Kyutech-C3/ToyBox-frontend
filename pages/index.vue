<template>
  <div class="w-192 mx-auto">
    <refine-search-form
      :community-list="communityList"
      class="w-11/12 mx-auto mb-16"
    />
    <work-list :work-list="workList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import RefineSearchForm from '~/components/RefineSearchForm.vue'
import WorkList from '~/components/WorkList.vue'
import { Work } from '~/types'

@Component({
  components: {
    RefineSearchForm,
    WorkList
  },
  async asyncData() {
    const resWorks = await axios.get('/works')
    if (resWorks.data.length === 0) {
      alert('作品がありません')
    } else if (!resWorks.data) {
      alert('作品一覧の取得に失敗しました')
    }
    const resCommunities = await axios.get('/communities')
    if (resCommunities.data.length === 0) {
      // eslint-disable-next-line no-console
      console.log('コミュニティがありません')
    } else if (!resCommunities.data) {
      // eslint-disable-next-line no-console
      console.log('コミュニティ一覧の取得に失敗しました')
    }
    return { workList: resWorks.data, communityList: resCommunities.data }
  }
})
export default class WorkIndex extends Vue {
  workList!: Array<Work>
}
</script>
