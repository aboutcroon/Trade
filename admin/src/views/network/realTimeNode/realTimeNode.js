/**
 * Created by butiantong on 2020/8/10.
 */
import { postFun } from '@/api/common'
import netTotal from '@/components/network/total/Total' // 数据总计组件
import netTitle from '@/components/network/title/Title' // 数据总计组件
import dataCard from '@/components/network/dataCard/DataCard' // 数据卡片组件
import netLegend from '@/components/network/legend/Legend' // 图例组件

import trendChart from '@/components/network/echarts/line1/line' // 折线图组件1
import flowChart from '@/components/network/echarts/line2/line' // 折线图组件2
import gaugeChart from '@/components/network/echarts/gauge/gauge' // 仪表盘组件
import vFilter from '../../../utils/filter'
export default {
  components: {
    netTotal,
    dataCard,
    netLegend,
    trendChart,
    gaugeChart,
    flowChart,
    netTitle
  },
  data() {
    return {
      value1: false,
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      tableData: [{
        name: '总CPU数量',
        value: 0,
        after: '个'
      }, {
        name: '总内存大小',
        value: 0,
        after: 'GB'
      }, {
        name: '数据分区使用率',
        value: 0,
        after: '%'
      }, {
        name: '日志分区使用率',
        value: 0,
        after: '%'
      }, {
        name: '共识节点数量',
        value: 0,
        after: '个'
      }, {
        name: '成员节点数量',
        value: 0,
        after: '个'
      }, {
        name: '本机时间',
        value: 0,
        after: ''
      }, {
        name: '向agent请求的时间',
        value: 0,
        after: ''
      }],
      totalColorList: ['#FAAD14', '#BF495A', '#21BF74', '#7E7CA3'],
      hostIp: '',
      chainName: '测试部署链1',
      warnMessage: '超出正常值',
      usedMemory: '0GB',
      freeMemory: '0GB',
      totalMemory: '0GB',
      memoryScale: '0.00',
      needMoreMemory: false,
      memoryGaugeColor: '#21BF74',
      gaugeHeight: '200px',
      showCpuMessage: false,
      cpuGaugeColor: '#21BF74',
      autoPlay: true,
      nowCPU: '0%',
      averageCPU: '0%',
      maxCPU: '0%',
      startTime: '',
      endTime: '',
      boyachainNetwork: '链节点网卡名称：',
      lineColor2: ['rgba(73,90,191,1)', 'rgba(191,73,90,1)'],
      LineName2: ['上行速度', '下行速度'],
      chartDataList: {
        localTimeList: [],
        memoryDataList: [],
        cpuDataList: [],
        compDataList: [],
        peerDataList: [],
        rxRateList: [],
        txRateList: [],
        rootPartitionList: [],
        dataPartitionList: [],
        logPartitionList: []
      },
      timer: '',
      rxUnit: '字节',
      txUnit: '字节',
      formData: {
        paras: {
          status: '', // 任务状态 1-正在执行 2-成功 3-失败
          type: '', // 任务类型 1-创建链 2-创建监管节点 3-创建计算节点
          name: '' // 任务名称
        }
      },
      // 处理后的数据
      tableRealTimeData: {
        totalCpu: {
          name: '总CPU数量',
          value: null,
          after: '个'
        },
        totalMemory: {
          name: '总内存大小',
          value: null,
          after: 'GB'
        },
        dataPartition: {
          name: '数据分区使用率',
          value: null,
          after: '%'
        },
        logPartition: {
          name: '日志分区使用率',
          value: null,
          after: '%'
        },
        peerListSize: {
          name: '共识节点数量',
          value: null,
          after: '个'
        },
        compListSize: {
          name: '成员节点数量',
          value: null,
          after: '个'
        },
        localTime: {
          name: '本机时间',
          value: null,
          after: ''
        },
        checkTime: {
          name: '向 agent 请求的时间',
          value: null,
          after: ''
        }
      }
    }
  },
  computed: {
    // 时间禁选区间
    sTime: {
      get() {
        if (this.startTime === '') {
          return new Date(0)
        } else {
          return this.startTime
        }
      }
    },
    eTime: {
      get() {
        if (this.endTime === '') {
          return Date.now()
        } else {
          return this.endTime
        }
      }
    },
    endPickerOptions() {
      const that = this
      return {
        disabledDate(time) {
          // 结束时间的计算需要提前一天，可以选择限制时间当天
          if (that.startTime) {
            return time && (time.valueOf() < Date.now() - 24 * 60 * 60 * 1000 * 7 || time.valueOf() > Date.now() || time.valueOf() < that.startTime.getTime() - 24 * 60 * 60 * 1000)
          }
          return time && (time.valueOf() < Date.now() - 24 * 60 * 60 * 1000 * 7 || time.valueOf() > Date.now())
        }
      }
    }, startPickerOptions() {
      const that = this
      return {
        disabledDate(time) {
          if (that.endTime) {
            return time && (time.valueOf() < Date.now() - 24 * 60 * 60 * 1000 * 7 || time.valueOf() > Date.now() || time.valueOf() > that.endTime.getTime())
          }
          return time && (time.valueOf() < Date.now() - 24 * 60 * 60 * 1000 * 7 || time.valueOf() > Date.now())
        }
      }
    }
  },
  mounted() {
  },
  activated() {
    this.initTime()
    this.downloadData()
    this.timer = setInterval(this.downloadDataRealTime, 10000)
  },
  deactivated() {
    clearInterval(this.timer)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    initTime() {
      this.startTime = new Date()
      this.endTime = new Date()
      this.startTime.setTime(this.endTime.getTime() - 3600 * 1000 * 6 - 1000)
    },
    downloadData() {
      this.getHostData()
      this.getNodeList()
      this.getCpuData()
      this.getMemoryData()
      this.getHistoryData()
    },
    downloadDataRealTime() {
      // 因为切换和关闭标签页时不会触发destroy生命周期，通过检查状态关闭计时
      if (!this.value1) {
        this.getNodeList()
        this.getCpuData()
        this.getMemoryData()
      }
    },
    // 判断路由是否传参
    getHostData() {
      if (this.$route.query.hostIp) {
        this.hostIp = this.$route.query.hostIp
        if (this.$route.query.hostLabel) {
          this.chainName = this.$route.query.hostIp + ' - ' + this.$route.query.hostLabel
        } else {
          this.chainName = this.$route.query.hostIp
        }
      }
    },
    getNodeList() {
      postFun('/baas-admin/api/monitor/host/real', {
        hostIp: this.hostIp
      }).then((request) => {
        if (request.code === '200' || request.code === 200) {
          this.filterTableData(request.data)
        }
      }).catch((e) => { })
    },
    // 处理数据
    filterTableData(data) {
      const object = data
      const array = []
      const tableData1 = this.tableRealTimeData
      for (const key in object) {
        if (key === 'peerList' || key === 'compList') {
          // 占位，处理列表数据
        } else if (key === 'localTime' || key === 'checkTime') {
          tableData1[key].value = vFilter.timeFilter(object[key])
        } else if (key === 'totalMemory') {
          tableData1[key].value = (data.totalMemory / 1024).toFixed(2) + ''
        } else {
          if (tableData1[key]) {
            tableData1[key].value = this.getData(object[key]) + ''
          }
        }
      }
      array.push(tableData1['totalCpu'])
      array.push(tableData1['totalMemory'])
      array.push(tableData1['compListSize'])
      array.push(tableData1['peerListSize'])
      this.tableData = array
      this.totalMemory = (data.totalMemory / 1024).toFixed(2) + 'GB'
      this.nowCPU = data.cpuUsage + '%'
      this.showCpuMessage = (data.cpuUsage >= 90)
      if (this.showCpuMessage) {
        this.cpuGaugeColor = '#BF495A'
      } else {
        this.cpuGaugeColor = '#21BF74'
      }
      this.boyachainNetwork = '链节点网卡名称：' + data.boyachainNetwork
    },
    getCpuData() {
      postFun('/baas-admin/api/monitor/host/cpu', {
        hostIp: this.hostIp
      }).then((request) => {
        if (request.code === '200' || request.code === 200) {
          this.filterCpuData(request.data)
        }
      }).catch((e) => { })
    },
    filterCpuData(data) {
      this.averageCPU = this.getData(data.cpuaverageusage) + '%'
      this.maxCPU = this.getData(data.cpumaxusage) + '%'
    },
    getMemoryData() {
      postFun('/baas-admin/api/monitor/host/memory', {
        hostIp: this.hostIp
      }).then((request) => {
        if (request.code === '200' || request.code === 200) {
          this.filterMemoryData(request.data)
        }
      }).catch((e) => { })
    },
    filterMemoryData(data) {
      this.usedMemory = this.getData(data.usedmemory) + 'GB'
      this.freeMemory = this.getData(data.surplusmemory) + 'GB'
      if (data.usedmemory) {
        this.memoryScale = (data.usedmemory / (data.usedmemory + data.surplusmemory) * 100).toFixed(0) + ''
      } else {
        this.memoryScale = '0'
      }
      this.needMoreMemory = this.getData(data.surplusmemory) < 4
      if (this.needMoreMemory) {
        this.memoryGaugeColor = '#BF495A'
      } else {
        this.memoryGaugeColor = '#21BF74'
      }
      // if (this.needMoreMemory) {
      //   this.gaugeHeight = '200px'
      // } else {
      //   this.gaugeHeight = '300px'
      // }
    },
    getHistoryData() {
      if (!(this.endTime && this.startTime)) {
        // 当有一方值为空时
        this.initTime()
      }
      if (this.endTime.getTime() < this.startTime.getTime()) {
        // 处理开始时间设置大于结束时间的情况
        this.endTime.setTime(this.startTime.getTime() + 60 * 5 * 1000)
      }
      postFun('/baas-admin/api/monitor/host/history', {
        hostIp: this.hostIp,
        startTime: Math.floor(this.startTime.getTime() / 1000),
        endTime: Math.floor(this.endTime.getTime() / 1000)
      }).then((request) => {
        if (request.code === '200' || request.code === 200) {
          this.filterHistoryData(request.data)
        }
      }).catch((e) => { })
    },
    filterHistoryData(data) {
      const dataList = this.getClearHistoryList()
      if (data.length === 0) {
        dataList.localTimeList.push(this.time.timestampToTime(this.startTime.getTime(), 'DT3'))
        dataList.memoryDataList.push(0)
        dataList.cpuDataList.push(0)
        dataList.compDataList.push(0)
        dataList.peerDataList.push(0)
        dataList.rxRateList.push(0)
        dataList.txRateList.push(0)
        dataList.dataPartitionList.push(0)
        dataList.logPartitionList.push(0)
        dataList.rootPartitionList.push(0)
        dataList.localTimeList.push(this.time.timestampToTime(this.endTime.getTime(), 'DT3'))
        dataList.memoryDataList.push(0)
        dataList.cpuDataList.push(0)
        dataList.compDataList.push(0)
        dataList.peerDataList.push(0)
        dataList.rxRateList.push(0)
        dataList.txRateList.push(0)
        dataList.dataPartitionList.push(0)
        dataList.logPartitionList.push(0)
        dataList.rootPartitionList.push(0)
      } else {
        if (data.length === 1) {
          dataList.localTimeList.push(this.time.timestampToTime(this.startTime.getTime(), 'DT3'))
          dataList.memoryDataList.push(0)
          dataList.cpuDataList.push(0)
          dataList.compDataList.push(0)
          dataList.peerDataList.push(0)
          dataList.rxRateList.push(0)
          dataList.txRateList.push(0)
          dataList.dataPartitionList.push(0)
          dataList.logPartitionList.push(0)
          dataList.rootPartitionList.push(0)
        }
        for (const item of data) {
          const localTime = this.time.timestampToTime(item.localTime * 1000, 'DT3')
          dataList.localTimeList.push(localTime)
          dataList.memoryDataList.push(this.getData(item.memoryUsage).toFixed(2))
          dataList.cpuDataList.push(this.getData(item.cpuUsage).toFixed(2))
          dataList.compDataList.push(this.getData(item.compListSize))
          dataList.peerDataList.push(this.getData(item.peerListSize))
          dataList.rxRateList.push(this.getData(item.rx))
          dataList.txRateList.push(this.getData(item.tx))
          dataList.dataPartitionList.push(this.getData(item.dataPartition).toFixed(2))
          dataList.logPartitionList.push(this.getData(item.logPartition).toFixed(2))
          dataList.rootPartitionList.push(this.getData(item.rootPartition).toFixed(2))
        }
      }
      this.rxUnit = this.checkRxTxData(dataList.rxRateList)
      this.txUnit = this.checkRxTxData(dataList.txRateList)
      this.chartDataList = dataList
    },
    getClearHistoryList() {
      return {
        localTimeList: [],
        memoryDataList: [],
        cpuDataList: [],
        compDataList: [],
        peerDataList: [],
        rxRateList: [],
        txRateList: [],
        rootPartitionList: [],
        dataPartitionList: [],
        logPartitionList: []
      }
    },
    // 调整流量单位
    checkRxTxData(dataList) {
      const max = Math.max(...dataList)
      if (max > 1000000000) {
        for (let i = 0; i < dataList.length; ++i) {
          dataList[i] = (dataList[i] / 1000000000).toFixed(2)
        }
        return 'GB'
      } else if (max > 1000000) {
        for (let i = 0; i < dataList.length; ++i) {
          dataList[i] = (dataList[i] / 1000000).toFixed(2)
        }
        return 'MB'
      } else if (max > 1000) {
        for (let i = 0; i < dataList.length; ++i) {
          dataList[i] = (dataList[i] / 1000).toFixed(2)
        }
        return 'KB'
      }
      return '字节'
    },
    // 时间变化回调
    handleTime(time) {
      if (time) {
        this.getHistoryData()
      }
    },
    // 数据为null时显示为0
    getData(data) {
      if (data) return data
      else return 0
    }
  }
}
