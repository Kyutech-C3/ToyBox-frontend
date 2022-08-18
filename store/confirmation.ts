import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'

config.rawError = true

type confirmationType = '' | 'download'

@Module({
  name: 'confirmation',
  stateFactory: true,
  namespaced: true
})
export default class Confirmation extends VuexModule {
  private isApprove: boolean = false
  private isReject: boolean = false
  private approveTitle: string = ''
  private rejectTitle: string = ''
  private infomation: string = ''
  private type!: confirmationType

  get getApprove() {
    return this.isApprove
  }

  get getReject() {
    return this.isReject
  }

  get getApproveTitle() {
    return this.approveTitle
  }

  get getRejectTitle() {
    return this.rejectTitle
  }

  get getInfomation() {
    return this.infomation
  }

  get getType() {
    return this.type
  }

  @Mutation
  INIT() {
    this.isApprove = false
    this.isReject = false
    this.approveTitle = ''
    this.rejectTitle = ''
    this.infomation = ''
    this.type = ''
  }
  @Mutation
  APPROVE() {
    this.isApprove = true
  }
  @Mutation
  REJECT() {
    this.isReject = true
  }
  @Mutation
  SET_APPROVE_TITLE(approveTitle: string) {
    this.approveTitle = approveTitle
  }
  @Mutation
  SET_REJECT_TITLE(rejectTitle: string) {
    this.rejectTitle = rejectTitle
  }
  @Mutation
  SET_INFORMATION(infomation: string) {
    this.infomation = infomation
  }
  @Mutation
  SET_TYPE(type: confirmationType) {
    this.type = type
  }

  @Action
  init() {
    this.INIT()
  }
  @Action
  approve() {
    this.APPROVE()
  }
  @Action
  reject() {
    this.REJECT()
  }
  @Action
  setApproveTitle(approveTitle: string) {
    this.SET_APPROVE_TITLE(approveTitle)
  }
  @Action
  setRejectTitle(rejectTitle: string) {
    this.SET_REJECT_TITLE(rejectTitle)
  }
  @Action
  setInformation(infomation: string) {
    this.SET_INFORMATION(infomation)
  }
  @Action
  setType(type: confirmationType) {
    this.SET_TYPE(type)
  }
}
