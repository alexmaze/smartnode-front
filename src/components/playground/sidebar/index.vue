<template>
  <div class="sidebar" :class="{ 'active': isShow }" >
    <p class="sidebar-title">工具箱</p>
    <div v-for="i in [1,2,3,4,5]" class="device" draggable="true" @dragstart="setDataTransfer(i,$event)">
      <div class="node">
        <img class="device-icon" src="/static/img/node.png" draggable="false" alt="">
        <img class="status" src="/static/img/icons/unconnected.svg" draggable="false" alt="">
      </div>
      <div class="device-info">
        <p>开关_{{i}}</p>
        <p class="last-timestamp">6.25 09:32</p>
        <p class="identifier"></p>
      </div>
    </div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { NODE_TYPES_TREE } from '../node-types-tree.const.js'

export default {
  name: 'sidebar',
  components: {
  },
  props: ['isShow'],
  data () {
    return {
      data: NODE_TYPES_TREE,
      defaultProps: {
        children: 'sub',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data, node) {
      if (data.sub) return
      let type = {
        primary: node.parent.parent.data.key,
        _primaryLabel: node.parent.parent.data.label,
        secondary: node.parent.data.key,
        _secondaryLabel: node.parent.data.label,
        tertiary: node.data.key,
        _tertiaryLabel: node.data.label
      }
      type._all = `${type.primary}-${type.secondary}-${type.tertiary}`
      this.$emit('add-node', type)
      console.log(type)
    },
    setDataTransfer (data, ev) {
//      console.log(ev)
//      console.log(ev.target)
//      console.log(data)
      ev.dataTransfer.setData('data', JSON.stringify({
        primary: 'device',
        secondary: 'switch',
        tertiary: 'snap',
        _all: 'device-switch-snap',
        _primaryLabel: 'Device Nodes',
        _secondaryLabel: 'Switchs',
        _tertiaryLabel: 'Switch'
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../index";
.sidebar {
  position: absolute;
  top: 60px;
  right: 0;
  width: calc(~'34.375% - 1px');
  height: e('calc(100% - 60px)');
  background: #ffffff;
  border-left: 1px solid #DADADA;
  border-top: 1px solid #DADADA;

  transition: all .2s;
  transform: translate(100%);
  overflow: auto;
  &.active {
    transform: translate(0);
  }

  .sidebar-title {
    font-weight: 500;
    font-size: 16px;
    color: #868686;
    line-height: 25px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
}

.device{
  &:hover{
    background: #f8f8f8;
  }
  display: inline-block;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  border-radius: 4px;
  width: 120px;
  margin: 15px 25px 21px 25px;
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
      right: 8px;
      bottom: 16px;
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
      -webkit-transform: scale(0.75);
      font-size: 8px;
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

.el-tree {
  border: none;
}
</style>
