<template>
  <div class="border border-gray-300 rounded-3xl px-10 py-5 w-[45rem] mx-auto">
    <p>絞り込み</p>
    <div class="flex items-center my-3">
      <font-awesome-icon class="w-7" :icon="['fas', 'users']" />
      <span class="mx-3">コミュニティ</span>
      <div class="w-0.5 h-7 mx-7 border border-gray-500" />
      <base-tag
        v-for="(community, index) in communities"
        :key="index"
        :text="community.name"
        class="
          mx-1.5
          px-5
          py-0.5
          cursor-pointer
          bg-white
          transform
          transition-colors
          border-gray-400
          hover:border-gray-600
          select-none
        "
        :class="{
          'bg-blue-100': Object.values($route.query).includes(community.name)
        }"
        @click.native="selectingCommunities(community.name)"
      />
    </div>
    <div class="flex items-center my-3">
      <font-awesome-icon class="w-7" :icon="['fas', 'tags']" />
      <span class="mx-3">タグ</span>
      <div class="w-0.5 h-7 mx-7 border border-gray-500" />
      <base-tag
        v-for="(tag, index) in tags"
        :key="index"
        :text="tag"
        class="
          mx-1.5
          px-5
          py-0.5
          cursor-pointer
          border-gray-400
          hover:border-gray-600
          select-none
        "
      />
      <font-awesome-icon
        class="w-7 cursor-pointer mx-2"
        :icon="['fas', 'plus-circle']"
        @click="openTagSelector"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseTag from '@/components/commons/BaseTag.vue'
import { Community } from '@/types'
import { modalStore } from '~/store'
import TagSelector from './TagSelector.vue'

@Component({
  components: {
    BaseTag
  }
})
export default class WorksFilter extends Vue {
  @Prop({ type: Array, required: true })
  communities!: Array<Community>

  tags: Array<string> = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
  selectCommunityNum: number = 0

  selectingCommunities(index: string) {
    if (Object.keys(this.$route.query).length === 0) {
      this.selectCommunityNum = 1
      this.$router.push(`${this.$route.fullPath}?c1=${index}`)
    } else if (Object.values(this.$route.query).includes(index)) {
      const newQuery = Object.values(this.$route.query).filter(
        (item) => String(item).match(index) === null
      )
      let url = '/works?'
      let queryNum = 1
      newQuery.forEach((i) => {
        if (queryNum >= 2) {
          url += '&'
        }
        url += `c${queryNum}=${i}`
        queryNum++
        this.selectCommunityNum = queryNum - 1
      })
      this.$router.push(url)
    } else {
      this.selectCommunityNum += 1
      this.$router.push(
        `${this.$route.fullPath}&c${this.selectCommunityNum}=${index}`
      )
    }
  }

  openTagSelector() {
    modalStore.setModalComponent(TagSelector)
  }
}
</script>
