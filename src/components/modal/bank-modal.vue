<template>
  <div class="modal-mask" v-show="showModal">
    <div class="password-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head">
        <p>修改银行卡信息</p>
      </div>
      <div class="modal-content">
        <div class="modal-content-cell">
          <div class="cell-key">卡主姓名</div>
          <div class="cell-value">
            <input type="text" v-model="payName_">
          </div>
        </div>
        <div class="modal-content-cell">
          <div class="cell-key">银行卡号</div>
          <div class="cell-value">
            <input type="number" v-model="payNumber_">
          </div>
        </div>
        <div class="modal-content-cell">
          <div class="cell-key">银行信息</div>
          <div class="cell-value">
            <input type="text" v-model="payType_">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-footer-btn-sure" ref="btnSure" @click="sure">确认</div>
      </div>
    </div>    
  </div>
</template>
<script>
  import { setPay_name, setPay_number, setPay_type } from '@/js/allAxiosRequire'
  export default {
    name: 'password-modal',
    props: ['payName', 'payNumber', 'payType'],
    data () {
      return {
        showModal: true,
        payName_: '',
        payNumber_: '',
        payType_: '',
      }
    },
    mounted () {
      this.bindModalEvent()
    },
    components: {
    },
    methods: {
      close () {
        this.showModal = false
      },
      sure () {
        if(this.payName_ === '' || this.payNumber_ === '' || this.payType_ === '') {
          Bus.$emit('openTipModal', '请填写完整信息');
          return;
        }

        setPay_name(this.payName_)
        .then(function (response) {
          // Bus.$emit('openTipModal', response.data.msg)
          // Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })

        setPay_number(this.payNumber_)
        .then(function (response) {
          // Bus.$emit('openTipModal', response.data.msg)
          // Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })

        setPay_type(this.payType_)
        .then(function (response) {
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
      },
      bindModalEvent () {
        this.showModal = false
        Bus.$on('openBankModal', function(){
          this.payName_ = this.payName;
          this.payNumber_ = this.payNumber;
          this.payType_ = this.payType;
          this.showModal = true
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
  .password-modal {
    width: 20rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    .modal-head {
      height: 2.1rem;
      text-align: center;
    }
    .modal-content {
      padding: 1rem;
      font-size: 0.9rem;
      .modal-content-cell {
        display: flex;
        height: 2rem;
        .cell-key {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 0.5rem;
        }
        .cell-value {
          flex: 3;
          margin-left: 1rem;
          .flex-both-center();
          input {
            width: 90%;
            height: 1.5rem;
            padding: 0;
            padding: 0 0.5rem;
            outline: none;
            border: 0;
            background-color: rgba(255, 255, 255, 0.4);
            line-height: 1.5rem;
            color: #fff;        
          }
        }

        .cell-value-safe {
          flex: 1.5;
          margin-left: 1.4rem;
        }

        .getCode {
          flex: 1.5;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 1.2rem;
          line-height: 1.2rem;
          border-radius: 1.2rem;
          font-size: 0.8rem;
          background-color: #20acd6;
          text-align: center;
          position: relative;
          top: 0.25rem;
          margin-left: 1rem;
        }
      }
    }
    .modal-footer {
      height: 2.5rem;
      display: flex;
      .flex-both-center();
      .modal-footer-btn-sure {
        .flex-both-center();
        height: 1.5rem;
        width: 5rem;
        background-image: url('~@/assets/an-bg01.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
