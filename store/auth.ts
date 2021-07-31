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

export interface PartialGuild {
  id: string;
  name: string;
  icon: string | null | undefined;
  owner?: boolean;
  permissions?: number;
  features: string[];
  // eslint-disable-next-line camelcase
  permissions_new?: string;
}

export interface AuthData {
  token: string,
  isNewLogin: boolean
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
    flags: undefined,
    // eslint-disable-next-line camelcase
    premium_type: undefined,
    // eslint-disable-next-line camelcase
    public_flags: undefined
  }

  private guilds: PartialGuild[] = []

  public get getUser () :User {
    return this.user
  }

  public get isC3Menber () :Boolean {
    const isC3Menber = this.guilds.some((guild) => {
      return (guild.id === process.env.C3_GUILD_ID)
    })
    return isC3Menber
  }

  private get authURL () :string {
    return oauthDiscord.generateAuthUrl({
      scope: ['identify', 'guilds']
    })
  }

  @Mutation
  private setUser (user: User) {
    this.user = user
  }

  @Mutation
  private setGuilds (guilds: PartialGuild[]) {
    this.guilds = guilds
  }

  @Action({ rawError: true })
  public toAuthDiscordPage () {
    window.location.href = this.authURL
  }

  @Action({ rawError: true })
  public async fetchUser (authData: AuthData) :Promise<Boolean> {
    const accessToken = await this.requestAccessToken(authData)

    if (typeof (accessToken) !== 'string') {
      alert('認証に失敗しました')
      localStorage.removeItem('refresh_token')
      return false
    }

    await this.getUserByAccessToken(accessToken)
      .then((user) => {
        this.setUser(user)
        this.getUserGuilds().then((guilds) => {
          this.setGuilds(guilds)
        })
      })
    return true
  }

  @Action({ rawError: true })
  private requestAccessToken (authData: AuthData): Promise<string> {
    return new Promise((resolve, reject) => {
      oauthDiscord
        .tokenRequest({
          code: (authData.isNewLogin ? authData.token : ''),
          refreshToken: (authData.isNewLogin ? '' : authData.token),
          grantType: (authData.isNewLogin ? 'authorization_code' : 'refresh_token'),
          scope: ['identify', 'guilds']
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

  @Action({ rawError: true })
  private getUserGuilds (): Promise<PartialGuild[]> {
    return new Promise((resolve, reject) => {
      const authData = {
        token: String(localStorage.getItem('refresh_token')),
        isNewLogin: false
      } as AuthData
      this.requestAccessToken(authData)
        .then((result) => {
          oauthDiscord.getUserGuilds(result)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
