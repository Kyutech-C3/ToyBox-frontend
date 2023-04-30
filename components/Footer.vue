<template>
  <footer class="py-8 w-full text-base-text-color">
    <div class="flex justify-center">
      <a class="mx-8" href="https://compositecomputer.club" target="_blank">
        <img
          src="../assets/images/C3logo.png"
          class="hover:opacity-50 transition h-10"
          alt="C3 logo"
        />
      </a>
      <a
        class="mx-8"
        href="https://www.youtube.com/channel/UCeRY2jujVBYRqmilrCZytFw"
        target="_blank"
      >
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          class="hover:opacity-50 transition text-3xl h-10 text-inherit"
        />
      </a>
      <a class="mx-8" href="https://twitter.com/c3_kyutech" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          class="hover:opacity-50 transition text-3xl h-10 text-inherit"
        />
      </a>
    </div>
    <div class="text-center my-6 text-base-text-color">
      © 2022 - {{ date }} Composite Computer Club
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class WorksCard extends Vue {
  date: number = new Date().getFullYear()
}
</script>
