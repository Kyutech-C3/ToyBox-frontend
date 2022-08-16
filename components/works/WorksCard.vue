<template>
  <nuxt-link
    :to="'works/' + workData.id"
    class="
      w-[var(--card-w)]
      h-96
      m-2
      border border-gray-300
      rounded-3xl
      shadow-md
      cursor-pointer
      hover:scale-105
      hover:shadow-lg
      transform
      transition
      relative
    "
  >
    <div class="z-50 absolute right-3 top-3">
      <base-icon-button
        v-if="getUser.id === workData.user.id"
        :to="`/works/${workData.id}/edit`"
        :size="'small'"
      />
    </div>
    <div class="h-1/2 border-b">
      <img
        class="h-full m-auto"
        :src="
          workData.thumbnail.length === 1
            ? `${assetBaseURL}/image/${workData.thumbnail[0].id}/origin.${workData.thumbnail[0].extention}`
            : 'https://avatars.githubusercontent.com/u/61457046'
        "
        alt="Thumbnail is not found"
      />
    </div>
    <div class="h-1/2 py-3 px-2.5">
      <div
        class="mx-auto w-min flex items-center"
        :class="workData.visibility === 'private' ? 'pl-3.5' : ''"
      >
        <div>
          <div class="text-center text-xl w-max">
            {{ workData.title }}
          </div>
          <div class="w-11/12 mx-auto my-0.5 border border-blue-500" />
        </div>
        <font-awesome-icon
          v-if="workData.visibility === 'private'"
          :icon="['fas', 'lock']"
          class="w-2 ml-1.5 text-gray-500"
        />
      </div>
      <div class="flex justify-center mt-2 h-8">
        <base-tag v-for="tag in workData.tags" :key="tag.id" :text="tag.name" />
      </div>
      <user-tag :user="workData.user" class="absolute bottom-2" />
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
import UserTag from '@/components/commons/UserTag.vue'
import BaseIconButton from '@/components/commons/BaseIconButton.vue'
import { Work } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    BaseTag,
    UserTag,
    BaseIconButton
  }
})
export default class WorksCard extends Vue {
  assetBaseURL?: string = process.env.ASSET_BASE_URL

  @Prop({ type: Object, required: true })
  workData!: Work

  get getUser() {
    return authStore.getUser
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
