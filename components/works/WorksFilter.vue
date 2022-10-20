<template>
  <div
    class="
      border border-gray-300
      rounded-3xl
      px-10
      py-5
      w-[45rem]
      mx-auto
      relative
    "
  >
    <p>絞り込み</p>
    <div class="flex items-center my-3 w-full mb-6">
      <font-awesome-icon class="w-7" :icon="['fas', 'tags']" />
      <span class="mx-3 w-20">タグ</span>
      <tag-selecter :use-type="'filter'" />
    </div>
    <div v-if="getNowLogin" class="flex items-center my-3 w-full">
      <font-awesome-icon class="w-5" :icon="['fas', 'globe']" />
      <span class="mx-3 w-20">公開範囲</span>
      <base-tag
        v-for="(visibility, index) in visibilities"
        :key="index"
        :pointer="true"
        :size="'small'"
        :text="visibility"
        :selected="getFilterVisibility === visibility"
        class="mr-2"
        @click="onClickFilterVisibilities(visibility)"
      />
    </div>
    <div class="absolute bottom-7 right-10 flex items-center">
      <div class="cursor-pointer" @click="(event) => $emit('clear', event)">
        <font-awesome-icon
          class="w-7 mr-5"
          :class="{
            'pointer-events-none text-gray-400':
              getSearched &&
              getFilterVisibility === '' &&
              getSelectedTags.length === 0
          }"
          :icon="['fas', 'minus']"
        />
      </div>
      <div
        class="cursor-pointer"
        :class="{
          'pointer-events-none text-gray-400': getSearched
        }"
        @click="(event) => $emit('search', event)"
      >
        <font-awesome-icon class="w-7" :icon="['fas', 'search']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'

import TagSelecter from '@/components/commons/TagSelecter.vue'
import BaseTag from '@/components/commons/BaseTag.vue'

import { Visibility } from '@/types'
import { authStore, workFilterStore, tagSelectorStore } from '@/store'

@Component({
  components: {
    TagSelecter,
    BaseTag
  }
})
export default class WorksFilter extends Vue {
  visibilities: Visibility[] = ['public', 'private']

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getFilterVisibility() {
    return workFilterStore.getFilterVisibility
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getSearched() {
    return workFilterStore.getSearched
  }

  @Prop({ type: Boolean, required: false, default: false })
  includeDraft!: boolean

  @Watch('getSelectedTags')
  onChangeSelectedTags() {
    workFilterStore.setSearched(false)
  }

  created() {
    if (this.includeDraft) {
      this.visibilities.push('draft')
    }
  }

  onClickFilterVisibilities(visibility: Visibility) {
    workFilterStore.setSearched(false)
    if (this.getFilterVisibility === visibility) {
      workFilterStore.deleteFilterVisibility()
    } else {
      workFilterStore.setFilterVisibility(visibility)
    }
  }
}
</script>
