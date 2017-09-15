/**
 * Created by zhujiaye on 2017/7/5.
 */
import * as types from '../mutation-types'
import api from '../../api'
import __ from 'lodash'

// initial state
const state = {
  runtimeStage: 'EDITING',
  allConnected: false,
  hardwareConnected: false,
  NodeMap: {},
  LinkMap: {},
  testV: '',
  connectedDev: ['device-sensor-backlight_key', 'device-sensor-volume_sensor', 'device-sensor-backlight_key']
}

// getters
const getters = {
  getRuntimeStage: state => state.runtimeStage,
  getAllConnected: state => state.allConnected,
  getHardConnected: state => state.hardwareConnected,
  getNodeMap: state => state.NodeMap,
  getLinkMap: state => state.LinkMap,
  getterConnDev: state => state.connectedDev
}

// actions
const actions = {
  async checkConnection ({ commit }) {
    let allConnected = await api.checkConnection()
    commit(types.CHECK_CONNECTION, { allConnected })
    return allConnected
  },
  async checkHardware ({ commit }) {
    let hardwareConn = await api.checkHardware()
    console.log('ooooo + ' + hardwareConn)
    commit(types.CHECK_HARDWARE, { hardwareConn })
    return hardwareConn
  },
  // calcEndNodes ({ state, getters }) {
  //   let nodesArray = getters.getNodeMap
  //   for (let node in nodesArray) {
  //     nodesArray[node]._isSource_ = false
  //     nodesArray[node]._isTarget_ = false
  //     nodesArray[node]._target_ = []
  //     nodesArray[node]._source_ = []
  //   }
  //   console.log(state.LinkMap)
  //   // console.log("that's what we called b-box")
  //   for (let con in state.LinkMap) {
  //     let sourceNode = nodesArray[state.LinkMap[con].sourceId.split('-')[0]]
  //     let targetNode = nodesArray[state.LinkMap[con].targetId.split('-')[0]]
  //     sourceNode._isSource_ = true
  //     sourceNode._target_.push(targetNode)
  //     targetNode._isTarget_ = true
  //     targetNode._source_.push(sourceNode)
  //   }
  //   let result = []
  //   for (let node in nodesArray) {
  //     if (!nodesArray[node]._isSource_ && nodesArray[node]._isTarget_) result.push(nodesArray[node])
  //   }
  //   let calcPreNode = (pN) => {
  //     if (pN._source_.length === 0) {
  //       let rrr = pN.updateFun.call(pN.payload)
  //       window.log(rrr, '测试call')
  //     } else {
  //       pN._source_.forEach(e => {
  //         calcPreNode(e)
  //         let rrr = pN.updateFun.call(pN.payload)
  //         window.log(rrr, '测试call')
  //       })
  //     }
  //   }
  //   result.forEach(e => { calcPreNode(e) })
  //   return result
  // },
  checkTypes ({state, getters}) {
    let linksArray = getters.getNodeMap
    for (let link in linksArray) {
      console.log(link.sourceId)
    }
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
  // [types.CD_NODEMAP] (state) {
  //   let clone = __.cloneDeep(state.NodeMap)
  //   state.NodeMap = clone
  // },
  [types.NODEMAP_DELETE] (state, { keyName }) {
    delete state.NodeMap[keyName]
  },
  [types.NODEMAP_ADD] (state, { keyName, payload, updateFun, type }) {
    if (state.NodeMap[keyName] !== undefined) {
      return false
    } else {
      state.NodeMap[keyName] = {
        payload,
        updateFun,
        type,
        connectionInfo: {
          inputs: [],
          outputs: [],
          _in: {}
        }
      }
      // already add a nodemap item, why deep clone again?
      let clone = __.cloneDeep(state.NodeMap)
      state.NodeMap = clone
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
    let {sourceId, targetId} = state.LinkMap[keyName]
    // let [sId, sKey] = sourceId.split('-')
    // let [tId, tKey] = targetId.split('-')
    let sId = sourceId.split('-')[0]
    let tId = targetId.split('-')[1]
    let sIndex = state.NodeMap[sId].connectionInfo.outputs.indexOf(keyName)
    state.NodeMap[sId].connectionInfo.outputs.splice(sIndex, 1)
    let tIndex = state.NodeMap[tId].connectionInfo.inputs.indexOf(keyName)
    state.NodeMap[tId].connectionInfo.inputs.splice(tIndex, 1)
    // delete state.NodeMap[sId].connectionInfo[sKey]
    // delete state.NodeMap[tId].connectionInfo[tKey]
    delete state.LinkMap[keyName]
  },
  [types.LINKMAP_ADD] (state, { keyName, payload }) {
    if (state.LinkMap[keyName] !== undefined) {
      console.warn('忽略一条Linkmap ADD')
      return false
    } else {
      state.LinkMap[keyName] = payload
      let [sourceId, sPayloadKey] = payload.sourceId.split('-')
      let [targetId, tPayloadKey] = payload.targetId.split('-')
      window.log('tpk',tPayloadKey)
      if((tPayloadKey) === 'title')  tPayloadKey = 'active'
      window.log('tpk',tPayloadKey)
      state.NodeMap[targetId].payload[tPayloadKey] = state.NodeMap[sourceId].payload[sPayloadKey]
      state.NodeMap[targetId].connectionInfo.inputs.push(keyName)
      state.NodeMap[sourceId].connectionInfo.outputs.push(keyName)
      // if (state.NodeMap[targetId].connectionInfo._in === undefined) state.NodeMap[targetId].connectionInfo._in = {}
      state.NodeMap[targetId].connectionInfo._in[tPayloadKey] = keyName
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
  },
  [types.CHECK_HARDWARE] (state, { hardwareConn }) {
    state.hardwareConnected = hardwareConn
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
