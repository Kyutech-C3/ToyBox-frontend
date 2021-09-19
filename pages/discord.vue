<template>
  <div>
    リダイレクトページ
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class Discord extends Vue {
  created (): void {
    if (this.$route.query.access_token && this.$route.query.refresh_token) {
      AuthStore.newLoginSetAccessToken(String(this.$route.query.access_token))
      AuthStore.fetchUser(String(this.$route.query.access_token))
      localStorage.setItem('refresh_token', String(this.$route.query.refresh_token))
    }
    this.$router.push('/')
  }
}
</script>
