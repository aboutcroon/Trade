/*开始时间*/
export function startTime() {
	var date = new Date();
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var time = Y + M + D + '00:00:00'
	return time
}
/*结束时间*/
export function endTime() {
	var date = new Date();
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var time = Y + M + D + '23:59:59'
	return time
}