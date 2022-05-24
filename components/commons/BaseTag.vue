<template>
  <div
    class="
      px-4
      py-0.5
      mx-3
      bg-white
      rounded-lg
      border border-gray-500
      w-auto
      cursor-pointer
    "
    :class="{ 'bg-slate-400': selected }"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseTag extends Vue {
  @Prop({ type: String, required: true, default: '' })
  text!: string

  @Prop({ type: Boolean, required: false, default: false })
  selected!: boolean
}
</script>
