/**
 * Created by zhujiaye on 2017/7/5.
 */
import * as types from '../mutation-types'
import api from '../../api'

// initial state
const state = {
  runtimeStage: 'EDITING',
  allConnected: false,
  NodeMap: {},
  LinkMap: {},
  testV: ''
}

// getters
const getters = {
  getRuntimeStage: state => state.runtimeStage,
  getAllConnected: state => state.allConnected,
  getNodeMap: state => state.NodeMap,
  getLinkMap: state => state.LinkMap
}

// actions
const actions = {
  async checkConnection ({ commit }) {
    let allConnected = await api.checkConnection()
    commit(types.CHECK_CONNECTION, { allConnected })
    return allConnected
  },
  calcEndNodes ({ state, getters }) {
    let nodesArray = getters.getNodeMap
    for (let node in nodesArray) {
      nodesArray[node]._isSource_ = false
      nodesArray[node]._isTarget_ = false
      nodesArray[node]._target_ = []
      nodesArray[node]._source_ = []
    }
    console.log(nodesArray)
    for (let con in state.LinkMap) {
      let sourceNode = nodesArray[state.LinkMap[con].sourceId.split('-')[0]]
      let targetNode = nodesArray[state.LinkMap[con].targetId.split('-')[0]]
      sourceNode._isSource_ = true
      sourceNode._target_.push(targetNode)
      targetNode._isTarget_ = true
      targetNode._source_.push(sourceNode)
    }
    let result = []
    for (let node in nodesArray) {
      if (!nodesArray[node]._isSource_ && nodesArray[node]._isTarget_) result.push(nodesArray[node])
    }
    let calcPreNode = (pN) => {
      if (pN._source_.length === 0) {
        let rrr = pN.updateFun.call(pN.payload)
        window.log(rrr, '测试call')
      } else {
        pN._source_.forEach(e => {
          calcPreNode(e)
          let rrr = pN.updateFun.call(pN.payload)
          window.log(rrr, '测试call')
        })
      }
    }
    result.forEach(e => { calcPreNode(e) })
    return result
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
  },
  [types.NODEMAP_DELETE] (state, { keyName }) {
    delete state.NodeMap[keyName]
  },
  [types.NODEMAP_ADD] (state, { keyName, payload, updateFun }) {
    if (state.NodeMap[keyName] !== undefined) {
      return false
    } else {
      state.NodeMap[keyName] = {
        payload,
        updateFun
      }
      return true
    }
  },
  [types.NODEMAP_SET] (state, { keyName, payload }) {
    if (state.NodeMap[keyName] === undefined) {
      return false
    } else {
      state.NodeMap[keyName].payload = payload
    }
  },
  [types.LINKMAP_DELETE] (state, { keyName }) {
    delete state.LinkMap[keyName]
  },
  [types.LINKMAP_ADD] (state, { keyName, payload }) {
    if (state.LinkMap[keyName] !== undefined) {
      console.warn('忽略一条Linkmap ADD')
      return false
    } else {
      state.LinkMap[keyName] = payload
      return true
    }
  },
  [types.LINKMAP_SET] (state, { keyName, payload }) {
    if (state.LinkMap[keyName] === undefined) {
      return false
    } else {
      state.LinkMap[keyName] = payload
      return true
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
