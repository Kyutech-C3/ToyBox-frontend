<template>
  <works-form v-model="workData" :is-new-works="true" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WorksForm from '@/components/works/WorksForm.vue'
import { PostWork } from '@/types'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'
import { tagSelectorStore, workPostStore, workFilterStore } from '~/store'

@Component({
  components: {
    WorksForm
  },
  middleware: 'auth_check'
})
export default class Create extends mixins(BlockUnloadMixin) {
  workData: PostWork = {
    title: '',
    description: '',
    visibility: 'public',
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
  }

  destroyed() {
    workPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    workPostStore.initThumbnailViewInfo()
  }
}
</script>
