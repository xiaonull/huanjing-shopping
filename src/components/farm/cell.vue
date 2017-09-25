<template>
  <div class="farm-cell farm-cell-green" @click="selectLand($event)" ref="cell">
    <div class="farm-tree" v-if="hasTree"></div>
  </div>
</template>
<script>
export default {
  name: 'farm-cell',
  props: ['cell'],
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {
  },
  methods: {
    selectLand () {
      Bus.$emit('setCurrentCell', this.cell)
      Bus.$emit('showCellMessage', this.$el)
    }
  },
  computed: {
    hasTree () {
      return this.cell && this.cell.tree
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.farm-cell {
  width: 25%;
  height: 25%;
  position: absolute;
  background-size: 100% 100%;
  .farm-tree {
    position: absolute;
    left: 17%;
    bottom: 50%;
    width: 50%;
    height: 120%;
    background-image: url('~@/assets/shu.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
}
.farm-cell-green {
  background-image: url('~@/assets/de03.png');
}
.farm-cell-yellow {
  background-image: url('~@/assets/de01.png');
}
.farm-cell-red {
  background-image: url('~@/assets/de02.png');
}
</style>
