/**
 * Created by zhujiaye on 2017/7/5.
 */
import * as types from '../mutation-types'

// initial state
const state = {
  runtimeStage: 'EDITING'
}

// getters
const getters = {
  getRuntimeStage: state => state.runtimeStage
}

// actions
const actions = {}

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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
