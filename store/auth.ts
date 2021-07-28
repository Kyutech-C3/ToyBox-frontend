import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import DiscordOauth2 from 'discord-oauth2'
const oauthDiscord = new DiscordOauth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SEACRET
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

  public get getTodos () {
    return this.user
  }

  private get authURL () {
    return oauthDiscord.generateAuthUrl({
      scope: ['identify'],
      redirectUri: process.env.REDIRECT_URL
    })
  }

  @Mutation set (user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public authDiscord () {
    // ここでDiscordログイン実装
    window.location.href = this.authURL
  }
}
