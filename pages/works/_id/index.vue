<template>
  <div
    class="w-[98vw] !max-w-[800px] relative text-gray-400"
    :class="{ 'overflow-y-hidden h-0': isFullscreen }"
  >
    <div
      v-if="activeNav"
      class="fixed w-[100vw] h-[100vh] z-30 left-0 top-0"
      @click="changeNavStatus"
    />
    <div
      v-if="showFavoriteUser"
      class="fixed w-[100vw] h-[100vh] z-30 left-0 top-0"
      @click="changeFavoriteUserStatus"
    />
    <!-- サイドメニュー -->
    <div
      v-if="getUser.id === work.user.id"
      class="z-30 absolute -right-20 top-0"
    >
      <!-- 編集 -->
      <base-icon-button
        :is-background="true"
        :is-shadow="true"
        :font-awesome="{ type: 'fas', name: 'pen' }"
        title="編集"
        class="p-4 mb-3"
        @click="$router.push(`/works/${work.id}/edit`)"
      />
      <!-- その他 -->
      <base-icon-button
        :to="`/works/${work.id}/edit`"
        :is-background="true"
        :is-shadow="true"
        :font-awesome="{ type: 'fas', name: 'ellipsis-h' }"
        class="p-4"
        @click="changeNavStatus"
      />
      <!-- その他のメニュー一覧 -->
      <div
        v-if="activeNav"
        class="
          shadow-xl
          rounded-xl
          absolute
          top-[150px]
          right-0
          w-44
          bg-base-button-color
          z-50
          overflow-hidden
          text-gray-500
          select-none
          menu
        "
      >
        <div
          class="
            flex
            cursor-pointer
            z-50
            py-5
            px-5
            hover:bg-hover-base-button-color
          "
          @click="deleteCheckStatus = !deleteCheckStatus"
        >
          <font-awesome-icon
            class="w-3 mr-3"
            :icon="['fas', deleteCheckStatus ? 'chevron-up' : 'chevron-down']"
          />
          <span>削除</span>
        </div>
        <div v-if="deleteCheckStatus" class="px-3 py-3 bg-white">
          <span class="text-sm">
            一度削除すると
            <span class="text-red-500 m-0">復元できません！</span><br />
            本当に削除しますか？
          </span>
          <base-text-button
            class="mx-auto block mt-3 mb-2"
            title="やめる"
            color="gray"
            @click="changeNavStatus"
          />
          <base-text-button
            class="mx-auto block"
            title="はよ消せ！"
            @click="deleteWork"
          />
        </div>
        <div
          class="
            flex
            cursor-pointer
            z-50
            py-5
            px-5
            hover:bg-hover-base-button-color
            border-t-[0.5px] border-gray-400
          "
          @click="visibilityChangeStatus = !visibilityChangeStatus"
        >
          <font-awesome-icon
            class="w-3 mr-3"
            :icon="[
              'fas',
              visibilityChangeStatus ? 'chevron-up' : 'chevron-down'
            ]"
          />
          <span>公開範囲変更</span>
        </div>
        <div v-if="visibilityChangeStatus" class="">
          <ul
            class="z-10 relative w-full"
            :class="{ ' pointer-events-none': changeVisibilityProcessing }"
          >
            <li
              v-for="(range, i) in submitList"
              :key="i"
              class="
                cursor-pointer
                flex
                items-center
                py-2
                px-10
                bg-white
                relative
                hover:bg-gray-300
              "
              :class="{
                ' pointer-events-none': range.value === workVisibility
              }"
              @click="changeVisibility(range.value)"
            >
              <font-awesome-icon
                v-if="
                  !(
                    (errorChangeVisibility || changeVisibilityProcessing) &&
                    range.value === changeVisibilityType
                  ) && range.value === workVisibility
                "
                :icon="['fas', 'check']"
                class="w-3 absolute left-4"
              />
              <div
                v-if="
                  changeVisibilityProcessing &&
                  range.value === changeVisibilityType
                "
                class="loader absolute left-4 top-1"
              >
                Loading...
              </div>
              <font-awesome-icon
                v-if="
                  range.value === changeVisibilityType && errorChangeVisibility
                "
                :icon="['fas', 'times']"
                class="w-3 text-red-500 absolute left-3.5"
              />
              <font-awesome-icon :icon="range.icon" class="w-3 mr-3" />
              <span class="text-sm">{{ range.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 作品トップ -->
    <div class="w-full rounded-2xl overflow-hidden shadow-md bg-white">
      <works-carousel :assets="work.assets" v-model="isFullscreen" />
      <div
        v-if="work.urls.length > 0"
        class="flex items-center px-5 py-3 overflow-x-scroll overflow-y-hidden"
      >
        <div>
          <font-awesome-icon
            class="w-6 h-6 text-gray-500 mr-3"
            :icon="['fas', 'link']"
          />
        </div>

        <a
          v-for="url in work.urls"
          :key="url.id"
          class="mr-3 hover:text-blue-600 hover:underline"
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
          relative
        "
      >
        <div class="flex items-center relative select-none">
          <div
            class="inline-flex mr-3 items-center"
            :class="{ 'pointer-events-none': !nowLogin }"
          >
            <p class="text-xl pr-2 cursor-pointer" @click="getFavoriteUser">
              {{ likes }}
            </p>
            <span
              class="
                material-symbols-outlined
                cursor-pointer
                transition-all
                text-3xl
              "
              @click="clickFavorite"
              :class="[
                {
                  'material-symbols-liked text-red-500': isLiked
                },
                {
                  'material-symbols-unliked': !isLiked
                },
                { 'pointer-events-none': !clickFavoriteStatus }
              ]"
            >
              favorite
            </span>
          </div>
          <!-- いいねユーザー一覧 -->
          <div
            v-if="showFavoriteUser"
            class="
              favorite-user
              absolute
              w-max
              max-h-[198px]
              bottom-10
              -left-2
              bg-white
              rounded-lg
              shadow-md shadow-gray-300
              z-40
              overflow-x-hidden overflow-y-auto
              isolate
            "
          >
            <user-tag
              v-for="favoriteUser in favoriteUsers"
              :key="favoriteUser.id"
              class="w-full !px-5 !py-1.5"
              :rounded="false"
              :user="favoriteUser"
              size="small"
            />
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
              @click="openConfirmModal(asset)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="work-info">
      <visibility-state-tag
        :visibility="work.visibility"
        class="text-black w-fit"
      />
      <div class="work-info__title">{{ work.title }}</div>
      <div class="text-sm">
        <div>
          投稿日時：
          {{ $dayjs(work.created_at).format('MM月DD日 HH:mm:ss') }}
        </div>
        <div>
          更新日時：
          {{ $dayjs(work.updated_at).format('MM月DD日 HH:mm:ss') }}
        </div>
      </div>
      <user-tag
        :user="work.user"
        font-weight="medium"
        class="my-3 w-max text-gray-600 -translate-x-1"
      />
      <!-- タグ -->
      <works-content icon="tags">
        <div
          class="
            tag-slider
            pb-0.5
            overflow-x-scroll overflow-y-hidden
            flex
            w-full
          "
        >
          <base-tag
            v-for="tag in work.tags"
            :key="tag.id"
            :text="tag.name"
            class="mr-1 text-gray-600"
            @click="toSearchWorkListByTag(tag)"
          />
        </div>
      </works-content>
      <!-- 説明 -->
      <markdown-view :markdown-text="work.description" />
    </div>
    <!-- コメント -->
    <div class="w-full rounded-2xl bg-white shadow-md px-5 py-3">
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
import ConfirmModal from '@/components/commons/ConfirmModal.vue'
import MarkdownView from '@/components/commons/MarkdownView.vue'
import WorkShare from '@/components/works/WorkShare.vue'

import { AxiosClient } from '@/utils/axios'
import {
  Work,
  PostComment,
  Asset,
  PostWork,
  BaseUrlInfo,
  User,
  BaseFavorite,
  GetTag
} from '@/types'
import { ReplyCommentType } from '@/types/common'

import {
  authStore,
  commentStore,
  confirmModalStore,
  modalStore,
  downloadAssetStore,
  workShareStore,
  workFilterStore,
  tagSelectorStore
} from '~/store'

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
    WorkShare
  },
  async asyncData({ route }) {
    const resWork = await AxiosClient.client(
      'GET',
      `${process.env.API_URL}/works/${route.params.id}`,
      true
    )
    const resComments = await AxiosClient.client(
      'GET',
      `${process.env.API_URL}/works/${route.params.id}/comments`,
      true
    )
    commentStore.setComments(resComments.data)
    return { work: resWork.data }
  }
})
export default class Works extends Vue {
  work!: Work

