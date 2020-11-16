<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import resize from '@/components/Echarts/resize'

	const animationDuration = 6000

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
			BarData:{
				type:Object,
			} 
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			BarData: {
				deep: true,
				handler(val) {
					this.setOptions()
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initChart()
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
				this.chart = echarts.init(this.$el, 'macarons')
			},
			setOptions() {
				this.chart.setOption({
					title: {
						text: this.BarData.text + '' +this.BarData.yAxisName,
						subtext: '',
						textStyle:{
							fontSize:16,
						}
					},
					legend: {
						data: ['流入' + this.BarData.yAxisName, '流出' + this.BarData.yAxisName],
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						top: 60,
						bottom: 20,
						left:30,
						containLabel: true
					},
					xAxis: [{
						name:'IP地址',
						type: 'category',
						/*x轴显示数据*/
						data: this.BarData.xAxis,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						name: this.BarData.yAxisName == '流量' ? this.BarData.yAxisName + '(Bps)' : this.BarData.yAxisName + '(pps)',
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						},
						axisTick: {
							show: false
						}
					}],
					series: [{
						name: '流入'+ this.BarData.yAxisName,
						type: 'bar',
						stack: 'vistors',
						barWidth: this.BarData.data1.length < 4 ? '20%' : '60%',
						data: this.BarData.data1,
						animationDuration
					}, {
						name: '流出'+ this.BarData.yAxisName,
						type: 'bar',
						stack: 'vistors',
						barWidth: this.BarData.data2.length < 4 ? '20%' : '60%',
						data: this.BarData.data2,
						animationDuration
					}]
				})
			}
		}
	}
</script>
