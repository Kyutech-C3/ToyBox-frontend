<template>
  <header class="py-3 text-center justify-around flex w-full h-24 relative">
    <div
      v-if="!nowLogin"
      class="triangle absolute -top-5 -right-10"
      @click="$router.push('/login')"
    ></div>
    <div class="justify-center flex h-full">
      <nuxt-link to="/" class="hover:opacity-50 h-full">
        <img src="@/assets/image/ToyBoxlogo.png" class="h-full" />
      </nuxt-link>
    </div>
    <div
      class="flex justify-start items-center absolute right-10 top-0 bottom-0"
    >
      <!-- ヘルプ -->
      <a
        href="https://chivalrous-botany-faf.notion.site/ToyBox-876fd578573a418b99bbfe6d3973aa91"
        target="_blank"
        title="ヘルプ"
        name="ヘルプ"
        charset="UTF-8"
        type="text/html"
        class="mr-5"
      >
        <font-awesome-icon
          :icon="['far', 'question-circle']"
          class="w-5 text-gray-400 hover:text-gray-600"
        />
      </a>
      <!-- not logged in  -->
      <div v-if="$route.path !== '/works/create'">
        <base-text-button
          v-if="nowLogin"
          class="mr-5"
          title="投稿"
          @click="$router.push('/works/create')"
        />
      </div>
      <!-- logged in -->
      <button class="hover:opacity-60 transition" @click="activeNav = true">
        <img
          v-if="nowLogin"
          :src="getIcon"
          class="
            rounded-full
            w-12
            h-12
            cursor-pointer
            pointer-events-none
            shadow-md
          "
        />
      </button>
    </div>
    <!-- navigation -->
    <div
      v-if="activeNav"
      class="
        shadow-2xl
        rounded-xl
        absolute
        top-24
        right-6
        w-60
        py-5
        px-8
        bg-gray-700
        opacity-90
        z-50
        menu
      "
    >
      <!-- icon -->
      <img
        :src="getIcon"
        class="rounded-full w-16 h-16 mx-auto my-1 pointer-events-none"
      />
      <!-- name -->
      <div class="text-gray-200 mb-6">
        {{ getName }}
      </div>
      <div class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto" />
      <div
        v-for="(menuItem, index) in menuItems"
        :key="index"
        @click="activeNav = !activeNav"
      >
        <!-- my profile link -->
        <nuxt-link
          class="
            grid
            py-1
            px-2
            my-3
            mx-auto
            rounded
            hover:text-white
            hover:underline
            text-gray-200
          "
          :to="`/users/${getUserId}${index === 0 ? '/draft' : ''}`"
        >
          {{ menuItem }}
        </nuxt-link>
      </div>
      <div class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto" />
      <!-- logout button -->
      <button
        class="
          py-1
          px-5
          mt-5
          mb-2
          rounded
          bg-transparent
          hover:text-white
          hover:border-2
          transition
          border-solid border border-gray-200
          text-gray-200
        "
        @click="clickLogout"
      >
        ログアウト
      </button>
    </div>
    <div
      v-if="activeNav"
      class="fixed w-full h-full z-40"
      @click="activeNav = !activeNav"
    />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import { authStore } from '@/store'

@Component({
  components: {
    BaseTextButton
  }
})
export default class Header extends Vue {
  activeNav: Boolean = false
  menuItems: string[] = ['下書き', 'マイページ']

  get nowLogin() {
    return authStore.nowLogin
  }

  get getIcon() {
    return authStore.getUser.avatar_url
  }

  get getName() {
    return authStore.getUser.name
  }

  get getUserId() {
    return authStore.getUser.id
  }

  clickLogin() {
    authStore.authDiscord()
  }

  clickLogout() {
    authStore.setUser({
      id: '',
      name: '',
      display_name: '',
      created_at: '',
      updated_at: ''
    })
    authStore.setAccessToken('')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('toybox-auth')
    if (this.$route.path === '/') {
      location.reload()
    } else {
      this.activeNav = !this.activeNav
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.menu::after {
  position: absolute;
  display: inline-block;
  content: '';
  border: 15px solid transparent;
  border-bottom-color: rgba(55, 65, 81, 1);
  top: -30px;
  right: 25px;
  left: auto;
}
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
  border-bottom: 50px solid #ffeed4;
  border-top: 0;
  transform: rotate(45deg);
}
</style>
