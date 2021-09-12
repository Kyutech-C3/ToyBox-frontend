import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
type User = {
  id?: String
}

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private user: User = {
    id: ''
  }

  public get getTodos () {
    return this.user
  }

  @Mutation set (user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public async authDiscord () {
    // ここでDiscordログイン実装
  }
}
