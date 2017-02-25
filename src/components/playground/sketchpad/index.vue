<template>
  <div class="sketchpad">
    <div id="sketchpad_desk" v-if="isReady">
      <template v-for="node in nodes">
        <VirtualLogicAndNode :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-logic-and'"></VirtualLogicAndNode>
        <VirtualMathFormulaNode :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-math-formula'"></VirtualMathFormulaNode>
        <DeviceSwitchSnapNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-switch-snap'"></DeviceSwitchSnapNode>
        <DeviceSensorInfraredNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-sensor-infrared'"></DeviceSensorInfraredNode>
        <DeviceModuleLedNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-module-led'"></DeviceSwitchSnapNode>
      </template>
    </div>
  </div>
</template>

<script>
import AbstractNode from './nodes/abstract-node.vue'
import VirtualLogicAndNode from './nodes/virtual-nodes/logic-nodes/and'
import VirtualMathFormulaNode from './nodes/virtual-nodes/math-nodes/formula'
import DeviceSwitchSnapNode from './nodes/device-nodes/switch-nodes/snap'
import DeviceSensorInfraredNode from './nodes/device-nodes/sensor-nodes/infrared'
import DeviceModuleLedNode from './nodes/device-nodes/module-nodes/led'

export default {
  name: 'sketchpad',
  components: {
    AbstractNode,
    DeviceModuleLedNode,
    VirtualLogicAndNode,
    VirtualMathFormulaNode,
    DeviceSensorInfraredNode,
    DeviceSwitchSnapNode
  },
  props: ['nodes'],
  data () {
    return {
      isReady: false,
      jsPlumbInstance: undefined
    }
  },
  methods: {
  },
  created () {
    console.log('playground created!')
    window.jsPlumb.ready(() => {
      console.log('jsPlumb ready!')
      this.isReady = true

      // 新建jsplumb实例
      const instance = window.jsPlumb.getInstance({
        Connector: ['Bezier', { curviness: 50 }],
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { strokeStyle: '#2EFDF6', lineWidth: 1 },
        EndpointStyle: {
          // radius: 3
        },
        HoverPaintStyle: { strokeStyle: '#7073EB' },
        EndpointHoverStyle: { fillStyle: '#7073EB' },
        Container: 'sketchpad_desk'
      })
      this.jsPlumbInstance = instance

      // 绑定
      // instance.bind('connection', this.onConnectionEstablishedFactory(this))
      // instance.bind('connectionDetached', this.onConnectionDetachedFactory(this))
      // instance.bind('connectionMoved', this.onConnectionMovedFactory(this))
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sketchpad {
  #sketchpad_desk {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .jtk-connector path {
    stroke: #909090;
    stroke-width: 3px;
  }
}
</style>
