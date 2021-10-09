<template>
  <div class="min-h-screen flex flex-col content-center justify-center items-center">
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
    <div class="m-10">
      <div class="text-3xl text-center p-10 border-b-2">
        作品一覧
      </div>
      <div class="m-5 flex flex-wrap justify-center max-w-6xl">
        <div v-for="(userWork, i) in userWorks" :key="i" class="bg-gray-400 w-80 h-80 m-5 rounded-3xl">
          {{ userWork }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Users extends Vue {
  userImage: string = 'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png'
  userName: string = 'ハムタロサァン'
  userDescription: string = 'はむたろなのだ'
  userWorksCount: number = 6
  userWorks: Array<string> = Array(this.userWorksCount)
  showEditProfile: boolean = false
}
</script>
