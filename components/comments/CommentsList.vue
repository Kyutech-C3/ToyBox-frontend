<template>
  <div>
    <div v-if="comments.length === 0" class="ml-10">
      コメントがまだありません>_&lt; &nbsp;作品の感想などをコメントしてみてね！
    </div>
    <comments-list-item
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @replyComment="replyComment($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

import CommentsListItem from '@/components/comments/CommentsListItem.vue'

import { ResponseComment, PostComment } from '@/types'
import { ReplyCommentType } from '@/types/common'

@Component({
  components: {
    CommentsListItem
  }
})
export default class CommentsList extends Vue {
  @Prop({ type: Array, required: true })
  comments!: ResponseComment[]

  @Emit('replyComment')
  replyComment(replyCommentData: ReplyCommentType): ReplyCommentType {
    return replyCommentData
  }
}
</script>
