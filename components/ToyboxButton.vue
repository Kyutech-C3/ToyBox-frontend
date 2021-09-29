<template>
  <button
    class="button"
    :class="{shadow: isShadow}"
    @click="(event) => ($emit('click', event))"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ToyboxButton extends Vue {
  @Prop({ type: String, required: true, default: 'Button' })
  title!: string

  @Prop({ type: String, required: false, default: false })
  isShadow!: boolean
}
</script>

<style lang="scss" scoped>
$button-min-width: 80px;
$button-border: 1px;
$button-font-size-base: 1.2rem;

.button {
  font-size: $button-font-size-base;
  display: flex;
  justify-content: center;
  min-width: $button-min-width;
  flex-direction: row;
  cursor: pointer;
  padding: 0.6rem 1rem;
  border-radius: $base-border-radius;
  border: solid $button-border $accent-color;
  color: $accent-color;
  background-color: transparent;
  font-weight: $font-weight-base;

  transition: background-color 0.1s linear;

  &:hover {
    background-color: $accent-color;
    color: $white;
  }
}

.shadow {
  box-shadow:
    $base-shadow-offset-y
    $base-shadow-offset-y
    $base-shadow-blur
    $base-shadow-color;
}
</style>
