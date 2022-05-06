<template>
  <div>
    <p class="font-light text-gray-400">
      {{ date.replace('T', ' ').split('.')[0] }}
    </p>
    <p class="text-3xl">
      {{ title }}
    </p>
    <div class="inline-flex items-center mt-5">
      <user-rounded-icon :imageSrc="user.avatar_url" />
      <p class="ml-3">
        {{ user.display_name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'
import { User } from '@/types'

@Component({
  components: {
    UserRoundedIcon
  }
})
export default class WorksTitle extends Vue {
  @Prop({ type: String, required: false, default: '' })
  date!: string

  @Prop({ type: String, required: false, default: '' })
  title!: string

  @Prop({ type: Object, required: false, default: '' })
  user!: User
}
</script>
