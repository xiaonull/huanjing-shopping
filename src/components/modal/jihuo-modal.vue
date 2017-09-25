<template>
  <div class="modal-mask" v-show="showModal">
    <div class="modal jihuo-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">激活好友</div>
      <div class="modal-content">
        <div class="tab-head">
          <div class="tab-head-item" @click="clickTabHead(1)">激活码列表</div>
          <div class="tab-head-item" @click="clickTabHead(2)">生成激活码</div>
        </div>
        <div class="tab-content">
          <div class="tab-content-item"v-show="tabIndex == 1">
            <div class="code-title">
              <div class="title-code">key</div>
              <div class="title-usertype">激活码类型</div>
              <div class="title-recommend-id">推荐人ID</div>
              <div class="title-user-id">使用者ID</div>
            </div>
            <div class="code-list">
              <div class="code-list-item" v-for="item in codes">
                <div class="code">{{ item.key }}</div>
                <div class="code-usertype">{{ item.user_type == 1 ? '正常用户' : '测试用户' }}</div>
                <div class="code-recommend-id">{{ item.recommend_id }}</div>
                <div class="code-user-id">{{ item.user ? item.user.id : '未使用' }}</div>
              </div>
            </div>
          </div>
          <div class="tab-content-item"v-show="tabIndex == 2">
            <div class="jihuoma-box">{{ newCode }}</div>
            <div class="jihuo-opra">
              <div class="create-jihuoma-btn" @click="creatNewJihuoma()">生成激活码</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {jihuoma, creatJihuoma} from '@/js/allAxiosRequire'

export default {
  name: 'jihuo-modal',
  props: ['userType'],
  data () {
    return {
      showModal: true,
      tabIndex: 1,
      codes: [],
      newCode: ''
    }
  },
  mounted () {
    this.bindModalEvent()
  },
  components: {
  },
  computed: {
    newCodekey () {
      if(this.code.data){
        return this.code.data.key
      }
      return ''
    }
  },
  methods: {
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      this.showModal = false
      Bus.$on('openJihuoModal', function(){
        this.showModal = true
        this.getJihuoma()
      }.bind(this))
    },
    clickTabHead (index) {
      this.tabIndex = index
    },
    getJihuoma () {
      jihuoma()
      .then(function (response) {
        let data = response.data
        this.codes = data.actcode_list
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
      }.bind(this))
    },
    creatNewJihuoma () {
      creatJihuoma(this.userType)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.newCode = data.data.key
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
      }.bind(this))
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
.jihuo-modal {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 70%;
  .modal-head {
    height: 3rem;
    .flex-both-center()
  }
  .modal-content {
    flex: 1;
    padding: 1rem 2rem;
    display: flex;
    .tab-head {
      width: 25%;
      margin-right: 1rem;
      .tab-head-item {
        height: 1.5rem;
        .flex-both-center();
        border-radius: 1.5rem;
        background-color: rgba(0, 0, 0, 0.4);
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
      }
    }
    .tab-content {
      flex: 1;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 1rem;
      padding: 0.5rem;
      .tab-content-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .code-title {
          display: flex;
          height: 1.5rem;
          font-size: 0.9rem;
          * {
            flex: 1;
            .flex-both-center()
          }
          .title-code {
            flex: 1.5;
          }
        }
        .code-list {
          flex: 1;
          overflow: auto;
          .code-list-item {
            display: flex;
            height: 1.5rem;
            font-size: 0.85rem;
            * {
              flex: 1;
              .flex-both-center()
            }
            .code {
              flex: 1.5;
            }
          }
        }
        .jihuoma-box {
          flex: 1;
          .flex-both-center();
          font-size: 1.8rem;
        }
        .jihuo-opra {
          .flex-both-center();
          height: 3rem;
          .create-jihuoma-btn {
            .flex-both-center();
            width: 50%;
            height: 1.6rem;
            font-size: 1rem;
            border-radius: 1.6rem;
            background-color: #20acd6;
          }
        }
      }
    }
  }
}
</style>
