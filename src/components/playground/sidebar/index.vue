<template>
  <div class="sidebar" :class="{ 'active': isShow }" >
    <div class="sidebar-header">
      <div class="hardware-lib" :class="{active: toolboxStage === 'hardware'}" @click="toggleStage('hardware')">
        <i class="iconfont icon-module-icon"></i>
        <span>硬件库</span>
      </div>
      <div class="syntax-lib" :class="{active: toolboxStage === 'syntax'}" @click="toggleStage('syntax')">
        <i class="iconfont icon-syntax-lib"></i>
        <span>语法库</span>
      </div>
      <i class="iconfont icon-back" @click="toggleSidebar"></i>
    </div>
    <div>
      {{$store.state.runtime.NodeMap}}
    </div>
    <div class="search">
      <i class="iconfont icon-search" ></i>
      <input type="search" :placeholder="(toolboxStage === 'hardware') ? '搜索硬件...' : '搜索语法...'" v-model = "searchInp">
      <i class="iconfont icon-reload" :style="{transform:'rotate3d(0,0,1,' + rotateDeg + 'deg)'}" @click="reloadAnimate"></i>
    </div>
    <el-collapse v-show="toolboxStage === 'hardware'" v-model="activeNames" @change="">
      <el-collapse-item title="已连通的实体硬件" name="1">
        <div style="display: flex; justify-content: center; align-content: center" v-if="!hardwareConn">
          <img src="/static/img/icons/connection-reminder.svg" style="margin: 68px 0;" alt="">
        </div>
        <div v-for="(item, index) in getterConnDev" v-if="hardwareConn" class="device" draggable="true"
             @dragstart="setDataTransfer(item, $event)">
          <div class="node">
            <img class="device-icon" src="/static/img/node.png" draggable="false" alt="">
            <img class="status" src="/static/img/icons/unconnected.svg" alt="">

          </div>
          <div class="device-info">
            <p>{{ getConnDev(index) }}</p>
            <p class="last-timestamp">6.25 09:32</p>
            <!--<p class="identifier"></p>-->
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级" name="2">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(s, name) in node_device.advance"
               class="device"
               draggable="true"
               @dragstart="setDataTransfer(['device', 'advance', name, s.title], $event)"
               v-if="s.title.match(searchInp) != null">
            <!--{{name}}*******************{{s}}-->
            <div class="node">
              <img class="device-icon" src="/static/img/node.png" draggable="false" alt="">
              <!--<img class="status" src="/static/img/icons/unconnected.svg" draggable="false" alt="">-->
            </div>
            <div class="device-info">
              <p>{{s.title}}</p>
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="传感器" name="3">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(s, name) in node_device.sensor"
               class="device"
               draggable="true"
               @dragstart="setDataTransfer(['device', 'sensor', name, s.title], $event)"
               v-if="s.title.match(searchInp) != null">
            <!--{{name}}*******************{{s}}-->
            <div class="node">
              <img class="device-icon" src="/static/img/node.png" draggable="false" alt="">
              <!--<img class="status" src="/static/img/icons/unconnected.svg" draggable="false" alt="">-->
            </div>
            <div class="device-info">
              <p>{{s.title}}</p>
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="执行器" name="4">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(s, name) in node_device.execute"
               class="device"
               draggable="true"
               @dragstart="setDataTransfer(['device', 'execute', name, s.title], $event)"
               v-if="s.title.match(searchInp) != null">
            <!--{{name}}*******************{{s}}-->
            <div class="node">
              <img class="device-icon" src="/static/img/node.png" draggable="false" alt="">
              <!--<img class="status" src="/static/img/icons/unconnected.svg" draggable="false" alt="">-->
            </div>
            <div class="device-info">
              <p>{{s.title}}</p>
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-show="toolboxStage === 'syntax'" v-model="activeNames" @change="">
      <el-collapse-item title="Logic Patch" name="5">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.logic" class="syntax-node logic-node"
          draggable="true" @dragstart="setDataTransfer(['virtual', 'logic', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Control Flow Patch" name="6">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.control" class="syntax-node control-node"
               draggable="true" @dragstart="setDataTransfer(['virtual', 'control', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Operator Patch" name="7">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.operator" class="syntax-node operator-node"
               draggable="true" @dragstart="setDataTransfer(['virtual', 'operator', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Math Patch" name="8">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.math" class="syntax-node math-node"
               draggable="true" @dragstart="setDataTransfer(['virtual', 'math', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Utility Patch" name="9">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.utility" class="syntax-node utility-node"
               draggable="true" @dragstart="setDataTransfer(['virtual', 'utility', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Data Patch" name="10">
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(item, name) in node_virtual.data" class="syntax-node data-node"
               draggable="true" @dragstart="setDataTransfer(['virtual', 'data', name, item.title], $event)">
            <p class="title">{{ item.title }}</p>
            <img class="dash" src="/static/img/icons/dashline.svg" alt="">
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
  </div>
