<template>
  <div class="login">
    <!-- 登录加载 -->
    <div class="modal-mask loading" v-show="loginType == 'loading'">
      <div class="login-loading">
        <div class="login-loading-bar">
          <div class="login-loading-dot" ref="dot"></div>
          <div class="login-loading-percent">{{ percent }}%</div>
        </div>
      </div>
    </div>
    <!-- 登录界面 -->
    <div class="modal-mask denglu" v-show="loginType == 'denglu'">
      <div class="login-denglu">
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
              <div class="input-cell">
                <div class="input-label">记住密码 : </div>
                <div class="input">
                  <checkbox name="rememberPsw" class="rememberPsw" v-model="rememberPsw" value="1">
                  </checkbox>
                </div>
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
    </div>
    <!-- 注册界面 -->
    <div class="modal-mask zhuce" v-show="loginType == 'zhuce'">
      <div class="zhuce-modal">
        <div class="modal-head">注册</div>
        <div class="modal-content">
          <div class="content-item">
            <div class="item-label">游戏账号</div>
            <div class="item-input">
              <input type="text" v-model="DLPhone" placeholder="请输入手机号">
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
                <div class="yanzheng" @click="getYanzheng()">{{ ZCdaojishi ? ZCdaojishimiao : '获取验证码'}}</div>
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
    <!-- 忘记密码 -->
    <div class="modal-mask forget" v-show="loginType == 'forget'">
      <div class="forget-modal">
        <div class="modal-head">忘记密码</div>
        <div class="modal-content">
          <div class="content-item">
            <div class="item-label">手机号:</div>
            <div class="item-input">
              <input type="text" v-model="forgetPnone">
            </div>
          </div>
          <div class="content-item">
            <div class="item-label">验证码:</div>
            <div class="item-input">
              <div class="input-yanzheng">
                <input type="text" v-model="forgetYanzhengma">
              </div>
              <div class="btn-yanzheng">
                <div class="yanzheng" @click="getForgetYanzhengma()">{{ WJdaojishi ? WJdaojishimiao : '获取验证码' }}</div>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-label">新密码:</div>
            <div class="item-input">
              <input type="text" v-model="forgetPassword1">
            </div>
          </div>
          <div class="content-item">
            <div class="item-label">再次确认:</div>
            <div class="item-input">
              <input type="text" v-model="forgetPassword2">
            </div>
          </div>
          <div class="main-btn-wrap">
            <div class="main-btn-forget" @click="forgetOperation($event)">确认</div>
            <div class="main-btn-other-wrap">
              <div class="main-btn-wangjimima" @click="toDenglu($event)">返回登录</div>
              <div class="main-btn-zhuce" @click="toZhuce($event)">注册</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tip-modal></tip-modal>
  </div>
