<template>
  <input
    v-model="title"
    type="text"
    name="text/title"
    placeholder="title"
    required
    class="w-full p-3 ring-1 placeholder-gray-400 focus:outline-none focus:ring-blue-600"
  >
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FormTitle extends Vue {
  @VModel({ type: String })
  title!: string
}
</script>
