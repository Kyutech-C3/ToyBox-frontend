import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

type User = {
  id: string
  name: string
  email: string
  displayName: string
  discordToken: string
  discordRefreshToken: string
  discordUserId: string
  avatarUrl: string
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
    displayName: '',
    discordToken: '',
    discordRefreshToken: '',
    discordUserId: '',
    avatarUrl: ''
  }

  private accessToken: string = ''

  public get getUser(): User {
    return this.user
  }

  public get nowLogin(): Boolean {
    return this.user.id !== ''
  }

  public get getAccessToken(): String {
    return this.accessToken
  }

  @Mutation
  setUser(user: any) {
    this.user.id = user.id
    this.user.name = user.name
    this.user.email = user.email
    this.user.displayName = user.display_name
    this.user.discordToken = user.discord_token
    this.user.discordRefreshToken = user.discord_refresh_token
    this.user.discordUserId = user.discord_user_id
    this.user.avatarUrl = user.avatar_url
  }

  @Mutation
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  @Action
  public authDiscord() {
    // ここでDiscordログイン実装
    window.location.href = String(process.env.AUTHENTICATION_URL)
  }

  @Action
  public newLoginSetAccessToken(accessToken: string) {
    this.setAccessToken(accessToken)
  }

  @Action
  public async authAgain() {
    await this.getAccessTokenByRefreshToken()
    await this.fetchUser()
  }

  @Action
  public fetchUser(accessToken?: string): Promise<void> {
    const token = accessToken || this.accessToken
    return new Promise((resolve, reject) => {
      axios
        .get('/users/@me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((result: any) => {
          this.setUser(result.data)
          resolve()
          console.log(result)
        })
        .catch(() => {
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

  @Action
  private getAccessTokenByRefreshToken(refreshToken?: string): Promise<void> {
    const token = refreshToken || String(localStorage.getItem('refresh_token'))
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/token', {
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