</template>
<script>
  import TipModal from '@/components/modal/tip-modal'
  import {getToken, login, registerSms, register, forgetYanzhengma, forgetPost} from '@/js/allAxiosRequire'
  import util from '@/js/util'
  import Vue from 'vue'
  import {Checkbox} from 'vue-checkbox-radio'
  Vue.component('checkbox', Checkbox);
  export default {
    name: 'login',
    data () {
      return {
        percent: 0,
        loginType: 'loading',
        rememberPsw: true,
      // 注册的数据
      DLPhone: '',
      DLName: '',
      DLJihuoma: '',
      DLFirstPassword: '',
      DLSencondPassword: '',
      DLWeixin: '',
      DLYanzheng: '',
      // 登录的数据
      dengluAccount: localStorage.userName ? localStorage.userName : '',
      dengluPassword: localStorage.password ? localStorage.password : '',
      // 忘记密码的数据
      forgetPnone: '',
      forgetYanzhengma: '',
      forgetPassword1: '',
      forgetPassword2: '',
      // 倒计时
      ZCdaojishi: 0,
      WJdaojishi: 0
    }
  },
  computed: {
    ZCdaojishimiao () {
      return this.ZCdaojishi + 's'
    },
    WJdaojishimiao () {
      return this.WJdaojishi + 's'
    }
  },
  created () {
    this.getAndSetToken()
  },
  mounted () {
    this.moveDot()
  },
  components: {
    TipModal
  },
  methods: {
    // 加载动画
    moveDot () {
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
    // token
    getAndSetToken () {
      getToken()
      .then(function (response) {
        util.setSession('Token', response.data.token)
      })
    },
    // 登录操作请求
    dengluOperation (e) {
      // console.log(this.rememberPsw);
      if(this.dengluAccount === '') {
        Bus.$emit('openTipModal', '登录账号不能为空')
        return
      }
      if(this.dengluPassword === '') {
        Bus.$emit('openTipModal', '登录密码不能为空')
        return
      }
      login(this.dengluAccount, this.dengluPassword)
      .then(function (response) {
        let data = response.data
        if(data.error === 0){
          // 登录成功
          if(this.rememberPsw) {
            localStorage.userName = this.dengluAccount;
            localStorage.password = this.dengluPassword;
          }else {
            localStorage.removeItem("userName");
            localStorage.removeItem("password");
          }
          this.$router.push({path: '/'});
        }
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            this.dengluPassword = ''
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // modal状态跳转
    toZhuce ($event) {
      this.loginType = 'zhuce'
    },
    toDenglu ($event) {
      this.loginType = 'denglu'
    },
    toForget ($event) {
      this.loginType = 'forget'
    },
    // 获取验证码
    getYanzheng ($event) {
      registerSms(this.DLPhone)
      .then(function (respones) {
        Bus.$emit('openTipModal', respones.data.msg)
        this.ZCdaojishi = 60
        window.ZCyanzheng = setInterval(function(){
          this.ZCdaojishi--
          if(this.ZCdaojishi === 0) {
            clearInterval(window.ZCdaojishi)
          }
        }.bind(this), 1000)
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 注册请求
    postChuze () {
      let full = (this.DLPhone != '') && (this.DLName != '') && (this.DLJihuoma != '') && (this.DLFirstPassword != '') && (this.DLSencondPassword != '') && (this.DLWeixin != '') && (this.DLYanzheng != '')
      if(!full) {
        Bus.$emit('openTipModal', '请填写完整注册信息')
        return
      }
      register(this.DLPhone, this.DLYanzheng, this.DLJihuoma, this.DLFirstPassword, this.DLSencondPassword, this.DLName, this.DLWeixin)
      .then(function (response) {
        this.DLPhone = ''
        this.DLName = ''
        this.DLJihuoma = ''
        this.DLFirstPassword = ''
        this.DLSencondPassword = ''
        this.DLWeixin = ''
        this.DLYanzheng = ''
        Bus.$emit('openTipModal', response.data.msg)
        if(!response.err) {
          this.loginType = 'denglu'
        }
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 获取忘记密码验证码
    getForgetYanzhengma (e) {
      forgetYanzhengma(this.forgetPnone)
      .then(function (respones) {
        this.WJdaojishi = 60
        window.WJyanzheng = setInterval(function(){
          this.WJdaojishi--
          if(this.WJdaojishi === 0) {
            clearInterval(window.WJyanzheng)
          }
        }.bind(this), 1000)
        Bus.$emit('openTipModal', respones.data.msg)
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 忘记密码请求
    forgetOperation ($event) {
      if(this.forgetPassword1 !== this.forgetPassword2) {
        Bus.$emit('openTipModal', '两次输入新密码不一致')
        return
      }
      let params = {
        phone: this.forgetPnone,
        code: this.forgetYanzhengma,
        password: this.forgetPassword1
      }
      forgetPost(params)
      .then(function (respones) {
        Bus.$emit('openTipModal', respones.data.msg)
        this.loginType = 'denglu'
        this.forgetPnone = ''
        this.forgetYanzhengma = ''
        this.forgetPassword1 = ''
        this.forgetPassword2 = ''
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
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
    .denglu {
      .flex-both-center();
      background-image: url('~@/assets/box-bg.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 40% 16rem;
      .login-denglu {
        position: relative;
        overflow: hidden;
        width: 40%;
        height: 100%;
        .denglu-logo {
          height: 100%;
          width: 100%;
          background-image: url('~@/assets/logo.png');
          background-size: 100% auto;
          background-position: center center;
          background-repeat: no-repeat;
          transform: translateY(-8rem);
          z-index: 1;
        }
        .denglu-content {
          box-sizing: border-box;
          padding: 1.5rem 10%;
          position: absolute;
          width: 100%;
          height: 18rem;
          top: 50%;
          transform: translateY(-8rem);
          z-index: 2;
          .denglu-main {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .main-input-wrap {
              .input-cell {
                display: flex;
                height: 3rem;
                .input-label {
                  flex: 1;
                  font-size: 0.88rem;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                }
                .input {
                  flex: 2;
                  .flex-both-center();
                  input {
                    padding: 0;
                    padding: 0 1rem;
                    width: 100%;
                    box-sizing: border-box;
                    height: 1.6rem;
                    line-height: 1.6rem;
                    border-radius: 1.6rem;
                  }
                  .rememberPsw {
                    position: relative;
                    left: -4rem;
                    top: 0.1rem;
                  }
                }
              }
            }
            .main-btn-wrap {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 0.5rem;
              .main-btn-denglu {
                height: 2rem;
                border-radius: 2rem;
                width: 100%;
                background-color: #3db3e0;
                .flex-both-center();
              }
              .main-btn-other-wrap {
                flex: 1;
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
                * {
                  font-size: 0.75rem;
                  height: 1rem;
                  .flex-both-center();
                }
              }
            }
          }
        }
      }    
    }
    .loading {
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
    .zhuce {
      .flex-both-center();
      background-image: url('~@/assets/logo.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 45% auto;
      .zhuce-modal {
        width: 45%;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.4);
        .modal-head {
          .flex-both-center();
          font-size: 1.1rem;
          height: 3rem;
        }
        .modal-content {
          padding: 0 1rem;
          .content-item {
            display: flex;
            height: 2.4rem;
            .item-label {
              flex: 3;
              .flex-both-center();
              font-size: 0.85rem;
            }
            .item-input {
              flex: 6;
              .flex-both-center();
              > input {
                padding: 0 1em;
                box-sizing: border-box;
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                border-radius: 1.5rem;
              }
              .input-yanzheng {
                flex: 1;
                .flex-both-center();
                input {
                  box-sizing: border-box;
                  padding: 0 1rem;
                  width: 100%;
                  height: 1.5rem;
                  border-radius: 1.5rem;
                  line-height: 1.5rem;
                }
              }
              .btn-yanzheng {
                flex: 1;
                margin-left: 0.5rem;
                height: 1.5rem;
                .flex-both-center();
                .yanzheng {
                  width: 100%;
                  height: 1.5rem;
                  .flex-both-center();
                  color: #fff;
                  font-size: 0.65rem;
                  background-color: #00b8ff;
                  border-radius: 1.5rem;
                  line-height: 1.5rem;
                }
              }
            }
            .item-star {
              flex: 1;
              .flex-both-center();
              &:after {
                content: '*';
                font-size: 0.8rem;
                color: red;
              }
            }
          }
        }
        .modal-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 3.5rem;
          padding: 0 1rem;
          .btn-zhuce {
            .flex-both-center();
            width: 5rem;
            height: 1.8rem;
            font-size: 1rem;
            border-radius: 1.8rem;
            background-color: #00b8ff;
          }
          .btn-to-denglu {
            a {
              font-size: 0.75rem;
              color: #fff;
            }
          }
          .btn-to-forget {
            a {
              font-size: 0.75rem;
              color: #fff;
            }
          }
        }
      }
    }
    .forget {
      .flex-both-center();
      background-image: url('~@/assets/logo.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 45% auto;
      .forget-modal {
        width: 45%;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.4);
        .modal-head {
          .flex-both-center();
          font-size: 1.1rem;
          height: 3rem;
        }
        .modal-content {
          padding: 0 1rem;
          .content-item {
            display: flex;
            height: 2.4rem;
            .item-label {
              flex: 3;
              .flex-both-center();
              font-size: 0.85rem;
            }
            .item-input {
              flex: 6;
              .flex-both-center();
              > input {
                padding: 0 1em;
                box-sizing: border-box;
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                border-radius: 1.5rem;
              }
              .input-yanzheng {
                flex: 1;
                .flex-both-center();
                input {
                  box-sizing: border-box;
                  padding: 0 1rem;
                  width: 100%;
                  height: 1.5rem;
                  border-radius: 1.5rem;
                  line-height: 1.5rem;
                }
              }
              .btn-yanzheng {
                flex: 1;
                margin-left: 0.5rem;
                height: 1.5rem;
                .flex-both-center();
                .yanzheng {
                  width: 100%;
                  height: 1.5rem;
                  .flex-both-center();
                  color: #fff;
                  font-size: 0.65rem;
                  background-color: #00b8ff;
                  border-radius: 1.5rem;
                  line-height: 1.5rem;
                }
              }
            }
          }
          .main-btn-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 1rem;
            .main-btn-forget {
              height: 2rem;
              border-radius: 2rem;
              width: 100%;
              background-color: #3db3e0;
              .flex-both-center();
            }
            .main-btn-other-wrap {
              flex: 1;
              display: flex;
              width: 100%;
              height: 4rem;
              justify-content: space-between;
              align-items: center;
              * {
                font-size: 0.75rem;
                height: 1rem;
                .flex-both-center();
              }
            }
          }
        }
      }
    }
  }
</style>

