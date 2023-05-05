<template>
  <div class="relative w-full h-full">
    <img
      class="w-full h-full object-cover"
      :src="imageUrl"
      alt="asset image preview"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { Asset } from '~/types'

@Component
export default class FormImagePreview extends Vue {
  @Prop({ type: String, required: true })
  imageUrl!: string
  @Prop({ type: Object, required: true })
  asset!: Asset
}
</script>
