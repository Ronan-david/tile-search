import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Engines: {
      json: [],
      chosen: []
    },
    Criteria: {
      chosen: []
    },
    enginesFilters: null,
    categoriesFilters: null
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
    SET_CHOSEN_CRITERIA: (state, payload) => {
      state.Criteria.chosen = []
      for (let i = 0; i < payload.length; i++) {
        state.Criteria.chosen.push(payload[i])
      }
    },
    SET_ENGINES_FILTER: (state, payload) => {
      state.enginesFilters = payload
    },
    SET_CATEGORIES_FILTER: (state, payload) => {
      state.categoriesFilters = payload
    }
  },
  actions: {
    setEnginesJSON: ({ commit }, payload) => {
      commit('SET_ENGINE_JSON', payload)
    },
    setChosenEngine: ({ commit }, payload) => {
      commit('SET_CHOSEN_ENGINE', payload)
    },
    setChosenCriteria: ({ commit }, payload) => {
      commit('SET_CHOSEN_CRITERIA', payload)
    },
    setEnginesFilter: ({ commit }, payload) => {
      commit('SET_ENGINES_FILTER', payload)
    },
    setCategoriesFilter: ({ commit }, payload) => {
      commit('SET_CATEGORIES_FILTER', payload)
    }
  },
  getters: {
    getChosenEngines: state => state.Engines.chosen,
    getChosenCriteria: state => state.Criteria.chosen,
    getEnginesFilters: state => state.enginesFilters,
    getCategoriesFilters: state => state.categoriesFilters
  }
})
