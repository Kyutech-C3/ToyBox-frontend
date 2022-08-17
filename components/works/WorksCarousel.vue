<template>
  <hooper
    :settings="hooperSettings"
    class="bg-gray-100 rounded-t-2xl overflow-hidden"
  >
    <slide
      v-for="asset in assets"
      :key="asset.id"
      class="flex justify-center items-center h-96"
    >
      <div
        v-if="asset.asset_type === 'image'"
        class="m-0 relative h-full w-full overflow-hidden"
      >
        <img
          class="
            w-full
            h-full
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2 -translate-y-1/2
            object-contain
          "
          :src="getURL(asset)"
          alt="asset image"
        />
      </div>
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
    keysControl: false,
    itemsToShow: 1,
    mouseDrag: false,
    transition: 1000
  }

  getURL(asset: Asset): string {
    return `${process.env.ASSET_BASE_URL}/${asset.asset_type}/${asset.id}/origin.${asset.extention}`
  }
}
</script>

<style scoped>
.hooper {
  height: 45vw;
}
</style>
