import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth: Middleware = ({ route, error }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken || authStore.nowLogin || route.query.access_token) {
    if (!refreshToken && !authStore.nowLogin) {
      error({ statusCode: 403, message: 'Forbidden' })
    }
    return
  }
  if (refreshToken) {
    authStore.authAgain()
  }
}

export default auth
