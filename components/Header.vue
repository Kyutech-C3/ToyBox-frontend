<template>
  <header 
    class="
      py-3
      text-center
      justify-around
      border-solid border-2 border-gray-200
      flex
      w-full
    "
  >
    <div 
      class="
        justify-center
        flex
      "
    >
      <nuxt-link 
        to="/"
        class="
          hover:opacity-50
          transition
        "
      >
        <div
          class="
            text-4xl
            text-gray-600
          "
        >
          <img src="../assets/image/ToyBoxlogo.png">
        </div>
      </nuxt-link>
      <div 
        class="
          grid
          justify-start
          absolute
          right-10
          h-auto
        "
      >
        <button
          class="
            py-2
            px-5
            my-3
            rounded-xl
            hover:opacity-50
            transition
            border-solid border-2 border-gray-200
          "
          @click="clickLogin"
          v-if="!nowLogin"
        >
          sign in
        </button>
        <img 
          :src="getIcon"
          v-if="nowLogin"
          class="
            hover:opacity-50
            rounded-full
            w-12
            h-12
            my-3
            cursor-pointer
          "
        >
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { AuthStore } from '~/store'

export default Vue.extend({
  components: {  },
  computed: {
    nowLogin() {
      return AuthStore.nowLogin
    },
    getIcon() {
      return AuthStore.getUser.avatarUrl
    }
  },
  methods: {
    clickLogin () {
      AuthStore.authDiscord()
    }
  }
})
</script>
