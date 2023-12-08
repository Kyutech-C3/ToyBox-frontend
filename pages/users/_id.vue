<template>
  <div class="!max-w-[1220px]">
    <users-profile :user="user" />
    <div
      class="
        bg-white
        h-14
        rounded-full
        flex
        overflow-hidden
        mb-10
        mt-28
        w-[95vw]
        max-w-[70%]
        mx-auto
      "
      v-if="getIsMe"
    >
      <button
        :class="`w-1/2
          h-full
          text-lg
          font-bold
          flex
          items-center
          justify-center
          hover:bg-[var(--hover-base-button-color)]
          text-[var(--hover-base-text-color)] ${[
            target === 'toy' &&
              'bg-[var(--hover-base-button-color)] text-[var(--hover-base-text-color)] pointer-events-none'
          ]}`"
        @click="changeTag('toy')"
      >
        <span>Toy</span>
      </button>
      <button
        :class="`w-1/2
          h-full
          text-lg
          font-bold
          flex
          items-center
          justify-center
          hover:bg-[var(--hover-base-button-color)]
          text-[var(--hover-base-text-color)] ${[
            target === 'blog' &&
              'bg-[var(--hover-base-button-color)] text-[var(--hover-base-text-color)] pointer-events-none'
          ]}`"
        @click="changeTag('blog')"
      >
        <span>Blog</span>
      </button>
    </div>
    <works-filter
      v-if="target === 'toy'"
      :include-draft="getUser.id === $route.params.id"
      @search="searchWorks"
      @clear="clear"
      id="user_work"
    />
    <div v-if="getIsMe" class="px-10 text-end my-3 text-gray-600">
      {{ target === 'toy' ? getWorksLength : getBlogsLength }} /
      {{ item_total_count }}
    </div>
    <div class="relative w-full min-h-[50vh]">
      <works-list v-if="!processing && target === 'toy'" :works="works" />
      <blog-list v-else-if="!processing && target === 'blog'" :blogs="blogs" />
      <loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import UsersProfile from '@/components/users/UsersProfile.vue'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'
import BlogList from '@/components/blogs/BlogList.vue'

import { User, Work, Blog, BlogsResponse, ResWorks } from '@/types'
import { authStore, tagSelectorStore, workFilterStore } from '~/store'
import { AxiosClient } from '@/utils/axios'
import { Query } from '@/utils/query'

@Component({
  components: {
    UsersProfile,
    WorksFilter,
    WorksList,
    Loading,
    BlogList
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
    let isMe
    let resWorks!: { data: ResWorks; [key: string]: any }
    let resBlogs!: { data: BlogsResponse; [key: string]: any }
    const query: Query = new Query()
    query.create(
      tagSelectorStore.getSelectedTags,
      workFilterStore.getFilterVisibility
    )
    if (authStore.getUser.id === '' && authStore.getAccessToken !== '') {
      User = await AxiosClient.client('GET', '/users/@me', true)
    }
    isMe =
      User?.data.id === route.params.id ||
      authStore.getUser.id === route.params.id
    if (isMe) {
      resUser = await AxiosClient.client('GET', '/users/@me', true)
      if (route.query.target === 'blog') {
        resBlogs = await AxiosClient.client(
          'GET',
          `/users/@me/blogs${query.getQuery()}`,
          true
        )
      } else {
        resWorks = await AxiosClient.client(
          'GET',
          `/users/@me/works${query.getQuery()}`,
          true
        )
      }
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
    if (
      (!route.query.target || route.query.target === 'toy') &&
      (!resWorks || !resWorks.data)
    ) {
      alert('ユーザーの作品情報の取得に失敗しました')
    }
    if (
      route.query.target === 'blog' &&
      isMe &&
      (!resBlogs || !resBlogs.data)
    ) {
      alert('ユーザーのブログ情報の取得に失敗しました')
    }

    if (!route.query.target || route.query.target === 'toy') {
      return {
        works: resWorks!.data.works as Work[],
        item_total_count: resWorks!.data.works_total_count as number,
        user: resUser.data
      }
    } else if (route.query.target === 'blog') {
      return {
        blogs: resBlogs!.data.blogs as Blog[],
        item_total_count: resBlogs!.data.blogs_total_count as number,
        user: resUser.data
      }
    }
  }
})
export default class Users extends Vue {
  works: Work[] = []
  item_total_count: number = 0
  user!: User
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
  processing: boolean = false
  query: Query = new Query()
  blogs: Blog[] = []
  target: 'blog' | 'toy' = 'blog'

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

  get getWorksLength() {
    return this.works.length
  }

  get getBlogsLength() {
    return this.blogs.length
  }

  get getIsMe() {
    return this.getUser.id === this.$route.params.id
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
    this.$route.query.target
      ? (this.target = this.$route.query.target as 'blog' | 'toy')
      : (this.target = 'toy')
  }

  @Watch('$route')
  async onRouteChange() {
    if (this.getNowLogin) {
      if (this.$route.query.target) {
        this.target = this.$route.query.target as 'blog' | 'toy'
      } else {
        this.target = 'toy'
      }
    }
  }

  @Watch('target')
  async onChangeTag() {
    if (this.getNowLogin) {
      if (this.target === 'toy') {
        await this.searchWorks()
      } else if (this.target === 'blog') {
        await this.getBlog()
      }
    }
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
      this.works = resWorks.data.works
      this.item_total_count = resWorks.data.works_total_count
      this.processing = false
    }
  }

  async getBlog() {
    if (this.getNowLogin) {
      this.processing = true
      const res = await AxiosClient.client('GET', `/users/@me/blogs`, true)
      if (res.status !== 200) {
        alert('ブログ一覧の取得に失敗しました')
      }
      this.blogs.splice(0)
      this.blogs = res.data.blogs
      this.item_total_count = res.data.blogs_total_count
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

  changeTag(target: 'blog' | 'toy') {
    this.$router.push({
      path: `/users/${this.$route.params.id}`,
      query: { target: target }
    })
  }
}
</script>
