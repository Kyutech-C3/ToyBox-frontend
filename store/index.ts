import { Store } from 'vuex'
import { initializeStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initializeStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'


export default () => (new Store<{
  todos: string[]
}>({
  state: {
    todos: []
  },
  getters: {
    getTodos (state) {
      return state.todos
    }
  },
  mutations: {
    ADD_TODO(state, newTodo: string) {
      state.todos.push(newTodo)
    },
    DELETE_TODO(state, index: number) {
      state.todos = state.todos.filter(function (_, i) {
        return i !== index
      })
    }
  },
  actions: {
    addTodo(context, t) {
      context.commit('ADD_TODO', t)
    },
    deleteTodo(context, i) {
      context.commit('DELETE_TODO', i)
    }
  }
}))