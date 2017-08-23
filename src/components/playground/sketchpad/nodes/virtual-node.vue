<template>
  <div class="virtual-body" :class="data.type.secondary + '-node'" :id="data.id">
    <div class="virtual-title"> {{ data.type.title }}</div>
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
  </div>

</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { nodesConfig } from '../../../../../node-conf'
  export default {
    name: 'virtual-node',
    props: ['data','instance'],
    components: {},
    data () {
      return {
      }
    },
    methods: {
      init () {
        const instance = this.instance
        const id = this.data.id
        console.log(this.data);
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
              anchor: [1.65, 0.5, 0, 0],
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
              anchor: [-0.5, 0.5, 0, 0],
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
      }
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
    .virtual-title{
      margin-top: 9px;
      align-self: center;
      color: #fff;
      font-size: 12px;
    }
  }


</style>
