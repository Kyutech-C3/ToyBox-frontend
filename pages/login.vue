<template>
  <div class="flex justify-center items-center w-[100vw] h-[60vh]">
    <div
      class="
        flex
        justify-center
        items-center
        flex-col
        rounded-3xl
        border border-gray-400
        py-10
        px-20
        mb-10
        bg-white
      "
    >
      <div class="text-center mb-10">
        C3部員のみログインできます。<br />C3部員以外の方はログインせずにお楽しみください！
      </div>
      <div>
        <base-text-button title="戻る" color="gray" @click="backPage" />
        <base-text-button title="Discordでログイン" @click="authDiscord" />
      </div>
    </div>
  </div>
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
export default class Login extends Vue {
  authDiscord() {
    authStore.authDiscord()
    this.$gtag('event', 'login_button_auth')
  }

  backPage() {
    window.history.back()
  }
}
</script>
