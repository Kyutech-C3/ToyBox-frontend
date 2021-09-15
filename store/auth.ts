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

  // eslint-disable-next-line camelcase
  private access_token: string = ''

  public get getUser (): User {
    return this.user
  }

  public get nowLogin (): Boolean {
    return this.user.id !== ''
  }

  @Mutation setUser (user: User) {
    this.user = user
  }

  @Mutation setAccessToken (accessToken: string) {
    this.access_token = accessToken
  }

  @Action({ rawError: true })
  public authDiscord () {
    // ここでDiscordログイン実装
    window.location.href = String(process.env.AUTHENTICATION_URL)
  }

  @Action({ rawError: true })
  public newLoginSetAccessToken (accessToken: string) {
    this.setAccessToken(accessToken)
  }

  @Action({ rawError: true })
  public async authAgain () {
    await this.getAccessTokenByRefreshToken()
    await this.fetchUser()
  }

  @Action({ rawError: true })
  public fetchUser (accessToken?:string): Promise<void> {
    const token = accessToken || this.access_token
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.SERVER_URL}users/@me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((result: any) => {
        this.setUser(result.data)
        resolve()
        console.log(result)
      }).catch(() => {
        // access_tokenが失効してしまった場合
        this.getAccessTokenByRefreshToken()
          .then(() => {
            this.fetchUser()
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    })
  }

  @Action({ rawError: true })
  private getAccessTokenByRefreshToken (refreshToken?: string): Promise<void> {
    const token = refreshToken || String(localStorage.getItem('refresh_token'))
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.SERVER_URL}auth/token`, {
        refresh_token: token
      })
        .then((result) => {
          console.log(result)
          this.setAccessToken(result.data.access_token)
          localStorage.setItem('refresh_token', result.data.refresh_token)
          resolve()
        })
        .catch((error) => {
          console.error(error)
          alert('ログイン認証に失敗しました。もう一度ログインしてください。')
          localStorage.removeItem('refresh_token')
          reject(error)
        })
    })
  }
}
