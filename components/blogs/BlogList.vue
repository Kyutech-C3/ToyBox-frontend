<template>
  <div class="c-grid py-5 px-2 [--card-w:18rem] [--card-h:22rem] z-0 mx-auto">
    <blog-card v-for="(blog, index) in blogs" :key="index" :blog-data="blog" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BlogCard from '@/components/blogs/BlogCard.vue'
import { Blog } from '@/types'

@Component({
  components: {
    BlogCard
  }
})
export default class BlogList extends Vue {
  @Prop({ type: Array, required: true })
  blogs!: Array<Blog>
}
</script>

<style>
.c-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  grid-row-gap: 15px;
  row-gap: 15px;
  grid-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
  justify-items: center;
  justify-content: center;
}
</style>
