import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { Asset } from '@/types'

config.rawError = true

@Module({
  name: 'download_asset',
  stateFactory: true,
  namespaced: true
})
export default class DownloadAsset extends VuexModule {
  private asset!: Asset

  get getAsset() {
    return this.asset
  }

  @Mutation
  SET_ASSET(asset: Asset) {
    this.asset ? Object.assign(this.asset, asset) : (this.asset = asset)
  }

  @Action
  setAsset(asset: Asset) {
    this.SET_ASSET(asset)
  }
}
