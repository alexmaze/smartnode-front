/**
 * Created by zhujiaye on 2017/7/5.
 */
import * as types from '../mutation-types'
import api from '../../api'

// initial state
const state = {
  runtimeStage: 'EDITING',
  allConnected: false
}

// getters
const getters = {
  getRuntimeStage: state => state.runtimeStage,
  getAllConnected: state => state.allConnected
}

// actions
const actions = {
  async checkConnection ({ commit }) {
    let allConnected = await api.checkConnection()
    commit(types.CHECK_CONNECTION, { allConnected })
    return allConnected
  }
}

// mutations
const mutations = {
  [types.START_SIMULATION] (state) {
    state.runtimeStage = 'SIMULATING'
  },
  [types.STOP_SIMULATION] (state) {
    state.runtimeStage = 'EDITING'
  },
  [types.START_UPLOADING] (state) {
    state.runtimeStage = 'UPLOADING'
  },
  [types.FINISH_UPLOADING] (state) {
    state.runtimeStage = 'EDITING'
  },
  [types.CHECK_CONNECTION] (state, { allConnected }) {
    state.allConnected = allConnected
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
