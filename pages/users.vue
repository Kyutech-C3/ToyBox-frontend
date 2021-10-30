<template>
  <div class="min-h-screen flex flex-col content-center justify-center items-center">
    <profile :user-image="userImage" :user-name="userName" :user-description="userDescription" />
    <works-filter />
    <works :user-works="userWorks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Profile from '@/components/Users/Profile.vue'
import WorksFilter from '~/components/Users/WorksFilter.vue'
import Works from '~/components/Users/Works.vue'

@Component({
  components: {
    Profile,
    WorksFilter,
    Works
  }
})
export default class Users extends Vue {
  userImage: string = 'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png'
  userName: string = 'ハムタロサァン'
  userDescription: string = 'はむたろなのだ'
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
  showEditProfile: boolean = false
}
</script>
