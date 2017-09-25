<template>
  <div class="modal-mask" v-show="showModal">
    <div class="caifentu-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">精灵岛拆分走势图</div>
      <div class="modal-content">
        <div class="tab-head">
          <div class="tab-head-item">基础拆分率</div>
          <div class="tab-head-item">个人利率</div>
        </div>
        <div class="tab-content">
          <div class="tab-content-item" ref="iecharts">
            <IEcharts :option="line" :loading="loading"></IEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCaifen} from '@/js/allAxiosRequire'
import IEcharts from 'vue-echarts-v3/src/full.vue';
export default {
  name: 'caifentu-modal',
  data () {
    return {
      split: {},
      showModal: true,
      loading: false,
      line: {
        // 背景色可以去掉
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#FFF'
            }
          },
          axisLabel: {
            interval: 0,
            showMinLabel: true
          },
          axisTick: {
            length: -200,
            color: '#fff'
          },
          color: '#fff',
          // 横坐标数据 (需要更改为动态)
          data: ['6-13', '6-14', '6-15', '6-16', '6-17', '6-18', '6-19'],
        },
        yAxis: {
          type: 'value',
          splitNumber: 2,
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(0,0,0,0)'
            }
          },
          // 横线长度
          axisTick: {
            // length: -400,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
        },
        series: [{
          type: 'line',
          // 基础拆分率折线数据(需要更改为动态)
          data: [1.82, 1.71, 1.79, 1.84, 1.78, 1.77, 1.76],
          label: {
            normal: {
              show: true,
              // 橙色的折线
              color: '#EE9E19'
            }
          },
          itemStyle: {
            normal: {
              color: '#EE9E19'
            }
          }
        },
        {
          type: 'line',
          // 个人利率折线数据(需要更改为动态)
          data: [2.23, 1.92, 2.20, 2.25, 2.15, 2.13, 2.10],
          label: {
            normal: {
              show: true,
              // 黄色的折线
              color: '#C8D20A'
            }
          },
          itemStyle: {
            normal: {
              color: '#C8D20A'
            }
          }
        }]
      }
    }
  },
  watch: {
    split (value) {
      // if(value.system_split )
    }
  },
  mounted () {
    this.setWrapWH()
    this.bindModalEvent()
  },
  components: {
   IEcharts
  },
  methods: {
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      this.showModal = false
      Bus.$on('openCaifenModal', function(){
        getCaifen()
        .then(function (response) {
          let data = response.data
          this.split = data
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
    },
    setWrapWH () {
      let chart = this.$refs.iecharts
      chart.style.width = $(chart).width() + 'px'
      chart.style.height = $(chart).height() + 'px'
    },
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
.caifentu-modal {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
  .modal-head {
    height: 3rem;
    .flex-both-center()
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 2rem;
    padding-bottom: 1.5rem;
    overflow: hidden;
    .tab-head {
      font-size: 0.8rem;
      height: 2.4rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .tab-head-item {
        height: 1.6rem;
        .flex-both-center();
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 1.5rem;
        width: 6rem;
      }
    }
    .tab-content {
      flex: 1;
      overflow: hidden;
      .tab-content-item {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
