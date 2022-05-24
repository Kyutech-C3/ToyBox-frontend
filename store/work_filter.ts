import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { GetTag } from '~/types'
import { tagStore } from '.'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

/**
 * 作品フィルターの条件を保持するStore
 */
@Module({
  name: 'work_filter',
  stateFactory: true,
  namespaced: true
})
export default class WorkFilter extends VuexModule {
  private filterTagIds: string[] = []

  public get getFilterTags() {
    return tagStore.getTags.filter((t) => this.filterTagIds.includes(t.id))
  }

  @Mutation
  SET_FILTER_TAGS(tags: GetTag[]) {
    this.filterTagIds = tags.map((t) => t.id)
  }

  @Mutation
  ADD_FILTER_TAGS(id: string) {
    this.filterTagIds.push(id)
  }

  @Mutation
  DELETE_FILTER_TAGS(id: string) {
    this.filterTagIds = this.filterTagIds.filter((i) => i !== id)
  }

  @Action
  public setFilterTags(tags: GetTag[]) {
    this.SET_FILTER_TAGS(tags)
  }

  @Action
  public addFilterTag(tag: GetTag) {
    this.ADD_FILTER_TAGS(tag.id)
  }

  @Action
  public deleteFilterTag(tag: GetTag) {
    this.DELETE_FILTER_TAGS(tag.id)
  }
}
