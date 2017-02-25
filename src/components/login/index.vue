<template>
  <div class="login">
    <div class="login-panel">
      <div class="preview">
        <img class="title" src="./SmartNode.png" alt="">
        <img class="cavas" src="./graph.png" alt="">
      </div>
      <div class="main">
        <p class="welcome">欢迎回来</p>
        <p class="login-title">登录</p>
        <div class="inputs">
          <input class="username" type="text" name="username" placeholder="用户名">
          <input class="password" type="password" name="password" placeholder="密码">
          <div class="actions">
            <button class="submit" @click="submit">登录</button>
            <a href="" class="forget">忘记密码</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li><a>主页</a></li>
        <li><a>购买</a></li>
        <li><a>帮助中心</a></li>
        <li><a>隐私</a></li>
        <li><a>服务条款</a></li>
      </ul>
      <p>Copyrights © 2016 fzx.design, all rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    submit () {
      this.$router.push('/console')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login {
    min-height: 780px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-panel {
      width: 1010px;
      height: 512px;
      display: flex;
      .preview {
        width: 540px;
        height: 512px;
        background-color: #E5E5E5;
        border-radius: 12px;
        position: relative;
        .title {
          width: 118px;
          height: 18px;
          position: absolute;
          top: 23px;
          left: 26px;
        }
        .cavas {
          width: 392px;
          height: 304px;
          position: absolute;
          top: e('calc(50% - 152px)');
          left: e('calc(50% - 196px)');
        }
      }
      .main {
        padding-left: 86px;
        .welcome, .login-title {
          font-family: "PingFang SC";
          font-size: 48px;
          font-weight: 500;
          margin: 0;
          line-height: 67px;
        }
        .login-title {
          font-weight: 100;
        }
        .inputs {
          margin-top: 96px;
          input {
            width: 386px;
            height: 48px;
            display: block;
            margin-bottom: 25px;
            border-radius: 8px;
            border: none;
            padding: 0 16px;
            box-shadow: none;
            transition: all .2s;
            background-color: #E8E8E8;
            box-sizing: border-box;
            &:focus, &:active {
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
              background-color: #fff;
              outline: none;
            }
          }
          .actions {
            button {
              width: 128px;
              height: 48px;
              border: none;
              border-radius: 8px;
              color: #FFFFFF;
              font-size: 14px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
              background: #4A90E2;
              outline: none;
              transition: all .2s;
              cursor: pointer;
              &:hover {
                opacity: 0.9;
              }
            }
            a {
              color: #4A90E2;
              font-size: 14px;
              font-weight: 500;
              float: right;
              text-decoration: none;
            }
          }
        }

      }
    }
    .footer {
      position: absolute;
      bottom: 50px;
      left: 0;
      width: 100%;
      color: #9B9B9B;
      font-size: 12px;
      text-align: center;
      ul {
        padding: 0;
        list-style: none;
        li {
          display: inline-block;
          margin: 0 10px;
        }
        a {
          cursor: pointer;
          &:hover {
            color: gray;
          }
        }
      }
      p {
        text-align: center;
      }
    }
  }
</style>
