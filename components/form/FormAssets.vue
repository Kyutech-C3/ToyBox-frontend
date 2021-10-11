<template>
  <div>
    <form-thumbnail v-model="assetImage" />
    <template v-for="imageURL in assetImage">
      <form-image-preview :key="imageURL.id" :image-u-r-l="imageURL" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import FormThumbnail from '~/components/form/FormThumbnail.vue'
import FormImagePreview from '~/components/form/FormImagePreview.vue'
@Component({
  components: {
    FormThumbnail,
    FormImagePreview
  }
})

export default class FormAssets extends Vue {
  @VModel({ type: String })
  thumbnailImg!: string

  assetImage = [] as string[]
}
</script>
