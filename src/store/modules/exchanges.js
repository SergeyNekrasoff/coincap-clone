import {
  getExchanges,
  getExchange,
  getCandles
} from '@/http/exchanges.api'

const state = {
  data: [],
  current: null,
  candles: []
}

const getters = {
  getExchanges: state => state.data,
  getExchange: state => state.current,
  getCandles: state => state.candles,
}

const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },
  SET_CURRENT(state, data) {
    state.current = data
  },
  SET_CANDLES(state, data) {
    state.candles = data
  }
}

const actions = {
  async getExchanges({ commit }) {
    try {
      const { data } = await getExchanges()
      commit('SET_DATA', data.data)
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  },
  async getExchange({ commit }, id) {
    try {
      const { data } = await getExchange(id)
      commit('SET_CURRENT', data.data)
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  },
  async getCandles({ commit }, data) {
    try {
      const response = await getCandles(data)
      commit('SET_CANDLES', response.data.data)
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}