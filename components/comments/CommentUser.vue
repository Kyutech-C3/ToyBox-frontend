<template>
  <div
    class="flex items-start rounded-full"
    :class="{ 'pointer-events-none': user.id === '0' }"
  >
    <nuxt-link
      :to="`/users/${user.id}`"
      :class="{ 'pointer-events-auto': user.id !== '0' }"
    >
      <user-rounded-icon :image-src="user.avatar_url" />
    </nuxt-link>
    <nuxt-link
      :to="`/users/${user.id}`"
      :class="{ 'pointer-events-auto': user.id !== '0' }"
    >
      <div class="ml-3 text-xs">
        {{ user.display_name }}
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { User } from '@/types'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'

@Component({ components: { UserRoundedIcon } })
export default class CommentUser extends Vue {
  @Prop({ type: Object, required: true })
  user!: User
}
</script>
