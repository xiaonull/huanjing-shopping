<template>
  <div class="login">
    <!-- 登录加载 -->
    <div class="login-loading" :class="{'hide': !showLoading}">
      <div class="login-loading-bar">
        <div class="login-loading-dot" ref="dot"></div>
        <div class="login-loading-percent">{{ percent }}%</div>
      </div>
    </div>
    <!-- 登录界面 -->
    <div class="login-denglu" :class="{'hide': showLoading}">
      <div class="denglu-logo"></div>
      <div class="denglu-content">
        <div class="denglu-main">
          <div class="main-input-wrap" ref="mainInputWrap">
            <div class="input-cell">
              <div class="input-label">游戏账号 : </div>
              <div class="input"><input type="text" ref="youxizhanghu" v-model.number.trim="dengluAccount"></div>
            </div>
            <div class="input-cell">
              <div class="input-label">登录密码 : </div>
              <div class="input"><input type="password" ref="denglumima" v-model.trim="dengluPassword"></div>
            </div>
          </div>
          <div class="main-btn-wrap">
            <div class="main-btn-denglu" ref="dengluBtn"@click="dengluOperation($event)">登录 </div>
            <div class="main-btn-other-wrap">
              <div class="main-btn-wangjimima">忘记密码</div>
              <div class="main-btn-zhuce">注册</div>
            </div>
          </div>
        </div>
        <div class="denglu-mianze hide"></div>
      </div>
      <div class="deng-footer">
      </div>
    </div>
  </div>
</template>
<script>
import {getToken, login} from '@/js/allAxiosRequire'
import util from '@/js/util'
export default {
  name: 'login',
  data () {
    return {
      loginReady: false,
      percent: 0,
      showLoading: false,
      // 为了调试，加入账号密码
      dengluAccount: '17076610773',
      dengluPassword: '123456'
    }
  },
  created () {
    this.getAndSetToken()
  },
  mounted () {
    this.showLoading = true
    this.moveDot()
    this.setInputHeight()
    this.setDengluHeight()
  },
  components: {
  },
  methods: {
    moveDot () {
      // 加载动画
      var timer = setInterval(function () {
        if(this.percent < 100) {
          this.percent++
          this.$refs.dot.style.left = (80 / 100) * this.percent + '%'
        }else {
          clearInterval(timer)
          this.showLoading = false
        }
      }.bind(this), 30)
    },
    setInputHeight () {
      let inputs = [this.$refs.youxizhanghu, this.$refs.denglumima]
      let height = $(inputs[0]).height()
      inputs.forEach(function (val, index, arr) {
        val.style.borderRadius = height + 'px'
      })
    },
    setDengluHeight () {
      let btn = this.$refs.dengluBtn
      btn.style.borderRadius = $(btn).height() + 'px'
    },
    getAndSetToken () {
      getToken()
      .then(function (response) {
        util.setSession('Token', response.data.token)
      })
    },
    dengluOperation (e) {
      if(this.dengluAccount === '') {
        console.log('登录账号不能为空')
        return
      }
      if(this.dengluPassword === '') {
        console.log('登录密码不能为空')
        return
      }
      login(this.dengluAccount, this.dengluPassword).then(function (response) {
        let data = response.data
        if(data.error === 0){
          this.$router.push({path: '/'})
        }
      }.bind(this))
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/login-body-bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  .login-denglu {
    position: absolute;
    z-index: 1;
    width: 45%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    .denglu-logo {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 30%;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      background-image: url('~@/assets/logo.png');
      background-size: 90% auto;
      background-position: center 400%;
      background-repeat: no-repeat;
    }
    .denglu-content {
      display: flex;
      position: absolute;
      z-index: 1;
      width: 80%;
      height: 55%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 1rem;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4) inset;
      .denglu-main {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 10% 8%;
        // background-color: rgba(0, 0, 0, 0.4);
        .main-input-wrap {
          height: 50%;
          margin-bottom: 5%;
          .input-cell {
            display: flex;
            height: 50%;
            .input-label {
              font-size: 1rem;
              display: flex;
              align-items: center;
              width: 40%;
            }
            .input {
              display: flex;
              width: 60%;
              font-size: 0.7rem;
              color: #333;
              justify-content: center;
              align-items: center;
              input {
                box-sizing: border-box;
                width: 100%;
                padding: 2% 10%;
              }
            }
          }
        }
        .main-btn-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          .main-btn-denglu {
            line-height: 1.5;
            background-color: #66bfe3;
            text-align: center;
          }
          .main-btn-other-wrap {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            * {
              font-size: 0.8rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
  .login-loading {
    position: absolute;
    z-index: 1;
    left: 50%;
    width: 45%;
    height: 100%;
    transform: translateX(-50%);
    background-image: url('~@/assets/logo.png');
    background-size: 100% auto;
    background-position: center 25%;
    background-repeat: no-repeat;
    .login-loading-bar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 40%;
      width: 80%;
      background-image: url('~@/assets/load-bg.png');
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      .login-loading-dot {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);        
        width: 20%;
        height: 20%;
        background-image: url('~@/assets/load-dian.png');
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .login-loading-percent {
        position: absolute;
        top: 60%;
        width: 100%;
        text-align: center;
        color: red;
        font-size: 0.9rem;
      }
    }
  }
}
</style>

