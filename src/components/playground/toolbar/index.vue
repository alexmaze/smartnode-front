<template>
<div class="toolbar">
  <div class="left">
    <div class="in-left">
      <router-link to="/console" class="close">关闭</router-link>
      <img :src="'static/img/icons/'+runtimeIcon+'.svg'" alt="" class="icon-btn run" @click="toggleSimulation">
    </div>
    <div class="in-right">
      <img src="/static/img/icons/build.svg" alt="" class="icon-btn build" @click="uploadToBoard">
    </div>
  </div>
  <div class="middle" @mouseenter="hoverDetailOn" @mouseleave="hoverDetailOff">
    <div class="infobox" :class="{warnbg: warn_background}" >
      <div class="title">新项目 <span v-if="runtimeStage !== 'EDITING'">- <span :class="{warntext:runtimeStage === 'SIMULATING',blacktext:runtimeStage === 'UPLOADING'}">{{stateText}}</span></span></div>
      <div class="statusbox">
        <div class="info ping-fang-sc-medium" v-if="runtimeStage === 'EDITING'">
          <img class="status" src="/static/img/icons/unconnected.svg" alt="">
          <span class="message single-line-wrap">{{newDevice}} 个新的实体硬件可用 省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试省略测试</span>
        </div>
        <div class="info ping-fang-sc-medium" v-else-if="runtimeStage === 'SIMULATING'">
          <span class="error">{{errorNum}}</span>&nbsp错误，<span class="warning">{{warningNum}}</span>&nbsp警告
        </div>
        <div class="info " v-else-if="runtimeStage === 'UPLOADING'">
          <el-progress :stroke-width="8" :percentage="progress" :show-text="false"></el-progress>
        </div>
        <!--<i class="iconfont icon-info" @click="toggleDetail"></i>-->
        <!--<img class="icon-info" src="static/img/icons/info.svg" alt="">-->
      </div>
    </div>
    <el-collapse-transition>
      <div v-if="showWarnDetail" class="warn-detail">
        <div class="detail-container">
          <p>这是一条警告</p>
          <p>这是一条警告</p>
          <p>这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告</p>
          <p>这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告</p>
          <p>这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告</p>
          <p>这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告这是一条警告</p>
        </div>
      </div>
      <div v-if="showNewDevice" class="new-device-detail">
        <div class="detail-container">

          <!--<div class="new-device" draggable="true" @dragstart="setDataTransfer(['device', 'switch', name, s.title], $event)">-->
            <!--<div class="node">-->
              <!--<img class="device-icon" src="/static/img/node.png" alt="">-->
              <!--<img class="status" src="/static/img/icons/unconnected.svg" alt="">-->
            <!--</div>-->
            <!--<div class="device-info">-->
              <!--<p>背光按键_1</p>-->
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="new-device">-->
            <!--<div class="node">-->
              <!--<img class="device-icon" src="/static/img/node.png" alt="">-->
              <!--<img class="status" src="/static/img/icons/unconnected.svg" alt="">-->
            <!--</div>-->
            <!--<div class="device-info">-->
              <!--<p>背光按键_2</p>-->
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="new-device">-->
            <!--<div class="node">-->
              <!--<img class="device-icon" src="/static/img/node.png" alt="">-->
              <!--<img class="status" src="/static/img/icons/unconnected.svg" alt="">-->
            <!--</div>-->
            <!--<div class="device-info">-->
              <!--<p>背光按键_3</p>-->
              <!--<p class="last-timestamp">6.25 09:32</p>-->
              <!--<p class="identifier"></p>-->
            <!--</div>-->
          <!--</div>-->

          <div class="new-device" v-for="(item,index) in connectedDev" draggable="true" @dragstart="setDataTransfer(item, $event)" @dragend="deleteItem(index, $event)">
            <div class="node">
              <img class="device-icon" src="/static/img/node.png" alt="">
              <img class="status" src="/static/img/icons/unconnected.svg" alt="">
            </div>
            <div class="device-info">
              <p>{{ getConnDev(index) }}</p>
              <!--<p>{{ item.split('-')[2] }}</p>-->
              <p class="last-timestamp">6.25 09:32</p>
              <p class="identifier"></p>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
  <div class="right">
    <img src="/static/img/icons/toolbox.svg" alt="" class="icon-btn drawer" @click="toggleSidebar" :class="{ 'active': config.isShowSidebar }">
    <!--<div class="user">-->
      <!--<a>颜景豪 <i class="icon"></i></a>-->
    <!--</div>-->
  </div>
    <MessageBox :show="showMessageBox" :errorType="errorType" @closeBox="showMessageBox = false"></MessageBox>
