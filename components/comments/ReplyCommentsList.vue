<template>
  <div>
    <div>
      <reply-comments-list-item
        v-for="replyComment in replyComments"
        :key="replyComment.id"
        :reply-comment="replyComment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

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
}
</script>
