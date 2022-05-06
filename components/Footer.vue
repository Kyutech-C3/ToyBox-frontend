<template>
  <footer class="py-8 border-solid border-t-2 border-gray-200 w-full">
    <div class="flex justify-center">
      <a class="mx-8" href="https://compositecomputer.club" target="_blank">
        <img
          src="../assets/image/C3logo.png"
          class="hover:opacity-50 transition h-10"
        />
      </a>
      <a
        class="mx-8"
        href="https://www.youtube.com/channel/UCeRY2jujVBYRqmilrCZytFw"
        target="_blank"
      >
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          class="hover:opacity-50 transition text-3xl h-10"
        />
      </a>
      <a class="mx-8" href="https://twitter.com/c3_kyutech" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          class="hover:opacity-50 transition text-3xl h-10"
        />
      </a>
    </div>
    <div class="text-center my-6">© C3 2021 - {{ date }}</div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class WorksCard extends Vue {
  date: number = new Date().getFullYear()
}
</script>
