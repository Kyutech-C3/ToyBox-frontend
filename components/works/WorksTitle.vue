<template>
  <div>
    <p class="font-light text-gray-400">
      {{ date.replace("T", " ").split(".")[0] }}
    </p>
    <p class="text-3xl">
      {{ title }}
    </p>
    <div class="inline-flex items-center mt-5">
      <img
        class="border rounded-full w-10 h-10 border-gray-400"
        :src="user.avatar_url"
        alt="userImage"
      >
      <p class="ml-3">
        {{ user.display_name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { User } from '~/types'

@Component
export default class WorksTitle extends Vue {
  @Prop({ type: String, required: false, default: '' })
  date!: string;

  @Prop({ type: String, required: false, default: '' })
  title!: string;

  @Prop({ type: Object, required: false, default: '' })
  user!: User;
}
</script>
