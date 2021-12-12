<template>
  <div class="flex items-start">
    <form-label :name="count" />
    <div class="flex flex-col">
      <div
        v-for="(url, i) in urls"
        :key="i"
        class="flex items-center cursor-pointer"
        :class="{'mb-10': urls.length > 1}"
      >
        <font-awesome-icon class="w-6 mr-3" :icon="whichIcon(i)" />
        <input
          v-model="urls[i].url"
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          pattern="https://.*"
          class="w-72 text-xl border-b-2 placeholder-gray-400 focus:outline-none focus:border-black"
        >
        <font-awesome-icon class="w-5 mx-5" :icon="['fas', 'times']" @click="deleteURL(i)" />
      </div>
    </div>
    <font-awesome-icon
      v-if="urls.length < 5"
      class="w-7 cursor-pointer"
      :icon="['fas', 'plus']"
      :class="{ 'ml-20': urls.length > 0 }"
      @click="addURL()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import { BaseURL } from '~/types'

@Component
export default class FormURL extends Vue {
  @VModel({ type: Array })
  urls!: BaseURL[]

  get count () {
    return `URL ${this.urls.length}/5`
  }

  addURL () {
    this.urls.push({ url: '', url_type: 'other' })
  }

  deleteURL (number: number) {
    this.urls = this.urls.filter((_, index) => {
      return number !== index
    })
  }

  whichIcon (index: number) {
    const url = this.urls[index].url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    const domain = (url !== undefined && url !== null) ? url[1] : false
    if (!domain) { return ['fas', 'link'] }

    switch (domain) {
      case 'github.com':
        return ['fab', 'github']
      case 'www.youtube.com':
      case 'youtu.be':
        return ['fab', 'youtube']
      case 'twitter.com':
        return ['fab', 'twitter']
      default:
        return ['fas', 'link']
    }
  }
}
</script>
