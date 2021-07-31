import { Middleware } from '@nuxt/types'
import { AuthStore } from '@/store'
import { AuthData } from '@/store/auth.ts'

const auth: Middleware = () => {
  const refleshToken = localStorage.getItem('refresh_token')
  if (refleshToken === null || AuthStore.getUser.id !== '') {
    return
  }

  const authData = {
    token: refleshToken,
    isNewLogin: false
  } as AuthData
  AuthStore.fetchUser(authData)
}

export default auth
