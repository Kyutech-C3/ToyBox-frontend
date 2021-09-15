import { Middleware } from '@nuxt/types'
import { AuthStore } from '~/store'

const auth: Middleware = ({ route }) => {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken || AuthStore.nowLogin || route.query.access_token) {
    return
  }
  AuthStore.authAgain()
}

export default auth
