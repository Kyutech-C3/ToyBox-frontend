<template>
  <div
    class="
      w-[var(--card-w)]
      h-[var(--card-h)]
      rounded-2xl
      shadow-md
      cursor-pointer
      hover:scale-[1.01]
      hover:shadow-lg
      transform
      transition
      relative
      overflow-hidden
      bg-white
    "
  >
    <visibility-state-tag
      v-if="getNowLogin"
      :visibility="blogData.visibility"
      class="absolute left-3 top-3 z-20"
    />
    <div class="z-50 absolute right-10 top-3">
      <base-icon-button
        v-if="getUser.id === blogData.user.id"
        :size="'small'"
        :font-awesome="{ type: 'fas', name: 'pen' }"
        @click="$router.push(`/blogs/${blogData.id}/edit`)"
      />
    </div>
    <div class="z-50 absolute right-2 top-3">
      <base-icon-button
        v-if="getUser.id === blogData.user.id"
        :size="'small'"
        :font-awesome="{ type: 'fas', name: 'trash-can' }"
        @click="deleteBlog"
      />
    </div>
    <a
      :href="getBaseBlogLink + '/' + blogData.id"
      class="h-[12rem] border-b block relative overflow-hidden"
    >
      <img
        class="
          h-auto
          w-auto
          m-auto
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2 -translate-y-1/2
          object-cover
          max-h-full max-w-full
        "
        :src="blogData.thumbnail.url"
        alt="work thumbnail"
        loading="lazy"
      />
    </a>
    <a :href="getBaseBlogLink + '/' + blogData.id" class="h-1/2 py-3 px-2.5 block">
      <div class="mx-auto w-min flex items-center flex-col mb-3">
        <div class="text-center text-xl w-max">
          {{ getTitle }}
        </div>
        <div
          class="w-11/12 mx-auto border"
          :class="[
            { 'border-green-300': blogData.visibility === 'public' },
            { 'border-orange-300': blogData.visibility === 'private' },
            { 'border-blue-300': blogData.visibility === 'draft' }
          ]"
        />
      </div>
      <div
        class="
          tag-slider
          flex
          mb-3
          mx-auto
          w-fit
          max-w-[90%]
          pb-0.5
          rounded-md
          overflow-x-scroll overflow-y-hidden
        "
      >
        <base-tag
          v-for="tag in blogData.tags"
          :key="tag.id"
          :text="tag.name"
          size="small"
        />
      </div>
      <div class="flex justify-end text-xs">
        <span class="mr-3">
          {{ $dayjs(blogData.created_at).format('MM月DD日 HH:mm:ss') }}
        </span>
      </div>
      <user-tag :user="blogData.user" class="absolute bottom-2" />
      <!-- バックエンドが複数ユーザーに対応するまでコメントアウト -->
      <!-- <div
          v-for="(user, index) in users"
          :key="index"
          class="flex items-center mx-1 cursor-pointer"
        >
          <img
            class="w-8 border border-gray-500 rounded-full"
            :src="user.image"
            alt=""
          >
          <div v-if="users.length === 1" class="ml-1.5">
            {{ user.name }}
          </div>
        </div> -->
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import BaseTag from '@/components/commons/BaseTag.vue'
import UserTag from '@/components/commons/UserTag.vue'
import BaseIconButton from '@/components/commons/BaseIconButton.vue'
import VisibilityStateTag from '@/components/commons/VisibilityStateTag.vue'

import { Blog } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    BaseTag,
    UserTag,
    BaseIconButton,
    VisibilityStateTag
  }
})
export default class BlogCard extends Vue {
  @Prop({ type: Object, required: true })
  blogData!: Blog

  get getUser() {
    return authStore.getUser
  }

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getTitle() {
    const limitTitle = 10
    const title =
      this.blogData.title.length > limitTitle
        ? this.blogData.title.substr(0, limitTitle) + '...'
        : this.blogData.title
    return title
  }

  get getBaseBlogLink() {
    return `${process.env.C3_OFFICIAL_URL}/blog`
  }

  deleteBlog() {
    const msg = `「${this.blogData.title}」\nこの記事を削除してもよろしいですか？`
    if (confirm(msg)) {
      // TODO: ここでブログ削除APIを叩く
      console.log(`delete ${this.blogData.id}`)
    }
  }

  dateFormatter(date: string): string {
    // const nowDate: Date = new Date()
    // const postDate: Date = new Date(date)
    // const diffTime: number = (Number(nowDate) - Number(postDate)) / 1000
    // if (diffTime < 60) {
    //   return `${Math.trunc(diffTime)}秒前`
    // } else if (diffTime < 3600) {
    //   return `${Math.trunc(diffTime / 60)}分前`
    // } else if (diffTime < 86400) {
    //   return `${Math.trunc(diffTime / 60 / 60)}時間前`
    // } else if (diffTime < 604800) {
    //   return `${Math.trunc(diffTime / 60 / 60 / 24)}日前`
    // } else if (diffTime < 31536000) {
    //   return `${postDate.getMonth() + 1}月${postDate.getDate()}日`
    // } else {
    //   return `${postDate.getFullYear()}年${
    //     postDate.getMonth() + 1
    //   }月${postDate.getDate()}日`
    // }
    const splitFullDate = date.split('T')
    const splitDate = splitFullDate[0].split('-')
    return `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日`
  }
}
</script>

<style scoped>
.tag-slider::-webkit-scrollbar {
  height: 3px;
}

.tag-slider::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  border-radius: 3px;
}

.tag-slider::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
</style>
