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

  get getThumbnailViewInfo() {
    return this.thumbnailViewInfo
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
  initThumbnailViewInfo() {
    this.INIT_THUMBNAILVIEWINFO()
  }
  @Action
  setThumbnailViewInfo(thumbnail: BlogAsset) {
    this.SET_THUMBNAILVIEWINFO(thumbnail)
  }
}
