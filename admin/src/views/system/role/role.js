import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination'
export default {
  inject: ['reload'],
  name: 'systemMenu', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination
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
      list: [],
      formData: {
        paras: {
          roleName: ''
        },
        pageSize: 10,
        pageNumber: 1,
        totalRow: 0
      },
      // 新增
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        type: '',
        desc: '',
        start: ''
      },
      // 编辑
      FormVisible: false,
      isSelectAll: true,
      table: false,
      ruleForms: {
        name: '',
        type: '',
        desc: '',
        start: ''
      },
      // 效验
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入机构类型', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入角色说明', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请选择机构状态', trigger: 'change' }
        ]
      },
      // /*状态*/
      stateList: stateList(),
      listLoading: false,
      //  权限
      setupdata: false,
      // 加载效果
      loading: true,
      activeName: 'menu',
      // 菜单
      data: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // },
      checkList: [],
      title: '',
      titledata: '',
      tabledata: [],
      authority: [],
      roleId: '',
      checkdata: [],
      checkeddata: [],
      interfacedata: [],
      pkchecke: [],
      multipleSelection: '',
      //  全部
      isIndeterminate: true,
      checkAll: false,
      checkedCities: [],
      Btnloading:false,
    }
  },
  /* 进入页面就调用*/
  mounted() {

  },
  // 在实例被创建之后被调用
  created() {
    //this.getList()
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    /** 分页默认从第一页开始 */
    this.formData.pageNumber = 1
    this.getList()
  },
  methods: {
    // 查询
    getList() {
      this.formData.paras = this.util.nullValueFun(this.formData.paras)
      getList('/trade-admin/api/role/allList', this.formData).then(res => {
        console.log(data,'data');
        var data = res.data
        var datalist = []
        if (res.code == '200') {
          for (var item of data) {
            if (item != null) {
              var json = {
                name: item.roleName,
                //start: item.status,
                start: '1',
                id: item.roleId
              }
            }
            datalist.push(json)
          }
          this.list = datalist
          //this.formData.totalRow = res.data.totalRow
        }
      })
    },
    // 编辑
    edit(row) {
      this.FormVisible = true
      this.ruleForms.type = row.type
      this.ruleForms.name = row.name
      this.ruleForms.desc = row.explain
      this.ruleForms.start = row.start
      this.id = row.id
      // postFun('/api/role/modify',param)
    },
    //  新增保存
    preservation() {
      var param = {
        roleName: this.ruleForm.name,
        roleExplain: this.ruleForm.desc,
        roleTypeId: this.ruleForm.type,
        status: this.ruleForm.start
      }
      postFun('/trade-admin/api/role/add', param).then(res => {
        if (res.code == '200') {
          alertMsg('success', res.message)
          this.close()
          /**刷新表格 */
          this.getList()
        } else {
          this.http.messageFun('error', res.message)
        }
      })
    },
    // 编辑保存
    editpreservation() {
      var param = {
        roleId: this.id,
        roleName: this.ruleForms.name,
        roleExplain: this.ruleForms.desc,
        roleTypeId: this.ruleForms.type,
        status: this.ruleForms.start
      }
      postFun('/trade-admin/api/role/modify', param).then(res => {
        if (res.code == '200') {
          alertMsg('success', res.message)
          this.close()
          /**刷新表格 */
          this.getList()
        } else {
          this.http.messageFun('error', res.message)
        }
      })
    },
    // 删除
    dele(row) {
      /* 询问框*/
      this.$confirm('是否删除此条权限', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        /* 删除*/
        postFun('/trade-admin/api/role/delete', {
          'roleId': row.id
        }).then(res => {
          if (res.code == 200) {
            alertMsg('success', res.message)
            /**刷新表格 */
            this.getList()
          }
        })
      }).catch(action => {
        return false
      })
    },
    // 权限
    power(row) {
      this.setupdata = true
      this.titledata = row.name
      this.roleId = row.id
      postFun('/trade-admin/api/role/listMenuForRole', {
        menuId: '0',
        menuName: '',
        menuUrl: '',
        roleId: row.id,
        status: '1'
      }).then(res => {
        if (res.code == '200') {
          this.tabledata = []
          this.tabledata = res.data
          this.loading = false
        }
      })
      //  获取全部
      //   var status = this.util.nullValueFun(this.rowstatus)
      postFun('/trade-admin/api/interfaces/allList', { status: row.start }).then(res => {
        if (res.code == '200') {
          this.checkeddata = []
          this.interfacedata = res.data
          for (var item of this.interfacedata) {
            var json = {
              menuId: item.ifsId,
              menuName: item.ifsName,
              checked: false
            }

            this.checkeddata.push(json)
          }
        }
      })
      //  api
      // 获取指定
      postFun('/trade-admin/api/interfaces/getInterfacesListByRoleId', {
        roleId: row.id,
        status: row.start
      }).then(res => {
        if (res.code == '200') {
          this.pkchecke = []

          this.timer = setTimeout(() => {   // 设置延迟执行
            for (var item of res.data) {
              this.pkchecke.push({ value: item.ifsId })
            }
            for (var index of this.checkeddata) {
              for (var item of this.pkchecke) {
                if (index.menuId == item.value) {
                  index.checked = true
                }
              }
            }
          }, 100)


        }
      })
    },
    //  全选
    handleCheckAllChange(val) {
      if (val == true) {
        for (var index of this.checkeddata) {
          index.checked = true
        }
      } else if (val == false) {
        for (var index of this.checkeddata) {
          index.checked = false
        }
      }
      this.isIndeterminate = false
    },
    // 权限菜单
    handleNodeClick(data) {
      this.title = data.label
    },
    hold() {
      this.Btnloading = true;
      var data = []
      for (var item of this.tabledata) {
        if (item.isChecked == true) {
          var json = {
            roleId: this.roleId,
            menuId: item.menuId
          }
          data.push(json)
          for (var btn of item.buttons) {
            if (btn.isChecked) {
              var json = {
                roleId: this.roleId,
                menuId: btn.menuId
              }
              data.push(json)
            }
          }
        }
        for (var it of item.menuList) {
          if (it.isChecked == true) {
            var json = {
              roleId: this.roleId,
              menuId: it.menuId
            }
            data.push(json)
            for (var menuId of it.menuList) {
              if (menuId.isChecked) {
                var json = {
                  roleId: this.roleId,
                  menuId: menuId.menuId
                }
                data.push(json)
              }
            }
            for (var btn of it.buttons) {
              if (btn.isChecked) {
                var json = {
                  roleId: this.roleId,
                  menuId: btn.menuId
                }
                data.push(json)
              }
            }
          }
        }
      }

      if (data.length == 0) {
        var json = {
          roleId: this.roleId,
          menuId: -1
        }
        data.push(json)
      }
      postFun('/trade-admin/api/rolemenu/add', data).then(res => {
        if (res.code == '200') {
          this.Btnloading = false;
          alertMsg('success', res.message)
          this.close()
          // /**刷新表格 */
          // this.getList();
        }
      }).catch(error=>{
        this.Btnloading = false;
      })
      //  保存api
      var apidata = []
      for (var item of this.checkeddata) {
        if (item.checked == true) {
          apidata.push(item.menuId)
        }
      }
      postFun('/trade-admin/api/interfaces/setInterfacesForRole', {
        ifsIdList: apidata,
        roleId: this.roleId
      }).then(res => {
      })
    },
    onTableSelect(rows, row) {
      const selected = rows.length && rows.indexOf(row) !== -1
      if (selected == true) {
      } else {
        for (var item of this.checkeddata) {
          if (item.menuId == row.menuId) {
            row.disabled = true
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 关闭
    close() {
      this.FormVisible = false
      this.dialogFormVisible = false
      this.setupdata = false
    },
    handleDialogClose() {
      this.dialogFormVisible = false
      this.setupdata = false
    },
    // 表格多选框 禁用操作
    toDisable(state, event, row) {
      if (row.isChecked == true) {// 如果是选中状态
        if (row.parentMenuId != '0') {
          for (var item of this.tabledata) {
            if (item.menuId == row.parentMenuId) {
              item.isChecked = true
            }
          }
        } else if (row.parentMenuId == '0') {
          for (var item of this.tabledata) {
            for (var it of item.menuList) {
              if (it.parentMenuId == row.menuId) {
                it.isChecked = true
                it.hasRight = '1'

              }
            }
          }
        }
      } else {// 如果是未选中状态
        if (row.parentMenuId != '0') {
          var vcount = 0
          for (var item of this.tabledata) {
            for (var it of item.menuList) {
              if (it.parentMenuId == row.parentMenuId) {
                if (it.isChecked == true) { vcount++ }
              }
            }
          }

          for (var item of this.tabledata) {
            if (item.menuId == row.parentMenuId) {
              if (vcount == 0) {
                item.isChecked = false
                //item.hasRight = state ? '1' : '0'
              }
            }
          }
        } else if (row.parentMenuId == '0') {
          for (var item of this.tabledata) {
            for (var it of item.menuList) {
              if (it.parentMenuId == row.menuId) {
                it.isChecked = false
                //it.hasRight = state ? '1' : '0'
              }
            }
          }
        }
      }

      for (var item of this.tabledata) {
        if (item.menuId == row.menuId) { item.hasRight = state ? '1' : '0'; return }

        for (var it of item.menuList) {
          if (it.menuId == row.menuId) { it.hasRight = state ? '1' : '0'; return }
        }
      }
    },
    selectAll(row) {
      if (this.isSelectAll) {
        this.isSelectAll = false
        for (var item of this.tabledata) {
          item.isChecked = true
          item.hasRight = '1'

          for (var it of item.menuList) {
            it.isChecked = true
            it.hasRight = '1'
          }
        }
      } else {
        this.isSelectAll = true
        for (var item of this.tabledata) {
          item.isChecked = false
          item.hasRight = '0'

          for (var it of item.menuList) {
            it.isChecked = false
            it.hasRight = '0'
          }
        }
      }
    }

  }
}
