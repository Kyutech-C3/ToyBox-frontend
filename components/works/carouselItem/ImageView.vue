<template>
  <div class="relative overflow-hidden h-full w-full">
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
      :src="image.url"
      alt="asset image"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Asset } from '@/types'

@Component({
  components: {}
})
export default class ImageView extends Vue {
  @Prop({ type: Object, required: true })
  image!: Asset
}
</script>
