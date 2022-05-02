<template>
  <nuxt-link
    :to="'works/' + WorkData.id"
    class="
      w-80
      h-80
      m-2
      border border-gray-300
      rounded-3xl
      shadow-md
      cursor-pointer
      hover:scale-105
      hover:shadow-lg
      transform
      transition
    "
  >
    <div class="h-1/2 border-b">
      <img
        class="h-full m-auto"
        :src="
          WorkData.thumbnail.length === 1
            ? 'https://kodomobeya.compositecomputer.club/static/image/' +
              WorkData.thumbnail[0].id +
              '/origin.jpg'
            : 'https://avatars.githubusercontent.com/u/61457046'
        "
        alt="Thumbnail is not found"
      />
    </div>
    <div class="h-1/2 py-3 px-2.5">
      <div
        class="mx-auto w-min flex items-center"
        :class="WorkData.visibility === 'private' ? 'pl-3.5' : ''"
      >
        <div>
          <div class="text-center text-xl w-max">
            {{ WorkData.title }}
          </div>
          <div class="w-11/12 mx-auto my-0.5 border border-blue-500" />
        </div>
        <font-awesome-icon
          v-if="WorkData.visibility === 'private'"
          :icon="['fas', 'lock']"
          class="w-2 ml-1.5 text-gray-500"
        />
      </div>
      <div class="flex justify-center mt-2">
        <base-tag
          v-for="(tag, index) in WorkData.tags"
          :key="index"
          :text="tag.name"
        />
        <div v-if="WorkData.tags.length === 0" class="h-6 py-0.5" />
      </div>
      <div class="text-right mt-2 mr-2 text-sm">
        {{ dateFormatter(WorkData.updated_at) }}
      </div>
      <div class="my-0 flex">
        <nuxt-link
          :to="'user/' + WorkData.user.id"
          class="
            flex
            items-center
            mx-1
            cursor-pointer
            group
            hover:bg-gray-100
            rounded-full
            p-1
          "
        >
          <img
            class="
              w-8
              border border-gray-400
              group-hover:border-blue-500
              rounded-full
            "
            :src="WorkData.user.avatar_url"
            alt=""
            onerror="this.src='/alt.svg'; this.removeAttribute('onerror'); this.removeAttribute('onload');"
            onload="this.removeAttribute('onerror'); this.removeAttribute('onload');"
          />
          <div class="ml-1.5 mr-2">
            {{ WorkData.user.name }}
          </div>
        </nuxt-link>
      </div>
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
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseTag from '@/components/commons/BaseTag.vue'
import { Work } from '@/types'

@Component({
  components: {
    BaseTag
  }
})
export default class WorksCard extends Vue {
  @Prop({ type: Object, required: true })
  WorkData!: Work

  dateFormatter(date: string): string {
    const nowDate: Date = new Date()
    const postDate: Date = new Date(date)
    const diffTime: number = (Number(nowDate) - Number(postDate)) / 1000
    if (diffTime < 60) {
      return `${Math.trunc(diffTime)}秒前`
    } else if (diffTime < 3600) {
      return `${Math.trunc(diffTime / 60)}分前`
    } else if (diffTime < 86400) {
      return `${Math.trunc(diffTime / 60 / 60)}時間前`
    } else if (diffTime < 604800) {
      return `${Math.trunc(diffTime / 60 / 60 / 24)}日前`
    } else if (diffTime < 31536000) {
      return `${postDate.getMonth() + 1}月${postDate.getDate()}日`
    } else {
      return `${postDate.getFullYear()}年${
        postDate.getMonth() + 1
      }月${postDate.getDate()}日`
    }
  }
}
</script>
