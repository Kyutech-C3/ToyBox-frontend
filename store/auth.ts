import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'

type User = {
  id: string,
  name: string,
  email: string,
  // eslint-disable-next-line camelcase
  display_name: string,
  // eslint-disable-next-line camelcase
  discord_token: string,
  // eslint-disable-next-line camelcase
  discord_refresh_token: string,
  // eslint-disable-next-line camelcase
  discord_user_id: string,
  // eslint-disable-next-line camelcase
  avatar_url: string,
  // eslint-disable-next-line camelcase
  created_at: string,
  // eslint-disable-next-line camelcase
  updated_at: string
}

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private user: User = {
    id: '',
    name: '',
    email: '',
    // eslint-disable-next-line camelcase
    display_name: '',
    // eslint-disable-next-line camelcase
    discord_token: '',
    // eslint-disable-next-line camelcase
    discord_refresh_token: '',
    // eslint-disable-next-line camelcase
    discord_user_id: '',
    // eslint-disable-next-line camelcase
    avatar_url: '',
    // eslint-disable-next-line camelcase
    created_at: '',
    // eslint-disable-next-line camelcase
    updated_at: ''
  }

  public get getUser () {
    return this.user
  }

  @Mutation setUser (user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public authDiscord () {
    // ここでDiscordログイン実装
    window.location.href = String(process.env.AUTHENTICATION_URL)
  }

  @Action({ rawError: true })
  public fetchUserByAccessToken (accessToken: string) {
    axios.get(`${process.env.SERVER_URL}users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result: any) => {
      this.setUser(result.data)
      console.log(result)
    })
  }
}
