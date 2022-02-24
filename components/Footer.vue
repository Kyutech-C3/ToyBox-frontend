<template>
  <footer
    class="
      py-8
      text-center
      border-solid border-2 border-gray-200
      w-full
      justify-center
    "
  >
    <div class="grid text-left px-5 w-96 h-4">
      <nuxt-link to="/">
        <img
          src="../assets/image/ToyBoxlogo.png"
          class="hover:opacity-50 transition inline"
        />
      </nuxt-link>
      <div class="inline-flex">© C3 2021 - {{ date }}</div>
    </div>
    <div class="justify-center">
      <ul class="justify-center flex">
        <li class="mx-8">
          <a href="https://compositecomputer.club" target="_blank">
            <img
              src="../assets/image/C3logo.png"
              class="hover:opacity-50 transition w-12 h-12 my-5 align-bottom"
            />
          </a>
        </li>
        <li class="mx-8">
          <a
            href="https://www.youtube.com/channel/UCeRY2jujVBYRqmilrCZytFw/featured"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'youtube']"
              class="hover:opacity-50 transition text-3xl w-10 h-10 my-5"
            />
          </a>
        </li>
        <li class="mx-8">
          <a href="https://twitter.com/c3_kyutech?s=20" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'twitter']"
              class="hover:opacity-50 transition text-3xl w-10 h-10 my-5"
            />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {},
  data(): {
    date: string;
  } {
    return {
      date: "2022",
    };
  },
});
</script>
