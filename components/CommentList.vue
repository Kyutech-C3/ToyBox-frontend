<template>
  <div>
    <div class="py-16"></div>
    <div class="flex justify-center pb-8">
      <input class="pr-8 pl-2 py-1 rounded-full shadow-xl border-1" type="text" name="comment" v-model="comment"/>
      <button class="border-2 border-white shadow-xl rounded-full ml-4 px-2" @click="add">
        追加  
      </button>
    </div>

    <comment-item class="flex justify-center my-3 py-1 text-xl" v-for="(item, i) in getterComments" :key="i" :name="item" :index="i"/>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommentItem from '@/components/CommentItem.vue'


export default Vue.extend({
  components: {
    CommentItem
  },
  data(): {
    comment:string,
  } {
    return{ 
        comment:'',  
    }
  },
  computed: {
    getterComments(){
      return this.$store.getters.getComments
    }
  },
  methods: {
    add() {
      if(this.comment === "")
        return;
      //this.todos.push(this.todo);
      this.$store.dispatch('addComment', this.comment)
      this.comment ="";
    }
  }
})
</script>
