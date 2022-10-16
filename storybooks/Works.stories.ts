import { Story, Meta } from '@storybook/vue'
import WorksCard from '~/components/works/WorksCard.vue'

export default {
  title: 'Works'
} as Meta

export const card: Story = (_, { argTypes }) => ({
  template: '<works-card :work-data="work" />',
  components: { WorksCard },
  props: Object.keys(argTypes)
})

card.argTypes = {
  work: {
    name: '作品データ',
    control: { type: 'object' },
    defaultValue: {
      id: '57df6a4c-6ca4-42a6-8635-0548deca12d2',
      title: 'test5',
      description: 'aaaa',
      description_html: '<p>aaaa</p>',
      user: {
        id: 'cd816281-7b09-4204-8d2a-0ecd077f746f',
        name: 'suu',
        display_name: 'suu',
        avatar_url:
          'https://cdn.discordapp.com/avatars/553217152719519745/8d03f44d31f382248ffbb65d9a4f436b.png',
        profile: null,
        twitter_id: null,
        github_id: null,
        created_at: '2021-11-19T05:08:49.072947',
        updated_at: '2021-11-19T05:08:49.072947'
      },
      community: {
        name: 'Hack',
        description: 'this is Hack community',
        id: '4757e816-6d16-4b67-aa6f-b1074c253bfc',
        description_html: '<p>this is Hack community</p>',
        created_at: '2021-11-19T05:11:49.776930',
        updated_at: '2021-11-19T05:11:49.776930'
      },
      assets: [
        {
          id: '61adce94-52e2-4f55-8c20-01b89b407605',
          user_id: 'cd816281-7b09-4204-8d2a-0ecd077f746f',
          created_at: '2021-11-20T15:52:47.590564',
          work_id: '57df6a4c-6ca4-42a6-8635-0548deca12d2',
          asset_type: 'image',
          extension: null,
          updated_at: '2021-11-20T15:52:53.042729'
        }
      ],
      urls: [
        {
          id: 'f4d73e80-6224-4cb0-b605-d7485ccdbf76',
          work_id: '57df6a4c-6ca4-42a6-8635-0548deca12d2',
          url_type: 'other',
          created_at: '2021-11-20T15:52:53.042729',
          url: 'https://github.com/Kyutech-C3/toybox-server',
          user_id: 'cd816281-7b09-4204-8d2a-0ecd077f746f',
          updated_at: '2021-11-20T15:52:53.042729'
        }
      ],
      visibility: 'public',
      tags: [
        {
          name: 'nuxt',
          color: '#7FFF00',
          id: '6337f6d5-500a-446d-a3ab-dcf438a00f9f',
          community: {
            name: 'Hack',
            description: 'this is Hack community',
            id: '4757e816-6d16-4b67-aa6f-b1074c253bfc',
            description_html: '<p>this is Hack community</p>',
            created_at: '2021-11-19T05:11:49.776930',
            updated_at: '2021-11-19T05:11:49.776930'
          }
        }
      ],
      thumbnail: [
        {
          id: '61adce94-52e2-4f55-8c20-01b89b407605',
          user_id: 'cd816281-7b09-4204-8d2a-0ecd077f746f',
          created_at: '2021-11-20T15:52:47.590564',
          work_id: '57df6a4c-6ca4-42a6-8635-0548deca12d2',
          asset_type: 'image',
          extension: null,
          updated_at: '2021-11-20T15:52:53.042729'
        }
      ],
      created_at: '2021-11-20T15:52:53.024724',
      updated_at: '2021-11-20T15:52:53.024724'
    }
  }
}
