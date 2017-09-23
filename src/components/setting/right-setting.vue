<template>
	<div class="right-setting" ref="rightSetting">
    <div class="haoyouliebiao" @click="friends($event)">好友列表</div>
    <div class="jiaoyisuo" @click="jiaoyi($event)">交易所</div>
    <div class="chaifentu">拆分图</div>
    <div class="shangcheng" @click="shangcheng">商城</div>
	</div>
</template>
<script>
export default {
  name: 'right-setting',
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
      let parentElement = $(this.$refs.rightSetting)
      let eachHeight = this.getHeight(parentElement.width())
      $.each(parentElement.children(), function(index, val) {
        val.style.lineHeight = val.style.height = eachHeight + 'px'
      });
    },
    shangcheng () {
      Bus.$emit('openShangchengModal')
    },
    friends (e) {
      Bus.$emit('openFriendsModal')
    },
    jiaoyi (e) {
      Bus.$emit('openJiaoyiModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.right-setting {
  position: absolute;
  width: 12%;
  height: 64%;
  right: 2%;
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
