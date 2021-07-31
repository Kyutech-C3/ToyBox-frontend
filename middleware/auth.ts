import { Middleware } from '@nuxt/types'
import { AuthStore } from '@/store'
import { AuthData } from '@/store/auth.ts'

const auth: Middleware = async ({ route }) => {
  const refleshToken = localStorage.getItem('refresh_token')
  if (refleshToken === null ||
      AuthStore.getUser.id !== '' ||
      route.name === 'redirect') {
    return
  }

  const authData = {
    token: refleshToken,
    isNewLogin: false
  } as AuthData
  await AuthStore.fetchUser(authData)
}

export default auth
