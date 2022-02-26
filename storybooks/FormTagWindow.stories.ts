import FormTagWindow from '~/components/form/FormTagWindow.vue'

export default {
  title: 'FormTagWindow'
}

export const FormTagWindo1 = () => ({
  template: '<form-tag-window />',
  components: { FormTagWindow },
  props: {
    text: {
      default: 'hugahuga'
    }
  }
})
