<template>
  <div class="w-40 text-lg flex-shrink-0">
    {{ name }}
    <span v-if="required" class="text-red-600"> *</span>
    <info v-if="info" :info="info" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Info from '@/components/commons/Info.vue'

@Component({
  components: {
    Info
  }
})
export default class FormLabel extends Vue {
  @Prop({ type: String, required: true })
  name!: string
  @Prop({ type: Boolean, required: false, default: false })
  required!: boolean
  @Prop({ type: String, required: false })
  info!: string
}
</script>

<style scoped>
.font-awesome-icon:hover + .info-modal {
  visibility: visible;
}
</style>
