<template>
  <div
    class="
      rounded-xl
      w-2/3
      bg-white
      px-5
      py-10
      flex
      justify-center
      items-center
      flex-col
      shadow-xl
    "
  >
    <div class="w-4/5 text-gray-700 text-center mb-5">
      {{ getInformation }}
    </div>
    <div class="w-4/5 flex justify-center">
      <base-text-button
        :title="getRejectTitle"
        :color="'gray'"
        class="mr-3"
        @click="close('reject')"
      />
      <base-text-button
        :title="getApproveTitle"
        :color="'yellow'"
        @click="close('approve')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator'

import BaseTextButton from '@/components/commons/BaseTextButton.vue'

import { saveAs } from 'file-saver'
import { confirmModalStore, downloadAssetStore } from '@/store'

@Component({ components: { BaseTextButton } })
export default class ConfirmModal extends Vue {
  get getApproveTitle() {
    return confirmModalStore.getApproveTitle
  }

  get getRejectTitle() {
    return confirmModalStore.getRejectTitle
  }

  get getInformation() {
    return confirmModalStore.getInformation
  }

  get getType() {
    return confirmModalStore.getType
  }

  get getAsset() {
    return downloadAssetStore.getAsset
  }

  approve() {
    confirmModalStore.approve()
    if (this.getType === 'download') {
      this.download()
    }
  }

  reject() {
    confirmModalStore.reject
  }

  @Emit()
  close(type: 'reject' | 'approve') {
    if (type === 'reject') {
      this.reject()
    } else if (type === 'approve') {
      this.approve()
    }
  }

  async download() {
    const data = await fetch(this.getAsset.url)
    const blob = await data.blob()
    saveAs(blob, 'origin.zip')
  }
}
</script>
