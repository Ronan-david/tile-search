import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Engines: {
      json: [],
      chosen: [],
      filterTheme: '',
      filterName: ''
    }
  },
  mutations: {
    SET_ENGINE_JSON (state, payload) {
      state.Engines.json.push(payload)
    },
    SET_CHOSEN_ENGINE (state, payload) {
      for (let i = 0; i < state.Engines.chosen.length; i++) {
        if (state.Engines.chosen[i] === payload) {
          state.Engines.chosen.splice(i, 1)
          return
        }
      }
      state.Engines.chosen.push(payload)
    },
    SET_FILTER_THEME (state, payload) {
      state.Engines.filterTheme = payload
    },
    SET_FILTER_NAME (state, payload) {
      state.Engines.filterName = payload
    }
  },
  actions: {
    setEnginesJSON: ({ commit }, payload) => {
      commit('SET_ENGINE_JSON', payload)
    },
    setChosenEngine: ({ commit }, payload) => {
      commit('SET_CHOSEN_ENGINE', payload)
    },
    setFilterTheme: ({ commit }, payload) => {
      commit('SET_FILTER_THEME', payload)
    },
    setFilterName: ({ commit }, payload) => {
      commit('SET_FILTER_NAME', payload)
    }
  },
  getters: {
    getFilterTheme: state => state.Engines.filterTheme,
    getFilterName: state => state.Engines.filterName
  }
})
