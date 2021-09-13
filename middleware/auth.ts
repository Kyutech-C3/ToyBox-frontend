import { Middleware } from '@nuxt/types'
import { AuthStore } from '~/store'

const auth: Middleware = ({ route }) => {
  const refreshToken = String(localStorage.getItem('refresh_token'))
  if (refreshToken === null ||
    AuthStore.getUser.id !== '' ||
    route.query.access_token !== '') {
    return
  }
  AuthStore.getAccessTokenByRefreshToken(refreshToken)
    .then((accessToken) => {
      AuthStore.fetchUserByAccessToken(accessToken)
    })
}

export default auth
