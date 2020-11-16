import scard from './components/sroxckCard.vue'
import universalChart from './components/universalChart.vue'
import { number } from 'echarts/src/export';
export default {
  components: {
    scard,
    universalChart
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      charts1:'初筛',
      diseaseChart: {
        title: '作品数量统计',
        className: 'chart',
        color: ['#FAAD14', '#00B3B3', '#B3B3B3', '#44D7B6', '#32C5FF', '#8794AE'],
        legend: {
          show: true,
          data: ['未筛选', '已通过', '未通过'],
          type: 'scroll',
          textStyle: {
            color: '#8C8C8C'
          },
          itemWidth: 0,
          itemGap: 40,
          top: 65,
          left: 20,
          right: 50,
        },

        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: ['10-23', '10-24', '10-25', '11-06', ] ,
          boundaryGap: [0, 0.01],

        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: this.chartFormat },
          axisLine: { show: false },

          data: ['陕西中医药大学附属医院', '河北省中医院', '辽宁中医药大学附属医院', '中国中医科学院']
        },
        grid: {
          top: '28%',
          left: '5%',
          right: '5%',
          bottom: '5%',
        },
        series: [
          {
            name: '未筛选',
            type: 'bar',
            data: [12, 14, 16, 18],
            barWidth: '3%'
          },
          {
            name: '已通过',
            type: 'bar',
            data: [14, 15, 19, 21],
            barWidth: '3%'
          },
          {
            name: '未通过',
            type: 'bar',
            data: [22, 24, 25, 33],
            barWidth: '3%'
          }
        ]
      },
    }
  },
  created() {
  },
  methods: {

  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    let a  = [3,3,3,3]
    a.filter
  },
  methods: {

  }
}
