import { createStore } from 'vuex'

export default createStore({
  state: {
    isNavOpen: false,
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen
    },
    initializeStore() {
      // login, authenticated or not
      if (loccalStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      // login
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) { 
      // logout
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
