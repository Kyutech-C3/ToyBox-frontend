<template>
  <label class="mb-3">
    <div class="text-xl mb-1">{{ label }}</div>
    <textarea
      v-if="textarea"
      v-model="text"
      class="w-full h-40 border rounded border-gray-500 p-2"
      :placeholder="placeholder"
    />
    <div v-else class="flex items-center">
      <slot />
      <input
        v-model="text"
        class="w-full border rounded border-gray-500 p-2"
        type="text"
        :placeholder="placeholder"
      />
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'

@Component
export default class UsersTextField extends Vue {
  @Prop({ type: String, required: false, default: '' })
  label!: string

  @Prop({ type: String, required: false, default: '' })
  placeholder!: string

  @Prop({ type: Boolean, required: false, default: false })
  textarea!: boolean

  @VModel({ type: String, required: true })
  text!: string
}
</script>
