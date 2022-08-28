<template>
  <works-form v-model="workData" :is-new-works="true" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WorksForm from '@/components/works/WorksForm.vue'
import { PostWork } from '@/types'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'
import { workPostStore } from '~/store'

@Component({
  components: {
    WorksForm
  }
})
export default class Create extends mixins(BlockUnloadMixin) {
  workData: PostWork = {
    title: '',
    description: '',
    visibility: '',
    thumbnail_asset_id: '',
    assets_id: [],
    urls: [],
    tags_id: ['tag-12345'] // 仮置き
  }

  destroyed() {
    workPostStore.initAssetsViewInfo()
    workPostStore.initSelectedTags()
    workPostStore.initThumbnailViewInfo()
  }
}
</script>
