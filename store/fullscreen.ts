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
  private assetInitData: Asset = {
    asset_type: '',
    id: '',
    user: {
      id: '',
      name: '',
      display_name: '',

      created_at: '',
      updated_at: ''
    },
    extension: '',
    url: '',
    created_at: '',
    updated_at: ''
  }
  private asset: Asset = this.assetInitData

  public get getFullscreen() {
    return this.fullscreen
  }

  public get getAsset() {
    return this.asset
  }

  @Mutation
  SET_FULLSCREEN(fullscreen: boolean) {
    this.fullscreen = fullscreen
  }

  @Mutation
  SET_ASSET(asset: Asset) {
    this.asset = asset
  }

  @Mutation
  INIT_ASSET() {
    this.asset = this.assetInitData
  }

  @Action
  setFullscreen(fullscreen: boolean) {
    this.SET_FULLSCREEN(fullscreen)
  }
  @Action
  setAsset(asset: Asset) {
    this.SET_ASSET(asset)
  }
  @Action
  initAsset() {
    this.INIT_ASSET()
  }
}
