<template>
  <div class="flex flex-col content-center justify-center items-center">
    <div class="m-5">
      <img class="w-64 border-2 border-black rounded-full" :src="userImage" alt="User image">
    </div>
    <div class="text-4xl m-5">
      {{ userName }}
    </div>
    <div class="text-2xl m-5">
      {{ userDescription }}
    </div>
    <div class="m-5">
      <button
        class="bg-green-400 hover:bg-green-500 px-5 py-3 rounded-full shadow-md"
        @click="showEditProfile = true"
      >
        プロフィール編集
      </button>
      <div
        v-show="showEditProfile"
        class="bg-gray-300 fixed h-screen inset-0 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white w-2/3 h-2/3 rounded-md">
          <button
            class="bg-green-400 hover:bg-green-500 px-5 py-3 rounded-full shadow-md"
            @click="showEditProfile = false"
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Profile extends Vue {
  @Prop({ type: String, required: true })
  userImage!: string

  @Prop({ type: String, required: true })
  userName!: string

  @Prop({ type: String, required: true })
  userDescription!: string

  showEditProfile: boolean = false
}
</script>
