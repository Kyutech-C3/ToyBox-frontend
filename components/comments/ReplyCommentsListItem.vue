<template>
  <div>
    <div class="flex items-start h-10">
      <div class="flex items-start h-10 translate-y-5">
        <comment-user
          :user="replyComment.user ? replyComment.user : gestUser"
          class="p-0 w-max text-gray-600"
        />
        <p class="text-gray-400 mx-2 text-xs">
          {{ dateFormatter(replyComment.created_at) }}
        </p>
      </div>
      <visibility-state-tag
        v-if="replyComment.visibility !== 'public'"
        :visibility="replyComment.visibility"
        :size="'small'"
        class="text-black"
      />
    </div>
    <p class="pl-12 text-sm text-black">{{ replyComment.content }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import CommentUser from '@/components/comments/CommentUser.vue'
import VisibilityStateTag from '@/components/commons/VisibilityStateTag.vue'

import { ResponseReplyComment, User } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    CommentUser,
    VisibilityStateTag
  }
})
export default class ReplyCommentsListItem extends Vue {
  gestUser: User = {
    id: '0',
    name: 'ゲスト',
    display_name: 'ゲスト',
    avatar_url: require('@/assets/image/gest-user.svg'),
    created_at: '',
    updated_at: ''
  }

  @Prop({ type: Object, required: true })
  replyComment!: ResponseReplyComment

  get getUser(): User {
    return authStore.getUser
  }

  dateFormatter(date: string): string {
    console.log(date)
    const splitFullDate = date.split('T')
    const splitDate = splitFullDate[0].split('-')
    const splitTime = splitFullDate[1].split('.')
    return `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日 ${splitTime[0]}`
  }
}
</script>
