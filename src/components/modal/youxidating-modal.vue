<template>
  <div class="youxidating-modal modal" ref="youxidatingModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">游戏大厅<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">该功能暂未开放，敬请期待！</div>
  </div>
</template>
<script>
export default {
  name: 'youxidating-modal',
  props: ['showModal'],
  data () {
    return {
    }
  },
  mounted () {
    this.setCloseBtnHW()
    this.setHeadLineheight()
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
    close () {
      Bus.$emit('closeYouxidatingModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.youxidating-modal {
  display:  flex;
  flex-direction: column;
  width: 40%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7%;
  z-index: 10;
  font-size: 0.95rem;
  color: #fff;
  .modal-header {
    position: relative;
    height:40%;
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
    flex: 1;
    margin: 4.5% 6%;
    margin-top: 6%;
    text-align: center;
  }
}
</style>
