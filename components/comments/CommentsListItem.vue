<template>
  <div class="mb-3">
    <div class="flex items-start h-10 translate-y-5">
      <comment-user
        :user="comment.user ? comment.user : gestUser"
        :no-link="!comment.user"
        class="p-0 w-max text-gray-600"
      />
      <p class="text-gray-400 mx-2 text-xs">
        {{ dateFormatter(comment.created_at) }}
      </p>
      <visibility-state-tag
        v-if="comment.visibility !== 'public'"
        :visibility="comment.visibility"
        :size="'small'"
        class="text-black"
      />
    </div>
    <p class="pl-11 text-black text-sm">{{ comment.content }}</p>
    <div class="flex justify-start pl-11 mt-2 mb-1">
      <div
        class="flex items-center cursor-pointer hover:text-gray-500"
        @click="showReplyTextarea = true"
      >
        <font-awesome-icon :icon="['fas', 'reply']" class="w-3" />
        <span class="text-xs ml-1">返信</span>
      </div>
    </div>
    <span
      v-if="comment.number_of_reply > 0"
      class="w-fit text-xs text-blue-600 cursor-pointer mr-3 pl-11"
      @click="getReplyComments()"
    >
      {{ comment.number_of_reply }} 件の返信
    </span>
    <div v-if="showReplyTextarea" class="pl-10 w-full mt-3">
      <div class="flex items-start">
        <user-tag
          :user="getUser"
          :invisible-name="true"
          class="p-0 w-max text-gray-600"
        />
        <textarea
          v-model="replyCommentData.content"
          class="mt-1 ml-1 border-b focus:outline-0 resize-none w-[90%] h-6"
          placeholder="返信"
          maxlength="500"
        />
      </div>
      <div class="flex justify-end pr-8 mt-1 items-center">
        <!-- <font-awesome-icon
            :icon="['fas', 'paper-plane']"
            class="w-4 cursor-pointer hover:text-gray-600"
            @click="replyComment(comment.id)"
          /> -->
        <span class="text-gray-300 text-xs mr-3 w-20 text-right">
          {{ replyCommentData.content.length }} / 500
        </span>
        <span
          class="cursor-pointer mr-3 text-sm hover:text-gray-500"
          @click="closeReplyTextarea"
        >
          キャンセル
        </span>
        <base-text-button
          title="送信"
          class="w-20 h-7 text-xs"
          :class="{
            'pointer-events-none': replyCommentData.content.length === 0
          }"
          :color="replyCommentData.content.length === 0 ? 'gray' : 'yellow'"
          @click="replyComment(comment.id, replyCommentData)"
        />
      </div>
    </div>
    <reply-comments-list
      v-if="showReplyList"
      class="pl-12 w-full mt-3"
      :reply-comments="replyComments"
      @close-reply-comment-list="showReplyList = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'
import CommentUser from '@/components/comments/CommentUser.vue'
import VisibilityStateTag from '@/components/commons/VisibilityStateTag.vue'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import ReplyCommentsList from '@/components/comments/ReplyCommentsList.vue'

import {
  ResponseComment,
  User,
  PostComment,
  ResponseReplyComment
} from '@/types'
import { authStore } from '~/store'
import axios from 'axios'

type replyCommentType = {
  comment_id: string
  reply_comment_data: PostComment
}

@Component({
  components: {
    UserRoundedIcon,
    CommentUser,
    VisibilityStateTag,
    BaseTextButton,
    ReplyCommentsList
  }
})
export default class CommentsListItem extends Vue {
  gestUser: User = {
    id: '0',
    name: 'ゲスト',
    email: '',
    display_name: 'ゲスト',
    avatar_url: require('@/assets/image/gest-user.svg'),
    created_at: '',
    updated_at: ''
  }

  replyCommentData: PostComment = { content: '' }
  replyComments: ResponseReplyComment[] = []

  showReplyTextarea: boolean = false
  showReplyList: boolean = false

  @Prop({ type: Object, required: true })
  comment!: ResponseComment

  @Emit('replyComment')
  replyComment(
    comment_id: string,
    replyCommentData: PostComment
  ): replyCommentType {
    return {
      comment_id: comment_id,
      reply_comment_data: replyCommentData
    }
  }

  get getUser(): User {
    return authStore.getUser
  }

  get getAccessToken() {
    return authStore.getAccessToken
  }

  closeReplyTextarea() {
    this.showReplyTextarea = false
    this.replyCommentData.content = ''
  }

  dateFormatter(date: string): string {
    console.log(date)
    const splitFullDate = date.split('T')
    const splitDate = splitFullDate[0].split('-')
    const splitTime = splitFullDate[1].split('.')
    return `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日 ${splitTime[0]}`
  }

  getReplyComments() {
    try {
      axios
        .get(
          `${process.env.API_URL}/works/${this.$route.params.id}/comments/${this.comment.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.getAccessToken}`
            }
          }
        )
        .then((result) => {
          console.log(result)
          this.replyComments = result.data
          console.log(this.replyComments)
        })
        .catch((error) => {
          console.log(error)
        })
      this.showReplyList = true
    } catch (error) {
      console.log(error)
    }
  }
}
</script>