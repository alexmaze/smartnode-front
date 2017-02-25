<template>
<div class="toolbar">
  <div class="left">
    <div class="in-left">
      <router-link to="/console" class="close">关闭</router-link>
      <img src="static/img/icons/run.png" alt="" class="icon-btn run">
      <img src="static/img/icons/build.png" alt="" class="icon-btn build">
    </div>
    <div class="in-right">
      <img src="static/img/icons/code.png" alt="" class="icon-btn">
    </div>
  </div>
  <div class="middle">
    <div class="infobox">
      <div class="title">新项目2</div>
      <div class="statusbox">
        <div>
          <span class="status">已连接</span>
          <span class="name">Evan SNKit</span>
          <img class="info" src="static/img/icons/info.png" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="right">
    <img src="static/img/icons/toolbox.png" alt="" class="icon-btn drawer" @click="toggleSidebar" :class="{ 'active': config.isShowSidebar }">
    <div class="user">
      <a>颜景豪 <i class="icon"></i></a>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'toolbar',
  components: {
  },
  data () {
    return {
    }
  },
  props: ['config'],
  methods: {
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a {
  color: #4A90E2;
  text-decoration: none;
  cursor: pointer;
}
.icon-btn {
  width: 40px;
  transition: all .2s;
  cursor: pointer;
  border-radius: 4px;
  &:hover, &.active {
    background: #DADADA;
  }
}
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
  font-size: 14px;
  font-weight: 500;
}
.left {
  flex-grow: 1;
  flex-shrink: 1;
  color: #4A90E2;
  position: relative;
  height: 100%;
  .in-left {
    position: absolute;
    top: 10px;
    left: 0;
    display: flex;
    align-items: center;
    .close {
      margin-right: 72px;
    }
    .run {
      margin-right: 39px;
    }
  }
  .in-right {
    position: absolute;
    top: 10px;
    right: 23px;
  }
}
.middle {
  height: 60px;
  width: 400px;
  box-sizing: border-box;
  border-right: 1px solid #DADADA;
  border-left: 1px solid #DADADA;
  background: #FAFAFA;
  display: flex;
  justify-content: center;
  align-items: center;
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
      width: 100%;
      .status {
        background: #7ED321;
        color: #ffffff;
        border-radius: 4px;
        padding: 1px 5px;
        margin-right: 8px;
      }
      .name {
        color: #4A4A4A;
      }
      .info {
        float: right;
        width: 16px;
        margin-top: 2px;
      }
    }
  }
}
.right {
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
