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
            v-model="curNode.payload[prop.idSuffix]"
            on-text=""
            off-text=""
            on-color="#F69D00"
            v-if="prop.visual==='el-switch'"
          >
          </el-switch>
          <input type="text"
                 v-model="curNode.payload[prop.idSuffix]"
                 v-if="prop.visual === 'input'">
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
  import Node from './abstract-node'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { nodesConfig } from '../../../../../node-conf'
  import __ from 'lodash'
  export default {
    mixins: [Node],
//    props: ['setting'],
    name: 'device-sensor-common',
    components: {
    },
    data () {
      return {
        showMenuContent: false,
        NodePayload: {},
        payload:{},
      }
    },
    watch:{
      curNode: {
        handler: function (val, old){
          for (let con in this.getLinkMap){
            if (this.getLinkMap[con].sourceId.split('-')[0] === this.data.id) {
              let [targetId, plKey] = this.getLinkMap[con].targetId.split('-')
              this.getNodeMap[targetId].payload[plKey] = this.curNode.payload[plKey]
              this.getLinkMap[con].getOverlay('label').setLabel(this.curNode.payload[plKey].toString())
//              let nL = (this.curNode.payload[plKey]) ? 'true' : 'false'
//              this.getLinkMap[con].getOverlay('label').setLabel(nL)
            } else {
              console.log(this.$store.state.runtime.LinkMap[con].sourceId)
            }
          }
        },
        deep: true
      }
    },
    methods: {
      switchChange (info) {
        console.log(this.$store.state.runtime.NodeMap)
      },
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
            instance.addEndpoint(propLine, inputEndpoint)
          }
        })

//        this.instance.draggable(this.data.id)
//        let el = document.querySelector('#' + this.data.id + ' .title')
//        this.instance.addEndpoint(el, outputEndpoint)
      },
      ...mapMutations(['NODEMAP_ADD', 'NODEMAP_SET'])
    },
    computed: {
      ...mapState({
        NODES: state => state.runtime.NodeMap,
        curNode: function (state) {
          return state.runtime.NodeMap[this.data.id]
        }
      }),
      ...mapGetters(['getNodeMap','getLinkMap'])
    },
    created () {
      const id = this.data.id
      const config = this.data.type
      let simulateFun = nodesConfig[config.primary][config.secondary][config.tertiary].simulateFun
      config.props.forEach(e => {
        this.NodePayload[e.idSuffix] = e.defValue
      })
      if (config.titleInput) this.NodePayload.active = false
      this.NODEMAP_ADD({
        keyName: id,
        payload: this.NodePayload,
        updateFun: simulateFun
      })
      this.payload = __.cloneDeep(this.NodePayload)
      console.log(this.NodePayload)
//      window.log(this.$store.state.runtime.NodeMap,'created')
    },
    mounted () {
      this.init()
//      this.CD_NODEMAP()
//      window.log(this.$store.state.runtime.NodeMap,'mounted after clonedeep')
//      console.log(this.$store.state.runtime.NodeMap)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@search-input: #4bbdb0;
@black-text: black;

  input{
    width: 50px;
    height: 100%;
    border-radius: 100px;
    border: none;
    background: darken(@search-input, 5%);
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1.2px;
    color: @black-text;
    outline:none;
    text-align: center;
  }
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
