<template>
  <button
    type="button"
    class="rounded-lg border-2 transition-colors px-4 py-1"
    :class="[
      { shadow: isShadow },
      {
        'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100':
          color === 'yellow'
      },
      {
        'border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-gray-100':
          color === 'gray'
      }
    ]"
    @click="(event) => $emit('click', event)"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseTextButton extends Vue {
  @Prop({ type: String, required: true, default: 'Button' })
  title!: string

  @Prop({ type: Boolean, required: false, default: false })
  isShadow!: boolean

  @Prop({ type: String, required: false, default: 'yellow' })
  color!: 'yellow' | 'gray'
}
</script>
