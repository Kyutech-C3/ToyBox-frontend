<template>
  <div v-if="getUser.id !== ''">
    <img :src="getIconURL">
    <p>{{ getUser.display_name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class UserInfo extends Vue {
  get getUser () {
    return AuthStore.getUser
  }

  get getIconURL () {
    return `https://cdn.discordapp.com/avatars/${this.getUser.discord_user_id}/${this.getUser.avatar_url}`
  }
}
</script>
