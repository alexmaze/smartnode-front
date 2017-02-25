<template>
  <div class="console">
    <div class="toolbar">
      <img src="static/img/logo.png" alt="" class="logo">
      <div class="switcher">
        <router-link to="/console/courses">我的课程</router-link><!--
        --><router-link to="/console/playground">Playground</router-link>
      </div>
      <div class="dropdown">
         <a>颜景豪 <i class="icon"></i></a>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'console',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .console {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
      box-sizing: border-box;
      flex-shrink: 0;
      width: 100%;
      height: 60px;
      background-color: #fff;
      box-shadow: 0 1px 0 #DADADA;
      .logo {
        width: 99px;
        height: 15px;
      }
      .switcher {
        border-radius: 8px;
        overflow: hidden;
        a {
          width: 160px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #868686;
          background: #E8E8E8;
          transition: all 0.2s;
          display: inline-block;
          &.router-link-active {
            background: #4A90E2;
            color: #fff;
          }
        }
      }
      .dropdown {
        color: #4A90E2;
        font-size: 14px;
        font-weight: 500;
        a {
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
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
    }
  }
  p {
    margin: 0;
  }
</style>
