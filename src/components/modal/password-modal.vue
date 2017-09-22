<template>
  <div class="password-modal modal" ref="chooseImageModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">修改密码<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="modal-content-cell">
        <div class="cell-key">原始密码</div>
        <div class="cell-value">
          <input type="password" v-model="oldPassword">
        </div>
      </div>
      <div class="modal-content-cell">
        <div class="cell-key">新密码</div>
        <div class="cell-value">
          <input type="password" v-model="newPassword1">
        </div>
      </div>
      <div class="modal-content-cell">
        <div class="cell-key">再次确认</div>
        <div class="cell-value">
          <input type="password" v-model="newPassword2">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-btn-sure" ref="btnSure" @click="sure">确认</div>
    </div>
  </div>
</template>
<script>
import {userPassword} from '@/js/allAxiosRequire'
export default {
  name: 'password-modal',
  props: ['showModal', 'passwordType'],
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: ''
    }
  },
  mounted () {
    this.setCloseBtnHW()
    this.setHeadLineheight()
    this.setFooterBtnHeight()
  },
  components: {
  },
  methods: {
    setCloseBtnHW () {
      let bodyH = $(document.body).height()
      let closeBtnWH = bodyH * .07
      let closeBtn = this.$refs.btnClose
      closeBtn.style.width = closeBtn.style.height = closeBtnWH + 'px'
    },
    setHeadLineheight () {
      let modalHeader = this.$refs.modalHeader
      let height = $(modalHeader).height()
      modalHeader.style.lineHeight = height + 'px'
    },
    setFooterBtnHeight () {
      let sure = this.$refs.btnSure
      let width = $(sure).width()
      let height = width * ( 58 / 223)
      sure.style.height = sure.style.lineHeight = height + 'px'
    },
    close () {
      Bus.$emit('closePasswordModal')
    },
    sure () {
      if(!this.oldPassword) {
        Bus.$emit('openTipModal', '原始密码不能为空~')
        return
      }
      if(!this.newPassword1) {
        Bus.$emit('openTipModal', '新密码不能为空~')
        return
      }
      if(!this.newPassword2) {
        Bus.$emit('openTipModal', '新密码不能为空~')
        return
      }
      if(this.newPassword2 !== this.newPassword1) {
        Bus.$emit('openTipModal', '两次输入新密码不一致~')
        return
      }
      Bus.$emit('closePasswordModal')
      userPassword(this.passwordType, this.oldPassword, this.newPassword1)
      .then(function (response) {
        Bus.$emit('refreshData')
        Bus.$emit('openTipModal', '密码修改成功~')
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.password-modal {
  display:  flex;
  flex-direction: column;
  width: 34%;
  height: 55%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7%;
  z-index: 10;
  font-size: 0.95rem;
  color: #fff;
  .modal-header {
    position: relative;
    height: 26%;
    font-size: 1rem;
    text-align: center;
    .modal-btn-close {
      position: absolute;
      right: 0;
      top: 0;
      background-image: url('~@/assets/close.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .modal-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    margin: 4.5% 6%;
    margin-top: 2%;
    .modal-content-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 31%;
      .cell-key {
        width: 50%;
        text-align: left;
      }
      .cell-value {
        flex: 1;
        input {
          border: 0;
          padding:0 5%;
          box-sizing: border-box;
          width: 100%;
          line-height: 1.5;
          background-color: rgba(0, 0, 0, 0.4);
          color:#fff;
        }
      }
    }
  }
  .modal-footer {
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-footer-btn-sure {
      width: 30%;
      font-size: 1rem;
      text-align: center;
      background-image: url('~@/assets/an-bg01.png');
      background-size: 100% 100%;
    }
  }
}
</style>
