import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth: Middleware = async ({ route }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (
    authStore.getAccessToken &&
    !authStore.nowLogin &&
    !route.query.access_token
  ) {
    await authStore.fetchUser()
  }
  if (!refreshToken || authStore.nowLogin || route.query.access_token) {
    return
  }
  await authStore.authAgain()
}

export default auth
