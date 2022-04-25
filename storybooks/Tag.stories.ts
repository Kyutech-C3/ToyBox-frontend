import Tag from '~/components/Tag.vue'

export default {
  title: 'Tag'
}

export const tag1 = () => ({
  template: '<tag :tag-text="text"/>',
  components: { Tag },
  props: {
    text: {
      default: 'hogehoge'
    }
  }
})
