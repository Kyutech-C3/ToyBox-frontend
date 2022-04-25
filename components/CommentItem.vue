<template>
  <div>
    <div class="pl-3 pb-1 border-b-2 border-dotted">
      <div class="inline-block">
        {{ name }}
      </div>
      <button class="ml-6" @click="commentDelete">
        <img src="../assets/img/commentDelete.png" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
      default: 'error'
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    commentDelete() {
      this.$store.dispatch('deleteComment', this.index)
    }
  }
})
</script>
