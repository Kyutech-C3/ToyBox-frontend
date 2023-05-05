<template>
  <div>Redirect Page</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '@/store'

@Component({
  asyncData({ query }) {
    if (query.access_token && query.refresh_token) {
      authStore.newLoginSetAccessToken(String(query.access_token))
      authStore.fetchUser(String(query.access_token))
      localStorage.setItem('refresh_token', String(query.refresh_token))
    }
  }
})
export default class Discord extends Vue {
  get getUser() {
    return authStore.getUser
  }

  mounted() {
    this.$gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
      user_id: this.getUser.id
    })
    this.$gtag('set', 'user_properties', {
      crm_id: this.getUser.id
    })
    this.$gtag('event', 'done_auth', {
      user_name: this.getUser.name,
      user_display_name: this.getUser.display_name
    })

    this.$router.push('/')
  }
}
</script>
