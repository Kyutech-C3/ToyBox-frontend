<template>
  <div>
    <works-filter />
    <works-list :works="works" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import { Work } from '@/types'

@Component({
  components: {
    WorksFilter,
    WorksList
  },
  async asyncData() {
    const resWorks = await axios.get('/works')
    if (resWorks.data.length === 0) {
      alert('作品がありません')
    } else if (!resWorks.data) {
      alert('作品一覧の取得に失敗しました')
    }
    return { works: resWorks.data }
  }
})
export default class Index extends Vue {
  works!: Array<Work>
}
</script>
