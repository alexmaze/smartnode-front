<template>
  <div class="node node-device node-device-sensor node-device-sensor-infrared" :id="data.id">
    <img src="static/img/node.png" class="preview-img">
    <div class="body">
      <div class="status-badge">
        <div class="status"><img src="/static/img/icons/unconnected.svg" alt=""></div>
      </div>
      <div class="content">
        <p class="title" :id="data.id + '-title'">{{data.label}}</p>
        <p class="prop" :id="data.id + '-' + prop.idSuffix" v-for="prop in data.type.props">
          <span>{{prop.name}}</span>
          <el-switch
            v-model="prop.defValue"
            on-text=""
            off-text=""
            on-color="#F69D00"
            v-if="prop.visual==='el-switch'"
          >
          </el-switch>
        </p>
      </div>
    </div>
    <div class="add-content"></div>
    <div class="extra-menu">
      <div class="menu-content" v-if="showMenuContent">
        <p>单色渐变</p>
        <p>多色渐变</p>
      </div>
    </div>
    <div class="extra-content">

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
        showMenuContent: false
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
<style lang="less" scoped>
  .node-device-sensor-infrared {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    .preview-img {
      width: 125px;
      z-index: 1;
    }
    .body {
      position: relative;
      color: white;
      margin-top: -50px;
      padding-top:50px;
      width: 135px;
      border-radius: 6px;
      background: white;
      .status-badge{
        width:30px;
        height:30px;
        border-radius: 50%;
        background: white;
        z-index: 2;
        position: absolute;
        top: 36px;
        right: 16px;
        display: flex;
        justify-content:center;
        align-items: center;
        .status{
          height: 21px;
          width: 21px;
          background: #7ED321;
          border-radius: 50%;
          img{
            height:100%;
            width:100%;
          }
        }
      }
      .content{
        color: white;
        background: #4BBDB0;
        border-radius: 0 0 6px 6px;
        padding-bottom: 6px;
        padding-top: 10px;
        p{
          margin:6px;
        }
        .title {
          line-height: 17px;
          font-size: 12px;
        }
        .prop {
          font-family: PingFangSC;
          font-size:12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

    }
    .add-content{
      width:16px;
      height:16px;
      border-radius: 50%;
      position: absolute;
      background: #FFC745;
      bottom: -9px;
      left: 60px;
      z-index: 4;
    }
    .extra-menu{
      position: absolute;
      bottom: -15px;
      background: white;
      width: 115px;
      height: 30px;
      font-size:12px;
      font-family: PingFangSC;
      line-height:17px;
      border-radius: 6px;
      z-index: -1;
      p {
        margin: 6px 0;
      }
    }
  }
</style>
