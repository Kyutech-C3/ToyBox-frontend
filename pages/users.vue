<template>
  <div class="min-h-screen flex flex-col content-center justify-center items-center">
    <profile :users="users" />
    <works-filter />
    <works :user-works="userWorks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Profile from '@/components/Users/Profile.vue'
import WorksFilter from '~/components/Users/WorksFilter.vue'
import Works from '~/components/Users/Works.vue'

interface User {
  image: string
  name: string
  description: string
  github: string
  twitter: string
}

@Component({
  components: {
    Profile,
    WorksFilter,
    Works
  }
})
export default class Users extends Vue {
  users: User = {
    image: 'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png',
    name: 'ハムタロサァン',
    description: 'はむたろなのだ',
    github: 'Kyutech-C3',
    twitter: 'c3_kyutech'
  }

  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
}
</script>
