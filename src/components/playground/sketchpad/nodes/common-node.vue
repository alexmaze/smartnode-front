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
            v-if="prop.visual==='el-switch'">
          </el-switch>
          <input type="text"
                 v-model="curNode.payload[prop.idSuffix]"
                 v-if="prop.visual === 'input'">
        </p>
      </div>
    </div>
    <div class="add-content" @click="cliToggleFunc"></div>
    <div class="extra-content" v-for="item in addedFuncList">
      <div class="extra-item" :id="data.id + '-' + item.id">
        <span>{{item.title}}</span>
        <span>{{item.defaultVal}}</span>
      </div>
    </div>
    <div class="presu-menu" v-if="!showMenuContent"></div>
    <div class="extra-menu" v-if="showMenuContent">
      <div class="func" v-for="item in data.type.funs" v-on:click="addFunc(item, $event)">
        <p>{{item.title}}</p>
      </div>
      <!--<p>平移距离</p>-->
      <!--<p>角度</p>-->
    </div>
  </div>
</template>
<script>
  import Node from './abstract-node'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { nodesConfig } from '../../../../../node-conf'
//  import __ from 'lodash'
  export default {
    mixins: [Node],
//    props: ['setting'],
    name: 'common-node',
    components: {
    },
    data () {
      return {
        showMenuContent: false,
        payload:{},
        addedFuncList: [],
        flagAdded: false

      }
    },
    watch:{
      curNode: {
        handler: function (val, old){
          for (let con in this.getLinkMap){
            if (this.getLinkMap[con].sourceId.split('-')[0] === this.data.id) {
              let [sourceId, s_plKey] = this.getLinkMap[con].sourceId.split('-') //source_payloadKey
              let [targetId, t_plKey] = this.getLinkMap[con].targetId.split('-') //target_payloadKey
              let calcFun = this.curNode.updateFun

              let output = calcFun.call(this.curNode.payload, s_plKey)

              this.getNodeMap[targetId].payload[t_plKey] = output// 修改target节点的对应属性值
              console.log(this.getNodeMap[targetId].payload)
              this.getLinkMap[con].getOverlay('label').setLabel(output.toString())// 改变label
            } else {
              console.log(this.$store.state.runtime.LinkMap[con].sourceId)
            }
          }
        },
        deep: true
      },
    },
    methods: {
//      switchChange (info) {
//        console.log(this.$store.state.runtime.NodeMap)
//      },
      addFunc (item, ev) {
          if(this.showMenuContent){
            this.flagAdded = true
            console.log(this.flagAdded)
            this.addedFuncList.push(item)
            this.showMenuContent = false
          }
      },
      cliToggleFunc () {
          this.showMenuContent = !this.showMenuContent;
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
          uuid: id + '-input-0',
          anchor: [-0.12, 0.5, 0, 0],
          cssClass: 'node-port-in-yellow',
          hoverClass: 'node-port-hover-in-yellow',
          endpoint: 'Rectangle',
          maxConnections: -1,
          isSource: false,
          isTarget: true
        }
        const config = this.data.type
        //title is a DOM element
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
//        config.funs.forEach(e => {
//            if(e.titleInput !== null){
//                //console.log('#' + id + '-' + e.id)
//                let funcLine = document.querySelector('#' + id + '-' + e.id)
//
//                instance.addEndpoint(funcLine, inputEndpoint)
//            }
//            if(e.titleOutput !== null){
//              //console.log('#' + id + '-' + e.id)
//
//              let funcLine = document.querySelector('#' + id + '-' + e.id)
//              console.log(funcLine)
//              instance.addEndpoint(funcLine, outputEndpoint)
//            }
//          })

//        this.instance.draggable(this.data.id)
//        let el = document.querySelector('#' + this.data.id + ' .title')
//        this.instance.addEndpoint(el, outputEndpoint)
      },
      ...mapMutations(['NODEMAP_ADD', 'NODEMAP_SET'])
    },
    computed: {
      ...mapState({
        curNode: function (state) {
          return state.runtime.NodeMap[this.data.id]
        }
      }),
      ...mapGetters(['getNodeMap','getLinkMap']),

    },
    created () {
      const id = this.data.id
      const config = this.data.type
      let NodePayload = {};
      let simulateFun = nodesConfig[config.primary][config.secondary][config.tertiary].simulateFun
      config.props.forEach(e => {
        NodePayload[e.idSuffix] = e.defValue
      })
      if (config.titleInput) NodePayload.active = false
      this.NODEMAP_ADD({
        keyName: id,
        payload: NodePayload,
        updateFun: simulateFun
      })
//      this.payload = __.cloneDeep(this.NodePayload)
      console.log(this.curNode);
    },
    mounted () {
      this.init()
//      this.CD_NODEMAP()
//      window.log(this.$store.state.runtime.NodeMap,'mounted after clonedeep')
//      console.log(this.$store.state.runtime.NodeMap)
    },
    updated () {  // 用updated钩子是因为要等dom更新完才能执行jsplumb的增加endpoint方法
        if(this.flagAdded){
          this.flagAdded = false;
          const instance = this.instance
          const id = this.data.id
          instance.draggable(id)
          const outputEndpoint = {
            uuid: id + '-output-0',
            anchor: [1.075, 0.5, 0, 0],
            cssClass: 'node-port-out-yellow',
            hoverClass: 'node-port-hover-out-yellow',
            radius: 6,
            endpoint: 'Dot',
            maxConnections: -1,
            isSource: true,
            isTarget: false
          }
          const inputEndpoint = {
            uuid: id + '-input-0',
            anchor: [-0.12, 0.5, 0, 0],
            cssClass: 'node-port-in-yellow',
            hoverClass: 'node-port-hover-in-yellow',
            endpoint: 'Rectangle',
            maxConnections: -1,
            isSource: false,
            isTarget: true
          }
          const config = this.data.type
          //console.log(config.funs)
          config.funs.forEach(e => {
            console.log('#' + id + '-' + e.id)
            if(e.titleInput !== null){
              //console.log('#' + id + '-' + e.id)
              let funcLine = document.querySelector('#' + id + '-' + e.id)
              if(funcLine !== null)
              instance.addEndpoint(funcLine, inputEndpoint)
            }
            if(e.titleOutput !== null){
              let funcLine = document.querySelector('#' + id + '-' + e.id)
              //console.log(funcLine)
              if(funcLine !== null)
                instance.addEndpoint(funcLine, outputEndpoint)
            }
          })
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../index";

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
        box-shadow: 0 1px 2px 0px @content-shadow ;
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
    .presu-menu{
      background: white;
      width: 115px;
      height: 15px;
      border-radius: 0 0 6px 6px;
      z-index: -1;
    }
    .extra-menu{
      display: flex;
      flex-direction: column;
      //position: absolute;
      //bottom: -15px;
      background: white;
      width: 115px;
      height: auto;
      //height:auto;
      font-size:12px;
      font-family: PingFangSC;
      line-height:17px;
      border-radius: 0 0 6px 6px;
      z-index: 3;
      padding: 11px 0px 6px 0px;
      p {
        color: @func-grey;
        margin: 3px 6px;
      }
      .func{
        z-index:4;
      }
      .func:hover{
        background-color: #9b9b9b;
      }
    }
    .extra-content{
      display: flex;
      flex-direction: column;
      background-color: #4bbdb0;
      width: 135px;
      height: auto;
      font-size:12px;
      font-family: PingFangSC;
      line-height:17px;
      border-radius: 6px;
      margin: 6px 0px 0px 0px;
      color: #fff;
      .extra-item{
        display: flex;
        justify-content: space-between;
        padding: 8px 6px;
      }
    }

  }
</style>
