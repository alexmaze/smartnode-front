<template>
<div class="course">
  <img class="cover" :src="course.cover_url" alt="">
  <p class="name">{{course.name}}</p>
  <p class="intro">{{course.intro}}</p>
</div>
</template>

<script>
export default {
  name: 'course',
  components: {
  },
  props: ['course'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.course {
  margin: 38px;
  .cover {
    width: 340px;
    height: 200px;
    margin-bottom: 19px;
    border-radius: 10px;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    &:hover {
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  }
  .name {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 500;
  }
  .intro {
    color: #6C6C6C;
    font-size: 12px;
    font-weight: normal;
  }
}
p {
  margin: 0;
}
</style>
