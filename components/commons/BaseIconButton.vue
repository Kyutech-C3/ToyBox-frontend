<template>
  <div
    class="
      rounded-full
      text-gray-500
      hover:text-gray-600
      transition-colors
      p-1.5
      block
      w-min
      cursor-pointer
    "
    :class="[
      { shadow: isShadow },
      isBackground ? 'bg-orange-200 hover:bg-orange-300' : 'hover:bg-gray-100'
    ]"
    @click="(event) => $emit('click', event)"
  >
    <div
      class="overflow-hidden relative"
      :class="[
        { 'w-4 h-4': size === 'small' },
        { 'w-7 h-7': size === 'base' },
        { 'w-10 h-10': size === 'large' }
      ]"
    >
      <font-awesome-icon
        class="m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        :class="[
          { 'w-4': size === 'small' },
          { 'w-7': size === 'base' },
          { 'w-10': size === 'large' }
        ]"
        :icon="[fontAwesome.type, fontAwesome.name]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseIconButton extends Vue {
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
