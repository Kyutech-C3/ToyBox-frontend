import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Asset } from '~/types'

/**
 * アセットプレビュー機能に必要な情報を取得・保持するStore
 */
@Module({
  name: 'preview',
  stateFactory: true,
  namespaced: true
})
export default class Preview extends VuexModule {
  private isPreview: boolean = false
  private assetIndex: number = 0
  private assetType: string = ''

  public get getIsPreview() {
    return this.isPreview
  }

  public get getAssetIndex() {
    return this.assetIndex
  }

  public get getAssetType() {
    return this.assetType
  }

  @Mutation
  SET_IS_PREVIEW(isPreview: boolean) {
    this.isPreview = isPreview
  }

  @Mutation
  SET_ASSET_INDEX(assetIndex: number) {
    this.assetIndex = assetIndex
  }

  @Mutation
  INIT_ASSET_INDEX() {
    this.assetIndex = 0
  }

  @Mutation
  SET_ASSET_TYPE(type: string) {
    this.assetType = type
  }

  @Action
  setIsPreview(isPreview: boolean) {
    this.SET_IS_PREVIEW(isPreview)
  }

  @Action
  setAsset(assetIndex: number) {
    this.SET_ASSET_INDEX(assetIndex)
  }

  @Action
  initAsset() {
    this.INIT_ASSET_INDEX()
  }

  @Action
  setAssetType(type: string) {
    this.SET_ASSET_TYPE(type)
  }
}
