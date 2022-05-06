<template>
  <div>
    <div
      class="border-b-2 border-dotted my-4"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="flex items-center">
        <user-rounded-icon :imageSrc="comment.userIconUrl" />
        <div class="ml-3">
          {{ comment.userName }}
        </div>
      </div>
      <div class="my-2">
        <p>{{ comment.text }}</p>
        <p class="text-right text-gray-400">
          {{ dateFormatter(comment.created_at) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserRoundedIcon from '@/components/commons/UserRoundedIcon.vue'

interface Comment {
  id: string
  userIconUrl: string
  userName: string
  text: string
  created_at: string
}

@Component({
  components: {
    UserRoundedIcon
  }
})
export default class CommentsList extends Vue {
  comments: Comment[] = [
    {
      id: 'abcd1234',
      userIconUrl:
        'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png',
      userName: 'ハムタロサァン',
      text: 'くしくし',
      created_at: '2021-11-20T15:52:47.590564'
    },
    {
      id: 'abcd1234',
      userIconUrl:
        'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png',
      userName: 'ハムタロサァン',
      text: 'くしくし',
      created_at: '2021-11-20T15:52:47.590564'
    }
  ]

  dateFormatter(date: string): string {
    console.log(date)
    const splitFullDate = date.split('T')
    const splitDate = splitFullDate[0].split('-')
    const splitTime = splitFullDate[1].split('.')
    return `${splitDate[0]}年${splitDate[1]}月${splitDate[2]}日 ${splitTime[0]}`
  }
}
</script>
