<template>
  <hooper :settings="hooperSettings" class="bg-blue-200">
    <slide
      v-for="asset in assets"
      :key="asset.id"
      class="flex justify-center items-center"
    >
      <img
        v-if="asset.asset_type === 'image'"
        class="m-auto h-full"
        :src="`https://kodomobeya.compositecomputer.club/static/image/${asset.id}/origin.png`"
        alt="asset image"
      />
      <video v-else-if="asset.asset_type === 'video'" controls>
        <source
          :src="`https://kodomobeya.compositecomputer.club/static/video/${asset.id}/origin.mp4`"
          type="video/mp4"
        />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <audio
        v-else-if="asset.asset_type === 'music'"
        controls
        :src="`https://kodomobeya.compositecomputer.club/static/music/${asset.id}/origin.mp3`"
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div v-else>{{ asset.asset_type }} file is not supported.</div>
    </slide>
    <hooper-pagination slot="hooper-addons" />
    <hooper-navigation slot="hooper-addons" />
  </hooper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
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
  @Prop({ type: Array, required: true })
  assets!: Object

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
