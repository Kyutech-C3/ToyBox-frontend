<template>
  <footer 
    class="
      py-20
      text-center
      justify-around
      border-solid border-2 border-gray-200
      flex
      w-full
    "
  >
    <div 
      class="
        grid
        justify-start
        absolute
        left-10
      "
    >
      <nuxt-link 
        to="/"
        class="
          hover:opacity-50
          transition
        "
      >
        <div
          class="
            text-5xl
            text-gray-600
          "
        >
          ToyBoxLogo
        </div>
      </nuxt-link>
      <small class="m-2">
        © C3 2021 - {{ date }}
      </small>
    </div>
    <ul 
      class="
        justify-center
        flex
      "
    >
      <li class="mx-8">
        <a href="https://compositecomputer.club" target="_blank">
          <img
            src="../assets/image/C3logo.png"
            class="
              hover:opacity-50
              transition
              w-12
              h-12
            "
          >
        </a>
      </li>
      <li class="mx-8">
        <a href="https://www.youtube.com/channel/UCeRY2jujVBYRqmilrCZytFw/featured" target="_blank">
          <font-awesome-icon 
            :icon="['fab', 'youtube']"
            class="
              hover:opacity-50
              transition
              text-3xl
              w-10
              h-10
            "
          /> 
        </a>
      </li>
      <li class="mx-8">
        <a href="https://twitter.com/c3_kyutech?s=20" target="_blank">
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="
              hover:opacity-50
              transition
              text-3xl
              w-10
              h-10
            "
          />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {  },
  data(): {
    date: string
  } {
    return {
      date: '2021'
    }
  },
})
</script>
