<template>
  <div class="shezhi-modal modal" ref="shezhiModal" :class="{'hide': !showModal}">
    <div class="modal-header" ref="modalHeader">设置<div class="modal-btn-close" ref="btnClose" @click="close($event)"></div>
    </div>
    <div class="modal-content">
      <div class="modal-content-cell">
        <div class="cell-key">
          <div class="cell-key-bg yinyue"></div>
          <div class="cell-key-word">音乐</div>
        </div>
        <div class="cell-value">
          <div class="switch-bg"  @click="clickSound" :class="{'switch-close': !sound}">
            <div class="switch-cir"></div>
          </div>
        </div>
      </div>
      <div class="modal-content-cell">
        <div class="cell-key">
          <div class="cell-key-bg yinxiao"></div>
          <div class="cell-key-word">音效</div>
        </div>
        <div class="cell-value">
          <div class="switch-bg"  @click="clickSoundEffect" :class="{'switch-close': !soundEffect}">
            <div class="switch-cir"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shezhi-modal',
  props: ['showModal'],
  data () {
    return {
      sound: true,
      soundEffect: true
    }
  },
  mounted () {
    this.setHeadLineheight()
    this.setCloseBtnHW()
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
      Bus.$emit('closeShezhiModal')
    },
    clickSound () {
      this.sound = !this.sound
    },
    clickSoundEffect () {
      this.soundEffect = !this.soundEffect
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none !important;
}
.shezhi-modal {
  display:  flex;
  flex-direction: column;
  width: 35%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7%;
  z-index: 10;
  font-size: 0.95rem;
  color: #fff;
  .modal-header {
    position: relative;
    height:30%;
    font-size: 1.3rem;
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
    margin: 15% 6%;
    margin-top: 2%;
    .modal-content-cell {
      display: flex;
      height: 50%;
      .cell-key {
        display: flex;
        width: 50%;
        justify-content: space-around;
        .cell-key-bg {
          width: 60%;
          background-repeat: no-repeat;
          background-size: auto 65%;
          background-position: 80% center;
          &.yinyue {
            background-image: url('~@/assets/set-ico01.png');
          }
          &.yinxiao {
            background-image: url('~@/assets/set-ico02.png')
          }
        }
        .cell-key-word {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
      }
      .cell-value {
        display: flex;
        align-items: center;
        flex: 1;
        .switch-bg {
          position: relative;
          width: 50%;
          height: 58%;
          background-color: #4cc75d;
          .switch-cir {
            position: absolute;
            height: 100%;
            width: 50%;
            right: 0;
            background-color: #fff;
            box-sizing: border-box;
          }
          &.switch-close {
            background-color: #eee;
            .switch-cir {
              right: auto;
              left: auto;
            }
          }
        }
      }
    }
  }
}
</style>
