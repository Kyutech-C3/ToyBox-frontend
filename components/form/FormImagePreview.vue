<template>
  <div>
    <img :src="imageURL">
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class FormImagePreview extends Vue {
  @Prop({ type: String, required: true }) imageURL!: string
}
</script>
