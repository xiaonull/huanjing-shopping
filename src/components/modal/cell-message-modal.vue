<template>
  <div class="cell-message-modal" ref="cellMessageModal" :class="{'hide': !showModal}" @click="close($event)">
    <div class="cell-name">{{ cellName }}</div>
    <div class="cell-xinxi">土地信息：{{ xinxi }}</div>
    <div class="cell-bozhongliang">播种量：</div>
    <div class="cell-shifei">施肥：</div>
  </div>
</template>
<script>
export default {
  name: 'cell-message-modal',
  props: ['showModal', 'cell', 'fertilizer'],
  data () {
    return {
      noTree: false
    }
  },
  mounted () {
  },
  components: {
  },
  methods: {
    close () {
      Bus.$emit('closeCellMessageModal')
    }
  },
  computed: {
    cellName () {
      if(this.cell.xy === undefined){
        return ''
      }
      return this.cell.land.name || ''
    },
    xinxi () {
      return (this.cell.land && (this.cell.land.min_fruit && this.cell.land.max_fruit) && (this.cell.land.min_fruit + '—' + this.cell.land.max_fruit)) || ''
    },
    bozhongliang () {
      return (this.cell.tree && this.cell.tree.fruit) || 0
    },
    shifei () {
      return (this.fertilizer && this.cell.tree && this.cell.tree.out_fruit) || 0
    }
  },
  watch: {
    cell (value) {
      if(value.tree) {
        this.noTree = true
      }else{
        this.noTree = false
      }
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none;
}
.cell-message-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8%;
  z-index: 10;
  font-size: 0.8rem;
  color: #fff;
  line-height: 1.5;
  * {
    padding:0 0.5rem;
  }
  .cell-name {
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.8;
    padding-top: 0.1rem;
  }
  .cell-shifei {
    padding-bottom: 0.5rem;
  }
}
</style>
