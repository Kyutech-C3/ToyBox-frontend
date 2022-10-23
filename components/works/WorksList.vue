<template>
  <div
    class="
      c-grid
      py-5
      px-2
      [--card-w:18rem] [--card-h:22rem]
      z-0
      max-w-[980px]
      mx-auto
    "
  >
    <works-card v-for="(work, index) in works" :key="index" :work-data="work" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import WorksCard from '@/components/works/WorksCard.vue'
import { Work } from '@/types'

@Component({
  components: {
    WorksCard
  }
})
export default class WorkIndex extends Vue {
  @Prop({ type: Array, required: true })
  works!: Array<Work>
}
</script>

<style>
.c-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  grid-row-gap: 15px;
  row-gap: 15px;
  grid-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
  justify-items: center;
  justify-content: center;
}
</style>
