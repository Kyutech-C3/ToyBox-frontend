import FormMarkdown from '~/components/works/form/FormMarkdown.vue'

export default {
  title: 'Form'
}

export const markdown1 = () => ({
  template: '<form-markdown v-model="description" />',
  components: { FormMarkdown },
  data() {
    return {
      description: '# sample text'
    }
  }
})
