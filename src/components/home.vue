<template>
  <!-- 背景层 -->
  <div class="home-bg">
    <!-- 精灵层 -->
    <spirit
    :smallSpirit="small_spirit"
    :mediumSpirit="medium_spirit"
    :maxSpirit="max_spirit"></spirit>
    <!-- 麦田层 -->
    <farm
    :lands="landsData"></farm>
    <!-- 用户农场信息层 -->
    <user-farm-message
    :seed="seed"
    :fertilizer="fertilizer"
    :depot="depot"
    :earnings="earnings"
    :directPush="directPush"
    :userId="userId"
    :userName="userName"
    :userImage="userImage"></user-farm-message>
    <!-- 左侧系统操作 -->
    <left-setting></left-setting>
    <!-- 右侧系统操作 -->
    <right-setting></right-setting>
    <!-- 下方农场操作层 -->
    <farm-operation></farm-operation>
    <!-- 土地信息模态窗 -->
    <cell-message-modal
    :showModal="showCellMesssageModal"
    :cell.sync="currentCell"
    :fertilizer="fertilizer" ref="cellMessageModal"></cell-message-modal>
    <!-- 开地模态窗 -->
    <kaidi-modal
    :cell.sync="currentCell"></kaidi-modal>
    <!-- 增重模态窗 -->
    <zengzhong-modal
    :cell.sync="currentCell"></zengzhong-modal>
    <!-- 收获模态窗 -->
    <shouhuo-modal
    :cell.sync="currentCell"></shouhuo-modal>
    <!-- 消息模态窗 -->
    <xiaoxi-modal
    :showModal="showXiaoxiModal"
    :news="news"></xiaoxi-modal>
    <!-- 游戏大厅模态窗 -->
    <youxidating-modal
    :showModal="showYouxidatingModal"></youxidating-modal>
    <!-- 商城模态窗 -->
    <shangcheng-modal
    :showModal="showShangchengModal"></shangcheng-modal>
    <!-- 操作提示模态窗 -->
    <tip-modal></tip-modal>
    <!-- 账户信息模态窗 -->
    <account-modal
    :showModal="showAccountModal"
    :phone="phone"
    :userId="userId"
    :userName="userName"
    :userImage="userImage"
    :weixin="weixin"
    :parentId="parentId"
    ></account-modal>
    <!-- 选择头像模态窗 -->
    <choose-image-modal
    :showModal="showChooseImageModal"></choose-image-modal>
    <!-- 修改密码模态窗 -->
    <password-modal
    :showModal="showPasswordModal"
    :passwordType="passwordType"></password-modal>
    <!-- 激活中心模态窗 -->
    <jihuo-modal
    :showModal="showJihuoModal"></jihuo-modal>
    <!-- 设置模态窗 -->
    <shezhi-modal
    :showModal="showShezhiModal"></shezhi-modal>
    <!-- 好友列表模态窗 -->
    <friends-modal></friends-modal>
    <!-- 交易所模态窗 -->
    <jiaoyi-modal></jiaoyi-modal>
  </div>
