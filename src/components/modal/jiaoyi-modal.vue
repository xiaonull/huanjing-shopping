<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal jiaoyi-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-content">
        <div class="tabs-head">
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 1}" @click="clickOuerTab(1)">定向交易</div>
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 2}" @click="clickOuerTab(2)">自由交易</div>
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 3}" @click="clickOuerTab(3)">交易记录</div>
        </div>
        <div class="tabs-content">
          <!-- 定向交易 -->
          <div class="tabs-content-item dx" v-show="outerTabSelect == 1">
            <div class="content-head">
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 1}" @click="clickDxTab(1)">我要买</div>
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 2}" @click="clickDxTab(2)">我要卖</div>
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 3}" @click="clickDxTab(3)">待收米</div>
            </div>
            <div class="content-content">
              <!-- 我要买 -->
              <div class="content-content-item" v-show="dxTabSelect == 1">
                <div class="content-yaoBuy-list">
                  <div class="content-yaoBuy-list-content">
                    <div class="yaoBuy-list-content-row-1">
                      <div class="yaoBuy-name-title">
                        卖家姓名
                      </div>
                      <div class="yaoBuy-num">
                        X 200个
                      </div>
                    </div>
                    <div class="yaoBuy-list-content-row-2">
                      <div class="yaoBuy-name">
                        12345678
                      </div>
                    </div>
                    <div class="yaoBuy-list-content-row-3">
                      <div class="yaoBuy-time">
                        2017-02-02 13:22
                      </div>
                      <div class="yaoBuy-state-opera">
                        <div class="yaoBuy-state" v-show="false">等待卖家确认收米</div>
                        <div class="yaoBuy-opera" v-show="true">
                          <div class="yaoBuy-sure">
                            确认打米
                          </div>
                          <div class="yaoBuy-cancel">
                            取消交易
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 我要卖 -->
              <div class="content-content-item" v-show="dxTabSelect == 2">
              2
              </div>
              <!-- 待收米 -->
              <div class="content-content-item" v-show="dxTabSelect == 3">
                <div class="content-wait-list">
                  <div class="content-wait-list-content">
                    <div class="wait-list-content-row-1">
                      <div class="wait-name-title">
                        卖家姓名
                      </div>
                      <div class="wait-num">
                        X 200个
                      </div>
                    </div>
                    <div class="wait-list-content-row-2">
                      <div class="wait-name">
                        12345678
                      </div>
                    </div>
                    <div class="wait-list-content-row-3">
                      <div class="wait-weixin-title">
                        买家微信号
                      </div>
                      <div class="wait-weixin">
                        12345678
                      </div>
                    </div>
                    <div class="wait-list-content-row-4">
                      <div class="wait-time">
                        2017-02-02 13:22
                      </div>
                      <div class="wait-opera">
                        <div class="wait-state" v-show="false">等待卖家确认收米</div>
                        <div class="wait-opera" v-show="true">
                          <div class="wait-sure" >
                            确认收米
                          </div>
                          <div class="wait-cancel">
                            取消交易
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 自由交易 -->
          <div class="tabs-content-item zy" v-show="outerTabSelect == 2">
            <div class="content-head">
              <div class="content-head-item">抢购</div>
              <div class="content-head-item">挂卖</div>
              <div class="content-head-item">抢购单</div>
            </div>
            <div class="content-content">
              <div class="content-content-item">
              </div>
            </div>
          </div>
          <!-- 交易记录 -->
          <div class="tabs-content-item record" v-show="outerTabSelect == 3">
            <div class="content-head">
              <div class="content-head-item">购买记录</div>
              <div class="content-head-item">出售记录</div>
              <div class="content-head-item">委托记录</div>
              <div class="content-head-item">取消记录</div>
            </div>
            <div class="content-content">
              <div class="content-content-item">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {jiaoyiAllData} from '@/js/allAxiosRequire'
