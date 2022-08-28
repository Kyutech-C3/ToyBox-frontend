<template>
  <div class="flex h-10 items-center mt-3">
    <font-awesome-icon class="w-6 text-gray-500 mr-5" :icon="['fas', icon]" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class WorksContent extends Vue {
  @Prop({ type: String, required: true })
  icon!: string
}
</script>
