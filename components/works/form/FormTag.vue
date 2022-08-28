<template>
  <div class="flex items-center">
    <form-label name="タグ" :required="true" />
    <tag-selecter v-model="postTags" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

import FormLabel from '@/components/works/form/FormLabel.vue'
import TagSelecter from '@/components/commons/TagSelecter.vue'

@Component({
  components: {
    FormLabel,
    TagSelecter
  }
})
export default class FormTag extends Vue {
  @VModel({ type: Array, required: true })
  postTags!: string[]
}
</script>
