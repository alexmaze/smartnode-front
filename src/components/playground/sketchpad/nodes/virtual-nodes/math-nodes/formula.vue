<template>
  <div class="node node-virtual node-virtual-math node-virtual-math-formula" :id="data.id">
    <p class="title">公式</p>
    <div class="body">
      <div class="inputs">
        <p class="input">输入</p>
      </div>
      <div class="outputs">
        <p class="output">结果</p>
      </div>
    </div>
    <div class="footer">
      <input type="text">
    </div>
  </div>
</template>

<script>
import Node from '../../abstract-node.vue'

export default {
  mixins: [Node],
  name: 'virtual-logic-math-formula',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    init () {
      this.instance.draggable(this.data.id)
      // inputs
      this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-0',
        anchor: [-0.05, 0.52, 0, 0],
        cssClass: 'node-port-in-purple',
        hoverClass: 'node-port-hover-in-purple',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      })
      // outputs
      this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-output-0',
        anchor: [1.08, 0.48, 0, 0],
        cssClass: 'node-port-out-purple',
        hoverClass: 'node-port-hover-out-purple',
        endpoint: 'Dot',
        maxConnections: -1,
        isSource: true,
        isTarget: false
      })
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
.node-virtual-math-formula {
  position: absolute;
  background: #C178FF;
  border-radius: 8px;
  box-shadow: 0 10px 16px 0 rgba(74, 144, 226, 0.24);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  width: 180px;
  box-sizing: border-box;
  overflow: hidden;
  .title {
    color: rgba(255, 255, 255, 0.48);
    margin: 2px 0 5px 0;
    text-align: center;
  }
  .body {
    color: #ffffff;
    padding: 0 10px 5px 10px;
    display: flex;
    justify-content: space-between;
  }
  .footer {
    background: #955EC9;
    input {
      background: transparent;
      width: 100%;
      border: none;
      font-size: 12px;
      color: #ffffff;
      padding-left: 10px;
      font-weight: 500;
      outline: none;
    }
  }
  p {
    margin-bottom: 5px;
    margin-top: 0;
  }
}

</style>
