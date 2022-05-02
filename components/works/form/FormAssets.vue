<template>
  <div class="flex">
    <form-label name="アセット" />
    <div class="flex flex-wrap">
      <div
        v-for="(imageURL, i) in assetImage"
        :key="i"
        class="relative mb-5 mr-5"
      >
        <font-awesome-icon
          class="w-4 absolute top-1 right-2 opacity-60 cursor-pointer"
          :icon="['fas', 'times']"
          @click="deleteAsset(i)"
        />
        <form-image-preview :image-url="imageURL" />
      </div>
      <form-thumbnail v-model="assetImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormImagePreview from '@/components/works/form/FormImagePreview.vue'
import FormThumbnail from '@/components/works/form/FormThumbnail.vue'

@Component({
  components: {
    FormLabel,
    FormImagePreview,
    FormThumbnail
  }
})
export default class FormAssets extends Vue {
  @VModel({ type: Array })
  assetImage!: string[]

  deleteAsset(number: number) {
    this.assetImage = this.assetImage.filter((_, index) => {
      return number !== index
    })
  }
}
</script>
