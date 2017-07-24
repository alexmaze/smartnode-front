<template>
  <div class="sketchpad" id="sketchpad" @dragover.prevent @drop="drop">
    <div id="sketchpad_desk" >
      <template v-for="node in nodes">
        <VirtualLogicAndNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-logic-and'"></VirtualLogicAndNode>
        <VirtualMathFormulaNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-if="node.type._all === 'virtual-math-formula'"></VirtualMathFormulaNode>
        <DeviceSwitchSnapNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-switch-snap'"></DeviceSwitchSnapNode>
        <!--<DeviceSensorInfraredNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-switch'"></DeviceSensorInfraredNode>-->
        <DeviceModuleLedNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device-module-led'"></DeviceModuleLedNode>
        <CommonNode :style="'left:'+node.position.x+'px;top:'+node.position.y+'px'" :data="node" :instance="jsPlumbInstance" v-else-if="node.type._all === 'device'"></CommonNode>
      </template>
    </div>
    <div id="zoomPanel">
      <div id="add" @click="zoomIn"><img src="../../../assets/ic_add.svg" alt=""></div>
      <div id="divider"></div>
      <div id="minus" @click="zoomOut"><img src="../../../assets/ic_remove.svg" alt=""></div>
    </div>
  </div>
</template>

<script>
import AbstractNode from './nodes/abstract-node.vue'
import VirtualLogicAndNode from './nodes/virtual-nodes/logic-nodes/and'
import VirtualMathFormulaNode from './nodes/virtual-nodes/math-nodes/formula'
import DeviceSwitchSnapNode from './nodes/device-nodes/switch-nodes/snap'
//  import DeviceSensorInfraredNode from './nodes/device-nodes/sensor-nodes/infrared'
// import DeviceSensorInfraredNode from './nodes/device-nodes/sensor-nodes/common-sensor.vue'
import DeviceModuleLedNode from './nodes/device-nodes/module-nodes/led'
import CommonNode from './nodes/device-nodes/sensor-nodes/common-sensor.vue'

export default {
  name: 'sketchpad',
  components: {
    AbstractNode,
    DeviceModuleLedNode,
    VirtualLogicAndNode,
    VirtualMathFormulaNode,
//    DeviceSensorInfraredNode,
    DeviceSwitchSnapNode,
    CommonNode
  },
  props: ['nodes'],
  data () {
    return {
      isReady: false,
      jsPlumbInstance: undefined,
      zoomLevel: 1,
      zoomStep: 0.1,
      offsetX: 0,
      offsetY: 0
    }
  },
  methods: {
    zoomIn () {
      this.zoomLevel *= 1 + this.zoomStep
      this.setZoom(this.zoomLevel)
    },
    zoomOut () {
      this.zoomLevel /= 1 + this.zoomStep
      this.setZoom(this.zoomLevel)
    },
    setZoom (zoom, instance, transformOrigin, el) {
      transformOrigin = transformOrigin || [ 1, 1 ]
      instance = instance || this.jsPlumbInstance
      el = el || instance.getContainer()
      let p = [ 'webkit', 'moz', 'ms', 'o' ]
      let s = 'scale(' + zoom + ') translate3d(' + this.offsetX + 'px,' + this.offsetY + 'px,0px)'
      let oString = (transformOrigin[0] * 100) + '% ' + (transformOrigin[1] * 100) + '%'

      for (let i = 0; i < p.length; i++) {
        el.style[p[i] + 'Transform'] = s
        el.style[p[i] + 'TransformOrigin'] = oString
      }

      el.style['transform'] = s
      el.style['transformOrigin'] = oString

      instance.setZoom(zoom)
    },
    dragSketchPad ({movementX, movementY}) {
      this.offsetX += (movementX / this.zoomLevel)
      this.offsetY += (movementY / this.zoomLevel)
      this.setZoom(this.zoomLevel)
    },
    drop (ev) {
      let offset = {
        x: (ev.layerX) / this.zoomLevel - this.offsetX,
        y: (ev.layerY) / this.zoomLevel - this.offsetY
      }
      let nodeType = JSON.parse(ev.dataTransfer.getData('data'))
      this.$emit('add-node', nodeType, offset)
      console.log(nodeType)
    }
  },
  mounted () {
    console.log('playground mounted!')
    window.jsPlumb.ready(() => {
      console.log('jsPlumb ready!')
      this.isReady = true
      // 新建jsplumb实例
      const instance = window.jsPlumb.getInstance({
        Connector: ['Bezier', { curviness: 50 }],
//        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { strokeStyle: '#2EFDF6', lineWidth: 1 },
//        EndpointStyle: {
//          // radius: 3
//        },
        HoverPaintStyle: { strokeStyle: '#7073EB' },
        EndpointHoverStyle: { fillStyle: '#7073EB' },
        Container: 'sketchpad_desk'
      })
      this.jsPlumbInstance = instance
      console.log('jsplumb容器:', instance.getContainer())
      // 绑定
      // instance.bind('connection', this.onConnectionEstablishedFactory(this))
      // instance.bind('connectionDetached', this.onConnectionDetachedFactory(this))
      // instance.bind('connectionMoved', this.onConnectionMovedFactory(this))
    })
    let sketchpad = document.getElementById('sketchpad')
    sketchpad.addEventListener('mousedown', () => {
      sketchpad.addEventListener('mousemove', this.dragSketchPad, false)
    }, false)
    sketchpad.addEventListener('mouseup', () => {
      sketchpad.removeEventListener('mousemove', this.dragSketchPad, false)
    }, false)
    sketchpad.addEventListener('wheel', ({wheelDeltaY}) => {
      this.zoomLevel += wheelDeltaY * 0.0005 * this.zoomStep
      this.setZoom(this.zoomLevel)
    }, {
      passive: true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.jtk-drag-select * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.sketchpad {
  width:100%;
  height:100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  #zoomPanel{
    width: 24px;
    height: 47px;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 1px 5px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    bottom: 8px;
    left: 8px;
    #add,#minus{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 23px;
      width: 100%;
      user-select: none;
    }
    #divider{
      height: 1px;
      background-color: #dddee0;
      width: 18px;
    }
  }
  #sketchpad_desk {
    position: absolute;
    /*left: 50%;*/
    /*top: 50%;*/
    /*width: 100%;*/
    /*height: 100%;*/
    overflow: visible;
  }
  .jtk-connector path {
    stroke: #909090;
    stroke-width: 3px;
  }
}
</style>
