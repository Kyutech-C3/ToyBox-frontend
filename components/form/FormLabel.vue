<template>
  <div class="w-56 text-xl flex-shrink-0">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FormLabel extends Vue {
  @Prop({ type: String, required: true })
  name!: string
}
</script>
