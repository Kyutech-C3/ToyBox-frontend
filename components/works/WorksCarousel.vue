<template>
  <hooper
    :settings="hooperSettings"
    class="bg-black rounded-t-2xl overflow-hidden pb-5 relative"
  >
    <slide
      v-for="asset in showAssets"
      :key="asset.id"
      class="flex justify-center items-center h-96 relative"
    >
      <item-image v-if="asset.asset_type === 'image'" :image="asset" />
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
      <!-- <div v-else>{{ asset.asset_type }} file is not supported.</div> -->
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

import ItemImage from '@/components/works/carouselItem/Image.vue'

import { Asset } from '@/types'

@Component({
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
    ItemImage
  }
})
export default class WorksCarousel extends Vue {
  showAssets: Asset[] = []
  showAssetsType: string[] = ['image', 'video', 'music', 'model']

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  hooperSettings: any = {
    infiniteScroll: true,
    centerMode: true,
    keysControl: false,
    itemsToShow: 1,
    mouseDrag: false,
    transition: 1000
  }

  created() {
    for (let i = 0; i < this.assets.length; i++) {
      if (this.showAssetsType.includes(this.assets[i].asset_type)) {
        this.showAssets.push(this.assets[i])
      }
    }
  }

  getURL(asset: Asset): string {
    return `${process.env.ASSET_BASE_URL}/${asset.asset_type}/${asset.id}/origin.${asset.extention}`
  }
}
</script>

<style scoped>
.hooper {
  height: 39vw;
}
</style>
