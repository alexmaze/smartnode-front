<template>
  <div class="virtual-body" :id="data.id">
    <div class="virtual-title"> {{ data.type.title }}</div>
    <div class="virtual-content">
      <div class="virtual-inputs">
        <div class="virtual-input-item" v-for="item in data.type.inputs">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="virtual-outputs">
        <div class="virtual-output-item" v-for="item in data.type.outputs">
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
