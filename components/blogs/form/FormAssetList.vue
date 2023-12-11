<template>
  <div>
    <div
      class="
        bg-gray-100
        py-1
        px-4
        mb-4
        w-full
        rounded-md
        overflow-x-auto overflow-y-clip
      "
    >
      <div class="flex items-center gap-2 h-40">
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
            bg-white
            rounded-md
            overflow-hidden
          "
        >
          <img
            :src="asset.url"
            class="object-contain w-full h-full"
            v-if="asset.asset_type === 'image'"
          />
          <video
            width="144px"
            height="144px"
            class="object-contain w-full h-full"
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
          <div
            class="
              z-50
              absolute
              right-2
              bottom-2
              flex
              items-center
              gap-2
              select-none
            "
          >
            <button
              @click="() => insertAssetUrl(asset.id)"
              class="text-xs rounded-md py-1 px-3 text-white bg-slate-800/40"
            >
              挿入
            </button>
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
