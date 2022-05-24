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
      gap-y-3
    "
  >
    <div class="w-full flex flex-row justify-end">
      <font-awesome-icon
        class="w-7 cursor-pointer"
        :icon="['fas', 'xmark']"
        @click="$emit('close')"
      />
    </div>
    <div class="w-full flex flex-row flex-wrap gap-y-3">
      <div v-for="tag in tags" :key="tag.id" @click="selectTag(tag)">
        <BaseTag :text="tag.name" :selected="isSelected(tag)"></BaseTag>
      </div>
    </div>
    <div class="w-full flex flex-row justify-end">
      <BaseButton title="完了" @click="close"></BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseTag from '../commons/BaseTag.vue'
import BaseButton from '../commons/BaseButton.vue'
import { modalStore, tagStore, workFilterStore } from '~/store'
import { Tag } from '~/types'

/**
 * Workの絞り込み条件を保持するStore
 */
@Component({
  components: {
    BaseTag,
    BaseButton
  }
})
export default class WorkFilter extends Vue {
  get tags() {
    return tagStore.getTags
  }

  get selectedTags() {
    const tags = tagStore.getTags
    const selectedTags = workFilterStore.getFilterTags
    return tags.filter((t) => selectedTags.some((st) => st.id === t.id))
  }

  isSelected(tag: Tag) {
    return workFilterStore.getFilterTags.some((t) => t.id === tag.id)
  }

  async created() {
    // タグをサーバーから取得し
    await tagStore.fetchTags()
  }

  selectTag(tag: Tag) {
    if (!this.isSelected(tag)) workFilterStore.addFilterTag(tag)
    else workFilterStore.deleteFilterTag(tag)
  }

  close() {
    modalStore.close()
  }
}
</script>
