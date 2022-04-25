<template>
  <div class="m-10">
    <div class="text-3xl text-center p-10 border-b-2">作品一覧</div>
    <div class="m-5 flex flex-wrap justify-center max-w-6xl">
      <div
        v-for="(userWork, i) in userWorks"
        :key="i"
        class="bg-gray-400 w-80 h-80 m-5 rounded-3xl"
      >
        {{ userWork }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Works extends Vue {
  @Prop({ type: String, required: true })
  userWorks!: string
}
</script>
