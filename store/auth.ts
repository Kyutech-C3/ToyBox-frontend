import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'

export interface User {
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

export interface Authentication {
  // eslint-disable-next-line camelcase
  expired_at: string,
  // eslint-disable-next-line camelcase
  access_token: string,
  // eslint-disable-next-line camelcase
  refresh_token: string
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

  public get getUser (): User {
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

  @Action({ rawError: true })
  public getAccessTokenByRefreshToken (refreshToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.SERVER_URL}auth/token`, {
        refresh_token: refreshToken
      })
        .then((result) => {
          console.log(result)
          const C3Authentication = {
            expired_at: String(result.data.expired_at),
            access_token: String(result.data.access_token),
            refresh_token: String(result.data.refresh_token)
          } as Authentication

          localStorage.setItem('C3Authentication', JSON.stringify(C3Authentication))
          resolve(result.data.access_token)
        })
        .catch((error) => {
          console.error(error)
          localStorage.removeItem('C3Authentication')
          reject(error)
        })
    })
  }
}
