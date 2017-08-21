<template>
  <div class="virtual-body" :id="data.id">
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
        instance.draggable(id)
        const outputEndpoint = {
          uuid: id + '-output-0',
          anchor: [1.5, 0.5, 0, 0],
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
          anchor: [-0.5, 0.5, 0, 0],
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
//        if (config.titleInput !== null) {
//          instance.addEndpoint(title, inputEndpoint)
//        }
//        if (config.titleOutput !== null) {
//          instance.addEndpoint(title, outputEndpoint)
//        }
        config.inputs.forEach(e => {
          let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
          instance.addEndpoint(propLine, inputEndpoint)
        })
        config.outputs.forEach(e => {
          let propLine = document.querySelector('#' + id + '-' + e.idSuffix)
          console.log(e.idSuffix)
          instance.addEndpoint(propLine, outputEndpoint)
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
    background-color: @logic-background;
    border-radius: 8px;
    box-shadow: 0 10px 16px 0px @dark-sky-blue-24 ;
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
