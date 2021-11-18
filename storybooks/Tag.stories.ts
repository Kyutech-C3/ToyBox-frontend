import Tag from '~/components/Tag.vue'

export default {
  title: 'Tag'
}

export const tag1 = () => ({
  template: '<tag :tag-text="text" :font-size="size" :tagId="id" :linkDisabledFlag="disable"/>',
  components: { Tag },
  props: {
    text: {
      default: 'hogehoge'
    },
    id: {
      default: '12314'
    },
    disable: {
      default: false
    },
    size: {
      default: 'xs'
    }
  }
})
