<template>
  <hooper :settings="hooperSettings">
    <slide>
      <div class="bg-red-500 h-full" />
    </slide>
    <slide>
      <div class="bg-yellow-300 h-full" />
    </slide>
    <slide>
      <div class="bg-green-400 h-full" />
    </slide>
    <slide>
      <div class="bg-blue-500 h-full" />
    </slide>
    <slide>
      <div class="bg-indigo-300 h-full" />
    </slide>
    <slide>
      <div class="bg-pink-200 h-full" />
    </slide>
    <hooper-pagination slot="hooper-addons" />
    <hooper-navigation slot="hooper-addons" />
  </hooper>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper'
import 'hooper/dist/hooper.css'

@Component({
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  }
})
export default class Carousel extends Vue {
  hooperSettings: any = {
    infiniteScroll: true,
    centerMode: true,
    keysControl: false
  }
}
</script>

<style scoped>
.hooper {
  height: 500px;
}
</style>
