<template>
  <div class="absolute">
    <div class="ml-4">
      <input class="rounded-full shadow-l border-2 border-gray-500 p-2" type="text" name="comment" v-model="comment"/>
      <button class="rounded-full pl-5" @click="add">
          <img src="../assets/img/commentAdd.png">
      </button>

    </div>
    <comment-item class="relative ml-6 mt-6 " v-for="(item, i) in getterComments" :key="i" :name="item" :index="i"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommentItem from '@/components/CommentItem.vue'

export default Vue.extend({
  data(): {
    comment:string,
  } {
    return{ 
        comment:'',  
    }
  },
  components: {
    CommentItem
  },
  computed: {
    getterComments(){
      var getcomment = this.$store.getters.getComments;
      console.log(getcomment);
      return getcomment;
    }
  },
  methods: {
    add() {
      if(this.comment === "")
        return;
      //this.todos.push(this.todo);
      this.$store.dispatch('addComment', this.comment);
      console.log(this.comment);
      this.comment ="";
    },
  }
})
</script>
