import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '~/store/auth'

// eslint-disable-next-line import/no-mutable-exports
let AuthStore: Auth
function initialiseStores (store: Store<any>): void {
  AuthStore = getModule(Auth, store)
}

export { initialiseStores, AuthStore }
