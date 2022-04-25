<template>
  <div>
    <button @click="clickLogin">{{ text }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class Login extends Vue {
  text: string = 'Discordでログイン'

  clickLogin() {
    AuthStore.authDiscord()
  }
}
</script>
