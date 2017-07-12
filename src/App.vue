<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  created () {
    // console.log(new Date())
    // this.$router.push('/login')
  }
}
</script>

<style>
html {
  background-color: #F3F3F3;
}
#app {
  font-family: PingFangSC-Medium, sans-serif;
  /*font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
