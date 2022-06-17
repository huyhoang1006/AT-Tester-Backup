import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    selectedLocation: [],
    selectedAsset: [],
    selectedJob: []
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getSelectedLocation(state) {
      return state.selectedLocation
    },
    getSelectedAsset(state) {
      return state.selectedAsset
    },
    getSelectedJob(state) {
      return state.selectedJob
    },
  },
  mutations: {
    SET_USER(state, user) {
      if (user !== null) {
        state.user = { ...user }
      }
      else {
        state.user = null
      }
    },
    SET_SELECTED_LOCATION(state, selectedLocation) {
      state.selectedLocation = [ ...selectedLocation ]
    },
    SET_SELECTED_ASSET(state, selectedAsset) {
      state.selectedAsset = [ ...selectedAsset ]
    },
    SET_SELECTED_JOB(state, selectedJob) {
      state.selectedJob = [ ...selectedJob ]
    },
  },
  actions: {
    removeUser({commit}) {
      commit('SET_USER', null)
    },
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setSelectedLocation({ commit }, selectedLocation) {
      commit('SET_SELECTED_LOCATION', selectedLocation)
    },
    setSelectedAsset({ commit }, selectedAsset) {
      commit('SET_SELECTED_ASSET', selectedAsset)
    },
    setSelectedJob({ commit }, selectedJob) {
      commit('SET_SELECTED_JOB', selectedJob)
    }
  },
  modules: {
  }
})