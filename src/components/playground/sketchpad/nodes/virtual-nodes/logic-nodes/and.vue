<template>
  <div class="node node-virtual node-virtual-logic node-virtual-logic-and" :id="data.id">
    <p class="title">&&</p>
    <div class="body">
      <div class="inputs">
        <p class="input">条件0</p>
        <p class="input">条件1</p>
      </div>
      <div class="outputs">
        <p class="output">执行</p>
      </div>
    </div>
  </div>
</template>

<script>
import Node from '../../abstract-node.vue'

export default {
  mixins: [Node],
  name: 'virtual-logic-and-node',
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
        anchor: [-0.05, 0.5, 0, 0],
        cssClass: 'node-port-in-blue',
        hoverClass: 'node-port-hover-in-blue',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      })
      this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-1',
        anchor: [-0.05, 0.8, 0, 0],
        cssClass: 'node-port-in-blue',
        hoverClass: 'node-port-hover-in-blue',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      })
      // outputs
      this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-output-0',
        anchor: [1.08, 0.45, 0, 0],
        cssClass: 'node-port-out-blue',
        hoverClass: 'node-port-hover-out-blue',
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
.node-virtual-logic-and{
  position: absolute;
  background: #3D83E1;
  border-radius: 8px;
  box-shadow: 0 10px 16px 0 rgba(74, 144, 226, 0.24);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  width: 180px;
  box-sizing: border-box;
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
  p {
    margin-bottom: 5px;
    margin-top: 0;
  }
}

</style>
