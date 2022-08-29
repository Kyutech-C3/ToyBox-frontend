import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { ResponseComment } from '@/types'

config.rawError = true

@Module({
  name: 'comment',
  stateFactory: true,
  namespaced: true
})
export default class Comment extends VuexModule {
  private comments: ResponseComment[] = []

  get getComments() {
    return this.comments
  }

  @Mutation
  ADD_COMMENTS(resComments: ResponseComment[]) {
    this.comments = resComments
  }
  @Mutation
  DELETE_COMMENTS(index: number) {
    this.comments = this.comments.filter(function (_, i) {
      return i !== index
    })
  }

  @Action
  addComments(resComments: ResponseComment[]) {
    this.ADD_COMMENTS(resComments)
  }
  @Action
  deleteComments(index: number) {
    this.DELETE_COMMENTS(index)
  }
}
