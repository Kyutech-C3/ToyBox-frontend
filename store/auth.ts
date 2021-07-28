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

  private accessToken: string = ''

  public get getTodos () {
    return this.user
  }

  private get authURL () {
    return oauthDiscord.generateAuthUrl({
      scope: ['identify']
    })
  }

  @Mutation set (user: User) {
    this.user = user
  }

  @Mutation setAccessToken (token: string) {
    this.accessToken = token
  }

  @Action({ rawError: true })
  public toAuthDiscordPage () {
    // ここでDiscordログイン実装
    window.location.href = this.authURL
  }

  @Action({ rawError: true })
  public fetchUser (token: string, authorization: boolean) {
    if (authorization) {
      this.RequestAccessTokenByAuthorizationCode(token)
    } else {
      this.RequestAccessTokenByRefleshToken(token)
    }
    // const credentials = Buffer.from(
    //   `${process.env.CLIENT_ID}:${process.env.CLIENT_SEACRET}`
    // ).toString('base64')
  }

  @Action({ rawError: true })
  private RequestAccessTokenByAuthorizationCode (authorizationCode: string) {
    oauthDiscord
      .tokenRequest({
        code: authorizationCode,
        grantType: 'authorization_code',
        scope: ['identify']
      })
      .then((result) => {
        this.setAccessToken(result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
        console.log(result)
      })
  }

  @Action({ rawError: true })
  private RequestAccessTokenByRefleshToken (refreshtoken: string) {
    oauthDiscord
      .tokenRequest({
        refreshToken: refreshtoken,
        grantType: 'refresh_token',
        scope: ['identify']
      })
      .then((result) => {
        this.setAccessToken(result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
        console.log(result)
      })
  }
}
