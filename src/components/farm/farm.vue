<template>
	<div class="farm" ref="farm">
    <cell v-for="(item, index) in lands" :cell="item"></cell>
	</div>
</template>
<script>
import Cell from '@/components/farm/cell'
export default {
  name: 'farm',
  props: {
    'lands': {
      type: Array,
      default () {
        let emptyLandsArray = []
        for (var i = 0; i < 15; i++) {
          emptyLandsArray.push(new Object())
        }
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.setCellPosition1()
  },
  updated () {
    this.setCellPosition1()
  },
  methods: {
    setCellPosition1 () {
      let cells = $(this.$refs.farm).children('.farm-cell')
      // initX：初始第一块绿地的绝对定位的X数值（%）
      // initY：初始第一块绿地的绝对定位的Y数值（%）
      // offsetX：同一层不同颜色的土地的绝对定位的X数值的偏移量（%）
      // offsetY：同一层不同颜色的土地的绝对定位的Y数值的偏移量（%）
      // offsetx：每一块相同颜色的土地相对上一块相对颜色的土地的都绝对定位的X数值的偏移量（%）
      // offsety：每一块相同颜色的土地相对上一块相对颜色的土地的都绝对定位的X数值的偏移量（%）
      let [initX, initY, offsetX, offsetY, offsetx, offsety] = [27, 0, -13, 18, (51/4), (40/4)]
      let color = ['farm-cell-green', 'farm-cell-red', 'farm-cell-yellow']
      for (let [i, c] = [0, 0]; i < cells.length; i+=5, c++) {
        let [firstCellX, firstCellY] = [(initX + (i / 5) * offsetX), (initY + (i / 5) * offsetY)]
        for (let j = 0; j < 5; j++) {
          let [cellX, cellY, cellOrder] = [(firstCellX + offsetx * j), (firstCellY + offsety * j), (i + j)]
          cells[cellOrder].style.left = cellX + '%'
          cells[cellOrder].style.top = cellY + '%'
          $(cells[cellOrder]).addClass(color[c])
        }
      }
    }
  },
  components: {
    Cell
  }
}
</script>
<style scoped lang="less" type="text/less">
.farm {
	position: absolute;
	z-index: 2;
	left: 23.6%;
	right: 14.2%;
	top: 47%;
	bottom: 13.2%;
}
</style>