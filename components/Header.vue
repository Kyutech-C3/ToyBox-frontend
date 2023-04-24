<template>
  <div>
    <header
      class="
        py-3
        px-10
        mx-auto
        text-center
        flex
        w-full
        max-w-[1220px]
        h-[20vw]
        min-h-[4rem]
        max-h-24
        relative
      "
    >
      <div
        v-if="!nowLogin"
        class="triangle absolute -top-5 -right-10"
        @click="$router.push('/login')"
      />
      <nuxt-link to="/" class="hover:opacity-50 h-full">
        <img
          src="@/assets/images/ToyBoxLogo.png"
          class="h-full"
          alt="ToyBox logo"
        />
      </nuxt-link>
      <div
        class="flex justify-start items-center absolute right-10 top-0 bottom-0"
      >
        <!-- バグ・要望フォーム -->
        <a
          v-if="nowLogin && windowWidth >= 650"
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
          v-if="!nowLogin || windowWidth >= 650"
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
        <button
          v-if="nowLogin"
          class="hover:opacity-60 transition"
          @click="activeNav = true"
        >
          <user-rounded-icon :image-src="getIcon" size="large" />
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
          w-72
          py-5
          px-8
          bg-gray-700
          opacity-90
          z-50
          menu
        "
      >
        <!-- icon -->
        <user-rounded-icon
          :image-src="getIcon"
          size="xx-large"
          class="mx-auto my-3"
        />
        <!-- name -->
        <div class="text-gray-200 mb-6">
          {{ getDisplayName }}
        </div>
        <div
          class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto"
        />
        <div @click="activeNav = !activeNav">
          <!-- my profile link -->
          <div
            class="
              grid
              py-1
              px-2
              my-3
              mx-auto
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
              hover:text-white
              hover:underline
              text-gray-200
            "
            :to="`/users/${getUserId}`"
          >
            マイページ
          </nuxt-link>
        </div>
        <div
          v-if="windowWidth < 650"
          class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto"
        />
        <div v-if="windowWidth < 650" @click="activeNav = !activeNav">
          <!-- バグ・要望フォーム -->
          <a
            href="https://forms.gle/ndPfoZNgUFqrJHQj8"
            target="_blank"
            title="バグ・要望フォーム"
            name="バグ・要望フォーム"
            charset="UTF-8"
            type="text/html"
            class="
              py-1
              px-2
              my-3
              mx-auto
              flex
              justify-center
              hover:text-white
              text-gray-200
              hover:underline
            "
          >
            <font-awesome-icon :icon="['fas', 'vote-yea']" class="w-5 m-0" />
            <span class="ml-2">バグ・要望フォーム</span>
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
            class="
              py-1
              px-2
              my-3
              mx-auto
              flex
              justify-center
              hover:text-white
              text-gray-200
              hover:underline
            "
          >
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="w-5 m-0"
            />
            <span class="ml-2">ヘルプ</span>
          </a>
        </div>
        <div
          class="border-solid border-b border-gray-200 w-10/12 my-1 mx-auto"
        />
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
    </header>
    <div
      v-if="activeNav"
      class="fixed top-0 left-0 w-full h-full z-40"
      @click="activeNav = !activeNav"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'

import { authStore, workFilterStore } from '@/store'

@Component({
  components: {
    BaseTextButton,
    UserRoundedIcon
  }
})
export default class Header extends Vue {
  activeNav: Boolean = false
  windowWidth: number = window.innerWidth

  get nowLogin() {
    return authStore.nowLogin
  }

  get getIcon() {
    if (authStore.getUser.avatar_url) {
      return authStore.getUser.avatar_url
    } else {
      return ''
    }
  }

  get getDisplayName() {
    return authStore.getUser.display_name
  }

  get getUserId() {
    return authStore.getUser.id
  }

  mounted() {
    addEventListener('resize', this.handleChangeWindowWidth)
  }

  destroyed() {
    removeEventListener('resize', this.handleChangeWindowWidth)
  }

  handleChangeWindowWidth() {
    this.windowWidth = window.innerWidth
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
