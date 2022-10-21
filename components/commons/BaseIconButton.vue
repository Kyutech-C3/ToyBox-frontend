<template>
  <nuxt-link
    :to="to"
    class="
      rounded-full
      text-gray-500
      hover:text-gray-600
      transition-colors
      p-1.5
      block
      w-min
    "
    :class="[
      { shadow: isShadow },
      isBackground ? 'bg-orange-200 hover:bg-orange-300' : 'hover:bg-gray-100'
    ]"
  >
    <font-awesome-icon
      class="m-0"
      :class="[
        { 'w-4': size === 'small' },
        { 'w-7': size === 'base' },
        { 'w-10': size === 'large' }
      ]"
      :icon="[fontAwesome.type, fontAwesome.name]"
    />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseIconButton extends Vue {
  @Prop({ type: String, required: true, default: '' })
  to!: string

  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'large'

  @Prop({ type: Boolean, required: false, default: false })
  isShadow!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  isBackground!: boolean

  @Prop({ type: Object, required: true })
  fontAwesome!: { type: string; name: string }
}
</script>
