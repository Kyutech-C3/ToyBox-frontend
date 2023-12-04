<template>
  <div @keyup="changeBlockUnloadState">
    <form-label
      name="本文"
      :required="true"
      :show-warning="showWarning"
      class="mb-3"
    />
    <form-asset class="mb-3" :file-upload-handler="fileUploadHandler" />
    <mavon-editor
      ref="md"
      v-model="description"
      :toolbars="toolbarsOption"
      language="ja"
      :xss-options="{
        whiteList: {
          video: ['controls'],
          source: ['src', 'type']
        }
      }"
      default-open="edit"
      :autofocus="false"
      @imgAdd="dragAndDropAsset"
      class="markdown-body min-h-300 w-full bg-white"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'
import { workPostStore } from '@/store'
import FormLabel from '@/components/works/form/FormLabel.vue'
import FormAsset from '@/components/blogs/form/FormAsset.vue'

@Component({
  components: {
    FormLabel,
    FormAsset
  }
})
export default class FormMarkdown extends Vue {
  @VModel({
    type: String,
    required: true
  })
  description!: string

  @Prop({ type: Boolean, required: true })
  showWarning!: boolean

  @Prop({ type: Function, required: true })
  fileUploadHandler!: (files: File[]) => Promise<void>

  changeBlockUnloadState() {
    workPostStore.changeIsBlockUnload()
  }

  async dragAndDropAsset(pos: Number, file: File) {
    await this.fileUploadHandler([file])
    const reg = RegExp(`\\!\\[.+\\]\\(${pos}\\)`, 'i')
    this.description = this.description.replace(reg, '')
  }

  toolbarsOption = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    code: true, // code
    table: true, // 表格
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true // 预览
  }
}
</script>

<style>
.v-note-wrapper {
  z-index: 1 !important;
}
textarea {
  background-color: white;
}
</style>
