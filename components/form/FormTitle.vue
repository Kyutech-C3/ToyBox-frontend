<template>
  <div class="flex items-center">
    <form-label name="タイトル" />
    <input
      v-model="title"
      type="text"
      name="text/title"
      placeholder="title"
      required
      class="w-72 text-xl p-3 border-b-2 border-gray-400 placeholder-gray-500 focus:outline-none focus:border-black"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FormTitle extends Vue {
  @VModel({ type: String })
  title!: string
}
</script>
