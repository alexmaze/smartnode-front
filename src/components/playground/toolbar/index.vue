<template>
<div class="toolbar">
  <div class="left">
    <div class="in-left">
      <router-link to="/console" class="close">关闭</router-link>
      <img :src="'static/img/icons/'+runtimeIcon+'.svg'" alt="" class="icon-btn run" @click="toggleSimulation">
    </div>
    <div class="in-right">
      <img src="static/img/icons/build.svg" alt="" class="icon-btn build" @click="uploadToBoard">
    </div>
  </div>
  <div class="middle">
    <div class="infobox">
      <div class="title">新项目2{{runtimeStage}}</div>
      <div class="statusbox">
        <div class="info" v-if="runtimeStage === 'EDITING'">
          <img class="status" src="static/img/icons/unconnected.svg" alt="">
          <span class="message ping-fang-sc-medium single-line-wrap">{{newDevice}} 个新的实体硬件可用 省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略省略</span>
        </div>
        <div class="info" v-else-if="runtimeStage === 'SIMULATING'">
          <span class="error">{{errorNum}}</span> 错误, <span class="warning">{{warningNum}}</span> 警告
        </div>
        <div class="info" v-else-if="runtimeStage === 'UPLOADING'">
          <el-progress :stroke-width="8" :percentage="progress" :show-text="false"></el-progress>
        </div>
        <img class="icon-info" src="static/img/icons/info.svg" alt="">
      </div>
    </div>
  </div>
  <div class="right">
    <img src="static/img/icons/toolbox.svg" alt="" class="icon-btn drawer" @click="toggleSidebar" :class="{ 'active': config.isShowSidebar }">
    <!--<div class="user">-->
      <!--<a>颜景豪 <i class="icon"></i></a>-->
    <!--</div>-->
  </div>
</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'toolbar',
  components: {
  },
  data () {
    return {
      runtimeIcon: 'run',
      progress: 0,
      errorNum: 0,
      warningNum: 0
    }
  },
  computed: {
    ...mapGetters({
      runtimeStage: 'getRuntimeStage'
    }),
    newDevice () {
      return 3
    }
  },
  props: ['config'],
  methods: {
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    },
    toggleSimulation () {
      const enumSimulating = {
        'EDITING': false,
        'SIMULATING': true
      }
      if (enumSimulating[this.runtimeStage]) {
        this.STOP_SIMULATION()
        this.runtimeIcon = 'run'
      } else {
        this.START_SIMULATION()
        this.runtimeIcon = 'stop'
      }
    },
    uploadToBoard () {
      this.progress = 0
      this.START_UPLOADING()
      let fun = () => {
        let newProgress = this.progress + Math.random()
        this.progress = (newProgress > 100) ? 100 : newProgress
        if (this.progress === 100) {
          this.FINISH_UPLOADING()
        } else {
          requestAnimationFrame(fun)
        }
      }
      requestAnimationFrame(fun)
    },
    ...mapMutations(['START_SIMULATION', 'STOP_SIMULATION', 'START_UPLOADING', 'FINISH_UPLOADING'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

@import "../../index.less";
el-progress-bar__inner{
  background-color: @progress-bar-inner;
}
a {
  color: @blue-text;
  text-decoration: none;
  cursor: pointer;
}
.icon-btn {
  width: 40px;
  transition: all .2s;
  cursor: pointer;
  border-radius: 4px;
  &:hover, &.active {
    background: @icon-hover;
  }
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  background-color: @tool-bar-background;
  box-shadow: 0 1px 0 @tool-bar-box-shadow;
  font-size: 14px;
  font-weight: 500;
}
.left {
  display: flex;
  justify-content: space-between;
  align-items:center;
  color: #4A90E2;
  height: 100%;
  width: 34.375%;
  .in-left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .close {
      margin-right: 72px;
    }
    .run {
      margin-right: 39px;
    }
  }
  .in-right {
    display: flex;
    margin-right:24px;
  }
}
.middle {
  height: 100%;
  width: 31.25%;
  /*box-sizing: border-box;*/
  border-right: 1px solid #DADADA;
  border-left: 1px solid #DADADA;
  background: #FAFAFA;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:;
  .infobox {
    color: #9B9B9B;
    width: 100%;
    padding: 14px;
    line-height: 20px;
    .title {
      text-align: center;
      margin-bottom: 2px;
    }
    .statusbox {
      width: calc(~"100% - 22px");
      display: flex;
      margin:0 11px;
      .info{
        width: calc(~"100% - 16px - 15px");
        margin: auto 15px auto 0;
        display: flex;
        align-items:center;
        .el-progress{
          width:100%;
        }
      }
      .status {
        background: @connected;
        max-height: 20px;
        /*color: #ffffff;*/
        border-radius: 50%;
        /*padding: 1px 5px;*/
        /*margin-right: 8px;*/
      }
      .message {
        margin-left: 8px;
        display: inline-block;
        /*width:50%;*/
        /*color: #4A4A4A;*/
      }
      .icon-info {
        width: 16px;
      }
    }
  }
}
.right {
  width:34.375%;
  flex-grow: 1;
  flex-shrink: 1;
  color: #4A90E2;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  height: 100%;
  .user > a {
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    .icon {
      display: inline-block;
      background-image: url(/static/img/triangle.png);
      background-size: 10px 8px;
      width: 10px;
      height: 8px;
    }
  }
  .user {
    position: absolute;
    top: 20px;
    right: 0;
    line-height: 20px;
  }
  .drawer {
    position: absolute;
    top: 10px;
    left: 23px;
  }
}
</style>

<style lang="less" >
  @import "../../index.less";
  .el-progress-bar__outer{
    background-color: @progress-bar-outer !important;
  }
  .el-progress-bar__inner{
    background-color: @progress-bar-inner !important;
  }
</style>
