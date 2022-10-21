import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { Visibility } from '~/types'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

type FilterVisibility = Visibility | ''

/**
 * 作品フィルターの条件を保持するStore
 */
@Module({
  name: 'work_filter',
  stateFactory: true,
  namespaced: true
})
export default class WorkFilter extends VuexModule {
  private searched: boolean = true
  private filterVisibility: FilterVisibility = ''

  public get getSearched() {
    return this.searched
  }

  public get getFilterVisibility() {
    return this.filterVisibility
  }

  @Mutation
  SET_FILTER_VISIBILITY(visibility: Visibility) {
    this.filterVisibility = visibility
  }

  @Mutation
  DELETE_FILTER_VISIBILITY() {
    this.filterVisibility = ''
  }

  @Mutation
  SET_SEARCHED(status: boolean) {
    this.searched = status
  }

  @Action
  public setFilterVisibility(visibility: Visibility) {
    this.SET_FILTER_VISIBILITY(visibility)
  }

  @Action
  public deleteFilterVisibility() {
    this.DELETE_FILTER_VISIBILITY()
  }

  @Action
  public setSearched(status: boolean) {
    this.SET_SEARCHED(status)
  }
}
