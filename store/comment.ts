import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'

config.rawError = true

@Module({
  name: 'comment',
  stateFactory: true,
  namespaced: true
})
export default class Comment extends VuexModule {
  private comments: string[] = []

  get getComments() {
    return this.comments
  }

  @Mutation
  ADD_COMMENTS(newComment: string) {
    this.comments.push(newComment)
  }
  @Mutation
  DELETE_COMMENTS(index: number) {
    this.comments = this.comments.filter(function (_, i) {
      return i !== index
    })
  }

  @Action
  addComment(newComment: string) {
    this.ADD_COMMENTS(newComment)
  }
  @Action
  deleteComment(index: number) {
    this.DELETE_COMMENTS(index)
  }
}
