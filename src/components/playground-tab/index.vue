<template>
  <div class="playground-tab">
    <div class="area welcome">
      <div class="title">Playground</div>
      <Course :course="{ cover_url: 'static/img/default_project.png', name: '新建空项目', intro: '开始一个空白项目'}"></Course>
    </div>
    <div class="area projects">
      <div class="title">已保存的项目</div>
      <Project v-for="project in projects" :project="project"></Project>
    </div>
  </div>
</template>

<script>
import Course from 'components/course'
import Project from 'components/project'
export default {
  name: 'playground-tab',
  components: {
    Course,
    Project
  },
  data () {
    return {
      projects: [{
        id: '1',
        cover_url: 'static/img/default_project_2.png',
        name: '大董海参舵机',
        size: '3.31 MB',
        update_time: new Date()
      }, {
        id: '2',
        cover_url: 'static/img/default_project_2.png',
        name: 'Ultraviolet 频闪灯',
        size: '3.31 MB',
        update_time: new Date()
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.playground-tab {
  margin: 106px 0 0 0;
  height: e('calc(100% - 106px)');
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-box: border-box;
  display: flex;
  overflow: auto;
  .area {
    > .title {
      font-weight: 500;
      font-size: 18px;
      color: #868686;
      line-height: 25px;
      margin-bottom: 20px;
    }
  }
  .welcome {
    border-right: 1px solid #D6D6D6;
    height: 100%;
    > .title {
      margin-left: 56px;
    }
    .course {
      margin: 0 27px 0 56px;
    }
  }
  .projects {
    > .title {
      margin-left: 27px;
    }
    .project {
      margin-left: 27px;
    }
  }
}
</style>
