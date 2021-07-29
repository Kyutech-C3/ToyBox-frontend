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

    if (authData.token !== null) {
      AuthStore.fetchUser(authData)
    }
    this.$router.push('/')
  }
}
</script>
