<template>
  <div>
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
    <div v-if="showReplyTextarea" class="pl-10 w-full mt-3">
      <div class="flex items-start">
        <!-- <user-tag
          :user="getUser"
          :invisible-name="true"
          class="p-0 w-max text-gray-600"
        /> -->
        <textarea
          v-model="replyCommentData.content"
          class="
            mt-1
            ml-1
            border-b
            focus:outline-0
            resize-none
            w-[90%]
            h-6
            text-base-text-color
          "
          placeholder="返信"
          maxlength="500"
          v-on:keydown.ctrl.enter="
            if (replyCommentData.content.length !== 0) {
              replyComment(comment.id, replyCommentData)
            }
          "
          v-on:keydown.meta.enter="
            if (replyCommentData.content.length !== 0) {
              replyComment(comment.id, replyCommentData)
            }
          "
        />
      </div>
      <div class="flex justify-end pr-8 mt-1 items-center">
        <span class="text-gray-400 text-xs mr-3 w-20 text-right">
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
    <div
      v-if="number_of_reply > 0"
      class="
        text-blue-600
        mr-3
        ml-10
        select-none
        cursor-pointer
        w-fit
        flex
        items-center
      "
      @click="showReplyComments"
    >
      <span v-if="!showReplyList" class="material-symbols-outlined text-lg">
        arrow_drop_down
      </span>
      <span v-if="showReplyList" class="material-symbols-outlined text-lg">
        arrow_drop_up
      </span>
      <span class="text-xs"> {{ number_of_reply }} 件の返信 </span>
    </div>
    <reply-comments-list
      v-if="showReplyList"
      class="pl-12 w-full -translate-y-3"
      :reply-comments="replyComments"
      :is-reply-comments-empty="isReplyCommentsEmpty"
      @click="getMoreReply"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'

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
import { ReplyCommentType } from '@/types/common'

import { authStore, commentStore } from '~/store'
import { AxiosClient } from '@/utils/axios'
import { Query } from '@/utils/query'

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
    display_name: 'ゲスト',
    avatar_url: require('@/assets/image/gest-user.svg'),
    created_at: '',
    updated_at: ''
  }

  replyCommentData: PostComment = { content: '' }
  replyComments: ResponseReplyComment[] = []
  number_of_reply: number = 0
  query: Query = new Query()
  isReplyCommentsEmpty: boolean = false

  showReplyTextarea: boolean = false
  showReplyList: boolean = false

  get getUser(): User {
    return authStore.getUser
  }

  get getAccessToken() {
    return authStore.getAccessToken
  }

  get getTempReplyCommentInfo() {
    return commentStore.getTempReplyCommentInfo
  }

  get getTempReplyComment() {
    return commentStore.getTempReplyComment
  }

  @Prop({ type: Object, required: true })
  comment!: ResponseComment

  @Emit('replyComment')
  replyComment(
    comment_id: string,
    replyCommentData: PostComment
  ): ReplyCommentType {
    return {
      comment_id: comment_id,
      reply_comment_data: replyCommentData
    }
  }

  @Watch('getTempReplyComment')
  handlePostReplyComment() {
    if (this.getTempReplyCommentInfo.parentCommentId === this.comment.id) {
      if (this.isReplyCommentsEmpty) {
        this.replyComments.push(this.getTempReplyCommentInfo.tempReplyComment)
      }
      this.number_of_reply += 1
    }
  }

  created() {
    this.number_of_reply = this.comment.number_of_reply
  }

  closeReplyTextarea() {
    this.showReplyTextarea = false
    this.replyCommentData.content = ''
  }

  dateFormatter(date: string): string {
    const splitFullDate = date.split('T')
    const splitDate = splitFullDate[0].split('-')
    const splitTime = splitFullDate[1].split('.')
    return `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日 ${splitTime[0]}`
  }

  getReplyComments(type: string) {
    try {
      AxiosClient.client(
        'GET',
        `${process.env.API_URL}/works/${this.$route.params.id}/comments/${
          this.comment.id
        }${this.query.getQuery()}`,
        true
      )
        .then((result) => {
          if (type === 'show') {
            this.replyComments.splice(0)
            this.replyComments = result.data
          } else if ('more') {
            result.data.map((item: ResponseReplyComment) => {
              this.replyComments.push(item)
            })
          }
          if (result.data.length < 10) {
            this.isReplyCommentsEmpty = true
          } else {
            this.isReplyCommentsEmpty = false
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  getMoreReply() {
    this.query.create(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      this.replyComments[this.replyComments.length - 1].id
    )
    this.getReplyComments('more')
  }

  showReplyComments() {
    if (this.showReplyList) {
      this.showReplyList = false
    } else {
      this.getReplyComments('show')
      this.showReplyList = true
    }
  }
}
</script>
