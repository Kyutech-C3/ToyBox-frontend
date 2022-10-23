import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { ResponseComment } from '@/types'

config.rawError = true

type TempReplyCommentInfo = {
  tempReplyComment: ResponseComment
  parentCommentId: string
}

@Module({
  name: 'comment',
  stateFactory: true,
  namespaced: true
})
export default class Comment extends VuexModule {
  private comments: ResponseComment[] = []
  private tempReplyCommentInfo: TempReplyCommentInfo = {
    tempReplyComment: {
      content: '',
      id: '',
      work_id: '',
      created_at: '',
      updated_at: '',
      number_of_reply: 0
    },
    parentCommentId: ''
  }

  get getComments() {
    return this.comments
  }

  get getTempReplyCommentInfo() {
    return this.tempReplyCommentInfo
  }

  get getTempReplyComment() {
    return this.tempReplyCommentInfo.tempReplyComment
  }

  @Mutation
  SET_COMMENTS(resComments: ResponseComment[]) {
    this.comments = resComments
  }

  @Mutation
  ADD_COMMENTS(resComment: ResponseComment) {
    this.comments.unshift(resComment)
  }

  @Mutation
  DELETE_COMMENTS(index: number) {
    this.comments = this.comments.filter(function (_, i) {
      return i !== index
    })
  }

  @Mutation
  SET_TEMPREPLYCOMMENTSINFO(postResReplyCommentInfo: TempReplyCommentInfo) {
    this.tempReplyCommentInfo.tempReplyComment =
      postResReplyCommentInfo.tempReplyComment
    this.tempReplyCommentInfo.parentCommentId =
      postResReplyCommentInfo.parentCommentId
  }

  @Action
  setComments(resComments: ResponseComment[]) {
    this.SET_COMMENTS(resComments)
  }

  @Action
  addComments(resComment: ResponseComment) {
    this.ADD_COMMENTS(resComment)
  }

  @Action
  deleteComments(index: number) {
    this.DELETE_COMMENTS(index)
  }

  @Action
  setTempReplyCommentInfo(postResReplyCommentInfo: TempReplyCommentInfo) {
    this.SET_TEMPREPLYCOMMENTSINFO(postResReplyCommentInfo)
  }
}
