<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index {
  }
</style>
