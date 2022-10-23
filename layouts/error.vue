<template>
  <div class="flex justify-center items-center flex-col w-[100vw] h-[60vh]">
    <div
      class="
        flex
        justify-center
        items-center
        flex-col
        w-1/2
        h-1/3
        rounded-3xl
        border border-gray-400
        py-10
        px-20
        mb-10
        bg-white
      "
    >
      <div>{{ error.statusCode }}</div>
      <div>{{ error.message }}</div>
    </div>
    <base-text-button
      :title="'Homeに戻る'"
      :color="'yellow'"
      @click="$router.push('/')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'

@Component({
  components: {
    BaseTextButton
  }
})
export default class Error extends Vue {
  @Prop({ type: Object, required: true })
  error!: { statusCode: number; message: string }
}
</script>
