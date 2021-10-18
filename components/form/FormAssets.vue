<template>
  <div class="flex">
    <form-label name="アセット" />
    <div v-for="(imageURL, i) in assetImage" :key="i" class="relative mr-5">
      <font-awesome-icon class="w-4 absolute top-1 right-2 opacity-60 cursor-pointer" :icon="['fas', 'times']" @click="deleteAsset(i)" />
      <form-image-preview :image-u-r-l="imageURL" />
    </div>
    <form-thumbnail v-model="assetImage" />
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

  deleteAsset (number: number) {
    this.assetImage = this.assetImage.splice(0, number)
  }
}
</script>
