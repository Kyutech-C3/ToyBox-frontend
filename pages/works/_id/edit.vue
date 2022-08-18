<template>
  <works-form v-model="workData" :is-new-works="false" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WorksForm from '@/components/works/WorksForm.vue'
import { PostWork, Work } from '@/types'
import axios from 'axios'
import { authStore, workPostStore } from '~/store'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'

@Component({
  components: {
    WorksForm
  },
  async asyncData({ route }) {
    let resWork
    resWork = await axios.get(`/works/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`
      }
    })
    if (!resWork.data) {
      console.error(resWork.status)
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
    tags_id: ['tag-12345'] // 仮置き
  }

  created() {
    workPostStore.setAssetsViewInfo(this.putWorkData)
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
    console.log(this.workData)
    console.log(this.putWorkData)
  }

  destroyed() {
    workPostStore.initAssetsViewInfo()
  }
}
</script>