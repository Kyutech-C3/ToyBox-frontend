import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { GetTag, Tag } from '~/types'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

/**
 * タグの情報を取得・保持するStore
 */
@Module({
  name: 'tag',
  stateFactory: true,
  namespaced: true
})
export default class TagStore extends VuexModule {
  private tags: Tag[] = []

  public get getTags() {
    return this.tags
  }

  @Mutation
  SET_TAGS(tags: Tag[]) {
    this.tags = tags
  }

  @Mutation
  ADD_TAGS(tags: Tag[]) {
    this.tags.push(...tags)
  }

  @Action
  public async fetchTags() {
    // すべてのタグを取得する
    const res = await axios.get<GetTag[]>('/tags')
    if (res.status !== 200) {
      return
    }
    this.SET_TAGS(res.data)
  }
}
