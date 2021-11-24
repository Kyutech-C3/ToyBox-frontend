<template>
  <div>
    <div class="py-16"></div>
    <div class="flex justify-center pb-8">
      <input class="pr-8 pl-2 py-1 rounded-full shadow-xl border-1" type="text" name="todo" v-model="todo"/>
      <button class="border-2 border-white shadow-xl rounded-full ml-4 px-2" @click="add">
        追加  
      </button>
    </div>

    <todo-item class="flex justify-center my-3 py-1 text-xl" v-for="(item, i) in getterTodos" :key="i" :name="item" :index="i"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

  data(): {
    todo:string,
  } {
    return{ 
        todo:'',  
    }
  },
  computed: {
    getterTodos(){
      return this.$store.getters.getTodos
    }
  },
  methods: {
    add() {
      if(this.todo === "")
        return;
      //this.todos.push(this.todo);
      this.$store.dispatch('addTodo', this.todo)
      this.todo ="";
    }
  }
})
</script>
