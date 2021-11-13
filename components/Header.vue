<template>
  <header 
    class="
      py-5
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
          ToyBoxLogo
        </div>
      </nuxt-link>
      <div 
        class="
          grid
          justify-start
          absolute
          right-10
        "
      >
        <button
          class="
            hover:opacity-50
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
