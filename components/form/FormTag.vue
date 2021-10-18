<template>
  <div class="flex items-center">
    <form-label name="タグ" />
    <div class="w-48 p-2 ring-1 rounded-xl focus:outline-none focus:ring-blue-600  text-center text-xl">
      <font-awesome-icon class="w-7 m-auto" :icon="['fas', 'plus']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FormLabel from '~/components/form/FormLabel.vue'

@Component({
  components: {
    FormLabel
  }
})
export default class FormTag extends Vue {
}
</script>
