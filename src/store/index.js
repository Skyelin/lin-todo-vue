import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const STORAGE_KEY = 'todos-vuejs'
const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}
const getters = {
  todos: state => state.todos
}
const mutations = {
  handleAddTodo: (state,text)  => {
    state.todos.unshift({
      text,
      done: false
    })
  },
  handleDeleteTodo: (state, index) => {
    state.todos.splice(index, 1)
  },
  handleToggleTodo: (state, index) => {
    state.todos[index].done = !state.todos[index].done
  },
  handleDeleteAll: (state) => {
    // for(let index in state.todos) {
    //   if(state.todos[index].done == true) {
    //     state.todos.splice(index, 1)
    //   }
    // }
    let newList = state.todos.filter(x => x.done !== true)
    state.todos = newList
  },
  handleAllCheck: (state, isChecked) => {
    // for (let index in state.todos) {
    //   if (state.todos[index].done != isChecked) {
    //     state.todos[index].done = isChecked
    //   }
    // }
    state.todos.forEach(item => item.done = isChecked)
  },
  handleEditText: (state, item) => {
    state.todos[item.index].text = item.text
  }
}
const localStoragePlugin = store => {
  store.subscribe((mutation, {
    todos
  }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
