<template>
  <nuxt-link
    :to="`/users/${user.id}`"
    class="flex items-start rounded-full pointer-events-auto"
  >
    <user-rounded-icon :imageSrc="user.avatar_url" />
    <div class="ml-3 text-xs">
      {{ user.name }}
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
}
</script>
