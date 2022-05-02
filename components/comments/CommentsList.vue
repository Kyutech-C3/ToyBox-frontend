<template>
  <div>
    <div class="ml-4">
      <input
        class="rounded-full shadow-l border-2 border-gray-500 p-2"
        type="text"
        name="comment"
        v-model="comment"
      />
      <button class="rounded-full pl-5" @click="add">
        <img src="@/assets/img/commentAdd.png" />
      </button>
    </div>
    <comment-item
      class="ml-6 mt-6"
      v-for="(item, i) in getterComments"
      :key="i"
      :name="item"
      :index="i"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CommentItem from '~/components/comments/CommentsItem.vue'
import { commentStore } from '@/store'

@Component({
  components: {
    CommentItem
  }
})
export default class CommentsList extends Vue {
  comment: string = ''

  get getterComments() {
    var getcomment = commentStore.getComments
    console.log(getcomment)
    return getcomment
  }

  add() {
    if (this.comment === '') return
    // this.todos.push(this.todo);
    commentStore.addComment(this.comment)
    console.log(this.comment)
    this.comment = ''
  }
}
</script>
