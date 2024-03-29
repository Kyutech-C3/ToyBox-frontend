import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { GetTag, Work, Asset } from '@/types'

config.rawError = true

@Module({
  name: 'work_post',
  stateFactory: true,
  namespaced: true
})
export default class WorkPost extends VuexModule {
  private assetsViewInfo: Asset[] = []
  private thumbnailViewInfo: Asset = {
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
  private postAssetStatus: 'posting' | 'error' | '' = ''
  private postThumbnailStatus: string = ''
  private isBlockUnload: boolean = false
  private selectedTags: GetTag[] = []

  get getAssetsViewInfo() {
    return this.assetsViewInfo
  }
  get getThumbnailViewInfo() {
    return this.thumbnailViewInfo
  }
  get getPostAssetStatus() {
    return this.postAssetStatus
  }
  get getPostThumbnailStatus() {
    return this.postThumbnailStatus
  }
  get getIsBlockUnload() {
    return this.isBlockUnload
  }
  get getSelectedTags() {
    return this.selectedTags
  }

  @Mutation
  INIT_ASSETSVIEWINFO() {
    this.assetsViewInfo = []
  }
  @Mutation
  SET_ASSETSVIEWINFO(editWorkData: Work) {
    this.assetsViewInfo = editWorkData.assets
  }
  @Mutation
  ADD_ASSETSVIEWINFO(asset: Asset) {
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
  SET_THUMBNAILVIEWINFO(thumbnail: Asset) {
    this.thumbnailViewInfo = thumbnail
  }
  @Mutation
  SET_POSTASSETSTATUS(status: 'posting' | 'error' | '') {
    this.postAssetStatus = status
  }
  @Mutation
  SET_POSTTHUMBNAILSTATUS(status: 'posting' | 'error' | '') {
    this.postThumbnailStatus = status
  }
  @Mutation
  CHANGE_ISBLOCKUNLOAD() {
    this.isBlockUnload = true
  }
  @Mutation
  INIT_ISBLOCKUNLOAD() {
    this.isBlockUnload = false
  }
  @Mutation
  SET_SELECTEDTAGS(selectedTags: GetTag[]) {
    selectedTags.map((tag) => this.selectedTags.push(tag))
  }
  @Mutation
  ADD_SELECTEDTAGS(selectedTag: GetTag) {
    this.selectedTags.push(selectedTag)
  }
  @Mutation
  DELETE_SELECTEDTAGS() {
    this.selectedTags.pop()
  }
  @Mutation
  INIT_SELECTEDTAGS() {
    this.selectedTags.splice(0)
  }

  @Action
  initAssetsViewInfo() {
    this.INIT_ASSETSVIEWINFO()
  }
  @Action
  setAssetsViewInfo(editWorkData: Work) {
    this.SET_ASSETSVIEWINFO(editWorkData)
  }
  @Action
  addAssetsViewInfo(asset: Asset) {
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
  setThumbnailViewInfo(thumbnail: Asset) {
    this.SET_THUMBNAILVIEWINFO(thumbnail)
  }
  @Action
  setPostAssetStatus(status: 'posting' | 'error' | '') {
    this.SET_POSTASSETSTATUS(status)
  }
  @Action
  setPostThumbnailStatus(status: 'posting' | 'error' | '') {
    this.SET_POSTTHUMBNAILSTATUS(status)
  }
  @Action
  changeIsBlockUnload() {
    this.CHANGE_ISBLOCKUNLOAD()
  }
  @Action
  initIsBlockUnload() {
    this.INIT_ISBLOCKUNLOAD()
  }
  @Action
  setSelectedTags(selectedTags: GetTag[]) {
    this.SET_SELECTEDTAGS(selectedTags)
  }
  @Action
  addSelectedTags(selectedTag: GetTag) {
    this.ADD_SELECTEDTAGS(selectedTag)
  }
  @Action
  deleteSelectedTags() {
    this.DELETE_SELECTEDTAGS()
  }
  @Action
  initSelectedTags() {
    this.INIT_SELECTEDTAGS()
  }
}
