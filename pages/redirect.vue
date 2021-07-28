<template>
  <div>
    {{ $route.query.code }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { AuthStore } from '~/store'

@Component
export default class Redirect extends Vue {
  async created () {
    await AuthStore.fetchUser(String(this.$route.query.code), true)
  }
}
</script>
