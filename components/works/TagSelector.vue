<template>
  <div
    class="
      border-2 border-black
      rounded-3xl
      px-10
      py-5
      w-[45rem]
      mx-auto
      bg-white
      flex flex-col
    "
  >
    <div class="w-full flex flex-row justify-end">
      <font-awesome-icon
        class="w-7 cursor-pointer"
        :icon="['fas', 'xmark']"
        @click="$emit('close')"
      />
    </div>
    <div class="w-full flex flex-row">
      <div v-for="tag in tags" :key="tag">
        <BaseTag :text="tag"></BaseTag>
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <BaseButton title="完了"></BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseTag from '../commons/BaseTag.vue'
import BaseButton from '../commons/BaseButton.vue'

@Component({
  components: {
    BaseTag,
    BaseButton
  }
})
export default class TagSelector extends Vue {
  get tags() {
    return ['hoge', 'fuga']
  }
}
</script>
