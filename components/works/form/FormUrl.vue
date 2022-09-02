<template>
  <div class="flex items-start">
    <form-label :name="count" :show-warning="false" />
    <div class="flex flex-col">
      <div
        v-for="(url, i) in urls"
        :key="i"
        class="flex items-center cursor-pointer"
        :class="{ 'mb-10': urls.length > 1 }"
      >
        <font-awesome-icon class="w-6 mr-3" :icon="whichIcon(i)" />
        <input
          v-model="urls[i].url"
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          pattern="https://.*"
          class="
            w-72
            text-lg
            border-b-2
            placeholder-gray-400
            focus:outline-none
            focus:border-black
          "
          @keyup="changeBlockUnloadState"
        />
        <font-awesome-icon
          class="w-5 mx-5"
          :icon="['fas', 'times']"
          @click="deleteURL(i)"
        />
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
import { Component, Vue, VModel, Emit } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import { UrlInfo } from '@/types'
import { workPostStore } from '@/store'

@Component({
  components: {
    FormLabel
  }
})
export default class FormUrl extends Vue {
  @VModel({ type: Array })
  urls!: UrlInfo[]

  changeBlockUnloadState() {
    workPostStore.changeIsBlockUnload()
  }

  get count() {
    return `URL ${this.urls.length}/5`
  }

  addURL() {
    this.urls.push({
      url: '',
      url_type: 'other',
      id: '',
      user: {
        id: '',
        name: '',
        email: '',
        display_name: '',
        created_at: '',
        updated_at: ''
      },
      created_at: '',
      updated_at: ''
    })
  }

  deleteURL(number: number) {
    this.urls = this.urls.filter((_, index) => {
      return number !== index
    })
    workPostStore.changeIsBlockUnload()
  }

  whichIcon(index: number) {
    const url = this.urls[index].url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    const domain = url !== undefined && url !== null ? url[1] : false
    if (!domain) {
      return ['fas', 'link']
    }

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
