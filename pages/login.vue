<template>
  <base-button title="Discordでログイン" @click="authDiscord" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseButton from '@/components/commons/BaseButton.vue'
import { authStore } from '@/store'

@Component({
  components: {
    BaseButton
  }
})
export default class Login extends Vue {
  authDiscord() {
    authStore.authDiscord()
  }
}
</script>
