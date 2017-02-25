<template>
  <div class="node" >
    该类型节点尚未实现 - {{data.type._all}}
  </div>
</template>

<script>
import './common.less'

export default {
  name: 'node',
  components: {
  },
  props: ['data', 'instance'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.node {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
