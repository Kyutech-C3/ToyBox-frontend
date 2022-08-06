<template>
  <div class="relative w-min inline-block">
    <font-awesome-icon
      class="font-awesome-icon w-4 h-4 inline text-gray-400 hover:text-gray-600"
      :icon="['fas', 'info-circle']"
    />
    <div
      class="
        invisible
        absolute
        px-5
        text-xs
        border
        rounded-md
        drop-shadow-md
        top-2
        left-6
        bg-gray-200
        whitespace-pre-wrap
        w-max
        z-50
        info-modal
      "
    >
      {{ info }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Info extends Vue {
  @Prop({ type: String, required: false })
  info!: string
}
</script>

<style scoped>
.font-awesome-icon:hover + .info-modal {
  visibility: visible;
}
</style>
