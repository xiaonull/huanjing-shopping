<template>
  <div class="shouhuo-modal modal" ref="shouhuoModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">
      <div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">该棵树上可收获{{ fruit }}颗果子，是否确认收获？</div>
    <div class="modal-footer" ref="modalFooter">
      <div class="modal-footer-btn-cancel" @click="cancel($event)" ref="btnCancel">取消</div>
      <div class="modal-footer-btn-sure" @click="sure($event)" ref="btnSure">确认</div>
    </div>
  </div>
</template>
<script>
import {pick} from '@/js/allAxiosRequire'
export default {
  name: 'shouhuo-modal',
  props: ['showModal', 'cell'],
  data () {
    return {
    }
  },
  mounted () {
    this.setHeaderFooterHeight()
    this.setBtncloseWidth()
    this.setFooterBtnHeight()
  },
  components: {
  },
  computed: {
    fruit () {
      if(this.cell && this.cell.tree && this.cell.land){
        if(this.cell.land){
          return this.cell.tree.fruit - this.cell.land.min_fruit
        }
      }
      return 0
    }
  },
  methods: {
    setHeaderFooterHeight () {
      let bodyH = $(document.body).height()
      let [headerH, footerH] = [(bodyH * .06), (bodyH * .1)]
      let [header, footer] = [this.$refs.modalHeader, this.$refs.modalFooter]
      header.style.height = headerH + 'px'
      footer.style.height = footerH + 'px'
    },
    setBtncloseWidth () {
      let btnClose = this.$refs.btnClose;
      btnClose.style.width = $(btnClose).height() + 'px'
    },
    setFooterBtnHeight () {
      let [btnCancel, btnSure] = [this.$refs.btnCancel, this.$refs.btnSure]
      let height = $(btnCancel).width() * (58 / 223)
      btnCancel.style.height = btnSure.style.height = height + 'px'
      btnCancel.style.lineHeight = btnSure.style.lineHeight = height + 'px'
    },
    
    cancel (e) {
      Bus.$emit('closeShouhuoModal')
    },
    sure (e) {
      Bus.$emit('closeShouhuoModal')
      pick(this.cell.tree.id)
      .then(function (respones) {
        Bus.$emit('openTipModal', response.data.msg)
        Bus.$emit('refreshData')
      })
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      })
    },
    close () {
      Bus.$emit('closeShouhuoModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none;
}
.shouhuo-modal {
  width: 35%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8%;
  z-index: 10;
  font-size: 0.95rem;
  color: #fff;
  .modal-header {
    .modal-btn-close {
      float: right;
      height: 100%;
      background-image: url('~@/assets/close.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .modal-content {
    padding: 1.2rem 0.8rem;
  }
  .modal-footer {
    position: relative;
    * {
      position: absolute;
      background-image: url('~@/assets/an-bg01.png');
      background-size: 100%;
      background-repeat: no-repeat;
      width: 35%;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }
    .modal-footer-btn-cancel {
      left: 0.8rem;
    }
    .modal-footer-btn-sure {
      right: 0.8rem;
    }
  }
}
</style>