  postCommentData: PostComment = { content: '' }

  likes: number = 0
  isLiked: boolean = false
  clickFavoriteStatus: boolean = true
  activeNav: boolean = false
  deleteCheckStatus: boolean = false
  visibilityChangeStatus: boolean = false
  submitList = [
    {
      icon: ['fas', 'globe'],
      name: '公開',
      value: 'public'
    },
    {
      icon: ['fas', 'lock'],
      name: '限定公開',
      value: 'private'
    },
    {
      icon: ['fas', 'save'],
      name: '下書き保存',
      value: 'draft'
    }
  ]
  option = 0
  deleteStatus: boolean = false
  workVisibility: string = ''
  changeVisibilityType: string = ''
  changeVisibilityProcessing: boolean = false
  errorChangeVisibility: boolean = false
  favoriteUsers: User[] = []
  showFavoriteUser: boolean = false

  isFullscreen: boolean = false

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

  head() {
    const title: string = `ToyBox 作品 - ${this.work.title}`
    const url: string = `${process.env.BASE_URL}works/${this.work.id}`
    const description: string = this.work.description
      ? this.work.description
      : ''
    return {
      title: title,
      htmlAttrs: {
        lang: 'ja',
        prefix:
          'og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#'
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.work.thumbnail.url
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: url
        }
      ]
    }
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(true)
    this.workVisibility = this.work.visibility
    this.likes = this.work.favorite_count ? this.work.favorite_count : 0
    this.isLiked = this.work.is_favorite ? this.work.is_favorite : false
  }

  destroyed() {
    modalStore.close()
  }

  clickFavorite() {
    if (this.nowLogin) {
      if (!this.isLiked) {
        AxiosClient.client(
          'POST',
          `${process.env.API_URL}/works/${this.work.id}/favorite`,
          true
        )
          .then((result) => {
            this.liked()
            this.clickFavoriteStatus = false
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        AxiosClient.client(
          'DELETE',
          `${process.env.API_URL}/works/${this.work.id}/favorite`,
          true
        )
          .then((result) => {
            this.unliked()
            this.clickFavoriteStatus = false
          })
          .catch((error) => {
            console.error(error)
          })
      }
      setTimeout(() => {
        this.clickFavoriteStatus = true
      }, 1000)
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
    workShareStore.setWork(this.work)
    modalStore.open(WorkShare)
  }

  openConfirmModal(asset: Asset) {
    downloadAssetStore.setAsset(asset)
    confirmModalStore.init()
    confirmModalStore.setApproveTitle('ダウンロード')
    confirmModalStore.setRejectTitle('キャンセル')
    confirmModalStore.setInformation(
      `${asset.asset_type} のダウンロードが行われます。ダウンロードしますか？`
    )
    confirmModalStore.setType('download')
    modalStore.open(ConfirmModal)
  }

  postComment() {
    try {
      if (this.nowLogin) {
        AxiosClient.client(
          'POST',
          `${process.env.API_URL}/works/${this.$route.params.id}/comments`,
          true,
          this.postCommentData
        )
          .then((result) => {
            commentStore.addComments(result.data)
            this.postCommentData.content = ''
            this.$gtag('event', 'success_post_comment', {
              user_name: this.getUser.name,
              user_display_name: this.getUser.display_name,
              content: this.postCommentData.content
            })
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        AxiosClient.client(
          'POST',
          `${process.env.API_URL}/works/${this.$route.params.id}/comments`,
          false,
          this.postCommentData
        )
          .then((result) => {
            commentStore.addComments(result.data)
            this.postCommentData.content = ''
            this.$gtag('event', 'success_post_comment', {
              user_name: 'ゲスト',
              user_display_name: 'ゲスト',
              content: this.postCommentData.content
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    } catch (error) {
      console.error(error)
      this.errorPostComment = true
      setTimeout(() => {
        this.errorPostComment = false
      }, 5000)
    }
  }

  replyComment(replyCommentData: ReplyCommentType) {
    try {
      if (this.nowLogin) {
        AxiosClient.client(
          'POST',
          `${process.env.API_URL}/works/${this.$route.params.id}/comments?reply_at=${replyCommentData.comment_id}`,
          true,
          replyCommentData.reply_comment_data
        )
          .then((result) => {
            commentStore.setTempReplyCommentInfo({
              tempReplyComment: result.data,
              parentCommentId: replyCommentData.comment_id
            })
            replyCommentData.reply_comment_data.content = ''
            this.$gtag('event', 'success_post_reply_comment', {
              user_name: this.getUser.name,
              user_display_name: this.getUser.display_name,
              content: this.postCommentData.content
            })
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        AxiosClient.client(
          'POST',
          `${process.env.API_URL}/works/${this.$route.params.id}/comments?reply_at=${replyCommentData.comment_id}`,
          false,
          replyCommentData.reply_comment_data
        )
          .then((result) => {
            commentStore.setTempReplyCommentInfo({
              tempReplyComment: result.data,
              parentCommentId: replyCommentData.comment_id
            })
            replyCommentData.reply_comment_data.content = ''
            this.$gtag('event', 'success_post_reply_comment', {
              user_name: 'ゲスト',
              user_display_name: 'ゲスト',
              content: this.postCommentData.content
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    } catch (error) {
      console.error(error)
      this.errorReplyComment = true
      setTimeout(() => {
        this.errorReplyComment = false
      }, 5000)
    }
  }

  changeNavStatus() {
    if (this.activeNav) {
      this.activeNav = false
      this.deleteCheckStatus = false
      this.visibilityChangeStatus = false
    } else {
      this.activeNav = true
    }
  }

  deleteWork() {
    try {
      if (this.nowLogin) {
        AxiosClient.client(
          'DELETE',
          `${process.env.API_URL}/works/${this.$route.params.id}`,
          true
        )
          .then((result) => {
            this.deleteStatus = result.data.status === 'OK'
            this.$router.push('/')
          })
          .catch((error) => {
            console.error(error)
            alert('削除できませんでした>_<管理者に報告してください！')
            this.deleteStatus = false
          })
      }
    } catch (error) {
      console.error(error)
      alert('削除できませんでした>_<管理者に報告してください！')
      this.deleteStatus = false
    }
  }

  changeVisibility(visibility: string) {
    if (this.nowLogin) {
      const preWorkVisibility = this.workVisibility
      this.errorChangeVisibility = false
      this.changeVisibilityType = visibility
      this.changeVisibilityProcessing = true
      this.workVisibility = ''
      const assets_id: string[] = []
      this.work.assets.map((asset) => {
        assets_id.push(asset.id)
      })
      let urls: BaseUrlInfo[] = []
      this.work.urls.map((url) => {
        urls.push({ url: url.url, url_type: url.url_type })
      })
      let tags: string[] = []
      this.work.tags.map((tag) => {
        tags.push(tag.id)
      })
      const postData: PostWork = {
        title: this.work.title,
        description: this.work.description,
        visibility: visibility,
        thumbnail_asset_id: this.work.thumbnail.id,
        assets_id: assets_id,
        urls: urls,
        tags_id: tags
      }
      try {
        AxiosClient.client(
          'PUT',
          `/works/${this.$route.params.id}`,
          true,
          postData
        )
          .then((result) => {
            setTimeout(() => {
              this.work = result.data
              this.errorChangeVisibility = false
              this.changeVisibilityProcessing = false
              this.changeVisibilityType = ''
              this.workVisibility = result.data.visibility
            }, 3000)
          })
          .catch((error) => {
            console.error(error)
            setTimeout(() => {
              this.workVisibility = preWorkVisibility
              this.changeVisibilityProcessing = false
              this.errorChangeVisibility = true
            }, 3000)
          })
      } catch (error) {
        console.error(error)
        setTimeout(() => {
          this.workVisibility = preWorkVisibility
          this.changeVisibilityProcessing = false
          this.errorChangeVisibility = true
        }, 3000)
      }
      if (this.errorChangeVisibility) {
        setTimeout(() => {
          this.errorChangeVisibility = false
          this.changeVisibilityType = ''
        }, 3000)
      }
    }
  }

  /*
    機能：作品に対していいねしたユーザー一覧の取得
  */
  getFavoriteUser() {
    if (this.favoriteUsers.length === 0) {
      try {
        AxiosClient.client('GET', `/works/${this.work.id}/favorite`, true)
          .then((result) => {
            result.data.favorites.map((item: BaseFavorite) => {
              this.favoriteUsers.push(item.user)
            })
            this.showFavoriteUser = true
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (error) {
        console.error(error)
      }
    } else {
      this.showFavoriteUser = true
    }
  }

  /*
    機能：いいねしたユーザー一覧を非表示にする
  */
  changeFavoriteUserStatus() {
    this.showFavoriteUser = false
  }

  toSearchWorkListByTag(tag: GetTag) {
    tagSelectorStore.setSelectedTags([tag])
    workFilterStore.setOnPageName('top')
    workFilterStore.setUseConditionsWhenAsyncData(true)
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.work-info {
  @apply w-full;
  @apply rounded-2xl;
  @apply my-10;
  @apply bg-white;
  @apply shadow-md;
  @apply px-5;
  @apply pb-5;
  @apply pt-4;
  @apply relative;

  &__title {
    @apply text-4xl;
    @apply text-black;
    @apply my-3;
  }
}

@media screen and (max-width: 600px) {
  .work-info {
    @apply px-3;
    @apply py-3;

    &__title {
      @apply text-2xl;
    }
  }
}

.material-symbols-liked {
  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
}

.material-symbols-unliked {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.tag-slider::-webkit-scrollbar {
  height: 3px;
}
.favorite-user::-webkit-scrollbar {
  width: 6px;
}

.tag-slider::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  border-radius: 3px;
}
.favorite-user::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  border-radius: 3px;
}

.tag-slider::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
.favorite-user::-webkit-scrollbar-track {
  border-radius: 3px;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ff985d;
  font-size: 5px;
  margin: auto;
  /* position: relative; */
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
}
.loader:before {
  left: -2em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 2em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
