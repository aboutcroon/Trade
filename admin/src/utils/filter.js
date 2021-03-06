import { formatDate } from '@/utils/formatDate' // 更改时间戳格式
const vFilter = {
    timeFilter: function (time) {
        if (time != '' && time != null && time != undefined) {
            time = time * 1000
            const date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
            return '-'
        }
    },
    timeFilter13: function (time) {
        if (time != '' && time != null && time != undefined) {
            const date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
            return '-'
        }
    },
    formatDateYTD:function (time) {
        if (time != '') {
            const date = new Date(time)
            return formatDate(date, 'yyyy年MM月dd日')
        }else {
            return '-'
        }
    },
}
export default vFilter