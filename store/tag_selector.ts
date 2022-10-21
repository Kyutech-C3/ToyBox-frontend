import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { GetTag } from '@/types'

config.rawError = true

@Module({
  name: 'tag_selector',
  stateFactory: true,
  namespaced: true
})
export default class TagSelector extends VuexModule {
  private selectedTags: GetTag[] = []

  get getSelectedTags() {
    return this.selectedTags
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
