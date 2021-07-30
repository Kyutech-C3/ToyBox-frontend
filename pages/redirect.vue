<template>
  <div>
    {{ $route.query.code }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'
import { AuthData } from '~/store/auth.ts'

@Component
export default class Redirect extends Vue {
  created () {
    const authData = {
      token: String(this.$route.query.code),
      authorization: true
    } as AuthData

    if (!this.$route.query.code) {
      this.$router.push('/login')
      return
    }
    AuthStore.fetchUser(authData)
    this.$router.push('/')
  }
}
</script>
