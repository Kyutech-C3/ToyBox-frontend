<template>
  <div
    class="
      flex flex-col
      items-center
      border border-gray-400
      rounded-2xl
      px-10
      py-4
    "
  >
    <textarea
      v-model="inputText"
      class="w-full h-20 mb-1 border-b focus:outline-0 resize-none"
      placeholder="コメント"
      maxlength="100"
    />
    <p class="w-full mb-3 text-right text-gray-500">
      {{ inputText.length }} / 100
    </p>
    <base-button title="送信" class="px-10 self-end" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'

@Component({
  components: {
    BaseTextButton
  }
})
export default class CommentsField extends Vue {
  inputText: string = ''
}
</script>

<style scoped></style>
