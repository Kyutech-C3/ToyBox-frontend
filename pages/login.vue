<template>
  <base-text-button title="Discordでログイン" @click="authDiscord" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import { authStore } from '@/store'

@Component({
  components: {
    BaseTextButton
  }
})
export default class Login extends Vue {
  authDiscord() {
    authStore.authDiscord()
  }
}
</script>
