<template>
  <div class="flex flex-col">
    <user-tag
      :user="getNowLogin ? getUser : gestUser"
      :no-link="true"
      class="p-0 w-max text-gray-600 mt-4 mb-2"
    />
    <textarea
      v-model="postCommentData.content"
      class="
        h-20
        mb-1
        border-b border-gray-400
        focus:outline-0
        resize-none
        ml-10
        text-black
      "
      placeholder="コメント"
      maxlength="500"
      @focus="focusCommentForm = true"
      v-on:keydown.ctrl.enter="click"
      v-on:keydown.meta.enter="click"
    />
    <div
      v-if="focusCommentForm"
      class="flex items-center justify-end w-full mt-1"
    >
      <span v-if="postErrorFlag" class="w-full pl-10 text-red-600">
        エラーが発生し、投稿できませんでした。<br />詳細はコンソールログを確認してください。
      </span>
      <span class="text-gray-400 text-sm mr-3 w-20 text-right">
        {{ postCommentData.content.length }} / 500
      </span>
      <span class="text-ms text-gray-500 cursor-pointer mr-3" @click="unfocus">
        キャンセル
      </span>
      <base-text-button
        title="送信"
        class="w-20"
        :class="{
          'pointer-events-none': postCommentData.content.length === 0
        }"
        :color="postCommentData.content.length === 0 ? 'gray' : 'yellow'"
        @click="click"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop, Emit } from 'nuxt-property-decorator'

import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import UserTag from '@/components/commons/UserTag.vue'

import { User, PostComment } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    BaseTextButton,
    UserTag
  }
})
export default class CommentsField extends Vue {
  gestUser: User = {
    id: '0',
    name: 'ゲスト',
    display_name: 'ゲスト',
    avatar_url: require('@/assets/image/gest-user.svg'),
    created_at: '',
    updated_at: ''
  }

  focusCommentForm: boolean = false

  @Prop({ type: Boolean, required: true })
  postErrorFlag!: boolean

  @VModel({ type: Object, required: true })
  postCommentData!: PostComment

  get getUser(): User {
    return authStore.getUser
  }

  get getNowLogin(): Boolean {
    return authStore.nowLogin
  }

  @Emit()
  click() {}

  unfocus() {
    this.focusCommentForm = false
    this.postCommentData = { content: '' }
  }
}
</script>
