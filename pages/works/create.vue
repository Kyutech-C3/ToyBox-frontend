<template>
  <works-form v-model="workData" :is-new="true" />
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'nuxt-property-decorator'
import WorksForm from '@/components/works/WorksForm.vue'
import { PostWork } from '@/types'

@Component({
  components: {
    WorksForm
  }
})
export default class Create extends Vue {
  workData: PostWork = {
    title: '',
    description: '',
    visibility: '',
    thumbnail_asset_id: '',
    assets_id: [],
    urls: [],
    tags_id: ['tag-12345'] // 仮置き
  }
}
</script>