</template>

<script>
  /* eslint-disable */

  import { NODE_TYPES_TREE } from '../node-types-tree.const.js'
import { nodesConfig } from '../../../../node-conf'
  import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sidebar',
  components: {
  },
  props: ['isShow'],
  data () {
    return {
      searchInp: '',
      data: NODE_TYPES_TREE,
      defaultProps: {
        children: 'sub',
        label: 'label'
      },
      toolboxStage: 'hardware',
      rotateDeg: 0,
      activeNames: ['2'],
      node_device: nodesConfig.device,
      node_virtual: nodesConfig.virtual,
      hardwareConn: false
    }
  },
  computed: {
    ...mapGetters(['getHardConnected','getterConnDev'])
  },
  methods: {
    ...mapActions(['checkHardware']),
    getConnDev (index) {
      //this.connectedDev.forEach(function (cur) {
      let data = this.getterConnDev[index].split('-')
      return nodesConfig[data[0]][data[1]][data[2]].title

//          let data = []
//          data.push(cur.split('-')[2]) ;
//          //this.idDev.push(cur.split('-')[2])
//          console.log('data ' + data)
      //})
    },
//    handleNodeClick (data, node) {
//      if (data.sub) return
//      let type = {
//        primary: node.parent.parent.data.key,
//        _primaryLabel: node.parent.parent.data.label,
//        secondary: node.parent.data.key,
//        _secondaryLabel: node.parent.data.label,
//        tertiary: node.data.key,
//        _tertiaryLabel: node.data.label
//      }
//      type._all = `${type.primary}-${type.secondary}-${type.tertiary}`
//      this.$emit('add-node', type)
////      console.log(type)
//    },
    setDataTransfer (data, ev) {
//      console.log(ev)
//      console.log(ev.target)
//      console.log(data)
//      ev.dataTransfer.setData('data', JSON.stringify({
//        primary: 'device',
//        secondary: 'switch',
//        tertiary: 'snap',
//        _all: 'device-switch-snap',
//        _primaryLabel: 'Device Nodes',
//        _secondaryLabel: 'Switchs',
//        _tertiaryLabel: 'Switch'
//      }))
      if (data === null) {
        ev.dataTransfer.setData('data', JSON.stringify({
          ...nodesConfig.device.sensor.human_infrared,
          primary: 'device',
          _primaryLabel: 'Device Nodes',
          secondary: 'sensor',
          _secondaryLabel: 'Sensor',
          tertiary: 'human_infrared',
          _tertiaryLabel: '人体红外传感器',
          _all: 'device-sensor'
        }))
      } else
      //if(data.match('-') !== null)
      if(typeof data === 'string')
      {
        let temp = data.split('-')
        let tLabel = nodesConfig[temp[0]][temp[1]][temp[2]].title
        let type = {
          ...nodesConfig[temp[0]][temp[1]][temp[2]],
          primary: temp[0],
          _primaryLabel: '',
          secondary: temp[1],
          _secondaryLabel: '',
          tertiary: temp[2],
          _tertiaryLabel: tLabel
        }
        type._all = type.primary
        ev.dataTransfer.setData('data', JSON.stringify(type))

        //this.connectedDev.pop(index)
        console.log(this.connectedDev);
      }else
      {
//        console.log('---', 'configBeforeEmit', nodesConfig[data[0]][data[1]][data[2]], '---')
        let type = {
          ...nodesConfig[data[0]][data[1]][data[2]],
          primary: data[0],
          _primaryLabel: '',
          secondary: data[1],
          _secondaryLabel: '',
          tertiary: data[2],
          _tertiaryLabel: data[3]
        }
//        console.log('---', '展开后的config', type, '---')
//        type._all = `${type.primary}-${type.secondary}`
        type._all = type.primary
        ev.dataTransfer.setData('data', JSON.stringify(type))
//        console.log(type)
      }
    },
    toggleStage (stage) {
      this.toolboxStage = stage
    },
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    },
    reloadAnimate () {
      this.reloadFinished = false
      setTimeout(() => {
        this.reloadFinished = true
      }, 2000)
      let ani = () => {
        this.rotateDeg += 12
        if (!this.reloadFinished) {
          requestAnimationFrame(ani)
        } else {
          this.rotateDeg = 0
        }
      }
      requestAnimationFrame(ani)
      //check hardware
      //console.log(this)
      if(this.getHardConnected){
        // if hardware connected, show the hardware list as toolbar did
        this.hardwareConn = true
        console.log(this.hardwareConn)
      }
      else {
          this.checkHardware()
      }
    }
  },

  created () {
    console.log(nodesConfig)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../index";

.sidebar {
  position: absolute;
  top: -1px;
  right: 0;
  width: calc(~'34.375% - 1px');
  height: 100%;
  background: #ffffff;
  border-left: 1px solid #DADADA;
  border-top: 1px solid #DADADA;
  transition: all .2s;
  transform: translate(100%);
  overflow: auto;
  &.active {
    transform: translate(0);
  }

  .sidebar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    margin: 14px 0 31px 0;
    div {
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
      display: inline-flex;
      justify-content: inherit;
      align-items: inherit;
      font-size: 14px;
      max-width: 147px;
      width:33.5616%;
      height: 100%;
      background: @button-inactivate;
      color: @black-text;
      span {
        margin-left: 10px;
      }
      &:first-of-type {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        /*background: red;*/
      }
      &:last-of-type {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        /*background: blue;*/
      }
      &.active {
        background: @button-activate;
        color: @white;
        &:hover {
          background: darken(@button-activate, 10%);
        }
      }
      &:hover {
        background: darken(@button-inactivate, 10%);
      }
    }
    .icon-back{
      position: absolute;
      right: 24px;
      color: @back-btn;
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
      &:hover {
        color: darken(@back-btn,10%)
      }
    }
  }

  .search {
    padding: 0 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon-search{
      position: absolute;
      right:97px;
      color: @search-placeholder;
    }
    input{
      margin-right:28px;
      width: 100%;
      height: 100%;
      border-radius: 100px;
      border:none;
      background: @search-input;
      font-family: PingFangSC;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 1.2px;
      color: @black-text;
      padding: 1px 17px;
      outline:none;
      &::-webkit-input-placeholder{
        color: @search-placeholder;
      }
      &:-moz-placeholder{
        color: @search-placeholder;
      }
      &::-moz-placeholder{
        color: @search-placeholder;
      }
      &:-ms-input-placeholder{
        color: @search-placeholder;
      }
    }
    .icon-reload{
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
      color: @reload-icon;
      &:hover{
        color: darken(@reload-icon, 10%);
      }
    }
  }

  .sidebar-title {
    font-weight: 500;
    font-size: 16px;
    color: #868686;
    line-height: 25px;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .el-collapse{
    border: none;
    padding: 24px 30px;
  }
}

.device{
  &:hover{
    background: #f8f8f8;
  }
  display: inline-flex;
  flex-direction:column;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  border-radius: 4px;
  width: 120px;
  margin: 15px 0 21px 0;
  padding: 9px 6px;
  text-align: center;
  .node{
    position: relative;
    min-width:86px;
    display: inline-block;
    .device-icon{
      height:80px;
    }
    .status{
      float: right;
      position: absolute;
      right: 20px;
      bottom: 20px;
      height: 16px;
      background: @connected;
      max-height: 20px;
      border-radius: 50%;
    }
  }
  .device-info{
    position: relative;
    display: inline-block;
    .last-timestamp{
      /*-webkit-transform: scale(0.75);*/
      font-size: 10px;
    }
    .identifier{
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transition: all 0.2s;
      top: 3.5px;
      right: -22px;
    }
    p{
      font-family: PingFangSC-Light, sans-serif;
      font-size: 12px;
      line-height: 17px;
      margin:2px 0;
    }
  }
  &:hover{
    .device-info{
      .identifier{
        background: @identifier;
        &:active{
          background: @identifier-active;
        }
      }
    }
  }
  &:active{
    .device-info{
      .identifier{
        background: inherit;
      }
    }
  }
}

.syntax-node{
  margin:16px;
  color: @white;
  width: 160px;
  height: 43px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  p{
    line-height:15px;
    margin: 6px 0;
    text-align: center;
  }
  &.logic-node{
    background: @logic-node-bg;
    box-shadow: 0 10px 16px 0 @logic-node-shadow;
  }
  &.control-node{
    background: @chartre-green;
    box-shadow: 0 10px 16px 0 @control-node-shadow;
  }
  &.operator-node{
    background: @operator-node-bg;
    box-shadow: 0 10px 16px 0 @operator-node-shadow;
  }
  &.math-node{
    background: @liliac;
    box-shadow: 0 10px 16px 0 @math-node-shadow;
  }
  &.utility-node{
    background: @pomelo-orange;
    box-shadow: 0 10px 16px 0 @utility-node-shadow;
  }
  &.data-node{
    background: @bludi-blue;
    box-shadow: 0 10px 16px 0 @bludi-blue-shadow;
  }
  .dash{
    position: absolute;
    bottom: 10px;
    left: 17px;
  }
}

.el-tree {
  border: none;
}
</style>

<style lang="less" >
  @import "../../index.less";
  .el-collapse-item__header{
    color: @tool-box-text !important;
    border-bottom-color: @tool-box-hr !important;
    font-size: 12px !important;
  }
  .el-icon-arrow-right:before{
    font-size:10px !important;
  }
  .el-collapse-item__wrap{
    color: @tool-box-text;
    border-bottom: none !important;
    background: @white !important;
  }
  .el-collapse-item__content{
    color: @tool-box-text !important;
    padding: 10px 0 !important;
  }

</style>
