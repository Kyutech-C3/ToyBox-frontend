<template>
  <div>
    <div
      class="
        bg-hover-base-button-color
        py-1
        mb-4
        w-full
        rounded-md
        overflow-x-auto overflow-y-clip
      "
    >
      <div class="px-4 flex items-center gap-2 h-40">
        <div
          v-for="asset in assets"
          class="
            flex
            w-36
            h-36
            min-w-[9rem]
            justify-center
            items-center
            relative
            bg-gray-700
            rounded-sm
          "
        >
          <img
            :src="asset.url"
            class="w-36 h-36"
            v-if="asset.asset_type === 'image'"
          />
          <video
            width="144px"
            height="144px"
            class="w-36 h-36"
            webkit-playsinline
            playsinline
            muted
            autoplay
            loop
            v-if="asset.asset_type === 'video'"
          >
            <source :src="asset.url" type="video/mp4" />
            <source :src="asset.url" type="video/quicktime" />
          </video>
          <div class="z-50 absolute right-2 top-2">
            <base-icon-button
              :size="'small'"
              :font-awesome="{
                type: 'fas',
                name: 'up-right-and-down-left-from-center'
              }"
              @click="() => insertAssetUrl(asset.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import BaseIconButton from '@/components/commons/BaseIconButton.vue'

import { BlogAsset } from '~/types'

@Component({
  components: {
    BaseIconButton
  }
})
export default class FormAssetList extends Vue {
  @Prop({ type: Array, required: true })
  assets!: BlogAsset[]

  @Prop({ type: Function, required: true })
  insertAssetUrl!: (asset_id: string) => void
}
</script>
