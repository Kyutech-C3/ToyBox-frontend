<template>
  <div class="w-4/5">
    <users-profile :user="user" />
    <works-filter />
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
  async asyncData({ route }) {
    let resUser
    if (authStore.getUser.id === route.params.id) {
      resUser = await axios.get('/users/@me', {
        headers: {
          Authorization: `Bearer ${authStore.getAccessToken}`
        }
      })
      if (!resUser.data) {
        alert('ユーザー情報の取得に失敗しました')
      }
    } else {
      resUser = await axios.get(`/users/${route.params.id}`)
      if (!resUser.data) {
        alert('ユーザー情報の取得に失敗しました')
      }
    }
    const resWorks = await axios.get('/works', {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`
      }
    })
    if (resWorks.data.length === 0) {
      alert('作品がありません')
    } else if (!resWorks.data) {
      alert('作品一覧の取得に失敗しました')
    }
    return { works: resWorks.data, user: resUser.data }
  },
  methods: {
    fetchUser() {
      return authStore.getUser
    }
  }
})
export default class Users extends Vue {
  works!: Work[]
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
}
</script>
