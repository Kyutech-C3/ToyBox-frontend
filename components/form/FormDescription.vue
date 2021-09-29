<template>
  <textarea v-model="description" name="description" placeholder="description" />
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FromDescription extends Vue {
  @VModel({ type: String })
  description!: string
}
</script>
