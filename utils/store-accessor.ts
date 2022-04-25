import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/auth'
import Comment from '@/store/comment'

let authStore: Auth
let commentStore: Comment

function initializeStores(store: Store<any>): void {
  authStore = getModule(Auth, store)
  commentStore = getModule(Comment, store)
}

export { initializeStores, authStore, commentStore }
