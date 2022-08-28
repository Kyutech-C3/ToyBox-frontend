<template>
  <div
    v-if="modalInner"
    class="
      fixed
      top-0
      left-0
      w-full
      h-full
      flex
      justify-center
      items-center
      backdrop-blur-md
      z-40
    "
    @click.self="close"
  >
    <div :is="modalInner" @close="close"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { modalStore } from '~/store'
import TagSelector from '@/components/works/TagSelector.vue'
import ConfirmModal from '@/components/commons/ConfirmModal.vue'

@Component({
  components: { TagSelector, ConfirmModal }
})
export default class Modal extends Vue {
  get modalInner() {
    console.debug('modalInner')
    return modalStore.getComponent === null
      ? undefined
      : modalStore.getComponent
  }

  public close() {
    console.debug('close')
    modalStore.close()
  }
}
</script>
