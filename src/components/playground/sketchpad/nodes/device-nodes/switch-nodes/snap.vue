<template>
  <div class="node node-device node-device-switch node-device-switch-snap" :id="data.id">
    <img src="static/img/node.png" class="preview-img">
    <div class="body">
      <div class="title" :id="data.id + '-title'">{{data.label}}</div>
    </div>
  </div>
</template>

<script>
import Node from '../../abstract-node'

export default {
  mixins: [Node],
  name: 'device-switch-snap-node',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    init () {
      this.instance.draggable(this.data.id)

      // let el = document.querySelector('#' + this.data.id + ' .title')
      let ret = this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-output-0',
        anchor: [0.83, 0.935, 0, 0],
        cssClass: 'node-port-out-yellow',
        hoverClass: 'node-port-hover-out-yellow',
        radius: 6,
        endpoint: 'Dot',
        maxConnections: -1,
        isSource: true,
        isTarget: false
      })
      console.debug(ret)
    }
  },
  created () {
    setTimeout(() => {
      this.init()
    }, 100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.node-device-switch-snap {
  position: absolute;
  .preview-img {
    width: 200px;
  }
  .body {
    margin-top: -14px;
    margin-left: 31px;
    .title {
      width: 124px;
      line-height: 28px;
      background: #DADADA;
      font-size: 14px;
      color: #4A4A4A;
      font-weight: 500;
      border-radius: 6px;
      padding: 0 8px;
      box-sizing: border-box;
    }
  }
}
</style>
