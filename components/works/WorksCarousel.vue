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
        :src="getURL(asset)"
        alt="asset image"
      />
      <video v-else-if="asset.asset_type === 'video'" controls>
        <source :src="getURL(asset)" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <audio
        v-else-if="asset.asset_type === 'music'"
        controls
        :src="getURL(asset)"
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
import { Asset } from '@/types'

@Component({
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  }
})
export default class WorksCarousel extends Vue {
  @Prop({ type: Array, required: true })
  assets!: Asset

  hooperSettings: any = {
    infiniteScroll: true,
    centerMode: true,
    keysControl: false
  }

  getURL(asset: Asset): string {
    return `${process.env.ASSET_BASE_URL}/${asset.asset_type}/${asset.id}/origin.${asset.extention}`
  }
}
</script>

<style scoped>
.hooper {
  height: 500px;
}
</style>
