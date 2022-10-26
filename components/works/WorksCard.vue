<template>
  <nuxt-link
    :to="'/works/' + workData.id"
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
    <div class="z-50 absolute right-3 top-3">
      <base-icon-button
        v-if="getUser.id === workData.user.id"
        :to="`/works/${workData.id}/edit`"
        :size="'small'"
        :font-awesome="{ type: 'fas', name: 'pen' }"
      />
    </div>
    <div class="h-[12rem] border-b relative">
      <img
        class="h-full m-auto"
        :src="workData.thumbnail.url"
        alt="Thumbnail is not found"
      />
      <visibility-state-tag
        v-if="getNowLogin"
        :visibility="workData.visibility"
        class="absolute left-3 top-3"
      />
    </div>
    <div class="h-1/2 py-3 px-2.5">
      <div class="mx-auto w-min flex items-center flex-col mb-3">
        <div class="text-center text-xl w-max">
          {{ workData.title }}
        </div>
        <div
          class="w-11/12 mx-auto border"
          :class="[
            { 'border-green-300': workData.visibility === 'public' },
            { 'border-orange-300': workData.visibility === 'private' },
            { 'border-blue-300': workData.visibility === 'draft' }
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
          v-for="tag in workData.tags"
          :key="tag.id"
          :text="tag.name"
          size="small"
        />
      </div>
      <div class="flex justify-end text-xs">
        <span class="mr-3">
          {{ $dayjs(workData.created_at).format('MM月DD日 hh:mm:ss') }}
        </span>
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
import VisibilityStateTag from '@/components/commons/VisibilityStateTag.vue'

import { Work } from '@/types'
import { authStore } from '~/store'

@Component({
  components: {
    BaseTag,
    UserTag,
    BaseIconButton,
    VisibilityStateTag
  }
})
export default class WorksCard extends Vue {
  @Prop({ type: Object, required: true })
  workData!: Work

  get getUser() {
    return authStore.getUser
  }

  get getNowLogin() {
    return authStore.nowLogin
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
