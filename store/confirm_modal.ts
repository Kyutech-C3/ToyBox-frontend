import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'

config.rawError = true

type confirmModalType = '' | 'download'

@Module({
  name: 'confirm_modal',
  stateFactory: true,
  namespaced: true
})
export default class confirmModal extends VuexModule {
  private isApprove: boolean = false
  private isReject: boolean = false
  private approveTitle: string = ''
  private rejectTitle: string = ''
  private information: string = ''
  private type!: confirmModalType

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

  get getInformation() {
    return this.information
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
    this.information = ''
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
  SET_INFORMATION(information: string) {
    this.information = information
  }
  @Mutation
  SET_TYPE(type: confirmModalType) {
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
  setInformation(information: string) {
    this.SET_INFORMATION(information)
  }
  @Action
  setType(type: confirmModalType) {
    this.SET_TYPE(type)
  }
}
