import Sample from '~/components/Sample.vue'

export default {
  title: 'Sample'
}

export const sample1 = () => ({
  template: '<sample :sample="prop"/>',
  components: { Sample },
  props: {
    prop: {
      default: 'Prop'
    }
  }
})
