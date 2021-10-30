import { Story } from '@storybook/vue'
import Profile from '~/components/Users/Profile.vue'
import WorksFilter from '~/components/Users/WorksFilter.vue'
import Works from '~/components/Users/Works.vue'

export default {
  title: 'Users'
}

export const profile: Story = (_, { argTypes }) => ({
  template: `
    <profile 
      :user-image="userImage" 
      :user-name="userName" 
      :user-description="userDescription"
      :github-link="githubLink"
      :twitter-link="twitterLink"
      :is-disable-edit="isDisableEdit"
    />
  `,
  components: { Profile },
  props: Object.keys(argTypes)
})

profile.args = {
  userImage: 'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png',
  userName: 'ハムタロサァン',
  userDescription: 'はむたろなのだ',
  githubLink: 'https://github.com/',
  twitterLink: 'https://twitter.com/',
  isDisableEdit: false
}

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
