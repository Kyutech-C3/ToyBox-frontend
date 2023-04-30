<template>
  <div class="w-full h-full relative">
    <canvas
      v-if="!isError"
      id="audio-waveform"
      class="
        w-[90%]
        h-[25%]
        absolute
        top-[65%]
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        cursor-pointer
      "
      width="1000px"
      height="500px"
      @click="changeCurrentTime($event)"
    />
    <slot v-else />
    <div class="absolute left-[50px] top-[50px] text-5xl">
      <span
        v-if="isPlay"
        role="button"
        class="material-symbols-outlined inline-block"
        @click="pause()"
      >
        pause
      </span>
      <span
        v-else
        role="button"
        class="material-symbols-outlined inline-block"
        @click="play()"
      >
        play_arrow
      </span>
    </div>
    <div class="absolute bottom-10 left-10 text-white">
      {{
        `${Math.floor(audioCurrentTime / 60)}:${(
          '0' + Math.floor(audioCurrentTime % 60)
        ).slice(-2)}`
      }}
    </div>
    <div class="absolute bottom-10 right-10 text-white">
      {{
        `${Math.floor(audioLength / 60)}:${(
          '0' + Math.floor(audioLength % 60)
        ).slice(-2)}`
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import PeakAnalyzer from '@/utils/audioAnalyzer'

type Color = {
  r: number
  g: number
  b: number
}

type BarColor = {
  baseColor: Color
  playedColor: Color
  playingColor: Color
  hoverColor: Color
  shadowBaseColor: Color
  shadowPlayedColor: Color
  shadowPlayingColor: Color
  shadowHoverColor: Color
}

@Component({})
export default class AudioView extends Vue {
  analyzer!: PeakAnalyzer
  waveformCanvas!: HTMLCanvasElement | null
  isError: boolean = false
  peaksArr!: Array<Array<number>>
  audio!: HTMLAudioElement
  audioLength: number = 0
  audioCurrentTime: number = 0
  isPlay: boolean = false
  playCurrentBarIndex: number = -1
  barLength: number = 0
  barColor: BarColor = {
    baseColor: {
      r: 255,
      g: 240,
      b: 200
    },
    playedColor: {
      r: 255,
      g: 180,
      b: 60
    },
    playingColor: {
      r: 0,
      g: 6,
      b: 14
    },
    hoverColor: {
      r: 0,
      g: 30,
      b: 70
    },
    shadowBaseColor: {
      r: 205,
      g: 190,
      b: 150
    },
    shadowPlayedColor: {
      r: 205,
      g: 130,
      b: 10
    },
    shadowPlayingColor: {
      r: 0,
      g: 6,
      b: 14
    },
    shadowHoverColor: {
      r: 0,
      g: 30,
      b: 70
    }
  }
  barPlayingColorIndex!: number
  hoverBarIndex!: number

  @Prop({ type: String, required: true })
  src!: string

  created() {
    this.audio = new Audio(this.src)
  }

  mounted() {
    this.waveformCanvas = document.querySelector('#audio-waveform')

    window.addEventListener('resize', () => {
      this.waveformCanvas = document.querySelector('#audio-waveform')
    })

    this.waveformCanvas?.addEventListener(
      'mousemove',
      this.mouseHoverHandler,
      false
    )

    this.waveformCanvas?.addEventListener('mouseout', () => {
      this.hoverBarIndex = -1
    })

    this.audio.addEventListener('loadeddata', () => {
      this.audioLength = this.audio.duration
    })

    this.audio.addEventListener('ended', () => {
      this.isPlay = false
      this.audioCurrentTime = 0
    })

    this.timeUpdateHandler()

    this.analyzer = new PeakAnalyzer()

    this.analyzer
      .analyze(this.src, 200)
      .then((peaksArr) => {
        console.log(peaksArr)
        this.peaksArr = peaksArr
        this.barLength = peaksArr[0].length
        this.drawWaveform()
      })
      .catch((err) => {
        console.error(err)
        this.isError = true
      })
  }

  // オーディオの再生
  play() {
    this.isPlay = true
    this.audio.play()
  }

  // オーディオの停止
  pause() {
    this.isPlay = false
    this.audio.pause()
  }

  // オーディオの現在の再生時間の更新とそれに伴う処理
  timeUpdateHandler() {
    this.audioCurrentTime = this.audio.currentTime
    const newPlayCurrentBarCalculationResult: number =
      (this.barLength / this.audioLength) * this.audioCurrentTime
    const newPlayCurrentBarIndex: number = Math.floor(
      newPlayCurrentBarCalculationResult
    )
    if (this.playCurrentBarIndex !== newPlayCurrentBarIndex) {
      this.barPlayingColorIndex = 0
      this.playCurrentBarIndex = newPlayCurrentBarIndex
    } else {
      this.barPlayingColorIndex = Math.floor(
        (newPlayCurrentBarCalculationResult - newPlayCurrentBarIndex) * 10
      )
    }
    requestAnimationFrame(this.timeUpdateHandler)
  }

  // マウスのクリック位置に基づいて再生位置の変更を行う
  changeCurrentTime(event: PointerEvent) {
    const rect = this.waveformCanvas?.getBoundingClientRect()
    this.audio.currentTime =
      (this.audioLength / rect?.width!) * (event.x - rect?.left!)
    if (!this.isPlay) {
      this.play()
    }
  }

  mouseHoverHandler(event: MouseEvent) {
    const rect = this.waveformCanvas?.getBoundingClientRect()
    this.hoverBarIndex = Math.floor(
      (this.barLength / rect?.width!) * (event.x - rect?.left!)
    )
  }

  // 波形描画
  drawWaveform() {
    const ch1: Array<number> = this.peaksArr[0]

    if (this.waveformCanvas) {
      const ctx = this.waveformCanvas.getContext('2d')
      ctx?.clearRect(
        0,
        0,
        this.waveformCanvas.width,
        this.waveformCanvas.height
      )
      const barMargin = 1
      const barWidth = this.waveformCanvas.width / ch1.length - barMargin
      const canvasH = this.waveformCanvas.height
      const standardCanvasH = (canvasH * 3) / 4
      if (ctx) {
        let sample
        let barHeight
        for (let i = 0; i < ch1.length; i++) {
          //ch1
          sample = ch1[i]
          barHeight = sample * standardCanvasH

          if (barHeight < 4) {
            barHeight = 4
          }

          this.waveFillStyleHandler(
            ctx,
            i,
            this.barColor.baseColor,
            this.barColor.playingColor,
            this.barColor.playedColor,
            this.barColor.hoverColor
          )

          ctx.fillRect(
            i * (barWidth + barMargin),
            standardCanvasH - barHeight,
            barWidth,
            barHeight
          )

          this.waveFillStyleHandler(
            ctx,
            i,
            this.barColor.shadowBaseColor,
            this.barColor.shadowPlayingColor,
            this.barColor.shadowPlayedColor,
            this.barColor.shadowHoverColor
          )

          ctx.fillRect(
            i * (barWidth + barMargin),
            standardCanvasH + 5,
            barWidth,
            barHeight / 3
          )
        }
      }
    }
    requestAnimationFrame(this.drawWaveform)
  }

  waveFillStyleHandler(
    ctx: CanvasRenderingContext2D,
    index: number,
    baseColor: Color,
    playingColor: Color,
    playedColor: Color,
    hoverColor: Color
  ) {
    if (index < this.playCurrentBarIndex) {
      if (index < this.hoverBarIndex) {
        ctx.fillStyle = `rgb(${playedColor.r - hoverColor.r}, ${
          playedColor.g - hoverColor.g
        }, ${playedColor.b - hoverColor.b})`
      } else {
        ctx.fillStyle = `rgb(${playedColor.r}, ${playedColor.g}, ${playedColor.b})`
      }
    } else if (index === this.playCurrentBarIndex) {
      if (index === this.hoverBarIndex) {
        ctx.fillStyle = `rgb(${
          baseColor.r -
          hoverColor.r -
          playingColor.r * (this.barPlayingColorIndex + 1)
        }, ${
          baseColor.g -
          hoverColor.g -
          playingColor.g * (this.barPlayingColorIndex + 1)
        }, ${
          baseColor.b -
          hoverColor.b -
          playingColor.b * (this.barPlayingColorIndex + 1)
        })`
      } else {
        ctx.fillStyle = `rgb(${
          baseColor.r - playingColor.r * (this.barPlayingColorIndex + 1)
        }, ${baseColor.g - playingColor.g * (this.barPlayingColorIndex + 1)}, ${
          baseColor.b - playingColor.b * (this.barPlayingColorIndex + 1)
        })`
      }
    } else {
      if (index < this.hoverBarIndex) {
        ctx.fillStyle = `rgb(${baseColor.r - hoverColor.r}, ${
          baseColor.g - hoverColor.g
        }, ${baseColor.b - hoverColor.b})`
      } else {
        ctx.fillStyle = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`
      }
    }
  }

  destroyed() {
    this.audio.pause()
  }
}
</script>
