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
  async created () {
    const authData = {
      token: String(this.$route.query.code),
      isNewLogin: true
    } as AuthData

    if (!this.$route.query.code ||
        !(await AuthStore.fetchUser(authData))) {
      this.$router.push('/login')
      return
    }
    this.$router.push('/')
  }
}
</script>
