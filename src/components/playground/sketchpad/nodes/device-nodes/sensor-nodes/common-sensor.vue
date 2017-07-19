<template>
  <div class="node node-device node-device-sensor node-device-sensor-infrared" :id="data.id">
    <img src="static/img/node.png" class="preview-img">
    <div class="body">
      <p class="title" :id="data.id + '-title'">{{data.label}}</p>
      <p class="prop" :id="data.id + '-' + prop.idSuffix" v-for="prop in data.type.props">
        <span>{{prop.name}}</span>
        <el-switch
          v-model="prop.defValue"
          on-text=""
          off-text=""
          on-color="#F69D00"
        >
        </el-switch>
      </p>
    </div>
  </div>
</template>

<script>
  import Node from '../../abstract-node'

  export default {
    mixins: [Node],
//    props: ['setting'],
    name: 'device-sensor-common',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      init () {
        const instance = this.instance
        const id = this.data.id
        instance.draggable(id)
        const outputEndpoint = {
          uuid: id + '-output-0',
          anchor: [1.12, 0.5, 0, 0],
          cssClass: 'node-port-out-yellow',
          hoverClass: 'node-port-hover-out-yellow',
          radius: 6,
          endpoint: 'Dot',
          maxConnections: -1,
          isSource: true,
          isTarget: false
        }
        const inputEndpoint = {
          uuid: id + '-output-0',
          anchor: [-0.12, 0.5, 0, 0],
          cssClass: 'node-port-in-yellow',
          hoverClass: 'node-port-hover-in-yellow',
          endpoint: 'Rectangle',
          maxConnections: -1,
          isSource: false,
          isTarget: true
        }
        const config = this.data.type
        console.log(config)
        let title = document.querySelector('#' + id + '-title')
        if (config.titleInput !== null) {
          instance.addEndpoint(title, inputEndpoint)
        }
        if (config.titleOutput !== null) {
          instance.addEndpoint(title, outputEndpoint)
        }
        config.props.forEach(e => {
          if (e.hasOutput) {
            let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
            instance.addEndpoint(propLine, outputEndpoint)
          }
          if (e.hasInput) {
            let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
            console.log(propLine)
            instance.addEndpoint(propLine, inputEndpoint)
          }
        })
//        this.instance.draggable(this.data.id)
//        let el = document.querySelector('#' + this.data.id + ' .title')
//        this.instance.addEndpoint(el, outputEndpoint)
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .node-device-sensor-infrared {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    .preview-img {
      width: 200px;
    }
    .body {
      /*margin-top: -14px;*/
      /*margin-left: 31px;*/
      width: 151px;
      background: #DFDFDF;
      border-radius: 6px;
      p{
        margin:6px;
      }
      .title {
        line-height: 17px;
        font-size: 12px;
        color: #4A4A4A;
      }
      .prop {
        font-family: PingFangSC;
        font-size:12px;
        font-weight: 300;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
