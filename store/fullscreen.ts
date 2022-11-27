import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Asset } from '~/types'

/**
 * フルスクリーン機能に必要な情報を取得・保持するStore
 */
@Module({
  name: 'fullscreen',
  stateFactory: true,
  namespaced: true
})
export default class Fullscreen extends VuexModule {
  private fullscreen: boolean = false
  private assets: Asset[] = []

  public get getFullscreen() {
    return this.fullscreen
  }

  public get getAssets() {
    return this.assets
  }

  @Mutation
  SET_FULLSCREEN(fullscreen: boolean) {
    this.fullscreen = fullscreen
  }

  @Mutation
  SET_ASSETS(assets: Asset[]) {
    this.assets.splice(0)
    this.assets.push(...assets)
  }

  @Mutation
  INIT_ASSETS() {
    this.assets.splice(0)
  }

  @Action
  setFullscreen(fullscreen: boolean) {
    this.SET_FULLSCREEN(fullscreen)
  }

  @Action
  setAssets(assets: Asset[]) {
    this.SET_ASSETS(assets)
  }

  @Action
  initAssets() {
    this.INIT_ASSETS()
  }
}
