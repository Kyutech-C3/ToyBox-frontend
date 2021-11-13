<template>
  <dev class="bg-white border-black border-solid border-2 text-black px-4 rounded-full" :class="[[fontSize=='xs' || fontSize=='sm' ? 'py-0.5' : 'py-1'], {'text-xs': fontSize=='xs', 'text-sm': fontSize=='sm', 'text-base': fontSize=='base', 'text-lg': fontSize=='lg', 'text-xl': fontSize=='xl'}]">
    {{ tagText }}
  </dev>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({ type: String, required: true, default: 'empty' })
  tagText!: string

  @Prop({ type: String, required: true, default: 'base' })
  fontSize!: string
}
</script>
