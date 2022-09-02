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
  private assetsViewInfo: { url: string; asset_type: string }[] = []
  private thumbnailViewInfo: string = ''
  private isBlockUnload: boolean = false
  private selectedTags: GetTag[] = []

  get getAssetsViewInfo() {
    return this.assetsViewInfo
  }
  get getThumbnailViewInfo() {
    return this.thumbnailViewInfo
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
    for (let i = 0; i < editWorkData.assets.length; i++) {
      this.assetsViewInfo.push({
        url: `${process.env.ASSET_BASE_URL}/${editWorkData.assets[i].asset_type}/${editWorkData.assets[i].id}/origin.${editWorkData.assets[i].extention}`,
        asset_type: editWorkData.assets[i].asset_type
      })
    }
  }
  @Mutation
  ADD_ASSETSVIEWINFO(asssets: Asset) {
    this.assetsViewInfo.push({
      url: `${process.env.ASSET_BASE_URL}/${asssets.asset_type}/${asssets.id}/origin.${asssets.extention}`,
      asset_type: asssets.asset_type
    })
  }
  @Mutation
  DELETE_ASSETSVIEWINFO(number: number) {
    this.assetsViewInfo = this.assetsViewInfo.filter((_, index) => {
      return number !== index
    })
  }
  @Mutation
  INIT_THUMBNAILVIEWINFO() {
    this.thumbnailViewInfo = ''
  }
  @Mutation
  SET_THUMBNAILVIEWINFO(thumbnail: Asset) {
    this.thumbnailViewInfo = `${process.env.ASSET_BASE_URL}/${thumbnail.asset_type}/${thumbnail.id}/origin.${thumbnail.extention}`
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
    this.selectedTags = selectedTags
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
    this.selectedTags = []
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
  addAssetsViewInfo(asssets: Asset) {
    this.ADD_ASSETSVIEWINFO(asssets)
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
