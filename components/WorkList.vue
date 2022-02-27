<template>
  <div class="flex flex-wrap w-full">
    <works-card
      v-for="(workData, index) in workList"
      :key="index"
      :work-data="workData"
      class="h-80 card-width"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import WorksCard from '~/components/WorksCard.vue'
import { Work } from '~/types'

@Component({
  components: {
    WorksCard
  }
})
export default class WorkIndex extends Vue {
  @Prop({ type: Array, required: true })
  workList!: Array<Work>
}
</script>

<style scoped>
.card-width {
  width: calc(33.333% - 10px);
  min-width: 230px;
  margin: 0 15px 25px 0;
}
.card-width:nth-child(3n) {
  margin-right: 0;
}
.card-list {
  min-width: 760px;
  max-width: 850px;
}
</style>
