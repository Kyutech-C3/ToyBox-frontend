<template>
  <div
    class="rounded-md text-xs flex items-center"
    :class="[
      { 'bg-green-300': visibility === 'public' },
      { 'bg-orange-300': visibility === 'private' },
      { 'bg-blue-300': visibility === 'draft' },
      { 'px-2 py-1': size === 'base' },
      { 'px-2 py-0.5': size === 'small' },
      { 'px-3 py-2': size === 'large' }
    ]"
  >
    <font-awesome-icon
      v-if="visibility === 'public'"
      :icon="['fas', 'globe']"
      class="w-2.5 mr-1"
    />
    <font-awesome-icon
      v-else-if="visibility === 'private'"
      :icon="['fas', 'lock']"
      class="w-2 mr-1"
    />
    <font-awesome-icon
      v-else-if="visibility === 'draft'"
      :icon="['fas', 'save']"
      class="w-2 mr-1"
    />
    <p>{{ visibility }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class VisibilityStateTag extends Vue {
  @Prop({ type: String, required: true })
  visibility!: 'public' | 'private' | 'draft'
  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'large'
}
</script>
