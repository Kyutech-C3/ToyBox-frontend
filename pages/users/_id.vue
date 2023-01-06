<template>
  <div>
    <users-profile :user="user" />
    <works-filter
      :include-draft="getUser.id === $route.params.id"
      @search="searchWorks"
      @clear="clear"
      id="user_work"
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
import { Query } from '@/utils/query'

@Component({
  components: {
    UsersProfile,
    WorksFilter,
    WorksList,
    Loading
  },
  async asyncData({ route }) {
    if (workFilterStore.getOnPageName !== 'user') {
      if (workFilterStore.getOnPageName !== 'menu') {
        workFilterStore.deleteFilterVisibility()
      }
      tagSelectorStore.initSelectedTags()
      workFilterStore.setOnPageName('user')
    }
    let User
    let resUser
    let resWorks
    const query: Query = new Query()
    query.create(
      tagSelectorStore.getSelectedTags,
      workFilterStore.getFilterVisibility
    )
    if (authStore.getUser.id === '' && authStore.getAccessToken !== '') {
      User = await AxiosClient.client('GET', '/users/@me', true)
    }
    if (
      User?.data.id === route.params.id ||
      authStore.getUser.id === route.params.id
    ) {
      resUser = await AxiosClient.client('GET', '/users/@me', true)
      resWorks = await AxiosClient.client(
        'GET',
        `/users/@me/works${query.getQuery()}`,
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
        `/users/${route.params.id}/works${query.getQuery()}`,
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
  query: Query = new Query()

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

  head() {
    const title: string = `ToyBox ユーザー - ${this.user.display_name}`
    const url: string = `${process.env.BASE_URL}users/${this.user.id}`
    const description: string = this.user.profile ? this.user.profile : ''
    return {
      title: title,
      htmlAttrs: {
        lang: 'ja',
        prefix:
          'og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#'
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.user.avatar_url
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: url
        }
      ]
    }
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(true)
    workFilterStore.setSearched(true)
  }

  async searchWorks() {
    if (this.getNowLogin) {
      workFilterStore.setSearched(true)
      this.processing = true
      this.query.init()
      this.query.create(this.getSelectedTags, this.getFilterVisibility)
      let resWorks
      if (this.getUser.id === this.$route.params.id) {
        resWorks = await AxiosClient.client(
          'GET',
          `/users/@me/works${this.query.getQuery()}`,
          true
        )
      } else {
        resWorks = await AxiosClient.client(
          'GET',
          `/users/${this.$route.params.id}/works${this.query.getQuery()}`,
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
