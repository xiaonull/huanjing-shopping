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
    :lands="landsData"
    :fertilizer="fertilizer"></farm>
    <!-- 用户农场信息层 -->
    <user-farm-message
    :seed="seed"
    :fertilizer="fertilizer"
    :depot="depot"
    :earnings="earnings"
    :isAgent="is_agent"
    :directPush="directPush"
    :userId="userId"
    :userName="userName"
    :userImage="userImage"></user-farm-message>
    <!-- 左侧系统操作 -->
    <left-setting
    :userType="userType"
    ></left-setting>
    <!-- 右侧系统操作 -->
    <right-setting></right-setting>
    <!-- 下方农场操作层 -->
    <farm-operation></farm-operation>
    <!-- 土地信息模态窗 -->
    <!-- <cell-message-modal
    :cell.sync="currentCell"
    :fertilizer="fertilizer"></cell-message-modal> -->
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
    <xiaoxi-modal></xiaoxi-modal>
    <!-- 分享游戏 -->
    <share-modal
    :userId="userId"
    ></share-modal>
    <!-- 确认模态框 -->
    <confirm-modal></confirm-modal>
    <!-- 游戏大厅模态窗 -->
    <youxidating-modal></youxidating-modal>
    <!-- 商城模态窗 -->
    <!-- <shangcheng-modal></shangcheng-modal> -->
    <shopping-modal
    :actService="actService"
    ></shopping-modal>
    <!-- 操作提示模态窗 -->
    <tip-modal></tip-modal>
    <!-- 账户信息模态窗 -->
    <account-modal
    :phone="phone"
    :userId="userId"
    :userName="userName"
    :userImage="userImage"
    :weixin="weixin"
    :parentId="parentId"
    :payName="pay_name"
    :payNumber="pay_number"
    :payType="pay_type"
    :isSafePassword="is_safe_password"
    :userType="userType"
    ></account-modal>
    <!-- 选择头像模态窗 -->
    <choose-image-modal></choose-image-modal>
    <!-- 修改密码模态窗 -->
    <password-modal></password-modal>
    <!-- 修改银行卡信息 -->
    <bank-modal
    :payName="pay_name"
    :payNumber="pay_number"
    :payType="pay_type"
    ></bank-modal>
    <!-- 激活中心模态窗 -->
    <jihuo-modal
    :userType="userType"></jihuo-modal>
    <!-- 设置模态窗 -->
    <shezhi-modal></shezhi-modal>
    <!-- 好友列表模态窗 -->
    <friends-modal :is-one-gather="userData.is_one_gather"></friends-modal>
    <!-- 交易所模态窗 -->
    <jiaoyi-modal
    :userPhone="phone"></jiaoyi-modal>
    <!-- 吐司信息显示框 -->
    <!-- <toast-modal :toast="toast"></toast-modal> -->
    <!-- 拆分图模态框 -->
    <caifentu-modal></caifentu-modal>
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
// import CellMessageModal from '@/components/modal/cell-message-modal'
import TipModal from '@/components/modal/tip-modal'
import ShouhuoModal from '@/components/modal/shouhuo-modal'
import XiaoxiModal from '@/components/modal/xiaoxi-modal'
import ConfirmModal from '@/components/modal/confirm-modal'
import ShareModal from '@/components/modal/share-modal'
import YouxidatingModal from '@/components/modal/youxidating-modal'
// import ShangchengModal from '@/components/modal/shangcheng-modal'
import ShoppingModal from '@/components/modal/shopping-modal'
import AccountModal from '@/components/modal/account-modal'
import ChooseImageModal from '@/components/modal/choose-image-modal'
import PasswordModal from '@/components/modal/password-modal'
import BankModal from '@/components/modal/bank-modal'
import JihuoModal from '@/components/modal/jihuo-modal'
import ShezhiModal from '@/components/modal/shezhi-modal'
import FriendsModal from '@/components/modal/friends-modal'
import JiaoyiModal from '@/components/modal/jiaoyi-modal'
import CaifentuModal from '@/components/modal/caifentu-modal'
import {getToken, getUserDate, getLandsData, fertilizer, irrigation, getGlobalMessage, getToast} from '@/js/allAxiosRequire'
import util from '@/js/util'
export default {
  name: 'home',
  data () {
    return {
      // 用户信息
      userData: {},
      // 土地信息
      landsData: [],
      // 当前点击的土地
      currentCell: {},
      // 全局配置信息
      globalMessage: {},
      // 吐司数据
      toast: []
    }
  },
  created () {
    // 刚刚登录进来时根据token的有无判断是否首次登录
    if (!sessionStorage._token) {
      // 路由跳转都登录页
      this.$router.push('login')
    }else{
      this.requireLandsData()
      this.requireGlobalMessage()

      new Promise((resolve, reject) => {
        this.requireUserData(resolve);
      })
      .then((response) => {
        //判断信息是否填写完整和是否激活
        let userData = this.userData;
        if((userData.nick === '' || userData.nick === null || userData.pay_name === '' || userData.pay_name === null || userData.pay_number === '' || userData.pay_number === null || userData.pay_type === '' || userData.pay_type === null || userData.is_safe_password === '' || userData.is_safe_password === null) && userData.type_id !== 2) {
          Bus.$emit('openAccountModal');
        }
      });
    }
  },
  mounted () {
    this.shifeiEvent()
    this.jiaoshuiEvent()
    this.refreshDataEvent()
    this.setCurrentCellEvent()
    // 隐藏备案号
    $('.recordNumber').css('display', 'none');
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
    // CellMessageModal,
    TipModal,
    ShouhuoModal,
    XiaoxiModal,
    ConfirmModal,
    ShareModal,
    YouxidatingModal,
    // ShangchengModal,
    ShoppingModal,
    AccountModal,
    ChooseImageModal,
    PasswordModal,
    BankModal,
    JihuoModal,
    ShezhiModal,
    FriendsModal,
    JiaoyiModal,
    CaifentuModal
  },
  methods: {
    // 请求用户信息
    requireUserData (resolve) {
      getUserDate()
      .then(function (response) {
        let data = response.data
        // console.log
        console.log(data.user)
        this.userData = data.user
        if(resolve) {
          resolve();
        }
      }.bind(this))
      .catch(function (error) {
        // let data = arguments[0].response.data
        // if(data.error === 11) {
          this.$router.push('login')
        // }
      }.bind(this))
    },
    // 请求土地信息
    requireLandsData () {
      getLandsData()
      .then(function (response) {
        let data = response.data
        // console.log
        console.log(data.lands)
        this.landsData = data.lands
      }.bind(this))
    },
    // 请求全局配置信息
    requireGlobalMessage () {
      getGlobalMessage()
      .then(function (response) {
        let data = response.data
        console.log(data)
        this.globalMessage = data.config
      }.bind(this))
    },
    // 请求吐司信息
    requireToast () {
      getToast()
      .then(function (response) {
        let data = response.data
        console.log(data)
        this.toast = data.toast
      }.bind(this))
    },
    // 施肥操作事件绑定
    shifeiEvent () {
      Bus.$on('shifei', function(){
        fertilizer()
        .then(function (respones) {
          Bus.$emit('refreshData');
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
          Bus.$emit('refreshData');
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
    // 绑定事件用于设置当前点击的土地对象
    setCurrentCellEvent () {
      Bus.$on('setCurrentCell', function(currentCell){
        this.currentCell = currentCell
      }.bind(this))
    },
    // 更新用户，土地数据事件绑定
    refreshDataEvent () {
      Bus.$on('refreshData', function(){
        this.requireUserData()
        this.requireLandsData()
        this.requireGlobalMessage()
      }.bind(this))
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
      if(this.userData.is_irrigation){
        if(this.userData.is_fertilizer){
          return 0
        }else{
          return this.userData.day_fruit
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
    is_agent() {
      return this.userData.is_agent || 0
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
    //注册的真实姓名
    pay_name() {
      return this.userData.pay_name || ''
    },
    // 银行卡号
    pay_number() {
      return this.userData.pay_number || ''
    },
    //银行信息
    pay_type() {
      return this.userData.pay_type || ''
    },
    // 玩家的推荐人id
    parentId () {
      return this.userData.parent_id || '无'
    },
    //玩家的手机号
    phone () {
      return this.userData.phone || ''
    },
    // 玩家账号类型
    userType () {
      return this.userData.type_id || ''
    },
    // 是否填写交易密码
    is_safe_password() {
      return this.userData.is_safe_password
    },
    // 客服微信号
    actService() {
      return this.globalMessage.act_service
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
