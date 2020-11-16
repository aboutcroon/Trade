<template>
  <div :class="chartOption.className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons");
import resize from "@/components/Echarts/resize";
export default {
  mixins: [resize],
  props: {
    height:{
      type: String,
      default: '400px',
    },
    width:{
      type: String,
      default: '100%',
    },
    chartOption: {
      required: true,
      type: Object,
      default: () => {},
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    lineData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    });
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, ""); //默认不加载主题
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: this.chartOption.title,
          top: 12,
          left: 20,
        },
        color: [...this.chartOption.color],
        tooltip: this.chartOption.tooltip == undefined ? {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        } : this.chartOption.tooltip,
        legend: {
          show: this.chartOption.legend.show,
          data: this.chartOption.legend.data,
          top: this.chartOption.legend.top != undefined ? this.chartOption.legend.top : 50,
          left: this.chartOption.legend.left != undefined ? this.chartOption.legend.left : 'center',
          right: this.chartOption.legend.right != undefined ? this.chartOption.legend.right : '',
          bottom: this.chartOption.legend.bottom != undefined ? this.chartOption.legend.bottom : '',
          type: this.chartOption.legend.type != undefined ? this.chartOption.legend.type : "scroll",
          itemWidth: 3,
          itemGap: 40,
        },
        grid: this.chartOption.grid ? this.chartOption.grid : {
          left: '5%',
          right: '8%',
          top: '20%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: this.chartOption.xAxis,
        yAxis: this.chartOption.yAxis,
        series: this.chartOption.series,
      })
    },
  },
};
</script>

<style>
</style>
