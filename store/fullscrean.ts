import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { Asset } from '~/types'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

/**
 * フルスクリーン機能に必要な情報を取得・保持するStore
 */
@Module({
  name: 'fullscrean',
  stateFactory: true,
  namespaced: true
})
export default class Fullscrean extends VuexModule {
  private fullscrean: boolean = false
  private assetInitData: Asset = {
    asset_type: '',
    id: '',
    user: {
      id: '',
      name: '',
      email: '',
      display_name: '',

      created_at: '',
      updated_at: ''
    },
    extention: '',
    created_at: '',
    updated_at: ''
  }
  private asset: Asset = this.assetInitData

  public get getFullscrean() {
    return this.fullscrean
  }

  public get getAsset() {
    return this.asset
  }

  @Mutation
  SET_FULLSCREAN(fullscrean: boolean) {
    this.fullscrean = fullscrean
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
  setFullscrean(fullscrean: boolean) {
    this.SET_FULLSCREAN(fullscrean)
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
