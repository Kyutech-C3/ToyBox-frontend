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
    localStorage.setItem('refresh_token', String(this.$route.query.refresh_token))
  }
}
</script>
