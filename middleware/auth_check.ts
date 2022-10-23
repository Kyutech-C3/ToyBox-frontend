import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth_check: Middleware = ({ route, error }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken || authStore.nowLogin || route.query.access_token) {
    if (!refreshToken && !authStore.nowLogin) {
      return error({ statusCode: 403, message: 'Forbidden' })
    }
  }
}

export default auth_check
