<template>
  <header class="py-3 text-center justify-around flex w-full h-24 relative">
    <div
      v-if="!nowLogin"
      class="triangle absolute -top-5 -right-10"
      @click="$router.push('/login')"
    ></div>
    <div class="h-24 absolute top-0 left-1/2 -translate-x-1/2">
      <nuxt-link to="/" class="hover:opacity-50 h-full">
        <img
          src="@/assets/image/ToyBoxlogo.png"
          class="h-full"
          alt="ToyBox logo"
        />
      </nuxt-link>
    </div>
    <div
      class="flex justify-start items-center absolute right-10 top-0 bottom-0"
    >
      <!-- バグ・要望フォーム -->
      <a
        v-if="nowLogin"
        href="https://forms.gle/ndPfoZNgUFqrJHQj8"
        target="_blank"
        title="バグ・要望フォーム"
        name="バグ・要望フォーム"
        charset="UTF-8"
        type="text/html"
        class="
          mr-5
          text-base-light-text-color
          hover:text-hover-base-text-color
          flex
          justify-center
        "
      >
        <span class="text-xs mr-2">バグ・要望フォーム</span>
        <font-awesome-icon :icon="['fas', 'vote-yea']" class="w-5 m-0" />
      </a>
      <!-- ヘルプ -->
      <a
        :href="
          nowLogin
            ? 'https://chivalrous-botany-faf.notion.site/ToyBox-876fd578573a418b99bbfe6d3973aa91'
            : 'https://chivalrous-botany-faf.notion.site/ToyBox-8ee26f10ff4e45d9aa19a69850b7e68d'
        "
        target="_blank"
        title="ヘルプ"
        name="ヘルプ"
        charset="UTF-8"
        type="text/html"
        class="mr-5"
      >
        <font-awesome-icon
          :icon="['far', 'question-circle']"
          class="
            w-5
            text-base-light-text-color
            hover:text-hover-base-text-color
          "
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
            bg-white
          "
          alt="user icon"
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
        alt="user icon"
      />
      <!-- name -->
      <div class="text-gray-200 mb-6">
        {{ getDisplayName }}
      </div>
      <div class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto" />
      <div @click="activeNav = !activeNav">
        <!-- my profile link -->
        <div
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
          @click="toDraftPage"
        >
          下書き
        </div>
      </div>
      <div @click="activeNav = !activeNav">
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
          :to="`/users/${getUserId}`"
        >
          マイページ
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
import { authStore, workFilterStore } from '@/store'

@Component({
  components: {
    BaseTextButton
  }
})
export default class Header extends Vue {
  activeNav: Boolean = false

  get nowLogin() {
    return authStore.nowLogin
  }

  get getIcon() {
    return authStore.getUser.avatar_url
  }

  get getDisplayName() {
    return authStore.getUser.display_name
  }

  get getUserId() {
    return authStore.getUser.id
  }

  toDraftPage() {
    workFilterStore.setOnPageName('menu')
    workFilterStore.setFilterVisibility('draft')
    this.$router.push(`/users/${this.getUserId}#user_work`)
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
  border-bottom: 50px solid var(--bg-color);
  border-top: 0;
  transform: rotate(45deg);
}
</style>
