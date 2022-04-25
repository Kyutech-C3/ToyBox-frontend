<template>
  <div
    class="flex flex-col content-center justify-center items-center border-2 border-gray-400 rounded-3xl px-60"
  >
    <div class="m-5">
      <img
        class="w-64 border-2 border-gray-400 rounded-full"
        :src="users.image"
        alt="User image"
      />
    </div>
    <div class="text-4xl m-5">
      {{ users.name }}
    </div>
    <div class="text-2xl m-5">
      {{ users.description }}
    </div>
    <div v-show="!disabledEditButton" class="m-5">
      <custom-button title="プロフィール編集" @click="showEditProfile = true" />
      <profile-form v-show="showEditProfile" :users="users">
        <custom-button
          class="px-7"
          title="変更"
          @click="showEditProfile = false"
        />
        <custom-button
          class="px-7"
          title="やめる"
          @click="showEditProfile = false"
        />
      </profile-form>
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
import CustomButton from '@/components/ToyboxButton.vue'
import ProfileForm from '@/components/Users/ProfileForm.vue'

interface User {
  image: string
  name: string
  description: string
  github: string
  twitter: string
}

@Component({
  components: {
    CustomButton,
    ProfileForm
  }
})
export default class Profile extends Vue {
  @Prop({ type: Object, required: true })
  users!: User

  @Prop({ type: Boolean, required: false, default: false })
  disabledEditButton!: boolean

  showEditProfile: boolean = false
}
</script>
