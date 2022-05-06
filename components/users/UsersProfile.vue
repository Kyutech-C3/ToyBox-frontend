<template>
  <div
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
    <user-rounded-icon :imageSrc="users.image" isLarge class="m-5" />
    <div class="text-4xl m-5">
      {{ users.name }}
    </div>
    <div class="text-2xl m-5">
      {{ users.description }}
    </div>
    <div v-show="!disabledEditButton" class="m-5">
      <base-button title="プロフィール編集" @click="showEditProfile = true" />
      <users-profile-form v-show="showEditProfile" :users="users">
        <base-button
          class="px-7"
          title="変更"
          @click="showEditProfile = false"
        />
        <base-button
          class="px-7"
          title="やめる"
          @click="showEditProfile = false"
        />
      </users-profile-form>
    </div>
    <div class="flex justify-around w-full my-5">
      <a
        :href="'https://github.com/' + users.github"
        target="_blank"
        title="GitHub"
      >
        <font-awesome-icon
          class="w-10 text-gray-500"
          :icon="['fab', 'github']"
        />
      </a>
      <a
        :href="'https://twitter.com/' + users.twitter"
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

interface User {
  image: string
  name: string
  description: string
  github: string
  twitter: string
}

@Component({
  components: {
    BaseButton,
    UsersProfileForm,
    UserRoundedIcon
  }
})
export default class UsersProfile extends Vue {
  @Prop({ type: Object, required: true })
  users!: User

  @Prop({ type: Boolean, required: false, default: false })
  disabledEditButton!: boolean

  showEditProfile: boolean = false
}
</script>
