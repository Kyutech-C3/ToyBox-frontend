<template>
  <div class="bg-white text-black py-1 px-4 rounded-lg border border-black w-auto inline-block">
    {{ tagText }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({ type: String, required: true, default: '' })
  tagText!: string
}
</script>

<style lang="scss" scoped>
</style>
