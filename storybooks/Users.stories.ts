import Profile from '~/components/Users/Profile.vue'
import WorksFilter from '~/components/Users/WorksFilter.vue'
import Works from '~/components/Users/Works.vue'

export default {
  title: 'Users'
}

export const profile = () => ({
  template: '<profile :user-image="userImage" :user-name="userName" :user-description="userDescription"/>',
  components: { Profile },
  props: {
    userImage: {
      default: 'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png'
    },
    userName: {
      default: 'ハムタロサァン'
    },
    userDescription: {
      default: 'はむたろなのだ'
    }
  }
})

export const filter = () => ({
  template: '<works-filter />',
  components: { WorksFilter }
})

export const works = () => ({
  template: '<works :user-works="userWorks"/>',
  components: { Works },
  props: {
    userWorks: {
      default: Array(6)
    }
  }
})
