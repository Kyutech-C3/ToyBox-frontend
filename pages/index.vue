<template>
  <div class="container">
    <div>
      <sample :sample="prop" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Sample from '~/components/Sample.vue'

@Component({
  components: {
    Sample
  }
})

export default class Index extends Vue {
  prop = 'sample'
}
</script>

<style>
</style>
