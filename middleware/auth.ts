import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth: Middleware = ({ route }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken || authStore.nowLogin || route.query.access_token) {
    return
  }
  authStore.authAgain()
}

export default auth
