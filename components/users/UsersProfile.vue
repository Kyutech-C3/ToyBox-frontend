<template>
  <div
    v-if="user !== undefined"
    class="
      w-3/4
      flex flex-col
      content-center
      justify-center
      items-center
      border-2 border-gray-400
      rounded-3xl
      mx-auto
      px-60
      mb-12
    "
  >
    <user-rounded-icon :imageSrc="user.avatar_url" isLarge class="m-5" />
    <div class="text-4xl m-5">
      {{ user.display_name }}
    </div>
    <div class="text-2xl m-5">
      {{ user.profile }}
    </div>
    <div v-show="!disabledEditButton" class="m-5">
      <base-button
        title="プロフィール編集"
        @click="showEditProfileModal = true"
      />
      <users-profile-form
        v-show="showEditProfileModal"
        :user="user"
        @close-edit-profile-modal="showEditProfileModal = false"
      />
    </div>
    <div class="flex justify-around w-full my-5">
      <a
        v-if="user.github_id !== ''"
        :href="'https://github.com/' + user.github_id"
        target="_blank"
        title="GitHub"
      >
        <font-awesome-icon
          class="w-10 text-gray-500"
          :icon="['fab', 'github']"
        />
      </a>
      <a
        v-if="user.twitter_id !== ''"
        :href="'https://twitter.com/' + user.twitter_id"
        target="_blank"
        title="Twitter"
      >
        <font-awesome-icon
          class="w-10 text-gray-500"
          :icon="['fab', 'twitter']"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseButton from '@/components/commons/BaseButton.vue'
import UsersProfileForm from '@/components/users/UsersProfileForm.vue'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'
import { User } from '~/types'

@Component({
  components: {
    BaseButton,
    UsersProfileForm,
    UserRoundedIcon
  }
})
export default class UsersProfile extends Vue {
  @Prop({ type: Object, required: true })
  user!: User

  @Prop({ type: Boolean, required: false, default: false })
  disabledEditButton!: boolean

  showEditProfileModal: boolean = false
}
</script>
