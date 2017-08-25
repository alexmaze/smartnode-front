<template>

    <div class="virtual-body" :class="data.type.secondary + '-node'" :id="data.id">
      <div class="bubble-box" v-if="showBubble" :class="'box-top-' + bubbleBoxHeight">
        <button class="operator" :class="data.type.secondary + '-operator'" v-for="item in data.type.operateList" @click="setOperator(item, $event)">{{ item }}</button>
        <span class="bubble-cor"></span>
        <span class="bubble-cor-white"></span>
      </div>
      <div class="virtual-title" @mouseover="hoverTitle"> {{ data.type.title }}</div>
      <div class="virtual-operator"> &nbsp {{ currentOperator }} &nbsp </div>

      <!--<el-tooltip  placement="top-end">-->
      <!--<div class="operator-select" slot="content">-->
      <!--</div>-->
      <!---->
      <!--</el-tooltip>-->
      <div class="virtual-content">
        <div class="virtual-inputs">
          <div :id="data.id + '-' + item.idSuffix" class="virtual-input-item" v-for="item in data.type.inputs">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="virtual-outputs">
          <div :id="data.id + '-' + item.idSuffix" class="virtual-output-item" v-for="item in data.type.outputs">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="virtual-formula" v-if="haveFormula">
        <input type="text" name="input-formula" value="input" v-model="inputFormula"/>
      </div>
    </div>


</template>

