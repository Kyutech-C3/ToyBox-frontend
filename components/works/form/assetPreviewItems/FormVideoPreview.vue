<template>
  <video
    class="w-full h-full object-cover"
    webkit-playsinline
    playsinline
    muted
    autoplay
    loop
  >
    <source :src="imageUrl" type="video/mp4" />
    <source :src="imageUrl" type="video/quicktime" />
  </video>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class FormVideoPreview extends Vue {
  @Prop({ type: String, required: true })
  imageUrl!: string
}
</script>
