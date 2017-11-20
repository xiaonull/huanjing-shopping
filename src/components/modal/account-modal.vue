<template>
  <!-- 用户信息弹窗 -->
  <div class="modal-mask" v-show="showModal">
    <div class="account-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head"></div>
      <div class="modal-content">
        <div class="account-image">
          <img :src="imageSrc" @click="chooseImage($event)">
          <span class="tips" v-if="showTips">请先完善个人信息</span>
        </div>
        <div class="account-message">
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">手机号码</div>
              <div class="cell-value"><input type="text" v-model="phone" readonly></div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div>
          <!-- <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">ID账号</div>
              <div class="cell-value"><input type="text" v-model="userId" readonly></div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div> -->
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">游戏昵称</div>
              <div class="cell-value">
                <div class="cell-value-label" v-show="!nickEdit">{{ hereNick }}</div>
                <input type="text" v-model="hereNick" v-show="nickEdit" ref="nick">
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="operateNich()">{{ nickEdit ? '保存' : '修改' }}</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">一级密码</div>
              <div class="cell-value">
                <input type="text" v-model="oneLevelPassword" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="password('login')">修改</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">二级密码</div>
              <div class="cell-value">
                <input type="text" v-model="twoLevelPassword" placeholder="请输入二级密码" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="password('safe')">修改</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">真实姓名</div>
              <div class="cell-value">
                <div class="cell-value-label" v-show="!pay_nameEdit">{{ herePay_name }}</div>
                <input type="text" v-model="herePay_name" ref="pay_name" v-show="pay_nameEdit">
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="operatePay_name()">{{ pay_nameEdit ? '保存' : '修改' }}</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">银行卡</div>
              <div class="cell-value">
                <input type="text" v-model="hereBankNum" placeholder="请输入银行卡信息" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="operateBankNum()">修改</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">推荐人ID</div>
              <div class="cell-value">
                <input type="text" v-model="parentId" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {setNick, setPay_name} from '@/js/allAxiosRequire'
  export default {
    name: 'account-modal',
    props: {
      phone: {
        type: String,
        default: ''
      },
      userId: {
        type: [Number, String],
        default: ''
      },
      userName: {
        type: String,
        default: ''
      },
      userImage: {
        type: String,
        default: ''
      },
      parentId: {
        type: [String, Number],
        default: '无'
      },
      payName: {
        type: String,
        default: ''
      },
      payNumber: {
        type: String,
        default: ''
      },
      payType: {
        type: String,
        default: ''
      },
      isSafePassword: {
        type: Boolean,
        default: false
      },
      userType: {
      }
    },
    data () {
      return {
        defaultImages: {
          '1': require('../../assets/portrait-tu01.png'),
          '2': require('../../assets/portrait-tu02.png'),
          '3': require('../../assets/portrait-tu03.png'),
          '4': require('../../assets/portrait-tu04.png'),
          '5': require('../../assets/portrait-tu05.png')
        },
        oneLevelPassword: '????????????',
        // : '????????????',
        showModal: true,
        nickEdit: false,
        pay_nameEdit: false,
        hereNick: '',
        herePay_name: '',
        // hereBankNum: '????????????'
      }
    },
    mounted () {
      this.bindModalEvent()
      // console.log(this.isSafePassword)
    },
    updated () {
      if(this.nickEdit === true) {
        $(this.$refs.nick).focus()
      }
      if(this.pay_nameEdit === true) {
        $(this.$refs.pay_name).focus()
      }
    },
    computed: {
      twoLevelPassword(){
        if(! this.isSafePassword) {
          return '';
        }
        return '????????????';
      },
      hereBankNum() {
        if(! this.payType) {
          return '';
        }
        return this.payType;
      },
      imageSrc () {
        if(this.userImage === '' || this.userImage === null || this.userImage === undefined){
          return this.defaultImages['1']
        }
        if(this.defaultImages[this.userImage]){
          return this.defaultImages[this.userImage]
        }else{
          return window.baseURL + this.userImage
        }
      },
      showTips() {
        if((this.userName === '' || this.payName === '' || this.payNumber === '' || this.payType === '' || this.isSafePassword === false) && this.userType !== 2)  {
          return true;
        }else {
          return false;
        }
      }
    },
    components: {
    },
    methods: {
      password (type) {
        Bus.$emit('openPasswordModal', type);
        // this.showModal = false
      },
      chooseImage (e) {
        this.showModal = false
        Bus.$emit('openChooseImageModal')
      },
      close () {
        // 没填写完整信息不可以关掉
        if((this.userName === '' || this.payName === '' || this.payNumber === '' || this.payType === '' || this.isSafePassword === false) && this.userType !== 2)  {
          Bus.$emit('openTipModal', '请先完善个人信息')
          return;
        }

        this.showModal = false
      },
      bindModalEvent () {
        this.showModal = false
        Bus.$on('openAccountModal', function(){
          this.showModal = true
        }.bind(this))
        Bus.$on('closeAccountModal', function(){
          this.showModal = false
        }.bind(this))
      },
    // 操作游戏昵称
    operateNich () {
      if(this.nickEdit === true) {
        setNick(this.hereNick)
        .then(function (response) {
          this.nickEdit = false
          Bus.$emit('openTipModal', response.data.msg)
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }else{
        this.nickEdit = true
      }
    },
    // 操作姓名
    operatePay_name () {
      if(this.pay_nameEdit === true) {
        setPay_name(this.herePay_name)
        .then(function (response) {
          this.pay_nameEdit = false
          Bus.$emit('openTipModal', response.data.msg)
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }else{
        this.pay_nameEdit = true
      }
    },
    operateBankNum() {
     Bus.$emit('openBankModal');
   }
 },
 watch : {
  userName (value) {
    this.hereNick = value
  },
  payName (value) {
    this.herePay_name = value
  }
} 
}
</script>
<style scoped lang="less" type="text/less">
  // flex布局水平垂直居中
  .flex-both-center () {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-modal {
    display: flex;
    flex-direction: column;
    width: 45%;
    font-size: 0.88rem;
    .modal-head {
      .flex-both-center()
    }
    .modal-content {
      flex: 1;
      padding: 1rem 2rem;
      .account-image {
        position: relative;
        .flex-both-center();
        height: 6rem;
        padding-bottom: 0.5rem;
        img {
          height: 4rem;
          width: 4rem;
          border-radius: 4rem;
        }
        .tips {
          position: absolute;
          bottom: 0.3rem;
          font-size: 0.8rem;
        } 
      }
      .account-message {
        .account-message-cell {
          display: flex;
          height: 2.3rem;
          .account-message-cell-content {
            display: flex;
            flex: 4;
            border-bottom: 1px solid #fff;
            margin-right: 0.5rem;
            .cell-key {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              flex: 2;
            }
            .cell-value {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              flex: 4;
              margin-left: 0.5rem;
              input {
                padding: 0;
                outline: none;
                border: 0;
                width: 100%;
                height: 2.3rem;
                line-height: 2.3rem;
                background-color: transparent;
                color: #fff;
              }
              .cell-value-label {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                height: 2.3rem;
                color: #fff;
              }
            }
          }
          .account-message-cell-edit {
            flex: 1;
            .flex-both-center();
            .cell-btn {
              width: 100%;
              height: 1.5rem;
              background-image: url('~@/assets/an-bg01.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center center;
              .flex-both-center();
            }
          }
        }
      }
    }
  }
  ::-webkit-input-placeholder {

    color: #F2F1F1;

  }
  :-moz-placeholder {/* Firefox 18- */

    color: #F2F1F1;
  }

  ::-moz-placeholder{/* Firefox 19+ */

    color: #F2F1F1;

  }

  :-ms-input-placeholder {

    color: #F2F1F1;

  }
</style>
