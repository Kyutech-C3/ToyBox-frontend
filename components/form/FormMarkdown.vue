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

<style>
.editor-toolbar {
  border-top: 1px solid rgba(156, 163, 175, var(--tw-border-opacity));
  border-left: 1px solid rgba(156, 163, 175, var(--tw-border-opacity));
  border-right: 1px solid rgba(156, 163, 175, var(--tw-border-opacity));
}
.CodeMirror {
  border: 1px solid rgba(156, 163, 175, var(--tw-border-opacity));
  opacity: 0.8;
}
</style>
