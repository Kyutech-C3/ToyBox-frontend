<template>
  <div>
    <users-profile :user="fetchUser" />
    <works-filter :communities="communities" />
    <works-list :works="works" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import UsersProfile from '@/components/users/UsersProfile.vue'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import { Work } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    UsersProfile,
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
    const resCommunities = await axios.get('/communities')
    if (resCommunities.data.length === 0) {
      console.error('コミュニティがありません')
    } else if (!resCommunities.data) {
      console.error('コミュニティ一覧の取得に失敗しました')
    }
    return { works: resWorks.data, communities: resCommunities.data }
  }
})
export default class Users extends Vue {
  works!: Work[]
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)

  get fetchUser() {
    return authStore.getUser
  }
}
</script>
