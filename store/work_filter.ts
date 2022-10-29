import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Visibility } from '~/types'

type FilterVisibility = Visibility | ''
type PageName = 'top' | 'user'

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
  private useConditionsWhenAsyncData: boolean = false
  private onPageName: PageName = 'top'

  public get getSearched() {
    return this.searched
  }

  public get getFilterVisibility() {
    return this.filterVisibility
  }

  public get getUseConditionsWhenAsyncData() {
    return this.useConditionsWhenAsyncData
  }

  public get getOnPageName() {
    return this.onPageName
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

  @Mutation
  SET_USECONDITIONSWHENASYNCDATA(status: boolean) {
    this.useConditionsWhenAsyncData = status
  }

  @Mutation
  SET_ONPAGENAME(pageName: PageName) {
    this.onPageName = pageName
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

  @Action
  public setUseConditionsWhenAsyncData(status: boolean) {
    this.SET_USECONDITIONSWHENASYNCDATA(status)
  }

  @Action
  public setOnPageName(pageName: PageName) {
    this.SET_ONPAGENAME(pageName)
  }
}
