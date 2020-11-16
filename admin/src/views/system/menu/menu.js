import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList, menuFlag, hiddenList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import childMenu from '@/components/menu'// 导航
import Sortable from 'sortablejs'
import dragTreeTable from 'drag-tree-table'
export default {
  name: 'systemMenu', // 返回页面之后input值不消失，与routes下index.js中name一致
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
      treeData: {
        columns: [
          {
            type: 'selection',
            title: '菜单名称',
            field: 'menuName',
            width: 200,
            align: 'left',
            formatter: item => {
              return '<a>' + item.menuName + '</a>'
            }
          },
          {
            type: 'default',
            title: '类型',
            field: 'menuFlag',
            width: 140,
            align: 'center',
            formatter: item => {
              return item.menuFlag == 2 ? '按钮' : '菜单'
            }
          },
          {
            type: 'default',
            title: 'URL地址',
            field: 'menuUrl',
            width: 320,
            align: 'center'
          },
          {
            type: 'default',
            title: '图标',
            field: 'menuIcon',
            width: 120,
            align: 'center',
            formatter: item => {
              if (item.menuIcon != null && item.menuIcon != undefined) {
                return '<svg aria-hidden="true" class="svg-icon" style="width: 1.5em;height: 1.5em;vertical-align: -0.4em;fill: currentColor;overflow: hidden;"><use href="#icon-' + item.menuIcon + '"></use></svg>'
              } else {
                return '-'
              }
            }
          },
          {
            type: 'default',
            title: '类型',
            field: 'menuFlag',
            width: 120,
            align: 'center',
            formatter: item => {
              if (item.status == '1') {
                return '<span class="el-link el-link--success" style="font-size:12px"><span>启用</span></span>'
              } else {
                return '<span class="el-link el-link--danger" style="font-size:12px"><span>禁用</span></span>'
              }
            }
          },
          {
            title: '操作',
            type: 'action',
            width: 300,
            align: 'center',
            actions: [
              {
                onclick: item => {
                  // item是当前行的数据
                  this.addShow(item)
                },
                formatter: item => {
                  return '<el-link size="mini" :underline="false" plain ><span class="icon iconfont iconadd" style="color:#13CE66" />&nbsp;&nbsp;</el-link>'
                }
              },
              {
                onclick: item => {
                  // item是当前行的数据
                  this.editFun(item)
                },
                formatter: item => {
                  return '<el-link size="mini" :underline="false" type="primary" plain ><span class="icon iconfont iconedit" />&nbsp;&nbsp;</el-link>'
                }
              },
              {
                onclick: item => {
                  // item是当前行的数据
                  this.deleteFun(item.menuId)
                },
                formatter: item => {
                  return '<el-link size="mini" :underline="false" plain ><span class="icon iconfont icondelete" style="color:red;" />&nbsp;&nbsp;</el-link>'
                }
              }
            ]
          }
        ],
        lists: [],
        custom_field: {
          id: 'menuId',
          order: 'sort',
          lists: 'menuList',
          parent_id: 'parentMenuId'
        }
      },
      formData: {
        // parentMenuId: '',
        menuName: '',
        menuUrl: '',
        status: '',
        menuId: 0
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
        parentMenuId: 0,
        menuName: '',
        menuFlag: '1',
        menuUrl: '',
        status: 1,
        orderNumber: 0,
        hiddened: '',
        menuIcon: ''
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
      loading: false
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
      // this.formData = this.util.nullValueFun(this.formData)
      getList('/trade-admin/api/menu/listjson', this.formData).then(response => {
        if (response.code == 200) {
          this.treeData.lists = response.data
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
      // this.role = row;
      this.role.menuId = row.menuId // 菜单标识
      this.role.parentMenuId = row.parentMenuId // 父菜单标识
      this.role.menuName = row.menuName // 菜单名称
      this.role.menuFlag = row.menuFlag // 菜单标识 1 菜单  2 操作
      this.role.menuUrl = row.menuUrl //
      this.role.status = Number(row.status) // 状态 0 禁用 1 启用
      this.role.orderNumber = row.orderNumber // 排序标识
      this.role.menuList = row.menuList // 子级数组
      this.role.menuIcon = row.menuIcon // 图标
      this.role.hiddened = row.hiddened == true // 是否在左侧栏显示
      this.$nextTick(() => {
        this.$refs['formRole'].clearValidate()
      })
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
          postFun('/trade-admin/api/menu/modify', this.role).then(response => {
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
        postFun('/trade-admin/api/menu/delete', {
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

      /* 排序*/
      postFun('/trade-admin/api/menu/updateOrderByMenuId', this.updateOrderByMenuId).then(response => {
        if (response.code == 200) {
          alertMsg('success', response.message)
          /** 刷新表格 */
          this.getList()
          this.updateOrderByMenuId = []
        }
      })
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
    }
  }
}
