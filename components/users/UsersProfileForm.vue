<template>
  <div
    class="
      bg-gray-300
      fixed
      h-screen
      inset-0
      bg-opacity-50
      flex
      justify-center
      items-center
    "
  >
    <div class="w-1/2 flex flex-col bg-white rounded-md p-10">
      <users-text-field
        v-model="displayName"
        label="名前"
        placeholder="名前を入力してください"
      />
      <users-text-field
        v-model="profile"
        label="自己紹介"
        placeholder="自己紹介をしましょう"
        :textarea="true"
      />
      <users-text-field
        v-model="githubId"
        label="GitHub"
        placeholder="GitHub の ID"
      >
        <div class="mr-1 text-gray-500">https://github.com/</div>
      </users-text-field>
      <users-text-field
        v-model="twitterId"
        label="Twitter"
        placeholder="Twitter の ID"
      >
        <div class="mr-1 text-gray-500">https://twitter.com/</div>
      </users-text-field>
      <div class="mt-5 flex justify-around">
        <base-button class="px-7" title="変更" @click="putUserInfo" />
        <base-button
          class="px-7"
          title="やめる"
          @click="closeEditProfileModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import UsersTextField from '@/components/users/UsersTextField.vue'
import { User } from '~/types'
import { authStore } from '~/store'

@Component({
  components: {
    BaseTextButton,
    UsersTextField
  }
})
export default class UsersProfileForm extends Vue {
  @Prop({ type: Object, required: false, default: [] })
  user!: User

  displayName: string = ''
  avatarUrl: string = ''
  profile: string = ''
  githubId: string = ''
  twitterId: string = ''

  mounted() {
    const { display_name, avatar_url, profile, github_id, twitter_id } =
      this.user
    this.displayName = display_name
    this.avatarUrl = avatar_url ?? ''
    this.profile = profile ?? ''
    this.githubId = github_id ?? ''
    this.twitterId = twitter_id ?? ''
  }

  async putUserInfo() {
    await axios
      .put(
        '/users/@me',
        {
          display_name: this.displayName,
          avatar_url: this.avatarUrl,
          profile: this.profile,
          twitter_id: this.twitterId,
          github_id: this.githubId
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      )
      .then((value) => {
        console.log(value)
        alert('ユーザー情報を変更しました')
        this.closeEditProfileModal()
      })
      .catch((error) => console.error(error))
  }

  closeEditProfileModal() {
    this.$emit('close-edit-profile-modal')
  }

  get accessToken() {
    return authStore.getAccessToken
  }
}
</script>
