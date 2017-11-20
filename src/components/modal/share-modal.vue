<template>
  <div class="modal-mask" v-show="showModal">
    <div class="share-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">分享游戏二维码</div>
      <div class="modal-content">
        <div class="code">
          <qriously :value="code" :size="150" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueQriously from 'vue-qriously'
  Vue.use(VueQriously)

  export default {
    props: ['userId'],
    data () {
      return {
        showModal: false,
        code: ''
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
      bindModalEvent () {
        Bus.$on('openShareModal', () => {
          this.code = window.frontURL + '?parent_id=' + this.userId + '#/login';
          console.log(this.code)
          this.showModal = true
        });
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
  .share-modal {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 70%;
    .modal-head {
      height: 3rem;
      .flex-both-center()
    }
    .modal-content {
      flex: 1;
      padding: 1rem 2rem;
      overflow: hidden;
      
      .code {
        width: 150px;
        height: 150px;
        margin: 1rem auto;
        background-color: #fff;
      }
    }
  }
</style>
