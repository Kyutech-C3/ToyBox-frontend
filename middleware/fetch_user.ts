import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const fetchUser: Middleware = async ({ route }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (
    refreshToken &&
    authStore.getAccessToken &&
    !authStore.nowLogin &&
    !route.query.access_token
  ) {
    await authStore.fetchUser()
  }
}

export default fetchUser
