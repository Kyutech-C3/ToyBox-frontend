<template>
  <div v-if="UserInfo.id !== ''">
    <img :src="getIconURL">
    <p>{{ UserInfo.display_name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class UserInfo extends Vue {
  get UserInfo () {
    return AuthStore.getUser
  }

  get getIconURL () {
    return `https://cdn.discordapp.com/avatars/${this.UserInfo.discord_user_id}/${this.UserInfo.avatar_url}`
  }
}
</script>
