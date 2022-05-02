<template>
  <div class="flex flex-wrap justify-center px-10 py-5">
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
