<template>
  <div>
    <button @click="clickLogin">
      Discordでログイン
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class Login extends Vue {
  clickLogin () {
    AuthStore.authDiscord()
  }
}
</script>
