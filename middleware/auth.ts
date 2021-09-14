import { Middleware } from '@nuxt/types'
import { AuthStore } from '~/store'

const auth: Middleware = () => {
  const refreshToken = String(localStorage.getItem('refresh_token'))
  if (!refreshToken ||
    AuthStore.getUser.id !== '') {
    return
  }
  AuthStore.authAgain()
}

export default auth
