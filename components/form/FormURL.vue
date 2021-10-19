<template>
  <div class="flex items-start">
    <form-label :name="count" />
    <div class="flex flex-col">
      <div
        v-for="(url, i) in urls"
        :key="i"
        class="flex items-center"
        :class="{'mb-10': urls.length > 1}"
      >
        <input
          v-model="urls[i]"
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          pattern="https://.*"
          class="w-72 text-xl border-b-2 placeholder-gray-400 focus:outline-none focus:border-black"
        >
        <font-awesome-icon class="w-5 mx-3" :icon="['fas', 'times']" @click="deleteURL(i)" />
      </div>
    </div>
    <font-awesome-icon
      v-if="urls.length !== 5"
      class="w-7"
      :icon="['fas', 'plus']"
      :class="{ 'ml-20': urls.length > 0 }"
      @click="addURL()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import FormLabel from '~/components/form/FormLabel.vue'

@Component({
  components: {
    FormLabel
  }
})
export default class FormURL extends Vue {
  @VModel({ type: Array })
  urls!: string[]

  get count () {
    return `URL ${this.urls.length}/5`
  }

  addURL () {
    this.urls.push('')
  }

  deleteURL (number: number) {
    this.urls = this.urls.filter((value, index) => {
      return number !== index
    })
  }
}
</script>