</template>
<script>
import Farm from '@/components/farm/farm'
import UserFarmMessage from '@/components/user-farm-message/user-farm-message'
import FarmOperation from '@/components/farm-operation/farm-operation'
import LeftSetting from '@/components/setting/left-setting'
import RightSetting from '@/components/setting/right-setting'
import Spirit from '@/components/spirit/spirit'
import KaidiModal from '@/components/modal/kaidi-modal'
import ZengzhongModal from '@/components/modal/zengzhong-modal'
import CellMessageModal from '@/components/modal/cell-message-modal'
import TipModal from '@/components/modal/tip-modal'
import ShouhuoModal from '@/components/modal/shouhuo-modal'
import XiaoxiModal from '@/components/modal/xiaoxi-modal'
import YouxidatingModal from '@/components/modal/youxidating-modal'
import ShangchengModal from '@/components/modal/shangcheng-modal'
import AccountModal from '@/components/modal/account-modal'
import ChooseImageModal from '@/components/modal/choose-image-modal'
import PasswordModal from '@/components/modal/password-modal'
import JihuoModal from '@/components/modal/jihuo-modal'
import ShezhiModal from '@/components/modal/shezhi-modal'
import FriendsModal from '@/components/modal/friends-modal'
import JiaoyiModal from '@/components/modal/jiaoyi-modal'
import {getToken, getUserDate, getLandsData, fertilizer, irrigation, news} from '@/js/allAxiosRequire'
import util from '@/js/util'
export default {
  name: 'home',
  data () {
    return {
      // 消息数据
      news: [],
      // 用户信息
      userData: {},
      // 土地信息
      landsData: [],
      // 密码类型
      passwordType: '',
      currentCell: {},
      showCellMesssageModal: true,
      showXiaoxiModal: true,
      showYouxidatingModal: true,
      showShangchengModal: true,
      showAccountModal: true,
      showChooseImageModal: true,
      showPasswordModal: true,
      showJihuoModal: true,
      showShezhiModal: true
    }
  },
  created () {
    // 刚刚登录进来时根据token的有无判断是否首次登录
    if (util.getSession('Token') === null) {
      // 路由跳转都登录页
      this.$router.push('login')
    }else{
      this.requireUserData()
      this.requireLandsData()
    }
  },
  mounted () {
    this.cellMessageEvent()
    this.shifeiEvent()
    this.jiaoshuiEvent()
    this.xiaoxiEvent()
    this.youxidatingEvent()
    this.shangchengEvent()
    this.accountEvent()
    this.chooseImageEvent()
    this.passwordEvent()
    this.jihuoEvent()
    this.shezhiEvent()
    this.refreshDataEvent()
  },
  components: {
    Farm,
    UserFarmMessage,
    FarmOperation,
    LeftSetting,
    RightSetting,
    Spirit,
    KaidiModal,
    ZengzhongModal,
    CellMessageModal,
    TipModal,
    ShouhuoModal,
    XiaoxiModal,
    YouxidatingModal,
    ShangchengModal,
    AccountModal,
    ChooseImageModal,
    PasswordModal,
    JihuoModal,
    ShezhiModal,
    FriendsModal,
    JiaoyiModal
  },
  methods: {
    requireUserData () {
      getUserDate()
      .then(function (response) {
        let data = response.data
        // console.log
        console.log(data.user)
        this.userData = data.user
      }.bind(this))
      .catch(function (error) {
        // let data = arguments[0].response.data
        // if(data.error === 11) {
          this.$router.push('login')
        // }
      }.bind(this))
    },
    requireLandsData () {
      getLandsData()
      .then(function (response) {
        let data = response.data
        // console.log
        console.log(data.lands)
        this.landsData = data.lands
      }.bind(this))
    },
    shezhiEvent () {
      this.showShezhiModal = false
      Bus.$on('openShezhiModal', function(){
        this.showShezhiModal = true
      }.bind(this))
      Bus.$on('closeShezhiModal', function(){
        this.showShezhiModal = false
      }.bind(this))
    },
    jihuoEvent () {
      this.showJihuoModal = false
      Bus.$on('openJihuoModal', function(){
        this.showJihuoModal = true
      }.bind(this))
      Bus.$on('closeJihuoModal', function(){
        this.showJihuoModal = false
      }.bind(this))
    },
    // 密码模态框事件绑定
    passwordEvent () {
      this.showPasswordModal = false
      Bus.$on('openPasswordModal', function(type){
        this.passwordType = type
        this.showPasswordModal = true
      }.bind(this))
      Bus.$on('closePasswordModal', function(){
        this.showPasswordModal = false
      }.bind(this))
    },
    chooseImageEvent () {
      this.showChooseImageModal = false
      Bus.$on('openChooseImageModal', function(){
        this.showChooseImageModal = true
      }.bind(this))
      Bus.$on('closeChooseImageModal', function(){
        this.showChooseImageModal = false
      }.bind(this))
    },
    // 用户信息模态框事件绑定
    accountEvent () {
      this.showAccountModal = false
      Bus.$on('openAccountModal', function(){
        this.showAccountModal = true
      }.bind(this))
      Bus.$on('closeAccountModal', function(){
        this.showAccountModal = false
      }.bind(this))
    },
    shangchengEvent () {
      this.showShangchengModal = false
      Bus.$on('openShangchengModal', function(){
        this.showShangchengModal = true
      }.bind(this))
      Bus.$on('closeShangchengModal', function(){
        this.showShangchengModal = false
      }.bind(this))
    },
    youxidatingEvent () {
      this.showYouxidatingModal = false
      Bus.$on('openYouxidatingModal', function(){
        this.showYouxidatingModal = true
      }.bind(this))
      Bus.$on('closeYouxidatingModal', function(){
        this.showYouxidatingModal = false
      }.bind(this))
    },
    // 消息模态框事件绑定
    xiaoxiEvent () {
      this.showXiaoxiModal = false
      Bus.$on('openXiaoxiModal', function(){
        news()
        .then(function (response) {
          this.showXiaoxiModal = true
          this.news = response.data.news
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }.bind(this))
      Bus.$on('closeXiaoxiModal', function(){
        this.showXiaoxiModal = false
      }.bind(this))
    },
    // 施肥操作事件绑定
    shifeiEvent () {
      Bus.$on('shifei', function(){
        fertilizer()
        .then(function (respones) {
          Bus.$emit('openTipModal', respones.data.msg)
        })
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }.bind(this))
    },
    // 浇水操作事件绑定
    jiaoshuiEvent () {
      Bus.$on('jiaoshui', function(){
        irrigation()
        .then(function (respones) {
          Bus.$emit('openTipModal', '您已经成功浇水~')
        })
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }.bind(this))
    },
    // 土地信息模态框事件绑定
    cellMessageEvent () {
      this.showCellMesssageModal = false
      Bus.$on('openCellMessageModal', function(currentCell, target){
        this.currentCell = currentCell
        this.showCellMesssageModal = true
        this.setCellMessagePosition(target, currentCell);
      }.bind(this))
      Bus.$on('closeCellMessageModal', function(){
        this.showCellMesssageModal = false
        this.currentCell = {}
      }.bind(this))
    },
    // 更新用户，土地数据事件绑定
    refreshDataEvent () {
      Bus.$on('refreshData', function(){
        this.requireUserData()
        this.requireLandsData()
      }.bind(this))
    },
    // 土地信息模态框position的计算方法
    setCellMessagePosition (target, cell) {
      let offset = $(target).offset()
      let modal = this.$refs.cellMessageModal.$el
      modal.style.left = offset.left - ($(modal).width() * .12) + 'px'
      modal.style.top = offset.top - $(modal).height()  + 'px'
    }
  },
  computed: {
    // 小精灵数量
    small_spirit () {
      return this.userData.small_spirit || 0
    },
    // 中精灵数量
    medium_spirit () {
      return this.userData.medium_spirit || 0
    },
    // 大精灵数量
    max_spirit () {
      return this.userData.max_spirit || 0
    },
    // 播种总数
    seed () {
      return this.userData.fruit_land || 0
    },
    // 肥料
    fertilizer () {
      if(this.is_irrigation){
        if(this.is_fertilizer){
          return 0
        }else{
          return this.day_fruit
        }
      }else{
        return 0
      }
    },
    // 仓库
    depot () {
      return this.userData.fruit || 0
    },
    // 总收益
    earnings () {
      return this.userData.fruit_prod || 0
    },
    // 直推奖
    directPush () {
      return this.userData.recommend_bouns || 0
    },
    // 玩家ID
    userId () {
      return this.userData.id || 0
    },
    // 玩家昵称
    userName () {
      return this.userData.nick || ''
    },
    // 玩家头像图片
    userImage () {
      return this.userData.head || ''
    },
    // 没有微信号只有微信名称
    // 玩家微信号
    weixin () {
      return this.userData.wx_name || ''
    },
    // 玩家的推荐人id
    parentId () {
      return this.userData.parent_id || ''
    },
    //玩家的手机号
    phone () {
      return this.userData.phone || ''
    }
  }
}
</script>
<style lang="less" type="text/less">
// 模态框mask样式
.modal-mask {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    color: #fff;
  }
}
.home-bg {
  width: 100%;
  height: 100%;
  background: url('~@/assets/body-bg.jpg');
  background-size: 100% 100%;
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .modal-close {
      position: absolute;
      right: 0;
      top: 0;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      background-image: url('~@/assets/close.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
}
</style>
