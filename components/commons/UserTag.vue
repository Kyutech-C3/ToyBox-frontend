<template>
  <nuxt-link
    :to="`/users/${user.id}`"
    class="flex items-center"
    :class="[
      { 'pointer-events-auto hover:bg-gray-200': !noLink },
      { 'pointer-events-none': noLink },
      { 'p-1': invisibleName },
      { 'pl-1 pr-2 py-1': !invisibleName },
      { 'rounded-full': rounded }
    ]"
  >
    <user-rounded-icon
      :imageSrc="user.avatar_url"
      :size="invisibleName || size === 'small' ? 'small' : 'base'"
    />
    <div
      v-if="!invisibleName"
      class="ml-3"
      :class="[
        { 'font-medium': fontWeight === 'medium' },
        { 'font-normal': fontWeight === 'base' }
      ]"
    >
      {{ user.display_name }}
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { User } from '@/types'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'

@Component({ components: { UserRoundedIcon } })
export default class UserTag extends Vue {
  @Prop({ type: Object, required: true })
  user!: User

  @Prop({ type: Boolean, required: false, default: false })
  noLink!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  invisibleName!: boolean

  @Prop({ type: String, required: false, default: 'base' })
  fontWeight!: 'base' | 'medium'

  @Prop({ type: Boolean, required: false, default: true })
  rounded!: boolean

  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'medium'
}
</script>
