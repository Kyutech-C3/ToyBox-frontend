import { Story, Meta } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import ToyboxButton from '~/components/commons/BaseTextButton.vue'

export default {
  title: 'ToyboxButton',
  argTypes: {
    onClick: {
      action: 'click'
    }
  }
} as Meta

const clickHandler = action('click')

export const PrimaryToyboxButton: Story = (arg, { argTypes }) => ({
  template: `
    <div style="display: flex;">
      <toybox-button v-bind="$props" @click="handleClick" />
    </div>
  `,
  components: { ToyboxButton },
  props: Object.keys(argTypes),
  methods: {
    handleClick(e) {
      clickHandler(e)
    }
  }
})

PrimaryToyboxButton.args = {
  isShadow: true,
  title: '送信'
}
