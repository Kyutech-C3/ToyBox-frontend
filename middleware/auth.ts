import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth: Middleware = ({ route }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (
    authStore.getAccessToken &&
    !authStore.nowLogin &&
    !route.query.access_token
  ) {
    authStore.fetchUser()
  }
  if (!refreshToken || authStore.nowLogin || route.query.access_token) {
    return
  }
  authStore.authAgain()
}

export default auth
