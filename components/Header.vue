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
    <div class="justify-center flex">
      <nuxt-link to="/" class="hover:opacity-50 transition">
        <div class="text-4xl text-gray-600">
          <img src="../assets/image/ToyBoxlogo.png">
        </div>
      </nuxt-link>
      <div class="grid justify-start absolute right-10 h-auto">
        <!-- not logged in  -->
        <button
          v-if="!nowLogin"
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
        >
          sign in
        </button>
        <!-- logged in -->
        <button class="hover:opacity-60 transition" @click="activeNav = true">
          <img
            v-if="nowLogin"
            :src="getIcon"
            class="
              rounded-full
              w-12
              h-12
              my-3
              cursor-pointer
              pointer-events-none
            "
          >
        </button>
      </div>
      <!-- navigation -->
      <div
        v-if="activeNav"
        class="
          shadow-2xl
          rounded
          absolute
          top-20
          right-5
          w-60
          p-5
          bg-gray-700
          opacity-90
          z-50
        "
      >
        <!-- icon -->
        <img
          :src="getIcon"
          class="rounded-full w-16 h-16 mx-auto my-1 pointer-events-none"
        >
        <!-- name -->
        <div class="text-gray-200">
          {{ getName }}
        </div>
        <!-- email -->
        <div class="text-gray-200">
          {{ getEmail }}
        </div>
        <div class="border-solid border-b border-gray-200 w-full mt-8 mb-1" />
        <!-- my profile link -->
        <button @click="activeNav = !activeNav">
          <nuxt-link
            class="
              grid
              py-1
              px-2
              my-1
              mx-auto
              rounded
              hover:text-white hover:underline
              text-gray-200
            "
            to="/users"
          >
            my profile
          </nuxt-link>
        </button>
        <div class="border-solid border-b border-gray-200 w-full my-1" />
        <!-- logout button -->
        <button
          class="
            py-1
            px-5
            my-2
            rounded
            bg-transparent
            hover:text-white hover:border-2
            transition
            border-solid border border-gray-200
            text-gray-200
          "
          @click="clickLogout"
        >
          logout
        </button>
      </div>
    </div>
    <div
      v-if="activeNav"
      class="fixed w-full h-full z-40"
      @click="activeNav = !activeNav"
    />
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { AuthStore } from '~/store'

export default Vue.extend({
  components: {},
  data (): {
    activeNav: Boolean;
    } {
    return {
      activeNav: false
    }
  },
  computed: {
    nowLogin () {
      return AuthStore.nowLogin
    },
    getIcon () {
      return AuthStore.getUser.avatarUrl
    },
    getName () {
      return AuthStore.getUser.name
    },
    getEmail () {
      return AuthStore.getUser.email
    }
  },
  methods: {
    clickLogin () {
      AuthStore.authDiscord()
    },
    clickLogout () {
      localStorage.removeItem('refresh_token')
      location.reload()
    }
  }
})
</script>
