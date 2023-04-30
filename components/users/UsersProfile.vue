<template>
  <div
    v-if="user !== undefined"
    class="
      max-w-full
      w-[95vw]
      flex flex-col
      content-center
      justify-center
      items-center
      rounded-3xl
      mx-auto
      mb-12
      pb-10
      bg-white
      relative
      overflow-hidden
      shadow-lg
    "
  >
    <base-text-button
      v-if="enabledEditButtonStatus()"
      title="プロフィール編集"
      class="absolute top-6 right-7 z-10"
      @click="showEditProfileModal = true"
    />
    <users-profile-form
      v-show="showEditProfileModal && enabledEditButtonStatus()"
      v-model="user"
      @close-edit-profile-modal="showEditProfileModal = false"
    />
    <div class="bg-gray-300 w-full h-64 z-0 relative overflow-hidden mb-10">
      <img
        src="@/assets/images/bg-gray.png"
        alt="user banner image"
        class="
          absolute
          w-full
          top-1/2
          left-1/2
          -translate-x-1/2 -translate-y1/2
        "
      />
    </div>
    <div class="z-10 absolute left-1/2 -translate-x-1/2 top-36">
      <user-rounded-icon :image-src="user.avatar_url" :size="'large'" />
    </div>
    <div class="text-3xl m-3 font-bold">
      {{ user.display_name }}
    </div>
    <div class="text-md m-4" :class="{ 'text-gray-400': !user.profile }">
      {{ user.profile ? user.profile : 'プロフィールがありません' }}
    </div>
    <div
      v-if="user.github_id || user.twitter_id"
      class="flex justify-center w-full my-5"
    >
      <a
        v-if="user.github_id !== ''"
        :href="'https://github.com/' + user.github_id"
        target="_blank"
        title="GitHub"
        class="mx-5"
      >
        <font-awesome-icon
          class="w-10 text-gray-500 hover:text-gray-700"
          :icon="['fab', 'github']"
        />
      </a>
      <a
        v-if="user.twitter_id !== ''"
        :href="'https://twitter.com/' + user.twitter_id"
        target="_blank"
        title="Twitter"
        class="mx-5"
      >
        <font-awesome-icon
          class="w-10 text-gray-500 hover:text-gray-700"
          :icon="['fab', 'twitter']"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import UsersProfileForm from '@/components/users/UsersProfileForm.vue'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'

import { User } from '~/types'
import { authStore } from '@/store'

@Component({
  components: {
    BaseTextButton,
    UsersProfileForm,
    UserRoundedIcon
  }
})
export default class UsersProfile extends Vue {
  @Prop({ type: Object, required: true })
  user!: User

  showEditProfileModal: boolean = false

  get getUser() {
    return authStore.getUser
  }

  enabledEditButtonStatus() {
    return this.getUser.id === this.user.id
  }
}
</script>
