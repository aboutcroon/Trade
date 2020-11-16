import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList, menuFlag, hiddenList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import childMenu from '@/components/menu'// 导航
import collapseTransition from '@/components/collapse'// 筛选
import addEditor from '@/components/add'
import Sortable from 'sortablejs'
import dragTreeTable from 'drag-tree-table'
export default {
  name: 'Access', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    childMenu,
    addEditor,
    collapseTransition,
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
          articleTitle:'',
          articleTag:'',
          articleColumn:''
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
      /** 上级菜单 */
      menuId: 0,
      listparentmenu: [],
      /** 菜单显示状态 */
      hiddenList: hiddenList(),
      /** 菜单详情数据 */
      role: {
      
      },
      /** 验证 */
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        menuFlag: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        menuUrl: [
          { required: true, message: '请输入URL地址', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择菜单状态', trigger: 'change' }
        ],
        orderNumber: [
          { required: true, message: '请输入菜单排序', trigger: 'blur' }
        ],
        menuIcon: [
          { required: true, message: '请输入图标类名', trigger: 'blur' }
        ]
      },
      /** 当前点击的父级id */
      parentMenuId: 0,
      /** 排序数组 */
      updateOrderByMenuId: [],
      loading: false,
      /** 筛选数组 */
      showFilter: false,
      collapseData: []
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
    this.initData()
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  methods: {
      /* 初始化数据 */
    initData () {
      /** 传-1 后台计算总条数 */
      this.formData.totalRow = -1
      /** 分页默认从第一页开始 */
      this.formData.pageNumber = 1
      this.dictDataFun()
      this.getList()
    },
      /** 表格 */
    getList() {
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      this.formData.paras = this.util.nullValueFun(this.formData.paras)
      getList('/trade-admin/api/article/pageList', this.formData).then(response => {
        if (response.code == 200) {
          this.list = response.data.list
          // this.total = response.data.totalRow;
          this.listLoading = false
          this.role.orderNumber = response.data.length + 1
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
      // this.$nextTick(() => {
      //   this.$refs['formRole'].clearValidate()
      // })
    },
    // handleCurrentChange(row) {
    // 	this.parentMenuId = row.menuId
    // },
    /** 详情 */
    editFun(row) {
      this.dialogVisible = true
      this.dialogType = 'new'
      this.role = row;
      
      // this.$nextTick(() => {
      //   this.$refs['formRole'].clearValidate()
      // })
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
          postFun('/trade-admin/api/article/add', this.role).then(response => {
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
          postFun('/trade-admin/api/article/modify', this.role).then(response => {
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
        postFun('/trade-admin/api/article/delete', {
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
      this.role = this.$options.data().role
    },
    onTreeDataChange(list) {
      list.forEach((c, index) => {
        this.updateOrderByMenuId.push(
          {
            'menuId': c.menuId, // 菜单ID
            'orderNumber': index, // 排序号
            'parentMenuId': c.parentMenuId
          }
        )
        this.menuListFun(c, index)
      })
      this.treeData.lists = list

      // /* 排序*/
      // postFun('/baas-admin/api/menu/updateOrderByMenuId', this.updateOrderByMenuId).then(response => {
      //   if (response.code == 200) {
      //     alertMsg('success', response.message)
      //     /** 刷新表格 */
      //     this.getList()
      //     this.updateOrderByMenuId = []
      //   }
      // })
    },
    menuListFun(item, index) {
      if (item.menuList) {
        item.menuList.forEach((c, index) => {
          this.updateOrderByMenuId.push(
            {
              'menuId': c.menuId, // 菜单ID
              'orderNumber': index, // 排序号
              'parentMenuId': c.parentMenuId
            }
          )
          this.menuListFun(c, index)
        })
      }
    },
    /** 筛选 */
    dictDataFun() {
      this.collapseData = []
      /** 部署任务状态 */
      // this.dictFun({ key: '部署任务类型' }).then(res => {
      //   if (res.code == '200') {
      //     console.log('this.typeList')
      //     console.log(this.typeList)
      //     this.typeList = res.data
      //     this.collapseData.push({
      //       resData: { type: res.data },
      //       typeTitle: '任务类型'
      //     })
      //   }
      // })
      console.log(this.collapseData)
    },
  }
}
