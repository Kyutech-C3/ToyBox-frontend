import BaseTag from '~/components/commons/BaseTag.vue'

export default {
  title: 'Tag'
}

export const tag1 = () => ({
  template: '<base-tag :tag-text="text"/>',
  components: { BaseTag },
  props: {
    text: {
      default: 'hogehoge'
    }
  }
})
