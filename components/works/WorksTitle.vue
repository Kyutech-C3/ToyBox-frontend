<template>
  <div>
    <p class="font-light text-gray-400">
      {{ date.replace('T', ' ').split('.')[0] }}
    </p>
    <p class="text-3xl">
      {{ title }}
    </p>
    <user-tag :user="user" class="mt-5" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'
import UserTag from '@/components/commons/UserTag.vue'
import { User } from '@/types'

@Component({
  components: {
    UserRoundedIcon,
    UserTag
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
