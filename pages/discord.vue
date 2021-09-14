<template>
  <div>
    リダイレクトページ
    <user-info />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'
import UserInfo from '~/components/UserInfo.vue'
import { Authentication } from '~/store/auth.ts'

@Component({
  components: {
    UserInfo
  }
})

@Component
export default class Discord extends Vue {
  created (): void {
    if (!this.$route.query.access_token) { return }

    AuthStore.fetchUserByAccessToken(String(this.$route.query.access_token))
    const C3Authentication = {
      expired_at: String(Date.now()),
      access_token: String(this.$route.query.access_token),
      refresh_token: String(this.$route.query.refresh_token)
    } as Authentication
    localStorage.setItem('C3Authentication', JSON.stringify(C3Authentication))
  }
}
</script>
