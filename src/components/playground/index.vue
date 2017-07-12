<template>
  <div class="playground">
    <Toolbar @toggle-sidebar="toggleSidebar" :config="config"></Toolbar>
    <div class="content">
      <Sketchpad :nodes="data"></Sketchpad>
    </div>
    <Sidebar :is-show="config.isShowSidebar" @add-node="addNode"></Sidebar>
  </div>
</template>

<script>
import Toolbar from './toolbar'
import Sidebar from './sidebar'
import Sketchpad from './sketchpad'
import { mapActions } from 'vuex'

export default {
  name: 'playground',
  components: {
    Sketchpad,
    Sidebar,
    Toolbar
  },
  data () {
    return {
      config: {
        isShowSidebar: true
      },
      data: []
    }
  },
  methods: {
    toggleSidebar () {
      this.config.isShowSidebar = !this.config.isShowSidebar
      console.debug('toggle sidebar', this.config.isShowSidebar)
    },
    addNode (nodeType) {
      console.debug('add node', nodeType)
      this.data.push({
        id: 'TMP' + (new Date()).getTime(),
        type: nodeType,
        operation: undefined,
        address: undefined,
        label: nodeType._tertiaryLabel,
        position: {
          x: 100,
          y: 100
        },
        inputs: [],
        outputs: []
      })
    },
    ...mapActions(['checkConnection'])
  },
  mounted () {
//    setInterval(this.checkConnection, 2000)// 监测连接状态
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.playground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 740px;
  height: 100%;
  overflow: hidden;
  /*.toolbar {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*padding: 0 25px;*/
    /*box-sizing: border-box;*/
    /*flex-shrink: 0;*/
    /*width: 100%;*/
    /*height: 60px;*/
    /*background-color: #fff;*/
    /*box-shadow: 0 1px 0 #DADADA;*/
    /*.logo {*/
      /*width: 99px;*/
      /*height: 15px;*/
    /*}*/
    /*.switcher {*/
      /*border-radius: 8px;*/
      /*overflow: hidden;*/
      /*a {*/
        /*width: 160px;*/
        /*height: 36px;*/
        /*line-height: 36px;*/
        /*text-align: center;*/
        /*text-decoration: none;*/
        /*font-size: 14px;*/
        /*font-weight: 500;*/
        /*color: #868686;*/
        /*background: #E8E8E8;*/
        /*transition: all 0.2s;*/
        /*display: inline-block;*/
        /*&.router-link-active {*/
          /*background: #4A90E2;*/
          /*color: #fff;*/
        /*}*/
      /*}*/
    /*}*/
    /*.dropdown {*/
      /*color: #4A90E2;*/
      /*font-size: 14px;*/
      /*font-weight: 500;*/
      /*a {*/
        /*cursor: pointer;*/
        /*&:hover {*/
          /*opacity: 0.9;*/
        /*}*/
        /*.icon {*/
          /*display: inline-block;*/
          /*background-image: url(/static/img/triangle.png);*/
          /*background-size: 10px 8px;*/
          /*width: 10px;*/
          /*height: 8px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
  .content {
    position: absolute;
    height: e('calc(100% - 60px)');
    width: 100%;
    top: 60px;
    left: 0;
    overflow: auto;
  }
}
</style>
