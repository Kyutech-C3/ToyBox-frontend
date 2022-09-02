<template>
  <div class="w-32 h-32 rounded-xl overflow-hidden border border-gray-300">
    <video
      class="w-full h-full object-cover"
      :src="imageUrl"
      webkit-playsinline
      playsinline
      muted
      autoplay
      loop
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class FormVideoPreview extends Vue {
  @Prop({ type: String, required: true })
  imageUrl!: string
}
</script>
