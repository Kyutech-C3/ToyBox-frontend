<template>
  <div class="flex items-center">
    <form-label name="タグ" />
    <div
      class="
        w-48
        p-2
        border-2
        rounded-xl
        border-gray-400
        text-center text-xl
        cursor-pointer
      "
    >
      <font-awesome-icon class="w-7 m-auto" :icon="['fas', 'plus']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FormLabel from '@/components/works/form/FormLabel.vue'

@Component({
  components: {
    FormLabel
  }
})
export default class FormTag extends Vue {}
</script>
