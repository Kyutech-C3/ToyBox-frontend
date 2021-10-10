<template>
  <vue-simplemde v-model="description" class="markdown-body min-h-300 w-full" :configs="configs" />
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component
export default class FormMarkdown extends Vue {
  @VModel({ type: String })
  description!: string

  configs = {
    autosave: {
      enabled: false
    },
    placeholder: 'マークダウンでの記入が可能です',
    spellChecker: false,
    status: false,
    initialValue: '',
    toolbar: [
      'preview',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'heading',
      '|',
      'code',
      'quote',
      'link',
      '|',
      'unordered-list',
      'ordered-list',
      'table',
      'horizontal-rule',
      '|',
      'guide'
    ]
  }
}
</script>
