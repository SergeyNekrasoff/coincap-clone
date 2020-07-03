import Vue from 'vue'
import Vuex from 'vuex'
import exchanges from './modules/exchanges'
import markets from './modules/markets'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: '',
    loading: false
  },

  mutations: {
    SET_ERROR (state, error) {
      state.error = error
    },
    SET_LOADING (state, status) {
      state.loading = status
    }
  },

  actions: {
    handleRequest({ commit }, data) {
      commit('SET_LOADING', data.loading)
      commit('SET_ERROR', data.error)
    },
  },

  modules: {
    exchanges,
    markets
  }
})
