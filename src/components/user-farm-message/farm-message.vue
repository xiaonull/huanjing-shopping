<template>
	<div class="farm-message" ref="farmMessage">
		<!-- 播种总数 -->
		<div class="seed">播种总数: {{ seed }}</div>
		<!-- 肥料 -->
		<div class="fertilizer">肥料: {{ fertilizer }}</div>
		<!-- 仓库 -->
		<div class="depot">仓库: {{ depot }}</div>
		<!-- 总收益 -->
		<div class="earnings">总收益: {{ earnings }}</div>
		<!-- 直推奖 -->
    <!-- <div class="directPush">领导奖: {{ directPush }}</div> -->
    <div class="directPush" v-if="isAgent === 0" @click="apply">申请代理商</div>
    <div class="directPush" v-if="isAgent === 1">代理商申请中</div>
    <div class="directPush" v-if="isAgent === 2" @click="detail">代理商团队：{{ directPush / 330 }}</div>
    <!-- 滚动公告 -->
    <notice-modal></notice-modal>
  </div>
</template>
<script>
  import NoticeModal from '@/components/modal/notice-modal'
  export default {
    name: 'farm-message',
    props: {
      seed: {
        type: Number,
        default: 0
      },
      fertilizer: {
        type: Number,
        default: 0
      },
      depot: {
        type: Number,
        default: 0
      },
      earnings: {
        type: Number,
        default: 0
      },
      directPush: {
        type: Number,
        default: 0
      },
      isAgent: {
       type: Number,
       default: 0
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      this.setHeight()
    },
    components: {
      NoticeModal
    },
    methods: {
        setHeight () {
          let messageElement = $(this.$refs.farmMessage).children()
          let width = $(messageElement[0]).width()
          let eachHeight = this.getHeight(width)
          $.each(messageElement, function(index, val) {
           val.style.lineHeight = val.style.height = eachHeight + 'px'
          });
        },
       getHeight (width) {
        return width * (65 / 240)
       },
       apply() {
        Bus.$emit('openConfirmModal');
       },
       detail() {
        Bus.$emit('openAgentDetailModal');
       }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .farm-message {
   flex: 1;
   display: flex;
   margin-top: 2%;
   font-size: 0.8rem;
   color: #fff;
   position: relative;
   * {
    flex: 1;
    margin: 0 0.3rem;
    background-image: url('~@/assets/status-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    white-space: nowrap;
  }
  .noticeModal {
    background-image:none;
  }
}
</style>
