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
			autoResize: {
				type: Boolean,
				default: true
			},
			PublicLineChart: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			PublicLineChart: {
				deep: true,
				handler(val) {
					this.setOptions(val)
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
				/*数据组名称*/
				var legendDate = [];
				/*循环并push数据、为series设置数据*/
				var seriesData = [];
				this.PublicLineChart.dataList.forEach(c => {
					/*数据组名称*/
					legendDate.push(c.name);
					/*循环并push数据、为series设置数据*/
					seriesData.push({
						name: c.name,
						type: 'line',
						smooth: true,
						data: c.data,
					})
				})
				this.chart.setOption({
					title: {
						text: this.PublicLineChart.title,
						subtext: '',
						textStyle: {
							fontSize: 16,
						}
					},
					legend: {
						data: legendDate,
						left: 'center'
					},
					grid: {
						top: 60,
						bottom: 20,
						left: 30,
						right: 60,
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					/*下载按钮*/
					/*toolbox: {
						show: true,
						feature: {
							saveAsImage: {}
						}
					},*/
					xAxis: {
						name: this.PublicLineChart.xAxis.name,
						type: 'category',
						boundaryGap: false,
						/*x轴数据*/
						data: this.PublicLineChart.xAxis.data,
						nameLocation: 'end',
						nameTextStyle: {
							width: '100px'
						}
					},
					yAxis: {
						name:this.PublicLineChart.yAxis.name,
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						},
						axisPointer: {
							snap: true
						}
					},
					series:seriesData
				})
			}
		}
	}
</script>