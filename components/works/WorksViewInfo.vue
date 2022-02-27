<template>
  <div class="self-center font-light text-gray-400">
    <p>1000 view</p>
    <div class="inline-flex items-center mt-3">
      <button v-if="!isLiked" @click="liked">
        <font-awesome-icon class="w-7" :icon="['far', 'heart']" />
      </button>
      <button v-else @click="unliked">
        <font-awesome-icon class="w-7" :icon="['fas', 'heart']" />
      </button>
      <p class="text-lg ml-2">
        {{ likes }}
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class WorksViewInfo extends Vue {
  likes: number = 10
  isLiked: boolean = false

  liked () {
    this.likes++
    this.isLiked = true
  }

  unliked () {
    this.likes--
    this.isLiked = false
  }
}
</script>
