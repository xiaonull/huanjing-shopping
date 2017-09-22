<template>
  <div class="xiaoxi-modal modal" ref="xiaoxiModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">消息<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="xiaoxi-wrap" v-for="item in news" :key="item.id">
        <div class="xiaoxi-content">{{ item.msg }}</div>
        <div class="xiaoxi-footer">
          <div class="xiaoxi-time">{{ item.start_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'xiaoxi-modal',
  props: ['showModal', 'news'],
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
      Bus.$emit('closeXiaoxiModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.xiaoxi-modal {
  display:  flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
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
    flex: 1;
    margin: 4.5% 6%;
    margin-top: 2%;
    overflow: auto;
    .xiaoxi-wrap {
      margin-top: 1rem;
      border-radius: 0.7rem;
      border:1px solid rgba(208, 112, 41, 0.5);
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 0.75rem;
      .xiaoxi-content {
        margin: 0.8rem;
        margin-bottom: 0;
      }
      .xiaoxi-footer {
        margin: 0.5rem 0.8rem;
        overflow: hidden;
        .xiaoxi-time {
          float:  right;
          font-size: 0.85rem;
        }
      }
    }
  }
}
</style>
