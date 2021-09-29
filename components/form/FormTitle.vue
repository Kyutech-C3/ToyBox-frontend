<template>
  <input v-model="title" type="text" name="text/title" placeholder="title" required>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FormTitle extends Vue {
  @VModel({ type: String })
  title!: string
}
</script>
