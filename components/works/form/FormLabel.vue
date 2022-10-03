<template>
  <div class="w-40 text-lg flex-shrink-0 relative">
    <span>{{ name }}</span>
    <span v-if="required" class="text-red-600"> *</span>
    <info v-if="info" :info="info" />
    <div
      v-if="showWarning"
      class="
        warning
        text-xs text-red-600
        bg-gray-300
        border border-gray-300
        rounded-md
        absolute
        left-0
        top-8
        w-max
        px-3
        py-0.5
        shadow
        z-20
      "
    >
      値がありません。値を入力してください。
    </div>
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
  @Prop({ type: Boolean, required: true })
  showWarning!: boolean
}
</script>

<style scoped>
.warning::before {
  position: absolute;
  display: inline-block;
  content: '';
  border: 6px solid transparent;
  border-bottom-color: rgb(209 213 219);
  top: -13px;
  left: 15px;
}
</style>
