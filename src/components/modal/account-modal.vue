<template>
  <div class="account-modal modal" ref="accountModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader"><div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="account-image">
        <img :src="imageSrc" @click="chooseImage($event)">
      </div>
      <div class="account-message">
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">手机号码</div>
            <div class="cell-value">{{ phone }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">ID账号</div>
            <div class="cell-value">{{ userId }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">游戏昵称</div>
            <div class="cell-value">{{ userName }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
            <div class="cell-btn">保存</div>
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">一级密码</div>
            <div class="cell-value">{{ oneLevelPassword }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
            <div class="cell-btn" @click="password('login')">修改</div>
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">二级密码</div>
            <div class="cell-value">{{ twoLevelPassword }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
            <div class="cell-btn" @click="password('safe')">修改</div>
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">微信号</div>
            <div class="cell-value">{{ weixin }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
            <div class="cell-btn">保存</div>
          </div>
        </div>
        <div class="account-message-cell">
          <div class="account-message-cell-content">
            <div class="cell-key">推荐人ID</div>
            <div class="cell-value">{{ parentId }}</div>
          </div>
          <div class="account-message-cell-edit" ref="cellEdit">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'account-modal',
  props: {
    showModal: [Boolean],
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
    weixin: {
      type: String,
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: 0
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
      oneLevelPassword: '**********',
      twoLevelPassword: '**********'
    }
  },
  mounted () {
    this.setCloseBtnHW()
    this.setHeadLineheight()
    this.setCellBtnHeight()
  },
  computed: {
    imageSrc () {
      if(this.userImage === '' || this.userImage === null || this.userImage === undefined){
        return this.defaultImages['1']
      }
      if(this.defaultImages[this.userImage]){
        return this.defaultImages[this.userImage]
      }else{
        return window.baseURL + this.userImage
      }
    }
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
    setCellBtnHeight () {
      let edit = this.$refs.cellEdit
      let width = $(edit).width()
      let height = width * ( 58 / 223)
      $.each($('.cell-btn', this.$refs.accountModal), function(index, val) {
        val.style.height = val.style.lineHeight = height + 'px'
      });
    },
    password (type) {
      Bus.$emit('openPasswordModal', type);
      Bus.$emit('closeAccountModal')
    },
    chooseImage (e) {
      Bus.$emit('closeAccountModal')
      Bus.$emit('openChooseImageModal')
    },
    close () {
      Bus.$emit('closeAccountModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.account-modal {
  display:  flex;
  flex-direction: column;
  width: 40%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7%;
  z-index: 10;
  font-size: 1rem;
  color: #fff;
  .modal-header {
    position: relative;
    height:0%;
    font-size: 1.4rem;
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
    flex-direction: column;
    flex: 1;
    margin: 4% 4%;
    margin-right: 3%;
    text-align: center;
    .account-image {
      height: 22%;
      margin-bottom: 1rem;
      img {
        height: 100%;
      }
    }
    .account-message {
      flex: 1;
      overflow: auto;
      .account-message-cell {
        display: flex;
        .account-message-cell-content {
          display: flex;
          width: 75%;
          border-bottom:1px solid #fff;
          text-align: left;
          .cell-key {
            width: 40%;
            line-height: 2;
          }
          .cell-value {
            width: 60%;
            line-height: 2;
          }
        }
        .account-message-cell-edit {
          width: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          .cell-btn {
            width: 80%;
            font-size: 0.85rem;
            text-align: center;
            background-image: url('~@/assets/an-bg01.png');
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
