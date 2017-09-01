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
  calcEndNodes ({ state, getters }) {
    let nodesArray = getters.getNodeMap
    for (let node in nodesArray) {
      nodesArray[node]._isSource_ = false
      nodesArray[node]._isTarget_ = false
      nodesArray[node]._target_ = []
      nodesArray[node]._source_ = []
    }
   console.log(state.LinkMap)
    //console.log("that's what we called b-box")
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
  },
  checkTypes ({ state, getters}) {
    let linksArray =  getters.getNodeMap
    for(let link in linksArray) {
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
        type
      }
        //already add a nodemap item, why deep clone again?
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
    delete state.LinkMap[keyName]
  },
  [types.LINKMAP_ADD] (state, { keyName, payload }) {
    if (state.LinkMap[keyName] !== undefined) {
      console.warn('忽略一条Linkmap ADD')
      return false
    } else {
      state.LinkMap[keyName] = payload
      // window.log(keyName, 'linkmap app keyname')
      // window.log(payload, 'linkmap payload')
      let [sourceId, sPayloadKey] = payload.sourceId.split('-')
      let [targetId, tPayloadKey] = payload.targetId.split('-')
      // window.log(state.NodeMap[sourceId].payload, 'source payload key')
      // window.log(state.NodeMap[targetId].payload, 'target payload key')
      state.NodeMap[targetId].payload[tPayloadKey] = state.NodeMap[sourceId].payload[sPayloadKey]
      // let clone = __.cloneDeep(state.LinkMap)
      // state.LinkMap = clone
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
