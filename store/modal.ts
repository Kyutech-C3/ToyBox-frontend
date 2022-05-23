import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { Component } from 'vue'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

@Module({
  name: 'modal',
  stateFactory: true,
  namespaced: true
})
export default class Modal extends VuexModule {
  private modalComponent: Component | null = null

  public get getComponent(): Component | null {
    return this.modalComponent
  }

  @Mutation
  setModalComponent(c: Component) {
    console.debug('setModalComponent')
    this.modalComponent = c
  }

  @Mutation
  deleteModalComponent() {
    this.modalComponent = null
  }

  @Action
  public open(c: Component) {
    this.setModalComponent(c)
  }

  @Action
  public close() {
    this.deleteModalComponent()
  }
}
