<template>
  <div class="w-4/6 relative text-gray-400">
    <div class="z-50 absolute -right-20 top-0">
      <base-icon-button
        v-if="getUser.id === work.user.id"
        :to="`/works/${work.id}/edit`"
        :is-background="true"
        :is-shadow="true"
        class="p-4"
      />
    </div>
    <div
      class="
        w-full
        rounded-2xl
        border border-gray-100
        overflow-hidden
        shadow-md
      "
    >
      <works-carousel :assets="work.assets" />
      <div
        class="
          flex
          items-center
          w-full
          px-5
          py-4
          rounded-b-2xl
          border-t border-gray-200
        "
      >
        <div class="inline-flex mr-5">
          <p class="text-xl mr-2">
            {{ likes }}
          </p>
          <button v-if="!isLiked" @click="liked">
            <font-awesome-icon class="w-7" :icon="['far', 'heart']" />
          </button>
          <button v-else @click="unliked">
            <font-awesome-icon class="w-7" :icon="['fas', 'heart']" />
          </button>
        </div>
        <div>1000 view</div>
      </div>
    </div>

    <div
      class="
        w-full
        rounded-2xl
        border border-gray-100
        my-10
        bg-white
        shadow-md
        px-5
        py-5
        relative
      "
    >
      <div class="absolute m-0 top-5 right-5">
        {{
          work.updated_at
            .replace('T', ' ')
            .replace('-', '/')
            .replace('-', '/')
            .split('.')[0]
        }}
      </div>
      <div class="flex items-center text-black">
        <div class="mr-6 text-4xl text-">{{ work.title }}</div>
        <visibility-state-tag :visibility="work.visibility" />
      </div>
      <user-tag
        :user="work.user"
        class="my-3 w-max text-gray-600 -translate-x-1"
      />
      <!-- タグ -->
      <works-content icon="tags">
        <base-tag
          v-for="tag in work.tags"
          :key="tag.id"
          :text="tag.name"
          class="mr-4 text-gray-600"
        />
      </works-content>
      <!-- URL -->
      <works-content icon="link">
        <a
          v-for="url in work.urls"
          :key="url.id"
          class="mx-3 hover:text-blue-600 hover:underline"
          :href="url.url"
          target="_blank"
        >
          {{ url.url.split('/')[2] }}
        </a>
      </works-content>
      <!-- ダウンロード -->
      <works-content icon="download">
        <div v-for="asset in work.assets" :key="asset.id">
          <base-text-button
            v-if="asset.asset_type === ('zip' || 'model')"
            class="mx-3"
            :title="asset.asset_type"
            @click="download(asset.asset_type, asset.id)"
          />
        </div>
      </works-content>
      <!-- 説明 -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        class="w-full mt-10 py-5 px-7 bg-gray-200 rounded-xl text-black"
        v-html="work.description_html"
      />
    </div>
    <!-- コメント -->
    <div
      class="
        w-full
        rounded-2xl
        border border-gray-100
        bg-white
        shadow-md
        px-5
        py-3
      "
    >
      <div class="text-xl">コメント</div>
      <comments-field
        v-model="postCommentData"
        :post-error-flag="errorPostComment"
        class=""
        @click="postComment"
      />
      <comments-list
        :comments="getComments"
        class="mt-3 mb-10"
        @replyComment="replyComment($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import WorksCarousel from '@/components/works/WorksCarousel.vue'
import WorksTitle from '@/components/works/WorksTitle.vue'
import WorksViewInfo from '@/components/works/WorksViewInfo.vue'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import BaseTag from '@/components/commons/BaseTag.vue'
import CommentsField from '@/components/comments/CommentsField.vue'
import CommentsList from '@/components/comments/CommentsList.vue'
import BaseIconButton from '@/components/commons/BaseIconButton.vue'
import VisibilityStateTag from '@/components/commons/VisibilityStateTag.vue'
import UserTag from '@/components/commons/UserTag.vue'

import axios from 'axios'
import { Work, ResponseComment, PostComment } from '@/types'
import { saveAs } from 'file-saver'
import { authStore, commentStore } from '~/store'

type replyCommentType = {
  comment_id: string
  reply_comment_data: PostComment
}

@Component({
  components: {
    WorksCarousel,
    WorksTitle,
    WorksViewInfo,
    BaseTextButton,
    BaseTag,
    CommentsField,
    CommentsList,
    BaseIconButton,
    VisibilityStateTag,
    UserTag
  },
  async asyncData({ route }) {
    const resWork = await axios.get(
      `${process.env.API_URL}/works/${route.params.id}`
    )
    const resComments = await axios.get(
      `${process.env.API_URL}/works/${route.params.id}/comments`
    )
    commentStore.addComments(resComments.data)
    return { work: resWork.data }
  }
})
export default class Works extends Vue {
  work!: Work
  // comments!: ResponseComment[]

  postCommentData: PostComment = { content: '' }

  likes: number = 10
  isLiked: boolean = false

  errorPostComment: boolean = false
  errorReplyComment: boolean = false

  get getUser() {
    return authStore.getUser
  }

  get nowLogin() {
    return authStore.nowLogin
  }

  get getAccessToken() {
    return authStore.getAccessToken
  }

  get getComments() {
    return commentStore.getComments
  }

  mounted() {
    console.log(JSON.stringify(this.work, null, 2))
  }

  liked() {
    this.likes++
    this.isLiked = true
  }

  unliked() {
    this.likes--
    this.isLiked = false
  }

  postComment() {
    try {
      if (this.nowLogin) {
        axios
          .post(
            `${process.env.API_URL}/works/${this.$route.params.id}/comments`,
            this.postCommentData,
            {
              headers: {
                Authorization: `Bearer ${this.getAccessToken}`
              }
            }
          )
          .then((result) => {
            console.log(result)
            this.postCommentData.content = ''
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        axios
          .post(
            `${process.env.API_URL}/works/${this.$route.params.id}/comments`,
            this.postCommentData
          )
          .then((result) => {
            console.log(result)
            this.postCommentData.content = ''
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error)
      this.errorPostComment = true
      setTimeout(() => {
        this.errorPostComment = false
      }, 5000)
    }
  }

  replyComment(replyCommentData: replyCommentType) {
    try {
      if (this.nowLogin) {
        axios
          .post(
            `${process.env.API_URL}/works/${this.$route.params.id}/comments?reply_at=${replyCommentData.comment_id}`,
            replyCommentData.reply_comment_data,
            {
              headers: {
                Authorization: `Bearer ${this.getAccessToken}`
              }
            }
          )
          .then((result) => {
            console.log(result)
            replyCommentData.reply_comment_data.content = ''
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        axios
          .post(
            `${process.env.API_URL}/works/${this.$route.params.id}/comments?reply_at=${replyCommentData.comment_id}`,
            replyCommentData.reply_comment_data
          )
          .then((result) => {
            console.log(result)
            replyCommentData.reply_comment_data.content = ''
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error)
      this.errorReplyComment = true
      setTimeout(() => {
        this.errorReplyComment = false
      }, 5000)
    }
  }

  async download(type: string, id: string) {
    const url = `${process.env.ASSET_BASE_URL}/${type}/${id}/origin.zip`
    const data = await fetch(url)
    const blob = await data.blob()
    saveAs(blob, 'origin.zip')
  }
}
</script>
