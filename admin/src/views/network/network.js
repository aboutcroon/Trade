import { getList, postFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import Bus from '@/utils/refreshBus'  /* 接收通知，刷新页面 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import collapseTransition from '@/components/collapse'// 筛选
import InputNmb from '@/components/InputNumber' // 定时刷新
import util from '@/api/util.js'
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
      var statusMap = status == '0' ? 'info' : 'success'
      return statusMap
    }
  },
  data() {
    const validhostIp = (rule, value, callback) => {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!reg.test(value)) {
        callback(new Error('请正确输入IP地址'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      formData: {
        paras: {
          chainId: '',
          hostStates: '', // 机器状态: 0 禁用, 1 启用
          hostIp: '', // 机器 IP
          hostLabels: '', // 标签
          username: '', // 用户名
          createTime: '', // ssh 密码
          nodeType: ''
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1
      },
      /* 状态*/
      stateList: stateList(),
      /** 接口隐藏显示 */
      dialogVisible: false,
      drawerType: 'new',
      /** 接口数据 */
      role: {
        hostIp: '',
        hostLabels: '',
        sshUser: '',
        sshPassword: '',
        hostStates: 1
      },
      drawer: false,
      /** 验证 */
      rules: {
        hostIp: [
          { required: true, message: '请输入IP地址', trigger: 'blur' },
          { validator: validhostIp, trigger: 'blur' }
        ],
        hostLabels: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        sshUser: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        sshPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        hostStates: [
          { required: true, message: '请选择机器状态', trigger: 'change' }
        ]
      },
      menuList: [],
      hostIpList: [], /** 多选ip */
      command: '', // 筛选
      showFilter: false,
      loading: false,
      collapseData: [{
        resData: { hostStates: stateList() },
        typeTitle: '任务状态'
      }]
    }
  },
  /* 进入页面就调用*/
  mounted () {
    // 接收刷新页面通知
    this.resetPage()
  },
  // 在实例被创建之后被调用
  created() {
    /** 表格 */
    this.initData()
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.initData()
  },
  methods: {
    // 加载数据
    initData () {
      /** 传-1 后台计算总条数 */
      this.formData.totalRow = -1
      /** 分页默认从第一页开始 */
      this.formData.pageNumber = 1
      this.getList()
    },
    /** 表格 */
    getList() {
      var info = this.formData
      // console.log(this.command, '12312')
      getList('/baas-admin/api/network/list', {
        paras: util.nullValueFun({
          hostStates: this.formData.paras.hostStates, // 机器状态: 0 禁用, 1 启用
          hostIp: this.formData.paras.hostIp, // 机器 IP
          hostLabels: this.formData.paras.hostLabels, // 标签
          username: this.formData.paras.username, // ssh 用户名
          createTime: this.formData.paras.createTime != '' ? this.formData.paras.createTime / 1000 : this.formData.paras.createTime // 创建日期
        }),
        pageNumber: this.formData.pageNumber,
        pageSize: this.formData.pageSize,
        totalRow: this.formData.totalRow
      }).then(response => {
        if (response.code == 200) {
          this.list = response.data.list
          this.formData.totalRow = response.data.totalRow
        }
      })
    },
    /** 菜单名称 */
    menuListFun() {
      getList('/baas-admin/api/menu/listjson', { 'menuId': 0 }).then(response => {
        if (response.code == 200) {
          this.menuList = response.data
        }
      })
    },
    /** 添加显示 */
    // addShow(row) {
    //   this.drawer = true
    //   this.row = row
    //   this.drawerType = 'new'
    //   /** 菜单名称 */
    //   // this.menuListFun();
    // },
    /** 详情 */
    editFun(row) {
      this.drawer = true
      this.drawerType = 'edit'
      this.role.hostIp = row.hostIp
      this.role.hostLabels = row.hostLabels
      this.role.sshUser = row.sshUser
      this.role.sshPassword = row.sshPassword
      this.role.hostStates = row.hostStates
    },
    /** 添加接口 */
    addFun(role) {
      this.$refs[role].validate((role) => {
        if (role) {
          this.loading = true
          postFun('/baas-admin/api/network/add', this.role).then(response => {
            // if (response.code == 200) {
            if (response.code === 200 || response.code === '200') {
              alertMsg('success', response.message)
              this.handleClose()
              this.loading = false
              /** 传-1 后台计算总条数 */
              this.formData.totalRow = -1
              this.getList()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /** 编辑接口 */
    modifyFun() {
      this.loading = true
      postFun('/baas-admin/api/network/modify', this.role).then(response => {
        if (response.code == 200) {
          alertMsg('success', response.message)
          this.handleClose()
          this.loading = false
          /** 传-1 后台计算总条数 */
          this.formData.totalRow = -1
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    /* 删除*/
    deleteFun(hostIp) {
      /* 询问框*/
      this.$confirm('是否删除此网络', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        /* 删除*/
        postFun('/baas-admin/api/network/delete', {
          'hostIpList': hostIp
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
    del(hostIp) {
      var hostList = [hostIp]
      this.deleteFun(hostList)
    },
    /** 多选 */
    handleSelectionChange(row) {
      this.hostIpList = []
      row.forEach(c => {
        this.hostIpList.push(c.hostIp)
      })
    },
    /** 批量删除 */
    dels() {
      if (this.hostIpList.length == 0) {
        alertMsg('error', '请选择删除的内容')
      } else {
        this.deleteFun(this.hostIpList)
      }
    },
    /** 关联菜单点击 */
    handleCheckChange() {
      this.role.menuIdList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      return this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    },
    // 筛选
    changeCommand(e, command) {
      if (command.command == 0) {
        this.formData.paras.hostStates = ''
        this.getList()
        // console.log(this.formData.paras.hostStates)
      } else {
        this.formData.paras.hostStates = e.value
        this.getList()
        // console.log(this.formData.paras.hostStates)
      }
    },
    // changeCommand(command) {
    //   this.$message('click on item ' + command)
    // },
    /** 关闭弹框 */
    handleClose() {
      this.dialogVisible = false
      /** 恢复初始化数据 */
      this.drawer = false
      this.role = this.$options.data().role
      this.$nextTick(() => {
        this.$refs['role'].clearValidate()
      })
    },
    changeState(value) {
      console.log('改变之后的值是:' + value)
    },
    collapseFun(type, value) {
      this.formData.paras[type] = value
      this.formData.totalRow = -1
      this.formData.pageNumber = 1
      this.getList()
    },
    // 跳转至「主机历史状态信息」
    // netWorkHostItem(ip, startTime, endTime) {
    //   this.$router.push({ path: 'shujulishi', query: { 'hostIp': ip, 'startTime': startTime, 'endTime': endTime }})
    // },
    // 跳转至「主机及节点实时状态信息」
    realTimeNode(ip, hostLabel) {
      this.$router.push({ path: 'shujujiankong', query: { 'hostIp': ip, 'hostLabel': hostLabel }})
    },
    getCurrentTime() {
      var tmp = Date.parse(new Date()).toString()
      tmp = Number(tmp.substr(0, 10))
      return tmp
    },
    // 接收到通知后刷新网络管理页面
    resetPage () {
      Bus.$on('reset-network', (data) => {
        this.initData()
      })
    }
  }
}
