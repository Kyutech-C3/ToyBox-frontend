<template>
  <div class="flex items-center">
    <form-label name="コミュニティー" />
    <select
      v-if="communityList.length > 0"
      v-model="communityId"
      required
      class="w-48 p-3 border-2 border-gray-400 rounded-xl focus:outline-none text-center text-xl cursor-pointer"
    >
      <option value="" hidden disabled selected>
        community
      </option>
      <template v-for="(community, i) in communityList">
        <option :key="i" :value="community.id">
          {{ community.name }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel, Inject } from 'nuxt-property-decorator'
import { Community } from '~/types'

@Component
export default class FormCommunity extends Vue {
  @VModel({ type: String })
  communityId!: string

  @Inject() communityList!: Array<Community>
}
</script>

<style scoped>
select:invalid {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}
</style>
