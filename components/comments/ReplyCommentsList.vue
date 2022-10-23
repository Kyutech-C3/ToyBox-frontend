<template>
  <div>
    <reply-comments-list-item
      v-for="replyComment in replyComments"
      :key="replyComment.id"
      :reply-comment="replyComment"
    />
    <div
      v-if="!isReplyCommentsEmpty"
      class="
        text-blue-600
        select-none
        cursor-pointer
        w-fit
        items-center
        text-xs
        flex
        mt-3
      "
      @click="(event) => $emit('click', event)"
    >
      <font-awesome-icon :icon="['fas', 'caret-down']" class="w-1.5 mr-1" />
      <span>more</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import ReplyCommentsListItem from '@/components/comments/ReplyCommentsListItem.vue'

import { ResponseReplyComment } from '@/types'

@Component({
  components: {
    ReplyCommentsListItem
  }
})
export default class ReplyCommentsList extends Vue {
  @Prop({ type: Array, required: true })
  replyComments!: ResponseReplyComment[]

  @Prop({ type: Boolean, required: true })
  isReplyCommentsEmpty!: boolean
}
</script>
