<template>
  <div>
    <img
      class="border-gray-400 rounded-full"
      :class="[
        { 'w-6 h-6 border': size === 'small' },
        { 'w-8 h-8 border': size === 'base' },
        { 'w-64 h-64 border-2': size === 'large' }
      ]"
      :src="imageSrc"
      alt="icon"
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
