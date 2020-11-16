<template>
	<div :class="className" :style="{height:height,width:width}"></div>
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
			PublicBarChart: {
				type: Object,
			}
		},
		data() {
			return {
				chart: null,
			}
		},
		watch: {
			PublicBarChart: {
				deep: true,
				handler(val) {
					if(val.title != undefined && val.title != null && val.title != '') {
						this.setOptions()
					}
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
				//this.setOptions()
			},
			setOptions() {
				/*数据组名称*/
				var legendDate = [];
				/*循环并push数据、为series设置数据*/
				var seriesData = [];
				this.PublicBarChart.dataList.forEach(c => {
					/*数据组名称*/
					legendDate.push(c.name);
					/*循环并push数据、为series设置数据*/
					seriesData.push({
						name: c.name,
						type: 'bar',
						stack: this.PublicBarChart.stack,
						barWidth: '30%',
						data: c.data,
						animationDuration
					})
				})

				this.chart.setOption({
					title: {
						text: this.PublicBarChart.title,
						subtext: '',
						textStyle: {
							fontSize: 16,
						}
					},
					legend: {
						data: legendDate,
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
						left: 30,
						right: 60,
						containLabel: true
					},
					xAxis: [{
						name: this.PublicBarChart.xAxis.name,
						type: 'category',
						/*x轴显示数据*/
						data: this.PublicBarChart.xAxis.data,
						axisTick: {
							alignWithLabel: true
						},
						nameLocation: 'end',
						nameTextStyle: {
							width: '100px'
						},
						axisLabel: {interval:0,rotate:40 },
					}],
					yAxis: [{
						//min:'dataMin',
						//max:'dataMax',
						type: 'value',//log
						name: this.PublicBarChart.yAxis.name ,//this.PublicBarChart.yAxis.unit
						axisLabel: {
							formatter: '{value}'
						},
						axisTick: {
							show: false
						},
						yAxisIndex: 1,
					}],
					series: seriesData
				})
			},
		}
	}
</script>