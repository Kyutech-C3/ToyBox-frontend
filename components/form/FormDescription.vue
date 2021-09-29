<template>
  <textarea
    v-model="description"
    name="description"
    placeholder="description"
    class="w-full p-3 resize-y ring-1 placeholder-gray-400 focus:outline-none focus:ring-blue-600"
  />
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FromDescription extends Vue {
  @VModel({ type: String })
  description!: string
}
</script>
