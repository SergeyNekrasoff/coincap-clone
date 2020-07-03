import { 
    getMarkets
} from '@/http/markets.api'
  
const state = {
    data: []
}
  
const getters = {
    getMarkets: state => state.data,
    getMarket: state => (id) => state.data.find(m => m.exchangeId === id)
}

const mutations = {
    SET_DATA(state, data) {
        state.data = data
    }
}

const actions = {
    async getMarkets ({ commit }) {
        try {
            const { data } = await getMarkets()

            commit('SET_DATA', data.data)
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}