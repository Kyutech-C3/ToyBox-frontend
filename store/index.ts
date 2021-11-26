import { Store } from 'vuex'
import { initializeStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initializeStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'


export default () => (new Store<{
  comments: string[]
}>({
  state: {
    comments: []
  },
  getters: {
    getComments (state) {
      return state.comments
    }
  },
  mutations: {
    ADD_COMMENTS(state, newComment: string) {
      state.comments.push(newComment)
    },
    DELETE_COMMENTS(state, index: number) {
      state.comments = state.comments.filter(function (_, i) {
        return i !== index
      })
    }
  },
  actions: {
    addComment(context, t) {
      context.commit('ADD_COMMENT', t)
    },
    deleteTodo(context, i) {
      context.commit('DELETE_COMMENT', i)
    }
  }
}))