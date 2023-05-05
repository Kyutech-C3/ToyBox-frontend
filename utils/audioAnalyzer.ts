export default class PeakAnalyzer {
  audioCtx = new AudioContext()
  promise!: Promise<Array<Array<number>>>

  constructor() {}

  /**
   * 音ファイルからPeakを取得します
   * @param url 分析する音ファイル
   * @param peakLength 欲しいpeakの配列の長さ
   * @return {*}
   */
  analyze(url: string, peakLength: number) {
    this.promise = new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'arraybuffer'
      req.onload = () => {
        if (req.status === 200) {
          this.onLoadSound(req.response, peakLength, resolve, reject)
        } else {
          reject(req.statusText)
        }
      }
      req.send()
    })
    return this.promise
  }

  onLoadSound(
    audioData: ArrayBuffer,
    peakLength: number,
    resolve: Function,
    reject: Function
  ) {
    this.audioCtx
      .decodeAudioData(audioData)
      .then((buffer) => {
        const ch1 = buffer.getChannelData(0)
        const peaks1 = this.getPeaks(ch1, peakLength)

        let ch2: Float32Array
        let peaks2: Array<number>
        if (buffer.numberOfChannels > 1) {
          ch2 = buffer.getChannelData(1)
          peaks2 = this.getPeaks(ch2, peakLength)
        } else {
          peaks2 = []
        }

        resolve([peaks1, peaks2])
      })
      .catch((error) => {
        reject(error)
      })
  }

  getPeaks(array: Float32Array, peakLength: number) {
    let step
    if (!peakLength) {
      peakLength = 9000
    }

    step = Math.floor(array.length / peakLength)

    if (step < 1) {
      step = 1
    }
    let peaks = []
    for (let i = 0, len = array.length; i < len; i += step) {
      const peak = this.getPeak(array, i, i + step)
      peaks.push(peak)
    }
    return peaks
  }

  getPeak(array: Float32Array, startIndex: number, endIndex: number) {
    const sliced = array.slice(startIndex, endIndex)
    let peak = -100
    for (let i = 0, len = sliced.length; i < len; i++) {
      const sample = sliced[i]
      if (sample > peak) {
        peak = sample
      }
    }
    return peak
  }
}
