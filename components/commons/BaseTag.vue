<template>
  <div
    class="bg-white rounded-lg border border-gray-400 w-auto"
    :class="[
      { 'bg-slate-400': selected },
      { 'cursor-pointer': pointer },
      { 'px-2 py-0 text-sm mr-0.5': size === 'small' },
      { 'px-4 py-0.5 mr-1': size === 'base' },
      { '': size === 'lerge' }
    ]"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseTag extends Vue {
  @Prop({ type: String, required: true })
  text!: string

  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'lerge'

  @Prop({ type: Boolean, required: false, default: false })
  selected!: boolean

  @Prop({ type: Boolean, required: false, default: true })
  pointer!: boolean
}
</script>