</div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MessageBox from '../../message-box'
import { nodesConfig } from '../../../../node-conf'

export default {
  name: 'toolbar',
  components: {
    MessageBox
  },
  data () {
    return {
//      runtimeIcon: 'run',
      connectedDev: ['device-switch-backlight_key', 'device-sensor-volume_sensor', 'device-switch-backlight_key'],
      progress: 0,
      errorNum: 0,
      warningNum: 22,
      showMessageBox: false,
      showWarnDetail: false,
      showNewDevice: false,
      errorType: null
    }
  },
  computed: {
    ...mapGetters({
      runtimeStage: 'getRuntimeStage',
      allConnected: 'getAllConnected'
    }),
    newDevice () {
      return 3
    },
    warn_background () {
      return this.runtimeStage === 'SIMULATING'
    },
    stateText () {
      const state = {
        'UPLOADING': '正在烧录程序',
        'SIMULATING': '正在测试'
      }
      return state[this.runtimeStage]
    },
    runtimeIcon () {
      const enumRuntimeIcon = {
        'EDITING': 'run',
        'SIMULATING': 'stop'
      }
      return enumRuntimeIcon[this.runtimeStage] || 'run'
    }
  },
  props: ['config'],
  methods: {
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    },
    async toggleSimulation () {
      const enumSimulating = {
        'EDITING': false,
        'SIMULATING': true
      }
      if (enumSimulating[this.runtimeStage]) {
        this.STOP_SIMULATION()
//        this.runtimeIcon = 'run'
      } else {
        this.START_SIMULATION()
        let result = await this.calcEndNodes()
        console.log(result)
//        this.runtimeIcon = 'stop'
      }
    },
    hoverDetailOn ({fromElement, toElement, relatedTarget, srcElement, target}) {
      if (this.runtimeStage === 'SIMULATING') this.showWarnDetail = true
      else if (this.runtimeStage === 'EDITING') this.showNewDevice = true
    },
    hoverDetailOff ({fromElement, toElement, relatedTarget, srcElement, target}) {
      if (this.runtimeStage === 'SIMULATING') this.showWarnDetail = false
      else if (this.runtimeStage === 'EDITING') this.showNewDevice = false
    },
    async uploadToBoard () {
      this.progress = 0
      // 检查是否在模拟运行阶段
      if (this.runtimeStage === 'SIMULATING') {
        this.errorType = 'SIMULATING'
        this.showMessageBox = true
        setTimeout(() => {
          if (this.showMessageBox) this.showMessageBox = false
          this.errorType = null
        }, 3000)
        return
      }
      // 检查是否所有设备都已连接
      let checkResult = (await this.checkConnection())[1] // 注：这么写的原因是vuex dispatch得到的返回值是一个数组[undefined,真实返回值]，原因暂时不明没有深入了解，时间原因hardcoded
      if (!checkResult) {
        this.errorType = 'UNCONNECTED'
        this.showMessageBox = true
        setTimeout(() => {
          if (this.showMessageBox) this.showMessageBox = false
          this.errorType = null
        }, 3000)
        return
      }
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
    setDataTransfer (item,  ev) {
        let data = item.split('-')
        let tLabel = nodesConfig[data[0]][data[1]][data[2]].title
        let type = {
          ...nodesConfig[data[0]][data[1]][data[2]],
          primary: data[0],
          _primaryLabel: '',
          secondary: data[1],
          _secondaryLabel: '',
          tertiary: data[2],
          _tertiaryLabel: tLabel
        }
        type._all = type.primary
        ev.dataTransfer.setData('data', JSON.stringify(type))

        //this.connectedDev.pop(index)
        console.log(this.connectedDev);
    },
    deleteItem (index, ev) {
      let temp = this.connectedDev.splice(index, 1)
    },
    ...mapActions(['checkConnection', 'calcEndNodes']),
    ...mapMutations(['START_SIMULATION', 'STOP_SIMULATION', 'START_UPLOADING', 'FINISH_UPLOADING']),
    getConnDev (index) {
      //this.connectedDev.forEach(function (cur) {
      let data = this.connectedDev[index].split('-')
      return nodesConfig[data[0]][data[1]][data[2]].title

//          let data = []
//          data.push(cur.split('-')[2]) ;
//          //this.idDev.push(cur.split('-')[2])
//          console.log('data ' + data)
      //})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

@import "../../index.less";
.warnbg{
  background: linear-gradient(to bottom, @simulating-top, @simulating-bottom);
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
  justify-content: center;
  align-items: center;
  /*padding: 0 15px;*/
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
      margin-left: 15px;
      width: 37px;
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
  .infobox {
    color: #9B9B9B;
    width: 100%;
    /*padding: 14px;*/
    line-height: 20px;
    padding-top: 7px;
    height:calc(~'100% - 7px');
    .title {
      text-align: center;
      margin-bottom: 2px;
    }
    .statusbox {
      /*width: calc(~"100% - 22px");*/
      display: flex;
      margin:0 11px;
      .info{
        width: 100%;
        margin: auto 0;
        display: flex;
        align-items:center;
        height:20px;
        .el-progress{
          width:100%;
        }
        .warning{
          color: @warn-text;
        }
      }
      .status {
        background: @connected;
        height: 20px;
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
        color: @icon-info;
        transition: all 0.2s;
        &:hover{
          color: darken(@icon-info,20%);
        }
      }
    }
  }
  .warn-detail{
    .drop-div(@warn-detail-body, rgba(0,0,0,0.14));
  }
  .new-device-detail{
    .drop-div(@new-device-body, @new-device-shadow);
    .detail-container{
      display: flex;
      flex-wrap: wrap;
      .new-device{
        display: flex;
        width: 50%;
        min-width: 160px;
        margin: 8px 0 0 0;
        .node{
          position: relative;
          display: inline-block;
          .device-icon{
            height:80px;
          }
          .status{
            position: absolute;
            height: 16px;
            right: 2.5px;
            bottom: 16.44px;
            background: @connected;
            max-height: 20px;
            border-radius: 50%;
          }
        }
        .device-info{
          display: inline-block;
          margin:auto 0 auto 7.64px;
          .last-timestamp{
            /*-webkit-transform: scale(0.75);*/
            font-size: 10px;
          }
          .identifier{
            width: 10px;
            height: 10px;
            margin:0 auto;
            border-radius: 50%;
            transition: all 0.2s;
          }
        }
        &:hover{
          .device-info{
            .identifier{
              background: @identifier;
              &:active{
                background: @identifier-active;
              }
            }
          }
        }
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
.drop-div(@box-background,@box-shadow) {
  position: absolute;
  top: 60px;
  width: calc(~'31.25%');
  height:auto;
  background: @box-background;
  opacity: 0.95;
  -webkit-backdrop-filter: blur(3.9px);
  backdrop-filter: blur(3.9px);
  box-shadow: 0 4px 4px 0 @box-shadow;
  z-index: 999;
  .detail-container{
    padding: 10px 15px 2px 15px;
    overflow-y: scroll;
    max-height: 180px;
    p{
      font-family: PingFangSC-Light, sans-serif;
      font-size: 12px;
      line-height: 17px;
      margin:6px 0;
    }
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
