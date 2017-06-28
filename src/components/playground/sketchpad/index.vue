<template>
  <div class="sketchpad">
    <div id="sketchpad_desk" v-if="isReady">
      <template v-for="node in nodes">
        <VirtualLogicAndNode :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-logic-and'"></VirtualLogicAndNode>
        <VirtualMathFormulaNode :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-math-formula'"></VirtualMathFormulaNode>
        <DeviceSwitchSnapNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-switch-snap'"></DeviceSwitchSnapNode>
        <DeviceSensorInfraredNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-sensor-infrared'"></DeviceSensorInfraredNode>
        <DeviceModuleLedNode :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-module-led'"></DeviceModuleLedNode>
      </template>
    </div>
    <div id="zoomPanel">
      <el-button-group>
        <el-button icon="minus" @click="zoomOut"></el-button>
        <el-button icon="plus" @click="zoomIn"></el-button>
      </el-button-group>
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
      jsPlumbInstance: undefined,
      zoomLevel: 1,
      zoomStep: 0.1
    }
  },
  methods: {
    zoomIn () {
      this.zoomLevel *= 1 + this.zoomStep
      this.setZoom(this.zoomLevel)
      console.log('zoomin')
    },
    zoomOut () {
      this.zoomLevel /= 1 + this.zoomStep
      this.setZoom(this.zoomLevel)
      console.log('zoomout')
    },
    setZoom (zoom, instance, transformOrigin, el) {
      transformOrigin = transformOrigin || [ 0.5, 0.5 ]
      instance = instance || this.jsPlumbInstance
      el = el || instance.getContainer()
      let p = [ 'webkit', 'moz', 'ms', 'o' ]
      let s = 'scale(' + zoom + ')'
      let oString = (transformOrigin[0] * 100) + '% ' + (transformOrigin[1] * 100) + '%'

      for (var i = 0; i < p.length; i++) {
        el.style[p[i] + 'Transform'] = s
        el.style[p[i] + 'TransformOrigin'] = oString
      }

      el.style['transform'] = s
      el.style['transformOrigin'] = oString

      instance.setZoom(zoom)
    }
  },
  created () {
    console.log('playground created!')
    window.jsPlumb.ready(() => {
      console.log('jsPlumb ready!')
      this.isReady = true

      // 新建jsplumb实例
      const instance = window.jsPlumb.getInstance({
        Connector: ['Bezier', { curviness: 50 }],
//        DragOptions: { cursor: 'pointer', zIndex: 2000 },
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
  width:100%;
  height:100%;
  #zoomPanel{
    position: absolute;
    bottom:0;
    left:0;
  }
  #sketchpad_desk {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .jtk-connector path {
    stroke: #909090;
    stroke-width: 3px;
  }
}
</style>
