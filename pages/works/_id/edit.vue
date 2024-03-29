<template>
  <works-form v-model="workData" :is-new-works="false" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import WorksForm from '@/components/works/WorksForm.vue'

import { PostWork, Work } from '@/types'
import { AxiosClient } from '@/utils/axios'
import { workPostStore, tagSelectorStore, workFilterStore } from '~/store'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'

@Component({
  components: {
    WorksForm
  },
  middleware: 'auth_check',
  async asyncData({ route, store, error }) {
    let resWork
    resWork = await AxiosClient.client('GET', `/works/${route.params.id}`, true)
    if (!resWork.data) {
      console.error(resWork.status)
    }
    if (resWork.data.user.id !== store.state.auth.user.id) {
      console.error('他人の作品は編集できません')
      throw error({
        statusCode: 403,
        message: '他人の作品は編集できません'
      })
    }
    return { putWorkData: resWork.data }
  }
})
export default class Create extends mixins(BlockUnloadMixin) {
  putWorkData!: Work

  workData: PostWork = {
    title: '',
    description: '',
    visibility: '',
    thumbnail_asset_id: '',
    assets_id: [],
    urls: [],
    tags_id: []
  }

  beforeCreate() {
    tagSelectorStore.initSelectedTags()
    workFilterStore.deleteFilterVisibility()
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(false)
    workPostStore.setAssetsViewInfo(this.putWorkData)
    tagSelectorStore.setSelectedTags(this.putWorkData.tags)
    workPostStore.setThumbnailViewInfo(this.putWorkData.thumbnail)
    this.workData = {
      title: this.putWorkData.title,
      description: this.putWorkData.description,
      visibility: this.putWorkData.visibility,
      thumbnail_asset_id: this.putWorkData.thumbnail.id,
      assets_id: this.putWorkData.assets.map((i) => i.id),
      urls: [],
      tags_id: this.putWorkData.tags.map((i) => i.id)
    }
    if (this.putWorkData) {
      for (let i = 0; i < this.putWorkData.urls.length; i++) {
        this.workData.urls.push({
          url: this.putWorkData.urls[i].url,
          url_type: this.putWorkData.urls[i].url_type
        })
      }
    }
  }

  destroyed() {
    workPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    workPostStore.initThumbnailViewInfo()
  }
}
</script>
