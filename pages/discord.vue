<template>
  <div>リダイレクトページ</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component({
  components: {},
  asyncData({ query }) {
    if (query.access_token && query.refresh_token) {
      AuthStore.newLoginSetAccessToken(String(query.access_token))
      AuthStore.fetchUser(String(query.access_token))
      localStorage.setItem('refresh_token', String(query.refresh_token))
    }
  }
})
export default class Discord extends Vue {
  mounted(): void {
    this.$router.push('/')
  }
}
</script>
