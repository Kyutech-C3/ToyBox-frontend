<template>
  <blog-form v-model="blogData" :is-new-blogs="true" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BlogForm from '@/components/blogs/BlogForm.vue'
import { PostBlog } from '@/types'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'
import { tagSelectorStore, blogPostStore } from '~/store'

@Component({
  components: {
    BlogForm
  },
  middleware: 'auth_check'
})
export default class Create extends mixins(BlockUnloadMixin) {
  blogData: PostBlog = {
    title: '',
    body_text: '',
    visibility: 'public',
    thumbnail_asset_id: '',
    assets_id: [],
    tags_id: []
  }

  beforeCreate() {
    tagSelectorStore.initSelectedTags()
  }

  destroyed() {
    blogPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    blogPostStore.initThumbnailViewInfo()
  }
}
</script>
