<template>
  <button
    class="rounded-lg border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 transition-colors px-4 py-2.5"
    :class="{shadow: isShadow}"
    @click="(event) => ($emit('click', event))"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ToyboxButton extends Vue {
  @Prop({ type: String, required: true, default: 'Button' })
  title!: string

  @Prop({ type: Boolean, required: false, default: false })
  isShadow!: boolean
}
</script>
