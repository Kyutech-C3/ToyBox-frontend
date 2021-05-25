export default { title: 'Sample' }

export const sample1 = () => ({
  template: '<sample :sample="prop"/>',
  props: {
    prop: {
      default: 'Prop'
    }
  }
})
