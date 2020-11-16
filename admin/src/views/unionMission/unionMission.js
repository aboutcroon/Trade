import {
  getList,
  postFun,
  getFun
} from '@/api/common' /* 表格列表、post请求、get请求 */
import {
  alertMsg
} from '@/utils/alert' /* 消息提示*/
// import {
//   statusList,
//   typeList
// } from '@/utils/selectData' /* select数据*/
import Bus from '@/utils/refreshBus'
import Pagination from '@/components/Pagination' // 分页
import vFilter from '@/utils/filter'
import collapseTransition from '@/components/collapse'// 筛选
import InputNmb from '@/components/InputNumber' // 定时刷新
export default {
  name: 'systemMenu', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    collapseTransition,
    InputNmb
  },
  filters: {
    /* 等级*/
    severity(status) {
      let statusMap = null
      if(status === '2' || status === 2){
        statusMap = 'success'
      } else if( status === 1 || status === '1' ) {
        statusMap = 'warning'
      } else if( status === 3 || status === '3' ) {
        statusMap = 'danger'
      }
      return statusMap
    }
    /* 类型*/
    // typeListFun(value) {
    //   var type = ''
    //   this.typeList.forEach(c => {
    //     if (value == c.value) {
    //       type = c.label
    //     }
    //   })
    //   return type
    // }
  },
  data() {
    return {
      list: [],
      formData: {
        paras: {
          status: '', // 任务状态 1-正在执行 2-成功 3-失败
          type: '', // 任务类型 1-创建链 2-创建监管节点 3-创建计算节点
          name: '' // 任务名称
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1
      },
      /* 状态*/
      stateList: [],
      /* 类型*/
      typeList: [],
      listLoading: false,
      drawer: false,
      row: {},
      idList: [],
      showFilter: false,
      detailList: [],
      /** 筛选数组 */
      collapseData: []
    }
  },
  /* 进入页面就调用*/
  mounted () {
    this.resetPage()
  },
  // 在实例被创建之后被调用
  created() {
    /** 表格 */
    // this.getList();
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.initData()
  },
  methods: {
    showStatusLoading (value) {
      if(value === 1 || value === '1'){
          return true
        } else {
          return false
        }
    },
    /* 初始化数据 */
    initData () {
      /** 传-1 后台计算总条数 */
      this.formData.totalRow = -1
      /** 分页默认从第一页开始 */
      this.formData.pageNumber = 1
      this.dictDataFun()
      this.getList()
    },
    /* 接收通知后刷新当前页面数据 */
    resetPage () {
      Bus.$on('reset-unionMission', (data) => {
        this.initData()
      })
    },
    dictDataFun() {
      this.collapseData = []
      /** 部署任务状态 */
      this.dictFun({ key: '部署任务状态' }).then(res => {
        if (res.code == '200') {
          this.stateList = res.data
          this.collapseData.push({
            resData: { status: res.data },
            typeTitle: '任务状态'
          })
        }
      })
      /** 部署任务状态 */
      this.dictFun({ key: '部署任务类型' }).then(res => {
        if (res.code == '200') {
          console.log('this.typeList')
          console.log(this.typeList)
          this.typeList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '任务类型'
          })
        }
      })
      console.log(this.collapseData)
    },
    /** 表格 */
    getList() {
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      getList('/baas-admin/api/v2/deploy/task/list', {
        paras: this.util.nullValueFun(this.formData.paras),
        pageNumber: this.formData.pageNumber,
        pageSize: this.formData.pageSize,
        totalRow: this.formData.totalRow
      }).then(response => {
        if (response.code == 200) {
          this.list = response.data.list
          this.formData.totalRow = response.data.totalRow
          this.listLoading = false
        }
      })
    },
    handleClose() {
      this.drawer = false
    },
    /** 详情 */
    detailFun(row) {
      this.drawer = true
      this.buildDetailData(row)
      this.getDetailData(row.id)
    },
    /** 获取详情数据 **/
    getDetailData(id) {
      postFun('/baas-admin/api/v2/deploy/task/detail/list', {
        id: id
      }).then(response => {
        if (response.code === '200') {
          this.detailList = response.data
        }
      })
    },
    /** 详情弹窗表格数据 */
    buildDetailData(row) {
      var data = []
      data.push({
        name: '用户名',
        value: row.username
      })
      data.push({
        name: '任务id',
        value: row.id
      })
      data.push({
        name: '任务名称',
        value: row.name
      })
      data.push({
        name: '任务状态',
        value: row.status
      })
      data.push({
        name: '任务类型',
        value: this.typeListFun(row.type, 'type')
      })
      data.push({
        name: '开始时间',
        value: vFilter.timeFilter(row.startTime)
      })
      data.push({
        name: '结束时间',
        value: vFilter.timeFilter(row.endTime)
      })
      data.push({
        name: '错误信息',
        value: row.msg == null && row.msg == '' && row.msg == undifend ? '暂无' : row.msg
      })
      this.row = data
    },
    typeListFun(val, type) {
      var label = ''
      if (type == 'type') {
        this.typeList.forEach(c => {
          if (val == c.key) {
            label = c.value
          }
        })
      } else {
        this.stateList.forEach(c => {
          if (val == c.key) {
            label = c.value
          }
        })
      }
      return label
    },
    /* 删除*/
    deleteFun(idList) {
      /* 询问框*/
      this.$confirm('是否删除此任务', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        console.log(idList)
        /* 删除*/
        postFun('/baas-admin/api/v2/deploy/delete/task', {
          'idList': idList
        }).then(response => {
          if (response.code == 200) {
            alertMsg('success', response.message)
            /** 传-1 后台计算总条数 */
            this.formData.totalRow = -1
            /* 刷新列表*/
            this.getList()
          }
        })
      }).catch(action => {
        return false
      })
    },
    /** 单行删除 */
    del(id) {
      var idList = [id]
      this.deleteFun(idList)
    },
    /** 多选 */
    handleSelectionChange(row) {
      this.idList = []
      row.forEach(c => {
        this.idList.push(c.id)
      })
    },
    /** 批量删除 */
    dels() {
      if (this.idList.length == 0) {
        alertMsg('error', '请选择删除的内容')
      } else {
        this.deleteFun(this.idList)
      }
    },
    /** 指定单元格样式：错误类型顶部对齐 **/
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 7) {
        return `vertical-align:top;padding-top:12px`
      } else if (columnIndex === 1 && rowIndex === 7) {
        return `padding-top:12px`
      } else {
        return ''
      }
    },
    /** 指定单元格样式：任务详情列表顶部对齐 **/
    detailCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return `vertical-align:top;padding-top:12px`
      } else if (columnIndex === 1) {
        return `padding-top:12px`
      } else if (columnIndex === 2) {
        return `vertical-align:top;padding-top:12px`
      }
    },
    /**筛选调用的方法 */
    collapseFun(type, value) {
      this.formData.paras[type] = value
      this.formData.totalRow = -1
      this.formData.pageNumber = 1
      this.getList()
    }
  }
}
