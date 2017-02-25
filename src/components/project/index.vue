<template>
<div class="project">
  <router-link :to="{ name: 'playground', params: { id: project.id } }">
    <img class="cover" :src="project.cover_url" alt="">
  </router-link>
  <div class="info">
    <p class="name">{{project.name}}</p>
    <p class="size">{{project.size}}</p>
    <p class="time">{{formatTime(project.update_time)}}</p>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'project',
  components: {
  },
  methods: {
    formatTime (date) {
      return moment(date).format('YYYY年M月D日 H:m')
    },
    goProject (id) {
      console.log(this.$route.push)
    }
  },
  props: ['project'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.project {
  display: flex;
  .cover {
    width: 218px;
    height: 128px;
    margin-bottom: 19px;
    border-radius: 10px;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-right: 25px;
    &:hover {
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
  }
  .info {
    .name {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 500;
      line-height: 25px;
    }
    .size, .time {
      color: #6C6C6C;
      font-size: 12px;
      font-weight: normal;
      line-height: 17px;
    }
  }
}
p {
  margin: 0;
}
</style>
