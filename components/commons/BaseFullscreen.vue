<template>
  <div
    class="
      fixed
      w-screen
      svh-full
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      bg-black
      z-40
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class BaseFullscreen extends Vue {}
</script>
