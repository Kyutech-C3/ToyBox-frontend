<template>
  <select v-model="communityId" name="pets" required class="w-full p-3 ring-1 focus:outline-none focus:ring-blue-600">
    <option value="" hidden disabled selected>
      community
    </option>
    <template v-for="community in communityList">
      <option :key="community.id" :value="community.id">
        {{ community.name }}
      </option>
    </template>
  </select>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FormCommunity extends Vue {
  @VModel({ type: String })
  communityId!: string

  communityList = [
    {
      id: 'aaa',
      name: 'community1'
    },
    {
      id: 'bbb',
      name: 'community2'
    },
    {
      id: 'ccc',
      name: 'community3'
    }
  ]

  created () {
    // ここでコミュニティーのリストを取得する↑communityListは仮置き
  }
}
</script>

<style scoped>
select:invalid {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}
</style>
