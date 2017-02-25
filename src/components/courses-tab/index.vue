<template>
<div class="courses-tab">
  <div class="course" v-for="course in courses">
  </div>
  <Course v-for="course in courses" :course="course"></Course>
</div>
</template>

<script>
import Course from 'components/course'

export default {
  name: 'courses-tab',
  components: {
    Course
  },
  data () {
    return {
      courses: [{
        cover_url: '/static/demo/p1.png',
        id: 1,
        name: '逻辑基础',
        intro: '只需几步，制作一个能够感应到你的小灯。'
      }, {
        cover_url: '/static/demo/p2.png',
        id: 2,
        name: '来点音乐吧',
        intro: '这一次我们来一起制造些声音。'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.courses-tab {
  padding: 10px 18px;
  display: flex;
  flex-wrap: wrap;
}
</style>
