<template>
  <blog-form v-model="blogData" :is-new-blogs="false" />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import BlogForm from '@/components/blogs/BlogForm.vue'

import { Blog, PostBlog } from '@/types'
import { AxiosClient } from '@/utils/axios'
import { tagSelectorStore, workFilterStore, blogPostStore } from '~/store'
import BlockUnloadMixin from '~/mixins/BlockUnloadMixin'

@Component({
  components: {
    BlogForm
  },
  middleware: 'auth_check',
  async asyncData({ route, store, error }) {
    let resWork
    resWork = await AxiosClient.client('GET', `/blogs/${route.params.id}`, true)
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
    return { putBlogData: resWork.data }
  }
})
export default class Create extends mixins(BlockUnloadMixin) {
  putBlogData!: Blog

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
    workFilterStore.deleteFilterVisibility()
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(false)
    blogPostStore.setAssetsViewInfo(this.putBlogData.assets)
    tagSelectorStore.setSelectedTags(this.putBlogData.tags)
    blogPostStore.setThumbnailViewInfo(this.putBlogData.thumbnail)
    this.blogData = {
      title: this.putBlogData.title,
      body_text: this.putBlogData.body_text,
      visibility: this.putBlogData.visibility,
      thumbnail_asset_id: this.putBlogData.thumbnail.id,
      assets_id: this.putBlogData.assets.map((i) => i.id),
      tags_id: this.putBlogData.tags.map((i) => i.id)
    }
  }

  destroyed() {
    blogPostStore.initAssetsViewInfo()
    tagSelectorStore.initSelectedTags()
    blogPostStore.initThumbnailViewInfo()
  }
}
</script>
