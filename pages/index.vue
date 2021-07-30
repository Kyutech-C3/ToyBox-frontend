<template>
  <div class="container">
    <div>
      <sample :sample="prop" />
    </div>
    <div v-if="getUser.id !== ''">
      <p>{{ getUser.username }}</p>
      <img :src="getIconURL">
      <p>あなたはC3メンバーですか？{{ isC3Member }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Sample from '~/components/Sample.vue'
import { AuthStore } from '~/store'

@Component({
  components: {
    Sample
  }
})

export default class Index extends Vue {
  prop = 'sample'

  get getUser () {
    return AuthStore.getUser
  }

  get getIconURL () {
    return `https://cdn.discordapp.com/avatars/${this.getUser.id}/${this.getUser.avatar}`
  }

  get isC3Member () {
    return AuthStore.isC3Menber
  }
}
</script>

<style>
</style>
