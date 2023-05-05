<template>
  <video ref="videoPlayer" class="video-js" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

type VideoJSOptions = {}

@Component({
  components: {}
})
export default class VideoView extends Vue {
  player!: Player

  @Prop({ type: Object, required: true })
  options!: VideoJSOptions

  @Ref() videoPlayer!: HTMLVideoElement

  mounted() {
    this.player = videojs(this.videoPlayer, this.options, () => {})
  }

  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style lang="scss">
.video-js {
  @apply w-full;
  @apply h-full;

  .vjs-control-bar {
    @apply pr-12;

    .vjs-fullscreen-control {
      display: none;
    }
  }
}
</style>
