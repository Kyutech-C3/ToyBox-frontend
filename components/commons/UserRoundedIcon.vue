<template>
  <div
    class="rounded-full bg-white relative overflow-hidden shadow-md"
    :class="[
      { 'w-6 h-6': size === 'small' },
      { 'w-8 h-8': size === 'base' },
      { 'w-32 h-32': size === 'large' }
    ]"
  >
    <img
      :src="imageSrc"
      alt="icon"
      class="absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class UserRoundedIcon extends Vue {
  @Prop({ type: String, required: true })
  imageSrc!: string

  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'large'
}
</script>
