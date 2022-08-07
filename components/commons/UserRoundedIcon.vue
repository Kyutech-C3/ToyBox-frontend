<template>
  <div>
    <img
      class="border-gray-400 rounded-full"
      :class="isLarge ? 'w-64 h-64 border-2' : 'w-8 h-8 border'"
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

  @Prop({ type: Boolean, required: false, default: false })
  isLarge!: boolean
}
</script>
