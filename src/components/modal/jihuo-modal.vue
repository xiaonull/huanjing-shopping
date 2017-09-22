<template>
  <div class="jihuo-modal modal" ref="jihuoModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">激活中心<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="modal-content-cell">
        <div class="cell-key">会员ID：</div>
        <div class="cell-value">
          <input v-model="huiyuanId">
        </div>
      </div>
      <div class="modal-content-cell">
        <div class="cell-key">会员账号：</div>
        <div class="cell-value">
          <input v-model="huiyuanAccount">
        </div>
      </div>
      <div class="modal-content-cell tip">
        激活会员需要消耗xx个果子
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-btn-sure" ref="btnSure">激活</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'jihuo-modal',
  props: ['showModal'],
  data () {
    return {
      huiyuanId: '134546',
      huiyuanAccount: '123456'
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
      Bus.$emit('closeJihuoModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.jihuo-modal {
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
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    margin: 4.5% 6%;
    margin-top: 2%;
    overflow: auto;
    .modal-content-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 31%;
      &.tip {
        color: red;
        font-size: 0.8rem;
      }
      .cell-key {
        width: 35%;
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
