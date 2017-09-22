<template>
  <div class="choose-image-modal modal" ref="chooseImageModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">修改头像<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="modal-content-line">
        <div class="line-column"><img :src="image1" @click="choose('1')"></div>
        <div class="line-column"><img :src="image2" @click="choose('2')"></div>
        <div class="line-column"><img :src="image3" @click="choose('3')"></div>
      </div>
      <div class="modal-content-line">
        <div class="line-column"><img :src="image4" @click="choose('4')"></div>
        <div class="line-column"><img :src="image5" @click="choose('5')"></div>
        <div class="line-column add-image">+</div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="modal-footer-btn-sure" ref="btnSure">确认</div>
    </div>
  </div>
</template>
<script>
import {setHead} from '@/js/allAxiosRequire'
export default {
  name: 'choose-image-modal',
  props: ['showModal'],
  data () {
    return {
      image1 : require('../../assets/portrait-tu01.png'),
      image2 : require('../../assets/portrait-tu02.png'),
      image3 : require('../../assets/portrait-tu03.png'),
      image4 : require('../../assets/portrait-tu04.png'),
      image5 : require('../../assets/portrait-tu05.png')
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
    choose (imageSrc) {
      setHead(imageSrc)
      .then(function (respones) {
        Bus.$emit('openTipModal', respones.data.msg)
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
      Bus.$emit('closeChooseImageModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.choose-image-modal {
  display:  flex;
  flex-direction: column;
  width: 34%;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7%;
  z-index: 10;
  font-size: 0.95rem;
  color: #fff;
  .modal-header {
    position: relative;
    height: 15%;
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
    justify-content: space-between;
    margin: 4.5% 6%;
    margin-top: 2%;
    overflow: auto;
    .modal-content-line {
      display: flex;
      justify-content: space-between;
      height: 49%;
      .line-column {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        img {
          width: 100%;
        }
        &.add-image {
          font-size: 2rem;

        }
      }
    }
  }
  .modal-footer {
    height: 14%;
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
