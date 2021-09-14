import { Middleware } from '@nuxt/types'
import { AuthStore } from '~/store'

const auth: Middleware = () => {
  const C3Authentication = JSON.parse(String(localStorage.getItem('C3Authentication')))
  if (AuthStore.getUser.id !== '') {
    return
  }
  console.log(C3Authentication)
  AuthStore.getAccessTokenByRefreshToken(C3Authentication.refresh_token)
    .then((accessToken) => {
      AuthStore.fetchUserByAccessToken(accessToken)
    })
}

export default auth
