<template>
  <div class="!max-w-[1220px]">
    <div class="bg-white h-14 mx-20 rounded-full flex overflow-hidden mb-12">
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
    <works-filter :include-draft="false" @search="searchWorks" @clear="clear" />
    <div class="px-10 text-end my-3 text-gray-600">
      {{ getWorksLength }} / {{ resWorks.works_total_count }}
    </div>
    <div class="relative w-full min-h-[50vh]" ref="workList">
      <works-list v-if="!processing" :works="resWorks.works" />
      <loading v-else />
    </div>
    <div
      v-if="nextContentLoadProcessing"
      class="relative w-full h-[var(--loading-h)] [--loading-h:120px]"
    >
      <loading />
    </div>
    <div
      v-if="isWorksEmpty"
      class="text-center my-5 text-base-light-text-color"
    >
      これ以上、作品がありません
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'nuxt-property-decorator'

import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'

import { Work, ResWorks } from '@/types'
import { authStore, tagSelectorStore, workFilterStore } from '@/store'
import { AxiosClient } from '@/utils/axios'
import { Query } from '@/utils/query'

@Component({
  components: {
    WorksFilter,
    WorksList,
    Loading
  },
  async asyncData() {
    if (workFilterStore.getOnPageName !== 'top') {
      workFilterStore.deleteFilterVisibility()
      tagSelectorStore.initSelectedTags()
      workFilterStore.setOnPageName('top')
    }
    const query = new Query()
    if (
      workFilterStore.getUseConditionsWhenAsyncData &&
      workFilterStore.getOnPageName === 'top'
    ) {
      query.create(
        tagSelectorStore.getSelectedTags,
        workFilterStore.getFilterVisibility
      )
    }
    const resWorks = await AxiosClient.client(
      'GET',
      `/works${query.getQuery()}`,
      true
    )
    if (resWorks.status !== 200) {
      alert('作品一覧の取得に失敗しました')
    }

    return { resWorks: resWorks.data }
  }
})
export default class Index extends Vue {
  resWorks!: ResWorks
  query: Query = new Query()
  processing: boolean = false
  scrollY: number = 0
  isWorksEmpty: boolean = false
  nextContentLoadProcessing: boolean = false
  bottom: number = 0
  limit: number = 30
  target: 'toy' | 'blog' = 'toy'

  @Ref() workList!: HTMLDivElement

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getFilterVisibility() {
    return workFilterStore.getFilterVisibility
  }

  get getOnPageName() {
    return workFilterStore.getOnPageName
  }

  get getWorksLength() {
    return this.resWorks.works.length
  }

  @Watch('scrollY')
  handleBottom() {
    if (this.workList) {
      this.bottom = Math.floor(this.workList.clientHeight)
    }
    if (this.bottom <= this.scrollY) {
      if (!this.nextContentLoadProcessing && !this.isWorksEmpty) {
        this.nextContentLoadProcessing = true
        this.getNextContent()
      }
    }
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
        // await this.getBlog()
      }
    }
  }

  created() {
    if (this.resWorks.works.length < this.limit) {
      this.isWorksEmpty = true
    }
    workFilterStore.setSearched(true)
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.resWorks.works.length < this.limit) {
      this.isWorksEmpty = true
    }
  }

  handleScroll() {
    this.scrollY = window.scrollY + window.innerHeight - 450
  }

  async getNextContent() {
    this.query.init()
    workFilterStore.setSearched(true)
    this.query.create(
      this.getSelectedTags,
      this.getFilterVisibility,
      this.resWorks.works[this.resWorks.works.length - 1].id,
      undefined,
      undefined,
      undefined,
      this.limit
    )
    const res = await AxiosClient.client(
      'GET',
      `/works${this.query.getQuery()}`,
      true
    )
    if (res.status !== 200) {
      alert('作品一覧の取得に失敗しました')
    }
    const resWorks: ResWorks = res.data
    setTimeout(() => {
      if (resWorks.works.length === 0) {
        this.isWorksEmpty = true
      } else {
        resWorks.works.map((item: Work) => {
          this.resWorks.works.push(item)
        })
        this.resWorks.works_total_count = resWorks.works_total_count

        if (resWorks.works.length < this.limit) {
          this.isWorksEmpty = true
        }
      }
      this.nextContentLoadProcessing = false
    }, 1000)
  }

  async searchWorks() {
    this.isWorksEmpty = false
    this.query.init()
    workFilterStore.setSearched(true)
    this.processing = true
    this.query.create(
      this.getSelectedTags,
      this.getFilterVisibility,
      undefined,
      undefined,
      undefined,
      undefined,
      this.limit
    )
    const res = await AxiosClient.client(
      'GET',
      `/works${this.query.getQuery()}`,
      this.getNowLogin ? true : false
    )
    if (res.status !== 200) {
      alert('作品一覧の取得に失敗しました')
    }
    if (this.resWorks.works.length < this.limit) {
      this.isWorksEmpty = true
    } else {
      this.isWorksEmpty = false
    }
    this.resWorks = res.data
    this.processing = false
  }

  async clear() {
    workFilterStore.deleteFilterVisibility()
    tagSelectorStore.initSelectedTags()
    await this.searchWorks()
    workFilterStore.setSearched(true)
    this.isWorksEmpty = false
  }

  changeTag(target: 'blog' | 'toy') {
    this.$router.push({
      path: ``,
      query: { target: target }
    })
  }
}
</script>
