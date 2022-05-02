<template>
  <div class="pl-3 pb-1 border-b-2 border-dotted">
    <div class="inline-block">
      {{ name }}
    </div>
    <button class="ml-6" @click="commentDelete">
      <img src="@/assets/img/commentDelete.png" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { commentStore } from '@/store'

@Component
export default class CommentsItem extends Vue {
  @Prop({ type: String, required: true, default: 'error' })
  name!: string
  @Prop({ type: Number, required: true })
  index!: number

  commentDelete() {
    commentStore.deleteComment(this.index)
  }
}
</script>
