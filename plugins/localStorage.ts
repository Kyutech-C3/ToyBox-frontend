import { Context } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

export default ({ store }: Context) => {
  createPersistedState({
    key: 'toybox-auth',
    paths: ['auth.user', 'auth.accessToken']
  })(store)
}
