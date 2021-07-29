import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import DiscordOauth2 from 'discord-oauth2'
const oauthDiscord = new DiscordOauth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SEACRET,
  redirectUri: process.env.REDIRECT_URL
})

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null | undefined;
  // eslint-disable-next-line camelcase
  mfa_enabled?: true;
  locale?: string;
  verified?: boolean;
  email?: string | null | undefined;
  flags?: number;
  // eslint-disable-next-line camelcase
  premium_type?: number;
  // eslint-disable-next-line camelcase
  public_flags?: number;
}

export interface AuthData {
  token: string,
  authorization: boolean
}

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private user: User = {
    id: '',
    username: '',
    discriminator: '',
    avatar: null,
    // eslint-disable-next-line camelcase
    mfa_enabled: true,
    locale: undefined,
    verified: false,
    email: null,
    flags: 0,
    // eslint-disable-next-line camelcase
    premium_type: 0,
    // eslint-disable-next-line camelcase
    public_flags: 0
  }

  public get getUser () {
    return this.user
  }

  private get authURL () {
    return oauthDiscord.generateAuthUrl({
      scope: ['identify']
    })
  }

  @Mutation setUser (user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public toAuthDiscordPage () {
    // ここでDiscordログイン実装
    window.location.href = this.authURL
  }

  @Action({ rawError: true })
  public async fetchUser (authData: AuthData) {
    let accessToken
    if (authData.authorization) {
      accessToken = await this.RequestAccessTokenByAuthorizationCode(authData.token)
    } else {
      accessToken = await this.RequestAccessTokenByRefleshToken(authData.token)
    }

    if (typeof (accessToken) !== 'string') {
      alert('認証に失敗しました')
      localStorage.removeItem('refresh_token')
      return false
    }

    this.getUserByAccessToken(accessToken)
      .then((user) => {
        this.setUser(user)
        return true
      })
    // const credentials = Buffer.from(
    //   `${process.env.CLIENT_ID}:${process.env.CLIENT_SEACRET}`
    // ).toString('base64')
  }

  @Action({ rawError: true })
  private RequestAccessTokenByAuthorizationCode (authorizationCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      oauthDiscord
        .tokenRequest({
          code: authorizationCode,
          grantType: 'authorization_code',
          scope: ['identify']
        })
        .then((result) => {
          localStorage.setItem('refresh_token', result.refresh_token)
          resolve(result.access_token)
        })
        .catch((error) => {
          localStorage.removeItem('refresh_token')
          reject(error)
        })
    })
  }

  @Action({ rawError: true })
  private RequestAccessTokenByRefleshToken (refreshtoken: string) :Promise<string> {
    return new Promise((resolve, reject) => {
      oauthDiscord
        .tokenRequest({
          refreshToken: refreshtoken,
          grantType: 'refresh_token',
          scope: ['identify']
        })
        .then((result) => {
          localStorage.setItem('refresh_token', result.refresh_token)
          resolve(result.access_token)
        })
        .catch((error) => {
          localStorage.removeItem('refresh_token')
          reject(error)
        })
    })
  }

  @Action({ rawError: true })
  private getUserByAccessToken (accessToken: string) :Promise<User> {
    return new Promise((resolve, reject) => {
      oauthDiscord.getUser(accessToken)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
