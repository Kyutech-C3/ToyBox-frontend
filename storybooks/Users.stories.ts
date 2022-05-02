import { Story, Meta } from '@storybook/vue'
import Profile from '@/components/Users/Profile.vue'
import ProfileForm from '@/components/Users/ProfileForm.vue'

export default {
  title: 'Users'
} as Meta

export const profile: Story = (_, { argTypes }) => ({
  template: `
    <profile 
      :users="users"
      :disabled-edit-button="disabledEditButton"
    />
  `,
  components: { Profile },
  props: Object.keys(argTypes)
})

profile.argTypes = {
  users: {
    name: 'プロフィール',
    control: { type: 'object' },
    defaultValue: {
      image:
        'http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png',
      name: 'ハムタロサァン',
      description: 'はむたろなのだ',
      github: 'Kyutech-C3',
      twitter: 'c3_kyutech'
    }
  },
  disabledEditButton: {
    name: 'プロフィール編集ボタンの非表示',
    control: { type: 'boolean' },
    defaultValue: false
  }
}

export const profileForm = () => ({
  template: '<profile-form />',
  components: { ProfileForm }
})
