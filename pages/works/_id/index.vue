<template>
  <div class="w-4/6 relative text-gray-400">
    <div class="z-30 absolute -right-20 top-0">
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
        v-if="work.urls.length > 0"
        class="flex items-center w-full px-5 py-3"
      >
        <font-awesome-icon
          class="w-6 text-gray-500 mr-5"
          :icon="['fas', 'link']"
        />
        <a
          v-for="url in work.urls"
          :key="url.id"
          class="mx-3 hover:text-blue-600 hover:underline"
          :href="url.url"
          target="_blank"
        >
          {{ url.url.split('/')[2] }}
        </a>
      </div>
      <div
        class="
          flex
          items-center
          justify-between
          w-full
          px-5
          py-4
          rounded-b-2xl
          border-t border-gray-200
        "
      >
        <div class="flex items-center">
          <div class="inline-flex mr-3 items-center">
            <p class="text-xl mr-1.5 w-5">
              {{ likes }}
            </p>
            <span
              class="
                material-symbols-outlined
                cursor-pointer
                transition-all
                text-3xl
                select-none
              "
              @click="clickFavorite"
              :class="[
                {
                  'material-symbols-liked text-red-500': isLiked
                },
                {
                  'material-symbols-unliked': !isLiked
                }
              ]"
            >
              favorite
            </span>
          </div>
          <!-- バックの実装までコメ -->
          <!-- <div class="mr-3">1000 view</div> -->
          <span
            class="material-symbols-outlined cursor-pointer text-xl select-none"
            @click="openShareModal"
          >
            share
          </span>
        </div>
        <div class="flex items-center">
          <div v-for="asset in work.assets" :key="asset.id">
            <base-text-button
              v-if="asset.asset_type === ('zip' || 'model')"
              class="mx-3"
              :title="`${asset.asset_type} download`"
              @click="openConfirmation(asset)"
            />
          </div>
        </div>
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
      <!-- 説明 -->
      <markdown-view :markdown-text="work.description" />
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
import Confirmation from '@/components/commons/Confirmation.vue'
import MarkdownView from '@/components/commons/MarkdownView.vue'
import Share from '@/components/works/Share.vue'

import axios from 'axios'
import { Work, PostComment, Asset } from '@/types'
import {
  authStore,
  commentStore,
  confirmationStore,
  modalStore,
  downloadAssetStore,
  shareStore
} from '~/store'

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
    UserTag,
    MarkdownView,
    Share
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

  clickFavorite() {
    if (!this.isLiked) {
      this.liked()
    } else {
      this.unliked()
    }
  }

  liked() {
    this.likes++
    this.isLiked = true
  }

  unliked() {
    this.likes--
    this.isLiked = false
  }

  openShareModal() {
    shareStore.setWork(this.work)
    modalStore.open(Share)
  }

  async openConfirmation(asset: Asset) {
    downloadAssetStore.setAsset(asset)
    confirmationStore.init()
    confirmationStore.setApproveTitle('ダウンロード')
    confirmationStore.setRejectTitle('キャンセル')
    confirmationStore.setInformation(
      `${asset.asset_type} のダウンロードが行われます。ダウンロードしますか？`
    )
    confirmationStore.setType('download')
    modalStore.open(Confirmation)
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
}
</script>

<style scoped>
.material-symbols-liked {
  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
}

.material-symbols-unliked {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>
