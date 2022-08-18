<template>
  <div
    class="
      rounded-xl
      w-2/3
      bg-orange-50
      px-5
      py-10
      flex
      justify-center
      items-center
      flex-col
    "
  >
    <div class="w-4/5 text-gray-700 text-center mb-5">
      {{ getInfomation }}
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
import { confirmationStore, downloadAssetStore } from '@/store'

@Component({ components: { BaseTextButton } })
export default class Confirmation extends Vue {
  get getApproveTitle() {
    return confirmationStore.getApproveTitle
  }

  get getRejectTitle() {
    return confirmationStore.getRejectTitle
  }

  get getInfomation() {
    return confirmationStore.getInfomation
  }

  get getType() {
    return confirmationStore.getType
  }

  get getAsset() {
    return downloadAssetStore.getAsset
  }

  approve() {
    confirmationStore.approve()
    if (this.getType === 'download') {
      this.download(this.getAsset.asset_type, this.getAsset.id)
    }
  }

  reject() {
    confirmationStore.reject
  }

  @Emit()
  close(type: 'reject' | 'approve') {
    if (type === 'reject') {
      this.reject()
    } else if (type === 'approve') {
      this.approve()
    }
  }

  async download(type: string, id: string) {
    const url = `${process.env.ASSET_BASE_URL}/${type}/${id}/origin.zip`
    const data = await fetch(url)
    const blob = await data.blob()
    saveAs(blob, 'origin.zip')
  }
}
</script>
