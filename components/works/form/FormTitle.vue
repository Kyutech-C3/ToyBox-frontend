<template>
  <div class="flex items-center">
    <form-label name="タイトル" :required="true" />
    <input
      v-model="title"
      type="text"
      name="text/title"
      placeholder="title"
      required
      class="
        w-full
        text-lg
        border-b-2 border-gray-300
        placeholder-gray-500
        pl-[3px]
        focus:outline-none
        focus:border-gray-400
      "
      @change="changeBlockUnloadState"
      @keyup="changeBlockUnloadState"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'
import { workPostStore } from '@/store'

@Component({
  components: {
    FormLabel
  }
})
export default class FormTitle extends Vue {
  @VModel({ type: String })
  title!: string

  changeBlockUnloadState() {
    workPostStore.changeIsBlockUnload()
  }
}
</script>
