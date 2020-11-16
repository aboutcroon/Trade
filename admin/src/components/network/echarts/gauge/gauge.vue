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
      /*柱状图*/
      GaugeData:{
        type: String,
        default: '75.33'
      },
      GaugeColor:{
        type: String,
        default: '#21BF74'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      GaugeData: {
        deep: true,
        handler(val) {
          this.setOptions()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()

        // 测试用 接入数据后移除
        this.setOptions()
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
        let value = parseFloat(this.GaugeData);
        let int = value.toFixed(2).split('.')[0];
        if(int < 1) {
          int = 1
        }
        this.chart.setOption({
          backgroundColor: '#FFF',
          title: {
            text: '{a|'+ value +'}{b|.%}',
            x: 'center',
            y: '42%',
            textStyle: {
              rich:{
                a: {
                  fontSize: 40,
                  color: '#3B4664'
                },
                b: {
                  fontSize: 14,
                  color: '#3B4664',
                  padding: [0,0,14,0]
                },
              }
            }
          },
          series: [
            {
              type: 'gauge',
              radius: '90%',
              clockwise: false,
              startAngle: '90',
              endAngle: '-269.9999',
              splitNumber: 100,
              detail: {
                offsetCenter: [0, -20],
                formatter: ' '
              },
              pointer: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: [
                    [0, this.GaugeColor],
                    [(100 - int) / 100, this.GaugeColor],
                    [1, '#F6F7FC']
                  ],
                  width: 16
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                length: 32,
                lineStyle: {
                  color: '#FFF',
                  width: 3
                }
              },
              axisLabel: {
                show: false
              }
            },
          ]
        })
      }
    }
  }
</script>
