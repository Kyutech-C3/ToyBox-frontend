<template>
  <div>
    <users-profile :user="user" />
    <works-filter
      :include-draft="getUser.id === $route.params.id"
      @search="searchWorks"
      @clear="clear"
    />
    <div class="relative w-full min-h-[50vh]">
      <works-list v-if="!processing" :works="works" />
      <loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import UsersProfile from '@/components/users/UsersProfile.vue'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'

import { User, Work } from '@/types'
import { authStore, tagSelectorStore, workFilterStore } from '~/store'
import { AxiosClient } from '@/utils/axios'

@Component({
  components: {
    UsersProfile,
    WorksFilter,
    WorksList,
    Loading
  },
  async asyncData({ route }) {
    workFilterStore.setSearched(true)
    let resUser
    let resWorks
    let query: string = '?tags='
    tagSelectorStore.getSelectedTags.map((tag) => {
      query += `${tag.id},`
    })
    query = query.slice(0, -1)
    if (workFilterStore.getFilterVisibility !== '') {
      query += `&visibility=${workFilterStore.getFilterVisibility}`
    }
    if (authStore.getUser.id === route.params.id) {
      resUser = await AxiosClient.client('GET', '/users/@me', true)
      resWorks = await AxiosClient.client(
        'GET',
        `/users/@me/works${query}`,
        true
      )
    } else {
      resUser = await AxiosClient.client(
        'GET',
        `/users/${route.params.id}`,
        false
      )
      resWorks = await AxiosClient.client(
        'GET',
        `/users/${route.params.id}/works${query}`,
        true
      )
    }
    if (!resUser.data) {
      alert('ユーザー情報の取得に失敗しました')
    }
    if (!resWorks.data) {
      alert('ユーザーの作品情報の取得に失敗しました')
    }
    return { works: resWorks.data, user: resUser.data }
  }
})
export default class Users extends Vue {
  works!: Work[]
  user!: User
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
  processing: boolean = false
  query: string = ''

  get getUser() {
    return authStore.getUser
  }

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getFilterVisibility() {
    return workFilterStore.getFilterVisibility
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(true)
  }

  async searchWorks() {
    if (this.getNowLogin) {
      workFilterStore.setSearched(true)
      this.processing = true
      this.query = '?tags='
      this.getSelectedTags.map((tag) => {
        this.query += `${tag.id},`
      })
      this.query = this.query.slice(0, -1)
      if (this.getFilterVisibility !== '') {
        this.query += `&visibility=${this.getFilterVisibility}`
      }
      let resWorks
      if (this.getUser.id === this.$route.params.id) {
        resWorks = await AxiosClient.client(
          'GET',
          `/users/@me/works${this.query}`,
          true
        )
      } else {
        resWorks = await AxiosClient.client(
          'GET',
          `/users/${this.$route.params.id}/works${this.query}`,
          true
        )
      }
      if (resWorks.status !== 200) {
        alert('作品一覧の取得に失敗しました')
      }
      this.works.splice(0)
      this.works = resWorks.data
      this.processing = false
    }
  }

  async clear() {
    if (this.getNowLogin) {
      workFilterStore.deleteFilterVisibility()
      tagSelectorStore.initSelectedTags()
      await this.searchWorks()
      workFilterStore.setSearched(true)
    }
  }
}
</script>
