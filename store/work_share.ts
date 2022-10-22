import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { Work } from '@/types'

config.rawError = true

@Module({
  name: 'work_share',
  stateFactory: true,
  namespaced: true
})
export default class WorkShare extends VuexModule {
  private work!: Work

  get getURL() {
    return `${process.env.BASE_URL}works/${this.work.id}`
  }

  get getWork() {
    return this.work
  }

  @Mutation
  SET_WORK(work: Work) {
    this.work = work
  }

  @Action
  setWork(work: Work) {
    this.SET_WORK(work)
  }
}
