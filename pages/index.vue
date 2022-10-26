<template>
  <div>
    <works-filter
      v-if="getNowLogin"
      :include-draft="false"
      class="mb-10"
      @search="searchWorks"
      @clear="clear"
    />
    <div class="relative w-full min-h-[50vh]" ref="workList">
      <works-list v-if="!processing" :works="works" />
      <loading v-else />
    </div>
    <div v-if="nextContentLoadProcessing" class="relative w-full h-28">
      <loading />
    </div>
    <div v-if="isWorksEmpty" class="text-center my-5 text-gray-500">
      これ以上、作品がありません
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'nuxt-property-decorator'

import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'

import axios from 'axios'
import { Work } from '@/types'
import { authStore, tagSelectorStore, workFilterStore } from '@/store'

@Component({
  components: {
    WorksFilter,
    WorksList,
    Loading
  },
  async asyncData() {
    workFilterStore.setSearched(true)
    let query: string = ''
    if (workFilterStore.getUseConditionsWhenAsyncData) {
      if (tagSelectorStore.getSelectedTags.length !== 0) {
        query = '?tags='
        tagSelectorStore.getSelectedTags.map((tag) => {
          query += `${tag.id},`
        })
        query = query.slice(0, -1)
      }
      if (workFilterStore.getFilterVisibility !== '') {
        query += query === '' ? '?' : '&'
        query += `visibility=${workFilterStore.getFilterVisibility}`
      }
    }
    const resWorks = await axios.get(`/works${query}`, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`
      }
    })
    if (resWorks.status !== 200) {
      alert('作品一覧の取得に失敗しました')
    }
    return { works: resWorks.data }
  }
})
export default class Index extends Vue {
  works: Array<Work> = []
  query: string = ''
  processing: boolean = false
  scrollY: number = 0
  isWorksEmpty: boolean = false
  nextContentLoadProcessing: boolean = false
  bottom: number = 0
  limit: number = 30

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

  @Watch('scrollY')
  handleBottom() {
    if (this.workList) {
      this.bottom = this.workList.scrollHeight - 260
    }
    if (this.bottom <= this.scrollY) {
      if (!this.nextContentLoadProcessing && !this.isWorksEmpty) {
        this.nextContentLoadProcessing = true
        this.getNextContent()
      }
    }
  }

  created() {
    if (this.works.length < this.limit) {
      this.isWorksEmpty = true
    }
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.works.length < this.limit) {
      this.isWorksEmpty = true
    }
  }

  handleScroll() {
    this.scrollY = window.scrollY
  }

  async getNextContent() {
    if (this.getNowLogin) {
      this.query = ''
      workFilterStore.setSearched(true)
      if (this.getSelectedTags.length !== 0) {
        this.query = '?tags='
        this.getSelectedTags.map((tag) => {
          this.query += `${tag.id},`
        })
        this.query = this.query.slice(0, -1)
      }
      if (this.getFilterVisibility !== '') {
        this.query += this.query === '' ? '?' : '&'
        this.query += `visibility=${this.getFilterVisibility}`
      }
      this.query += this.query === '' ? '?' : '&'
      this.query += `oldest_id=${this.works[this.works.length - 1].id}`
      const resWorks = await axios.get(`/works${this.query}`, {
        headers: {
          Authorization: `Bearer ${authStore.getAccessToken}`
        }
      })
      if (resWorks.status !== 200) {
        alert('作品一覧の取得に失敗しました')
      }
      setTimeout(() => {
        if (resWorks.data.length === 0) {
          this.isWorksEmpty = true
        } else {
          resWorks.data.map((item: Work) => {
            this.works.push(item)
          })
        }
        this.nextContentLoadProcessing = false
      }, 1000)
    }
  }

  async searchWorks() {
    this.isWorksEmpty = false
    if (this.getNowLogin) {
      this.query = ''
      workFilterStore.setSearched(true)
      this.processing = true
      if (this.getSelectedTags.length !== 0) {
        this.query = '?tags='
        this.getSelectedTags.map((tag) => {
          this.query += `${tag.id},`
        })
        this.query = this.query.slice(0, -1)
      }
      if (this.getFilterVisibility !== '') {
        this.query += this.query === '' ? '?' : '&'
        this.query += `visibility=${this.getFilterVisibility}`
      }
      const resWorks = await axios.get(`/works${this.query}`, {
        headers: {
          Authorization: `Bearer ${authStore.getAccessToken}`
        }
      })
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
