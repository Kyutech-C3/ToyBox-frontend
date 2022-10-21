<template>
  <div class="w-4/5">
    <works-filter
      v-if="getNowLogin"
      :include-draft="false"
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
import axios from 'axios'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'
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

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getFilterVisibility() {
    return workFilterStore.getFilterVisibility
  }

  async searchWorks() {
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
