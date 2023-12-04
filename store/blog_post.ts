import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { Blog, BlogAsset } from '@/types'

@Module({
  name: 'blog_post',
  stateFactory: true,
  namespaced: true
})
export default class BlogPost extends VuexModule {
  private assetsViewInfo: BlogAsset[] = []
  private thumbnailViewInfo: BlogAsset = {
    asset_type: '',
    id: '',
    url: '',
    user: {
      id: '',
      name: '',
      display_name: '',
      created_at: '',
      updated_at: ''
    },
    extension: '',
    created_at: '',
    updated_at: ''
  }

  get getAssetsViewInfo() {
    return this.assetsViewInfo
  }
  get getThumbnailViewInfo() {
    return this.thumbnailViewInfo
  }

  @Mutation
  INIT_ASSETSVIEWINFO() {
    this.assetsViewInfo = []
  }
  @Mutation
  SET_ASSETSVIEWINFO(assets: BlogAsset[]) {
    this.assetsViewInfo = assets
  }
  @Mutation
  ADD_ASSETSVIEWINFO(asset: BlogAsset) {
    this.assetsViewInfo.push(asset)
  }
  @Mutation
  DELETE_ASSETSVIEWINFO(number: number) {
    this.assetsViewInfo = this.assetsViewInfo.filter((_, index) => {
      return number !== index
    })
  }
  @Mutation
  INIT_THUMBNAILVIEWINFO() {
    this.thumbnailViewInfo = {
      asset_type: '',
      id: '',
      url: '',
      user: {
        id: '',
        name: '',
        display_name: '',
        created_at: '',
        updated_at: ''
      },
      extension: '',
      created_at: '',
      updated_at: ''
    }
  }
  @Mutation
  SET_THUMBNAILVIEWINFO(thumbnail: BlogAsset) {
    this.thumbnailViewInfo = thumbnail
  }
  @Action
  initAssetsViewInfo() {
    this.INIT_ASSETSVIEWINFO()
  }
  @Action
  setAssetsViewInfo(assets: BlogAsset[]) {
    this.SET_ASSETSVIEWINFO(assets)
  }
  @Action
  addAssetsViewInfo(asset: BlogAsset) {
    this.ADD_ASSETSVIEWINFO(asset)
  }
  @Action
  deleteAssetsViewInfo(number: number) {
    this.DELETE_ASSETSVIEWINFO(number)
  }
  @Action
  initThumbnailViewInfo() {
    this.INIT_THUMBNAILVIEWINFO()
  }
  @Action
  setThumbnailViewInfo(thumbnail: BlogAsset) {
    this.SET_THUMBNAILVIEWINFO(thumbnail)
  }
}
