<template>
  <div>
    <div class="font-light rounded-full px-2 shadow-xl font-normal border-white border-2">{{name}}</div>
    <button class="border-white border-2 rounded-full px-2 shadow-xl ml-12 "  @click="todoDelete">
      削除
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props:{

    name:{
      type: String,
      required: true,
      default: 'error'
    },
    index: {
      type: Number,
      required: true,
    }

  },
  methods:{
    todoDelete() {
      this.$store.dispatch('deleteTodo',this.index)
    }
  }
})
</script>