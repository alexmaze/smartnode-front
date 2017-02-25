<template>
  <div class="sidebar" :class="{ 'active': isShow }" >
    <p class="sidebar-title">工具箱</p>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { NODE_TYPES_TREE } from '../node-types-tree.const.js'

export default {
  name: 'sidebar',
  components: {
  },
  props: ['isShow'],
  data () {
    return {
      data: NODE_TYPES_TREE,
      defaultProps: {
        children: 'sub',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data, node) {
      if (data.sub) return
      let type = {
        primary: node.parent.parent.data.key,
        _primaryLabel: node.parent.parent.data.label,
        secondary: node.parent.data.key,
        _secondaryLabel: node.parent.data.label,
        tertiary: node.data.key,
        _tertiaryLabel: node.data.label
      }
      type._all = `${type.primary}-${type.secondary}-${type.tertiary}`
      this.$emit('add-node', type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sidebar {
  position: absolute;
  top: 60px;
  right: 0;
  width: 250px;
  height: e('calc(100% - 60px)');
  background: #ffffff;
  border-left: 1px solid #DADADA;
  border-top: 1px solid #DADADA;

  transition: all .2s;
  transform: translate(100%);
  overflow: auto;
  &.active {
    transform: translate(0);
  }

  .sidebar-title {
    font-weight: 500;
    font-size: 16px;
    color: #868686;
    line-height: 25px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
}

.el-tree {
  border: none;
}
</style>
