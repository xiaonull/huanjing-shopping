<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal frends-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-content">
        <div class="tabs-head">
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 0}" @click="clickFriend('0', $event)">总数</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 1}" @click="clickFriend('1', $event)">一代好友</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 2}" @click="clickFriend('2', $event)">二代好友</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 3}" @click="clickFriend('3', $event)">三代好友</div>
          <!-- <div class="tabs-head-item" :class="{'head-select': selectFriendType == 4}" @click="clickReward($event)">奖励明细</div> -->
        </div>
        <div class="tabs-content">
          <!-- .friends-list-content -->
          <div class="friends-list-content" v-show="showFriends">
            <div class="tabs-content-title" v-show="selectFriendType === 0">总数</div>
            <div class="tabs-content-title" v-show="selectFriendType === 1">一代好友</div>
            <div class="tabs-content-title" v-show="selectFriendType === 2">二代好友</div>
            <div class="tabs-content-title" v-show="selectFriendType === 3">三代好友</div>
            <div class="tabs-content-list-comment">
              <div class="item-list-nicheng">昵称</div>
              <div class="item-list-id">ID</div>
              <div class="item-list-mishu">蜜数</div>
              <div class="item-list-caozuo">操作</div>
            </div>
            <div class="item-list-content">
              <div class="item-list-item" v-for="item in selectFriends" :key="item.id">
                <div class="item-list-nicheng">{{ item.nick }}</div>
                <div class="item-list-id">{{ item.id }}</div>
                <div class="item-list-mishu">{{ item.day_fruit }}</div>
                <div class="item-list-caozuo"><a href="javascript:void(0)" :data-id="item.id" v-show="item.gather ? false : true" @click="gather($event)">采蜜</a></div>
              </div>
            </div>
            <!-- <span>{{isOneGather}}</span> -->
            <div class="isOneGather" v-show="isOneGather === 0">
              您需要消耗10个果子开通一键采蜜功能！
            </div>
            <div class="item-list-footer">
              <div class="list-footer-btn" @click="allGather($event)" :class="{'btn-disable': !hasCaimi}">一键采蜜</div>
            </div>
          </div>
          <!-- .reward-list-content -->
          <div class="reward-list-content" v-show="!showFriends">
            <div class="tabs-content-list-comment">
              <div class="item-list-time">时间</div>
              <div class="item-list-id">ID</div>
              <div class="item-list-reward">奖励</div>
            </div>
            <div class="item-list-content">
              <div class="item-list-item">
                <div class="item-list-time">彼岸花</div>
                <div class="item-list-id">123456789</div>
                <div class="item-list-reward">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {getFriends, oneGather, simplyGather} from '@/js/allAxiosRequire'
  export default {
    name: 'frends-modal',
    props: ['isOneGather'],
    data () {
      return {
        showModal: false,
        allFriends: [],
        rewardDetail: [],
        selectFriendType: 0,
        selectFriends: [],
        showFriends: true,
        hasCaimi: false
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
      allFriends (value) {
        let newSelect = []
        let caimi = false
        for (var i = 0; i < value.length; i++) {
          if (value.level == this.selectFriendType) {
            newSelect.push(value[i])
          }
          if(!value[i].gather) {
            caimi = true
          }
        }
        this.hasCaimi = caimi
      }
    },
    methods: {
      modalEvent () {
        Bus.$on('openFriendsModal', function() {
          getFriends()
          .then(function (respones) {
            this.selectFriends = this.allFriends = respones.data.friends
            this.showModal = true
          }.bind(this))
          .catch(function (err) {
            if(err && err.response) {
              if(err.response.status === 422) {
                Bus.$emit('openTipModal', err.response.data.msg)
              }
            }
          })
        }.bind(this))
        Bus.$on('closeFriendsModal', function () {
          this.showModal = false
        }.bind(this))
      },
      close (e) {
        this.showModal = false
      },
      clickFriend (friendType,event) {
        this.selectFriendType = parseInt(friendType)
        if(friendType == 0) {
          this.selectFriends = this.allFriends
        }else{
          let newSelect = []
          for (let i = 0; i < this.allFriends.length; i++) {
            if(this.allFriends[i].level == friendType) {
              newSelect.push(this.allFriends[i])
            }
          }        
          this.selectFriends = newSelect
        }
        this.showFriends = true
      },
      clickReward (event) {
        this.selectFriendType = 4
        this.showFriends = false
      },
      allGather (event) {
        oneGather()
        .then(function (respones) {
          let msg = respones.data.msg
          Bus.$emit('openTipModal', msg)
          Bus.$emit('openFriendsModal')
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
      gather (event) {
        let target = event.target
        let id = $(target).attr('data-id')
        simplyGather(id)
        .then(function (respones) {
          let msg = respones.data.msg
          Bus.$emit('openTipModal', msg)
          Bus.$emit('openFriendsModal')
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
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
  // 好友列表模态框样式
  .frends-modal {
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
        justify-content: space-between;
        height: 100%;
        width: 25%;
        font-size: 0.85rem;
        .tabs-head-item { 
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
        background: white;
        background-color: rgba(0, 0, 0, 0.4);
        // 好友列表的样式
        .friends-list-content {
          width: 100%;
          height: 100%;
          .tabs-content-title {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 10%;
            font-size: 1rem;
          }
          .tabs-content-list-comment {
            height: 15%;
            display: flex;
            > * {
              .flex-both-center();
              height: 100%;
              font-size: 1rem
            }
            .item-list-nicheng {
              width: 20%;
            }
            .item-list-id {
              width: 40%;
            }
            .item-list-mishu {
              width: 20%;
            }
            .item-list-caozuo {
              width: 20%;
            }
          }
          .item-list-content {
            height: 50%;
            overflow: auto;
            .item-list-item {
              width: 100%;
              height: 15%;
              display: flex;
              >* {
                .flex-both-center();
                height: 100%;
                font-size:0.8rem
              }
              .item-list-nicheng {
                width: 20%;
              }
              .item-list-id {
                width: 40%;
              }
              .item-list-mishu {
                width: 20%;
              }
              .item-list-caozuo {
                width: 20%;
                a {
                  color: #fff;
                }
              }
            }
          }
          .isOneGather {
            font-size: 0.5rem;
            text-align: center;
          }
          .item-list-footer {
            height: 15%;
            .flex-both-center();
            .list-footer-btn {
              .flex-both-center();
              height: 65%;
              width: 50%;
              background-image: url('~@/assets/an-bg01.png');
              background-size: auto 100%;
              background-repeat: no-repeat;
              background-position: center center;
              font-size: 1.1rem;
              &.btn-disable {
                background-image: url('~@/assets/an-bg02.png');
              }
            }
          }
        }
        // 奖励明细的样式
        .reward-list-content {
          width: 100%;
          height: 100%;
          .tabs-content-list-comment {
            height: 15%;
            display: flex;
            > * {
              .flex-both-center();
              height: 100%;
              font-size: 1rem
            }
            .item-list-time {
              width: 40%;
            }
            .item-list-id {
              width: 40%;
            }
            .item-list-reward {
              width: 20%;
            }
          }
          .item-list-content {
            height: 85%;
            overflow: auto;
            .item-list-item {
              width: 100%;
              height: 15%;
              display: flex;
              >* {
                .flex-both-center();
                height: 100%;
                font-size:0.8rem
              }
              .item-list-time {
                width: 40%;
              }
              .item-list-id {
                width: 40%;
              }
              .item-list-reward {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
</style>
