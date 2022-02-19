<template>
  <div class="border border-gray-400 rounded-3xl px-10 py-5">
    <div>絞り込み</div>
    <div class="flex items-center my-3">
      <font-awesome-icon class="w-7" :icon="['fas', 'users']" />
      <span class="mx-3">コミュニティ</span>
      <div class="w-0.5 h-7 mx-7 border border-gray-500" />
      <tag
        v-for="(community, index) in communities"
        :key="index"
        :tagText="community"
        class="mx-1.5 px-5 py-0.5 cursor-pointer"
        :class="{ 'bg-gray-400': select === index }"
        @click="selecting(community)"
      />
    </div>
    <div class="flex items-center my-3">
      <font-awesome-icon class="w-7" :icon="['fas', 'tags']" />
      <span class="mx-3">タグ</span>
      <div class="w-0.5 h-7 mx-7 border border-gray-500" />
      <tag
        v-for="(tag, index) in tags"
        :key="index"
        :tagText="tag"
        class="mx-1.5 px-5 py-0.5 cursor-pointer"
      />
      <font-awesome-icon
        class="w-7 cursor-pointer mx-2"
        :icon="['fas', 'plus-circle']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import Tag from "@/components/Tag.vue";

@Component({
  components: {
    Tag,
  },
})
export default class RefineSearchForm extends Vue {
  communities = ["Hack", "CG", "Game", "Media_art"] as Array<string>;
  tags = ["tag1", "tag2", "tag3", "tag4", "tag5"] as Array<string>;
  selects = [] as Array<number>;
  select = -1 as number;

  selecting(index: number) {
    this.select = index;
  }
}
</script>
