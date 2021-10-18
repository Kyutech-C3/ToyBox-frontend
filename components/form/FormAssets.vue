<template>
  <div class="flex">
    <form-label class="flex-shrink-0" name="アセット" />
    <div class="flex flex-wrap">
      <div v-for="(imageURL, i) in assetImage" :key="i" class="relative  mr-5 flex-shrink-0 mb-5">
        <font-awesome-icon class="w-4 absolute top-1 right-2 opacity-60 cursor-pointer" :icon="['fas', 'times']" @click="deleteAsset(imageURL)" />
        <form-image-preview :image-u-r-l="imageURL" />
      </div>
      <form-thumbnail v-model="assetImage" class="flex-shrink-0" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import FormThumbnail from '~/components/form/FormThumbnail.vue'
import FormImagePreview from '~/components/form/FormImagePreview.vue'
import FormLabel from '~/components/form/FormLabel.vue'
@Component({
  components: {
    FormThumbnail,
    FormImagePreview,
    FormLabel
  }
})

export default class FormAssets extends Vue {
  @VModel({ type: String })
  thumbnailImg!: string

  assetImage = [] as string[]

  deleteAsset (url: string) {
    this.assetImage = this.assetImage.filter(n => n !== url)
  }
}
</script>
