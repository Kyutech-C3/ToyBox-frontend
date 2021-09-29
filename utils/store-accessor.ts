import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '~/store/auth'

// eslint-disable-next-line import/no-mutable-exports
let AuthStore: Auth
function initializeStores (store: Store<any>): void {
  AuthStore = getModule(Auth, store)
}

export { initializeStores, AuthStore }
