<template>
  <nuxt-link
    :to="`/users/${user.id}`"
    class="
      flex
      items-center
      pointer-events-auto
      hover:bg-gray-200
      rounded-full
      px-2
      py-1
    "
  >
    <user-rounded-icon :imageSrc="user.avatar_url" />
    <div class="ml-3">
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
