import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Engines: {
      json: [],
      chosen: []
    },
    filters: []
  },
  mutations: {
    SET_ENGINE_JSON: (state, payload) => {
      state.Engines.json.push(payload)
    },
    SET_CHOSEN_ENGINE: (state, payload) => {
      for (let i = 0; i < state.Engines.chosen.length; i++) {
        if (state.Engines.chosen[i] === payload) {
          state.Engines.chosen.splice(i, 1)
          return
        }
      }
      state.Engines.chosen.push(payload)
    },
    SET_FILTER: (state, payload) => {
      const filterId = state.filters.findIndex(e => e.id === payload.id)
      if (filterId > -1) {
        state.filters[filterId] = payload
      } else {
        state.filters.push(payload)
      }
    }
  },
  actions: {
    setEnginesJSON: ({ commit }, payload) => {
      commit('SET_ENGINE_JSON', payload)
    },
    setChosenEngine: ({ commit }, payload) => {
      commit('SET_CHOSEN_ENGINE', payload)
    },
    setFilter: ({ commit }, payload) => {
      commit('SET_FILTER', payload)
    }
  },
  getters: {
    getFilters: state => state.filters
  }
})
