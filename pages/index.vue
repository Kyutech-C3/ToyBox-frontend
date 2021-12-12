<template>
  <div class="container">
    <div>
      <sample :sample="prop" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CommentItem from '~/components/CommentItem.vue'
import CommentList from '~/components/CommentList.vue'
import Sample from '~/components/Sample.vue'

@Component({
  components: {
    Sample,
    CommentList,
    CommentItem
  }
})

export default class Index extends Vue {
  prop = 'sample'
}
</script>

<style>
</style>
