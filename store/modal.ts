import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Component } from 'vue'

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
