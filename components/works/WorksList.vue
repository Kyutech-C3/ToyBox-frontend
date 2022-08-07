<template>
  <div class="c-grid px-10 py-5 [--card-w:20rem]">
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
  grid-row-gap: 20px;
  row-gap: 20px;
  grid-column-gap: 20px;
  -moz-column-gap: 20px;
  column-gap: 20px;
  justify-items: center;
  justify-content: center;
}
</style>
