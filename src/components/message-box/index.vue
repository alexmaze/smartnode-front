<template>
  <el-collapse-transition>
    <div class="message-box" v-if="show">
      <img class="icon-close" src="/static/img/icons/close.svg" alt="" @click="closeMessageBox">
      <div class="title ping-fang-sc-medium">
        <img id="icon-error" src="/static/img/icons/error.svg" alt="">
        无法烧录程序
      </div>
      <div class="message-content ping-fang-sc-regular">
        {{errorMessage}}
      </div>
    </div>
  </el-collapse-transition>
</template>

<script>
  export default {
    name: 'message-box',
    components: {
    },
    props: ['show', 'errorType'],
    computed: {
      errorMessage () {
        const enumErrorMessage = {
          'SIMULATING': '当前正处于测试模式，请结束测试后再次尝试。',
          'UNCONNECTED': '还有模块未匹配到本地硬件'
        }
        return enumErrorMessage[this.errorType]
      }
    },
    data () {
      return {
      }
    },
    methods: {
      closeMessageBox () {
        this.$emit('closeBox')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../index';

  .message-box{
    position: absolute;
    width: 255px;
    /*min-height: 60px;*/
    top: 86px;
    background-color: @white;
    border-radius: 4px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #cccccc;
    z-index: 999;
    .icon-close{
      position: absolute;
      right: 8px;
      top: 8px;
    }
    .title{
      height: 20px;
      line-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      color: @error-text;
      #icon-error{
        margin-right: 9.5px;
      }
      &:after{
        background-color: @hr;
        bottom: 0;
        content: "";
        display: block;
        left: calc(~'50% - 235px / 2');
        position: absolute;
        top: 40px;
        width: 235px;
        height: 1px;
      }
    }
    .message-content{
      padding:12px 16px;
    }
  }
</style>
