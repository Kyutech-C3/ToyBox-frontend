import Vue from 'vue'
import Component from 'vue-class-component'
import { NavigationGuardNext, Route } from 'vue-router'
import { workPostStore } from '@/store'

@Component
export default class BlockUnloadMixin extends Vue {
  // 表示するメッセージ
  protected blockUnloadMessage = '編集した内容が消えちゃうけど、移動する？'

  change() {
    workPostStore.changeIsBlockUnload()
  }
  // ****************************
  // * ページを閉じるときの処理: beforeunloadイベント
  // ****************************
  created() {
    if (process.client) {
      // 作成時にイベントリスナーに登録
      window.addEventListener('beforeunload', this.checkWindow)
    }
  }

  beforeDestroy() {
    // 破棄される前にイベントリスナーから削除
    window.removeEventListener('beforeunload', this.checkWindow)
  }

  destroyed() {
    workPostStore.initIsBlockUnload()
  }

  // 実際の処理
  protected checkWindow(event: BeforeUnloadEvent) {
    if (!!workPostStore.getIsBlockUnload) {
      // unloadをキャンセルして、メッセージを表示
      event.preventDefault()
      event.returnValue = this.blockUnloadMessage
    }
  }

  // ****************************
  // * ページを移動するときの処理: v-router
  // ****************************
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    if (!!workPostStore.getIsBlockUnload) {
      // アラートダイアログを表示して、結果に応じて遷移
      const msg: string = this.blockUnloadMessage
      const answer: boolean = window.confirm(msg)
      if (!answer) {
        next(answer)
      } else {
        next()
      }
    } else {
      // next()は必ず呼び出さないといけない
      next()
    }
  }
}
