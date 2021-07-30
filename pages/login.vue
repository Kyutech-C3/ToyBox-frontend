<template>
  <div>
    <button @click="login()">
      Discordでログイン
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class Login extends Vue {
  login () {
    AuthStore.toAuthDiscordPage()
  }
}
</script>
