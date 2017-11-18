<template>
	<div class="left-setting" ref="leftSetting">
    <div class="xiaoxi" v-on:click="xiaoxi($event)">消息</div>
    <div class="youxidating" v-on:click="youxidating($event)">游戏大厅</div>
    <div class="shezhi" v-on:click="shezhi($event)">设置</div>
    <div class="jihuohaoyou" v-on:click="jihuohaoyou($event)" v-if="userType === 2">激活账户</div>
    <div class="jihuohaoyou" @click="already" v-else>已激活</div>
	</div>
</template>
<script>
export default {
  name: 'left-setting',
  props: ['userType'],
  data () {
    return {}
  },
  mounted () {
    this.setHeight()
  },
  components: {
  },
  methods: {
    getHeight (width) {
      return width * (89 /216)
    },
    setHeight () {
      let parentElement = $(this.$refs.leftSetting)
      let eachHeight = this.getHeight(parentElement.width())
      $.each(parentElement.children(), function(index, val) {
        val.style.lineHeight = val.style.height = eachHeight + 'px'
      });
    },
    xiaoxi (e) {
      Bus.$emit('openXiaoxiModal')
    },
    youxidating (e) {
      Bus.$emit('openYouxidatingModal')
    },
    shezhi (e) {
      Bus.$emit('openShezhiModal')
    },
    jihuohaoyou (e) {
      Bus.$emit('openJihuoModal')
    },
    already() {
      Bus.$emit('openTipModal', '该账户已经激活')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.left-setting {
  position: absolute;
  width: 12%;
  height: 64%;
  left: 2%;
  top: 24%;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  * {
    width: 100%;
    margin: 9% 0;
    background-image: url('~@/assets/menu-bg.png');
    background-size: 100% 100%;
    text-align: center;
  }
}
</style>
