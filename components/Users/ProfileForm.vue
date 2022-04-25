<template>
  <div class="bg-gray-300 fixed h-screen inset-0 bg-opacity-50 flex justify-center items-center">
    <div class="w-1/2 flex flex-col bg-white rounded-md p-10">
      <text-field v-model="users.name" label="名前" placeholder="名前を入力してください" />
      <text-field v-model="users.description" label="自己紹介" placeholder="自己紹介をしましょう" :textarea="true" />
      <text-field v-model="users.github" label="GitHub" placeholder="GitHub の ID">
        <div class="mr-1 text-gray-500">
          https://github.com/
        </div>
      </text-field>
      <text-field v-model="users.twitter" label="Twitter" placeholder="Twitter の ID">
        <div class="mr-1 text-gray-500">
          https://twitter.com/
        </div>
      </text-field>
      <div class="mt-5 flex justify-around">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import TextField from '@/components/Users/TextField.vue'

interface User {
  image: string
  name: string
  description: string
  github: string
  twitter: string
}

@Component({
  components: {
    TextField
  }
})
export default class Profile extends Vue {
  @Prop({ type: Object, required: false, default: [] })
  users!: User
}
</script>
