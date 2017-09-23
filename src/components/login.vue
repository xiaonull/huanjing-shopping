<template>
  <div class="login">
    <!-- 登录加载 -->
    <!-- <div class="login-loading" :class="{'hide': !showLoading}"> -->
    <div class="login-loading" v-show="loginType == 'loading'">
      <div class="login-loading-bar">
        <div class="login-loading-dot" ref="dot"></div>
        <div class="login-loading-percent">{{ percent }}%</div>
      </div>
    </div>
    <!-- 登录界面 -->
    <!-- <div class="login-denglu" :class="{'hide': showLoading}"> -->
    <div class="login-denglu" v-show="loginType == 'denglu'">
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
            <div class="main-btn-denglu" ref="dengluBtn"@click="dengluOperation($event)">登录</div>
            <div class="main-btn-other-wrap">
              <div class="main-btn-wangjimima" @click="toForget($event)">忘记密码</div>
              <div class="main-btn-zhuce" @click="toZhuce($event)">注册</div>
            </div>
          </div>
        </div>
        <div class="denglu-mianze hide"></div>
      </div>
      <div class="deng-footer">
      </div>
    </div>
    <!-- <div class="modal-mask denglu" v-show="loginType == 'denglu'">
      <div class="denglu-modal">
      </div>
    </div> -->
    <div class="modal-mask zhuce" v-show="loginType == 'zhuce'">
      <div class="zhuce-modal">
        <div class="modal-head">注册</div>
        <div class="modal-content">
          <div class="content-item">
            <div class="item-label">游戏账号</div>
            <div class="item-input">
              <input type="text" v-model="DLPhone">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">游戏昵称</div>
            <div class="item-input">
              <input type="text" v-model="DLName">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">激活码</div>
            <div class="item-input">
              <input type="text" v-model="DLJihuoma">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">一级密码</div>
            <div class="item-input">
              <input type="text" v-model="DLFirstPassword">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">二级密码</div>
            <div class="item-input">
              <input type="text" v-model="DLSencondPassword">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">微信账号</div>
            <div class="item-input">
              <input type="text" v-model="DLWeixin">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">验证码</div>
            <div class="item-input">
              <div class="input-yanzheng">
                <input type="text" v-model="DLYanzheng">
              </div>
              <div class="btn-yanzheng">
                <div class="yanzheng" @click="getYanzheng()">获取验证码</div>
              </div>
            </div>
            <div class="item-star"></div>
          </div>
        </div>
        <div class="modal-foot">
          <div class="btn-to-denglu">
            <a @click="toDenglu($event)">返回登录</a>
          </div>
          <div class="btn-zhuce" @click="postChuze()">注册</div>
          <div class="btn-to-forget">
            <a @click="toForget($event)">忘记密码</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getToken, login, registerSms, register } from '@/js/allAxiosRequire'
import util from '@/js/util'
export default {
  name: 'login',
  data () {
    return {
      percent: 0,
      loginType: 'loading',
      // 登录的数据
      DLPhone: '',
      DLName: '',
      DLJihuoma: '',
      DLFirstPassword: '',
      DLSencondPassword: '',
      DLWeixin: '',
      DLYanzheng: '',
      dengluAccount: '17076610773',
      dengluPassword: '123456'
    }
  },
  created () {
    this.getAndSetToken()
  },
  mounted () {
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
          this.loginType = 'denglu'
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
    },
    toZhuce ($event) {
      this.loginType = 'zhuce'
    },
    toDenglu ($event) {
      this.loginType = 'denglu'
    },
    toForget ($event) {
      this.loginType = 'denglu'
    },
    getYanzheng ($event) {
      // 号码正则判断
      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.DLPhone))){
        console.log('输入正确的号码')
        return
      }
      registerSms(this.DLPhone)
      .then(function (respones) {
        console.log(respones.data.msg)
      })
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            console.log(err.response.data.msg)
          }
        }
      })
    },
    postChuze () {
      let full = (this.DLPhone != '') && (this.DLName != '') && (this.DLJihuoma != '') && (this.DLFirstPassword != '') && (this.DLSencondPassword != '') && (this.DLWeixin != '') && (this.DLYanzheng != '')
      if(!full) {
        console.log('请填写完整注册信息')
        return
      }
      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.DLPhone))){
        console.log('输入正确的号码')
        return
      }
      register(this.DLPhone, this.DLYanzheng, this.DLJihuoma, this.DLFirstPassword, this.DLSencondPassword, this.DLName, this.DLWeixin)
      .then(function (response) {
        this.loginType = 'denglu'
        this.DLPhone, this.DLName, this.DLJihuoma, this.DLFirstPassword, this.DLSencondPassword, this.DLWeixin, this.DLYanzheng = ''
        console.log(response.data.msg)
      })
      .cathch(function () {
        if(err && err.response) {
          if(err.response.status === 422) {
            console.log(err.response.data.msg)
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.flex-both-center () {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hide {
  display: none !important;
}
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
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
  .zhuce {
    .flex-both-center();
    background-image: url('~@/assets/logo.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 45% auto;
    .zhuce-modal {
      width: 45%;
      height: 100%;
      border-radius: 1rem;
      background-color: rgba(0, 0, 0, 0.4);
      .modal-head {
        .flex-both-center();
        font-size: 1.2rem;
        height: 10%;
      }
      .modal-content {
        height: 80%;
        .content-item {
          display: flex;
          height: 14.2%;
          margin: 0 1rem;
          .item-label {
            width: 30%;
            height: 100%;
            .flex-both-center();
          }
          .item-input {
            width: 60%;
            height: 100%;
            .flex-both-center();
            input {
              box-sizing: border-box;
              padding-left: 1rem;
              padding-right: 1rem;
              width: 100%;
              height: 1.5rem;
              border-radius: 1.2rem;
            }
            .input-yanzheng {
              .flex-both-center();
              width: 50%;
              height: 100%;
            }
            .btn-yanzheng {
              width: 50%;
              height: 100%;
              .flex-both-center();
              .yanzheng {
                width: 80%;
                height: 50%;
                .flex-both-center();
                color: #fff;
                font-size: 0.6rem;
                background-color: #00b8ff;
                border-radius: 1rem;
              }
            }
          }
          .item-star {
            width: 10%;
            height: 100%;
            .flex-both-center();
            &:after {
              content: '*';
              font-size: 1rem;
              color: red;
            }
          }
        }
      }
      .modal-foot {
        margin: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 10%;
        .btn-zhuce {
          .flex-both-center();
          width: 20%;
          height: 1.5rem;
          font-size: 1.1rem;
          border-radius: 1.5rem;
          background-color: #00b8ff;
        }
        .btn-to-denglu {
          a {
            font-size: 0.7rem;
            color: #fff;
          }
        }
        .btn-to-forget {
          a {
            font-size: 0.7rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

