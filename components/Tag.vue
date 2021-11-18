<template>
  <div class="bg-white text-black px-4 rounded-lg border border-black w-auto inline-block"
    :class="[[fontSize=='xs' || fontSize=='sm' ? 'py-0.5' : 'py-1'], {'text-xs': fontSize=='xs', 'text-sm': fontSize=='sm', 'text-base': fontSize=='base', 'text-lg': fontSize=='lg', 'text-xl': fontSize=='xl'}]">
    {{ tagText }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({ type: String, required: true, default: '' })
  tagText!: string

  @Prop({ type: String, required: true, default: '' })
  fontSize!: string
}
</script>

<style lang="scss" scoped>
</style>
