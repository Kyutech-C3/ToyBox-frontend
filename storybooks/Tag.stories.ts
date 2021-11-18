import Tag from '~/components/Tag.vue'

export default {
  title: 'Tag'
}

export const tag1 = () => ({
  template: '<tag :tag-text="text" :font-size="size"/>',
  components: { Tag },
  props: {
    text: {
      default: 'hoge'
    },
    size: {
      default: 'base'
    }
  }
})
