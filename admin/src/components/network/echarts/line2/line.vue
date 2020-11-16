<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from '@/components/Echarts/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      LineName: {
        type: Array,
        default: ['内存使用率','内存使用率']
      },
      // 目前共用一个x轴
      xAxis: {
        type: Array,
        default: () => {
          return ['10:06', '02:11', '19:20', '05:14', '19:00', '05:24', '18:12']
        }
      },
      lineColor: {
        type: Array,
        default: ['rgba(191,73,90,1)','rgba(191,73,90,1)']
      },
      /*柱状图*/
      LineData:{
        type: Array,
        default: () => {
          return [[820, 932, 901, 934, 1290, 1330, 1320],[820, 932, 901, 934, 1290, 1330, 1320]]
        }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      LineData: {
        deep: true,
        handler(val) {
          this.setOptions()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()

//        // 测试用 接入数据后移除
//        this.setOptions()
      })
    },
    beforeDestroy() {
      if(!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el)
      },
      setOptions() {
        if(!this.chart) {
          return false
        }
        this.chart.setOption({
          grid: [{
            left: 80,
            right: 40,
            top: '5%',
            height: '35%'
          }, {
            left: 80,
            right: 40,
            top: '52%',
            height: '35%'
          }],
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function (params) {
             let res = `<div style="width:213px;background: #394052;height:35px;line-height: 35px;border-radius: 8px 8px 0 0">${params[0].axisValue}</div>
                <div style="height: 76px;padding:15px ;position: relative"><div>${params[0].seriesName}</div><div>${params[0].data}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: 4px;top: 24px;background-color:${params[0].color};border-radius: 5px;"></div>
                </div>`
              return res;
            },
            axisPointer: {
              type: 'none'
            },
            backgroundColor: '#2E3548',
            padding: [0, 10],
            borderRadius: 8,
            color: '#f7fafb',
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#485465",
                fontSize: 14,
              },
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: this.xAxis
            },
            {
              gridIndex: 1,
              type: 'category',
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#485465"
              },
              axisTick: {
                show: false
              },
              boundaryGap: false,
              show: false,
              data: this.xAxis
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber: 2,
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#485465",
                margin: 8,
                fontSize: 14
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#F5F7F8']
                }
              }
            },
            {
              gridIndex: 1,
              splitNumber: 2,
              type: 'value',
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#485465",
                margin: 8,
                fontSize: 14
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#F5F7F8']
                }
              },
              inverse: true
            }
          ],
          series: [
            {
              name: this.LineName[0],
              data: this.LineData[0],
              type: 'line',
              symbol: 'none',
              lineStyle: {
                color: this.lineColor[0]
              },
            },
            {
              name: this.LineName[1],
              data: this.LineData[1],
              type: 'line',
              symbol: 'none',
              lineStyle: {
                color: this.lineColor[1]
              },
              xAxisIndex: 1,
              yAxisIndex: 1,
            }
          ],
        })
      }
    }
  }
</script>
