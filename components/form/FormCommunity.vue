<template>
  <div class="flex items-center">
    <form-label name="コミュニティー" />
    <select
      v-if="communityList.length > 0"
      v-model="communityId"
      required
      class="w-48 p-3 ring-1 rounded-xl focus:outline-none focus:ring-blue-600 text-center text-xl"
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
import { Component, Vue, VModel } from 'nuxt-property-decorator'
import axios from 'axios'
axios.defaults.baseURL = process.env.SERVER_URL

@Component
export default class FormCommunity extends Vue {
  @VModel({ type: String })
  communityId!: string

  communityList = []

  created () {
    axios.get('/communities')
      .then((result) => {
        if (result.data.length !== 0) {
          this.communityList = result.data
          console.log(this.communityList)
        } else {
          alert('コミュニティーが登録されていません。')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
}
</script>

<style scoped>
select:invalid {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}
</style>
