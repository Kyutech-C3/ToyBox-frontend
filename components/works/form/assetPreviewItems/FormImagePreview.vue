<template>
  <div class="w-32 h-32 rounded-xl overflow-hidden border border-gray-300">
    <img class="w-full h-full object-cover" :src="imageUrl" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class FormImagePreview extends Vue {
  @Prop({ type: String, required: true })
  imageUrl!: string
}
</script>
