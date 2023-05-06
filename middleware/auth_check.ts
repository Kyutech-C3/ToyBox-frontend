import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const authCheck: Middleware = ({ route, error }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken || !authStore.getAccessToken) {
    error({ statusCode: 401, message: 'Unauthorized' })
  }
}

export default authCheck
