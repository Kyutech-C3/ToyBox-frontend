<template>
  <div class="flex items-center gap-2">
    <div class="text-lg">公開時刻を設定する</div>
    <input type="checkbox" @change="switchCheckBox" />
    <input
      :value="scheduleTime"
      ref="timer"
      :disabled="!useSchedulePost"
      type="datetime-local"
      class="ml-4 border-2 border-hover-base-button-color rounded-md px-2 py-1"
      @change="changeDatetime"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class FormMarkdown extends Vue {
  @VModel({
    type: String || null
  })
  scheduleTime!: string | null

  useSchedulePost: boolean = false

  switchCheckBox(event: Event) {
    const target = event.target as HTMLInputElement
    if (target !== null) {
      this.useSchedulePost = target.checked
      if (target.checked) {
        const timer = this.$refs.timer as HTMLInputElement
        if (timer.value) {
          this.scheduleTime = timer.value
        }
      } else {
        this.scheduleTime = null
      }
    }
  }

  changeDatetime(event: Event) {
    const target = event.target as HTMLInputElement
    if (target !== null) {
      this.scheduleTime = target.value
    }
  }
}
</script>