<script>
  /* eslint-disable */
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { nodesConfig } from '../../../../../node-conf'

  export default {
    name: 'virtual-node',
    props: ['data','instance'],
    components: {
    },
    data () {
      return {
          isHoverTitle: false,
          operatorClass: 0,
          currentOperator: '',
          inputFormula: ''

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
//              console.log(this.getNodeMap[targetId].payload)
//              this.getLinkMap[con].getOverlay('label').setLabel(output.toString())// 改变label
            } else {
//              console.log(this.$store.state.runtime.LinkMap[con].sourceId)
            }
          }
        },
        deep: true
      }
    },
    computed : {
      hasOperatorSelect: function () {
          if(this.data.type.operateList.length > 0){
              return true
          }
          else
              return false
      },
      showBubble: function () {
          if(this.hasOperatorSelect && this.isHoverTitle) {
              return true;
          }
          else{
              return false;
          }
      },
      bubbleBoxHeight: function () {
          let a = this.data.type.operateList.length / 4
          console.log('height' + a)
        return a
      },
      haveFormula: function () {
          if(this.data.type.title === 'Operation')
          {
              return true
          }
          else
              return false
      },
      ...mapState({
        curNode: function (state) {
          return state.runtime.NodeMap[this.data.id]
        }
      }),
      ...mapGetters(['getNodeMap','getLinkMap'])
    },
    methods: {
      init () {
        const instance = this.instance
        const id = this.data.id
        const nodeType = this.data.type.secondary
        instance.draggable(id)
        let palette = {
            logic: 'blue',
            control: 'green',
            math: 'purple',
            utility: 'orange',
            operator: 'magenta',
            data: 'cyan'
        }
        let outputEndpoint = function(type) {
            return{
              uuid: id + '-output-0',
              anchor: [1.5, 0.5, 0, 0],
              cssClass: 'node-port-out-' + palette[type],
              hoverClass: 'node-port-hover-out-' + palette[type],
              radius: 6,
              endpoint: 'Dot',
              maxConnections: -1,
              isSource: true,
              isTarget: false
            }
        }
        let inputEndpoint = function(type){
            return{
              uuid: id + '-input-0',
              anchor: [-0.2, 0.5, 0, 0],
              cssClass: 'node-port-in-' + palette[type],
              hoverClass: 'node-port-hover-in-' + palette[type],
              endpoint: 'Rectangle',
              maxConnections: -1,
              isSource: false,
              isTarget: true
            }
        }
        const config = this.data.type
        //title is a DOM element
        let title = document.querySelector('#' + id + '-title')
//        if (config.titleInput !== null) {
//          instance.addEndpoint(title, inputEndpoint)
//        }
//        if (config.titleOutput !== null) {
//          instance.addEndpoint(title, outputEndpoint)
//        }
        config.inputs.forEach(e => {
          let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
          instance.addEndpoint(propLine, inputEndpoint(nodeType))
        })
        config.outputs.forEach(e => {
          let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
          //console.log(e.idSuffix)
          instance.addEndpoint(propLine, outputEndpoint(nodeType))
        })
      },
      hoverTitle () {
        this.isHoverTitle = true;
      },
      notHoverTitle () {
        this.isHoverTitle = false;
      },
      setOperator (item, e) {
          this.currentOperator = item;
          this.isHoverTitle = false;

      },
      ...mapMutations(['NODEMAP_ADD', 'NODEMAP_SET'])
    },
    created () {
      const id = this.data.id
      const config = this.data.type
      let NodePayload = {}
      let simulateFun = nodesConfig[config.primary][config.secondary][config.tertiary].simulateFun

      config.inputs.forEach(e => { NodePayload[e.idSuffix] = null })
      config.outputs.forEach(e=>{NodePayload[e.idSuffix] = ''})

      if (config.titleInput) NodePayload.active = false
      this.NODEMAP_ADD({
        keyName: id,
        payload: NodePayload,
        updateFun: simulateFun
      })
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="less">
  @import "../../../index";

  .virtual-body{
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 160px;
    height: auto;
    border-radius: 8px;
    .bubble-box {
      height:auto;
      background: #fff;
      color: #000;
      position: absolute;
      //top: -88px;
      right: 0;
      display: flex;
      flex-direction: row;
      max-width: 155px;
      padding: 6px;
      margin: 0;
      flex-wrap: wrap;
      border-radius: 6px;
      border: 1px solid #dfdfdf;
      justify-content: center;

      &.box-top-1 {
        top: -56px;
      }
      &.box-top-2 {
        top: -88px;
      }
      .bubble-cor {
        width:0;
        height:0;
        position: absolute;
        border-width: 6px;
        border-style: solid;
        border-color: #dfdfdf transparent transparent;
        bottom: -12px;
        right: 30px;
      }
      .bubble-cor-white {
        width:0;
        height:0;
        position: absolute;
        border-width: 6px;
        border-style: solid;
        border-color: #fff transparent transparent;
        bottom: -11px;
        right: 30px;
      }
      .logic-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @logic-node-bg;
          color: #fff;
        }
      }
      .control-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @chartre-green;
          color: #fff;
        }
      }
      .operator-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @operator-node-bg;
          color: #fff;
        }
      }
      .math-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @liliac;
          color: #fff;
        }
      }
      .utility-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @pomelo-orange;
          color: #fff;
        }
      }
      .data-operator {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        //text-align: center;
        padding: 0;
        margin: 6px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: #ededed;
        border-style: none;
        font-size: 12px;
        line-height: 12px;
        &:hover{
          background: @bludi-blue;
          color: #fff;
        }
      }

      /*<!--&.logic-op{-->*/
        /*<!--background: @logic-node-bg;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
      /*<!--&.control-op{-->*/
        /*<!--background: @chartre-green;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
      /*<!--&.operator-op{-->*/
        /*<!--background: @operator-node-bg;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
      /*<!--&.math-op{-->*/
        /*<!--background: @liliac;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
      /*<!--&.utility-op{-->*/
        /*<!--background: @pomelo-orange;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
      /*<!--&.data-op{-->*/
        /*<!--background: @bludi-blue;-->*/
        /*<!--color: #fff;-->*/
      /*<!--}-->*/
    }
    &.logic-node{
      background: @logic-node-bg;
      box-shadow: 0 10px 16px 0 @logic-node-shadow;
    }
    &.control-node{
      background: @chartre-green;
      box-shadow: 0 10px 16px 0 @control-node-shadow;
    }
    &.operator-node{
      background: @operator-node-bg;
      box-shadow: 0 10px 16px 0 @operator-node-shadow;
    }
    &.math-node{
      background: @liliac;
      box-shadow: 0 10px 16px 0 @math-node-shadow;
    }
    &.utility-node{
      background: @pomelo-orange;
      box-shadow: 0 10px 16px 0 @utility-node-shadow;
    }
    &.data-node{
      background: @bludi-blue;
      box-shadow: 0 10px 16px 0 @bludi-blue-shadow;
    }
   // <!--background-color: @logic-background;-->
  //  <!--box-shadow: 0 10px 16px 0px @dark-sky-blue-24 ;-->
    .virtual-content{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0px 6px 5px 6px;
      .virtual-inputs{
        display: flex;
        flex-direction: column;
        width: 74px;
        .virtual-input-item{
          color: #fff;
          font-size: 12px;
          p{
            -webkit-margin-before: 6px;
            -webkit-margin-after: 6px;
          }
        }
      }
      .virtual-outputs{
        .virtual-output-item{
          color: #fff;
          font-size: 12px;
          p{
            -webkit-margin-before: 6px;
            -webkit-margin-after: 6px;
          }
        }
      }

    }
    .virtual-formula{
      //width: 160px;
      //padding: 7px 6px 7px 6px;
      input{
        width: 152px;
        border-style: none;
        border-radius: 0 0 8px 8px;
        background-color: @black-20;
        color: #fff;
        font-size: 12px;
        line-height: 1.75;
        padding: 0 4px 0 4px;
      }
    }
    .virtual-title{
      margin-top: 9px;
      align-self: center;
      color: #fff;
      font-size: 12px;
    }
    .virtual-operator{
      color: #fff;
      font-size: 12px;
      align-self: center;
    }

  }

</style>