export default {
  name: 'jiaoyi-modal',
  data () {
    return {
      showModal: false,
      outerTabSelect: 1,
      dxTabSelect: 1
    }
  },
  mounted () {
    this.modalEvent();
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    modalEvent () {
      Bus.$on('openJiaoyiModal', function() {
        // jiaoyiAllData()
        // .then(function (dxSell, dxBuy, zyBuy, zySell, recordBuy, recordSell, recordBy, recordCancel) {
        // })
        // .catch(function (err) {})
        // getFriends()
        // .then(function (respones) {
        //   this.selectFriends = this.allFriends = respones.data.friends
        //   this.showModal = true
        // }.bind(this))
        // .catch(function (err) {
        //   if(err && err.response) {
        //     if(err.response.status === 422) {
        //       Bus.$emit('openTipModal', err.response.data.msg)
        //     }
        //   }
        // })
        this.showModal = true
      }.bind(this))
      Bus.$on('closeJiaoyiModal', function () {
        this.showModal = false
      }.bind(this))
    },
    clickOuerTab (tabSelect) {
      this.outerTabSelect = tabSelect
    },
    close (e) {
      this.showModal = false
    },
    clickDxTab (dxTabType) {
      this.dxTabSelect = parseInt(dxTabType)
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
// 交易所模态框样式
.jiaoyi-modal {
  .flex-both-center();
  width: 70%;
  height: 80%;
  .modal-content {
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 75%;
    .tabs-head {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      width: 25%;
      font-size: 0.85rem;
      padding-top: 1.8rem;
      box-sizing: border-box;
      .tabs-head-item { 
        margin-bottom: 30%;
        .flex-both-center();
        width: 100%;
        height: 1.5rem;
        border-radius: 1.5rem;
        background-color: rgba(0, 0, 0, 0.4);
        &.head-select {
          color: yellow;
        }
      }
    }
    .tabs-content {
      width: 70%;
      height: 100%;
      .tabs-content-item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .content-head {
          display: flex;
          height: 1.8rem;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          .content-head-item {
            .flex-both-center();
            display: flex;
            height: 1.3rem;
            width: 28%;
            border-radius: 1.3rem;
            background-color: #20acd6;
            font-size: 0.9rem;
            &.head-select {
              color: yellow;
            }
          }
        }
        .content-content {
          flex: 1;
          .content-content-item {
            width: 100%;
            height: 100%;
            overflow: auto;
            .content-yaoBuy-list {
              display: flex;
              widht: 100%;
              height:50%;
              background-color: rgba(0, 0, 0, 0.4);
              border-radius: 1rem;
              margin: 0.5rem 0;
              .content-yaoBuy-list-content {
                flex: 1;
                margin: 4%;
                font-size: 0.8rem;
                .yaoBuy-list-content-row-1 {
                  height: 25%;
                  display: flex;
                  .yaoBuy-name-title {
                    display: flex;
                    width: 60%;
                    height: 100%;
                  }
                  .yaoBuy-num {
                    display: flex;
                    width: 40%;
                    height: 100%;
                  }
                }
                .yaoBuy-list-content-row-2 {
                  display: flex;
                  height: 25%;
                }
                .yaoBuy-list-content-row-3 {
                  display: flex;
                  height: 50%;
                  .yaoBuy-time {
                    display: flex;
                    width: 60%;
                    height: 1005;
                  }
                  .yaoBuy-state-opera {
                    width: 40%;
                    height: 100%;
                    .yaoBuy-state {
                      width: 100%;
                      height: 100%;
                    }
                    .yaoBuy-opera {
                      width: 100%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      font-size: 0.8rem;
                      * {
                        height: 42%;
                        width: 60%;
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                        background-position: center;
                      }
                      .yaoBuy-sure {
                        .flex-both-center();
                        background-image: url('~@/assets/an-bg01.png');
                      }
                      .yaoBuy-cancel {
                        .flex-both-center();
                        margin-top: 5px;
                        background-image: url('~@/assets/an-bg02.png');
                      }
                    }
                  }
                }
              }
            }
            .content-wait-list {
              display: flex;
              widht: 100%;
              height:50%;
              background-color: rgba(0, 0, 0, 0.4);
              border-radius: 1rem;
              margin: 0.5rem 0;
              .content-wait-list-content {
                flex: 1;
                margin: 4%;
                font-size: 0.8rem;
                .wait-list-content-row-1 {
                  height: 25%;
                  display: flex;
                  .wait-name-title {
                    display: flex;
                    width: 60%;
                    height: 100%;
                  }
                  .wait-num {
                    display: flex;
                    width: 40%;
                    height: 100%;
                  }
                }
                .wait-list-content-row-2 {
                  display: flex;
                  height: 25%;
                }
                .wait-list-content-row-3 {
                  display: flex;
                  height: 50%;
                  .wait-time {
                    display: flex;
                    width: 60%;
                    height: 1005;
                  }
                  .wait-state-opera {
                    width: 40%;
                    height: 100%;
                    .wait-state {
                      width: 100%;
                      height: 100%;
                    }
                    .wait-opera {
                      width: 100%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      font-size: 0.8rem;
                      * {
                        height: 42%;
                        width: 60%;
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                        background-position: center;
                      }
                      .wait-sure {
                        .flex-both-center();
                        background-image: url('~@/assets/an-bg01.png');
                      }
                      .wait-cancel {
                        .flex-both-center();
                        margin-top: 5px;
                        background-image: url('~@/assets/an-bg02.png');
                      }
                    }
                  }
                }
              }
            }
          }
        }
        &.dx {
          
        }
        &.record {
          .content-head-item {
            height: 1.2rem;
            width: 22%;
            border-radius: 1.2rem;
            background-color: #20acd6;
            font-size: 0.8rem;
          }
        }
      }
    }
    .record {
      .content-head{
        .content-head-item {

        }
      }
    }
  }
}
</style>
