import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList, menuFlag, hiddenList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import childMenu from '@/components/menu' // 导航
import Sortable from 'sortablejs'
import dragTreeTable from 'drag-tree-table'
export default {
  name: 'adminUser', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    childMenu,
    dragTreeTable
  },
  filters: {
    /* 等级*/
    severity(status) {
      var statusMap = status == '0' ? 'danger' : 'success'
      return statusMap
    }
  },
  data() {
    return {
      list:[],
      formData: {
        paras: {
          roleTypeList: [1],
          userName: ''
        },
        pageSize: 10,
        pageNumber: 1,
        totalRow: -1
      },
      /* 状态*/
      stateList: stateList(),
      listLoading: false,
      /** 选中的值 */
      selecData: '',
      /** 菜单隐藏显示 */
      dialogVisible: false,
      dialogType: 'new',
      /** 菜单类型 */
      menuFlagList: menuFlag(),
      hiddenList: hiddenList(),
      /** 菜单详情数据 */
      role: {

      },
      /** 验证 */
      rules: {
        menuName: [{
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur'
        }],
        menuFlag: [{
          required: true,
          message: '请选择菜单类型',
          trigger: 'change'
        }]
      },
      checkBoxData: [],
      loading: false,
    }
  },
  /* 进入页面就调用*/
  mounted() {
    // this.getList()
  },
  // 在实例被创建之后被调用
  created() {
    /** 表格 */
    // this.getList();
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.getList()
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  methods: {
    /** 表格 */
    getList() {
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      this.formData.paras = this.util.nullValueFun(this.formData.paras)
      getList('/trade-admin/api/user/list', this.formData).then(response => {
        if (response.code == 200) {
          this.list = response.data.list
          this.formData.totalRow = response.data.totalRow;
          this.listLoading = false
        }
      })
    },
    /** 添加菜单 */
    addShow(row) {
      this.dialogVisible = true
      this.dialogType = 'new'
      if (row == undefined) {
        this.role.parentMenuId = 0
      } else {
        this.role.parentMenuId = row.menuId
      }
      this.$nextTick(() => {
        this.$refs['formRole'].clearValidate()
      })
    },
    // handleCurrentChange(row) {
    // 	this.parentMenuId = row.menuId
    // },
    /** 详情 */
    editFun(row) {
      this.dialogVisible = true
      this.dialogType = 'edit'
      
    },
    /** 添加菜单 */
    addFun() {
      if (this.role.menuFlag != '1') {
        this.role.hiddened = 'true'
        this.role.menuIcon = ''
      }
      this.$refs['formRole'].validate((valid) => {
        if (valid) {
          this.loading = true
          postFun('/trade-admin/api/menu/add', this.role).then(response => {
            if (response.code == 200) {
              this.loading = false
              alertMsg('success', response.message)
              this.handleClose()
              /** 刷新表格 */
              this.getList()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    /** 编辑菜单 */
    modifyFun() {
      if (this.role.menuFlag != '1') {
        this.role.hiddened = 'true'
        this.role.menuIcon = ''
      }
      this.$refs['formRole'].validate((valid) => {
        if (valid) {
          this.loading = true
          postFun('/baas-admin/api/menu/modify', this.role).then(response => {
            if (response.code == 200) {
              this.loading = false
              alertMsg('success', response.message)
              this.handleClose()
              /** 刷新表格 */
              this.getList()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    /* 删除*/
    deleteFun(menuId) {
      /* 询问框*/
      this.$confirm('是否删除此菜单', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        /* 删除*/
        postFun('/baas-admin/api/menu/delete', {
          'menuId': menuId
        }).then(response => {
          if (response.code == 200) {
            alertMsg('success', response.message)
            /** 刷新表格 */
            this.getList()
          }
        })
      }).catch(action => {
        return false
      })
    },
    /** 关闭弹框 */
    handleClose() {
      this.dialogVisible = false
      /** 恢复初始化数据 */
      // this.role = this.$options.data().role
    },
    
  }
}
