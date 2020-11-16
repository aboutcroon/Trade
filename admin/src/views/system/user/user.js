import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import dragTreeTable from 'drag-tree-table'
import { getUserInfo } from '@/utils/auth'
import { console } from 'vuedraggable/src/util/helper'
import { get } from 'https'
export default {
  name: 'systemMenu', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    dragTreeTable
  },
  filters: {
    /* 等级*/
    severity(status) {
      var statusMap = status == '1' ? 'success' : 'danger'
      return statusMap
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.confirmPassword !== '') {
          this.$refs.ruleForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      unshow: 1,
      
      tableData: [],
      departments: '1',
      username: getUserInfo()['role']['roleId'],
      list: [],
      dialogFormVisible: false,
      formData: {
        paras: {
          // id: Number(),
          username: '',
          organization: ''
        },
        // childrenList: [],
        pageNumber: 1,
        pageSize: 10,
        totalRow:-1,
      },
      formLabelWidth: '120px',
      // 新增
      ruleForm: {
        // id: '',
        username: '',
        // roleId: '',
        mobile: '',
        email: '',
        roleName:'12312',
        // organization: '',
        // position: '',
        password: '',
        confirmPassword: '',
        // roleName: '',
        status: '1',
        // remark: '',
        createUserid: getUserInfo()['userId']
      },
      // 上级用户下拉框
      options: {
        value: 'id',
        label: 'username',
        children: 'childrenList',
        checkStrictly: true
      },
      opdata: [],
      updepList: [],

      // 行新增
      department: false,
      departmentDate: {
        username: '',
        createUserId: '',
        depCode: '',
        status: '1',
        remark: '',
        createUserid: getUserInfo()['userId']
      },

      // 编辑
      FormVisible: false,
      ruleForms: {
        id: '',
        username: '',
        roleId: '',
        mobile: '',
        email: '',
        organization: '',
        password: '',
        confirmPassword: '',
        roleName: '',
        status: '1',
        createUserid: getUserInfo()['userId'],
        modifyPassword:false,
      },
      a: false,
      // 效验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        // roleId: [
        //   { required: true, message: '请选择用户角色', trigger: 'change' }
        // ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
        // password1: [
        //   { validator: validatePass3, required: true, trigger: 'blur' }
        // ],
        // confirmPassword1: [
        //   { validator: validatePass4, required: true, trigger: 'blur' }
        // ]
      },
      /* 状态*/
      stateList: stateList(),
      listLoading: false,
      // 下拉框
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /** 当前点击的父级id */
      parentMenuId: 0,
      /** 排序数组 */
      updateOrderByMenuId: [],
      // 当前角色查询列表
      roleTypeList: [],
      checkBoxData: []
    }
  },
  /* 进入页面就调用*/
  mounted() {

  },
  // 在实例被创建之后被调用
  created() {
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    /**传-1 后台计算总条数 */
    this.formData.totalRow = -1
    /**分页默认从第一页开始 */
    this.formData.pageNumber = 1
    this.getList()
  },
  methods: {
    // 查询
    getList() {
      postFun('/trade-admin/api/user/list', this.formData).then(res => {
        if (res.code == '200') {
          //this.treeData.lists = res.data.list
          this.tableData = res.data.list
          this.formData.totalRow = res.data.totalRow
        }
      })
      getFun('/baas-admin/api/role/select/role', {}).then(res => {
        if (res.code == '200') {
          this.roleTypeList = res.data
          // this.ruleForm.roleId = res.data.roleId
        }
      })
    },
    addlist() {
      this.dialogFormVisible = true
      // postFun('/baas-admin/api/user/list', { createUserid: this.formData.createUserid }).then(res => {
      //   if (res.code == '200') {
      //     this.opdata = res.data.list
      //   }
      // })
    },

    // 行添加
    addShow(row) {
      this.department = true
      this.departmentDate.createUserId = row.id
      this.departmentDate.depCode = row.depCode
      this.departmentDate.username = ''
      this.departmentDate.remark = ''
    },

    // 保存
    save() {
      postFun('/trade-admin/api/user/add', this.ruleForm).then(res => {
        if (res.code == 200) {
          alertMsg('success', res.message)
          this.handleClose()
          /**传-1 后台计算总条数 */
          this.formData.totalRow = -1
          // /**刷新表格 */
          this.getList()
        }
      })
    },
    // 编辑
    editFun(row) {
      console.log(row)
      this.FormVisible = true
      // this.ruleForms = row
      this.ruleForms.status = row.status
      this.ruleForms.username = row.username
      this.ruleForms.roleId = row.roleId
      this.ruleForms.mobile = row.mobile
      this.ruleForms.id = row.id
      this.ruleForms.organization = row.organization
      this.ruleForms.email = row.email
      this.ruleForms.password = row.password
      this.ruleForms.confirmPassword = row.confirmPassword
      this.ruleForms.roleName = row.roleName
      this.ruleForms.modifyPassword = row.modifyPassword
    },
    //  新增保存
    preservation() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          postFun('/trade-admin/api/user/add', this.ruleForm).then(res => {
            if (res.code == '200') {
              alertMsg('success', res.message)
              this.handleClose()
              /**传-1 后台计算总条数 */
              this.formData.totalRow = -1
              // /**刷新表格 */
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑保存
    editpreservation() {
      /* 询问框*/
      // if (this.ruleForms.status == 0) {
      //   this.$confirm('是否将此用户改为禁用状态？如若改成禁用，此用户下的账号将不能正常使用', '确认信息', {
      //     distinguishCancelAndClose: true,
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     postFun('/baas-admin/api/user/modify', this.ruleForms).then(res => {
      //       if (res.code == '200') {
      //         alertMsg('success', res.message)
      //         this.handleClose()
      //         /**传-1 后台计算总条数 */
      //         this.formData.totalRow = -1
      //         // /**刷新表格 */
      //         this.getList()
      //       }
      //     })
      //   }).catch(action => {
      //     return false
      //   })
      // } else {
        postFun('/trade-admin/api/user/modify', this.ruleForms).then(res => {
          if (res.code == '200') {
            alertMsg('success', res.message)
            this.handleClose()
            /**传-1 后台计算总条数 */
            this.formData.totalRow = -1
            // /**刷新表格 */
            this.getList()
          }
        })
      // }
    },
    // 删除
    dele(row) {
      /* 询问框*/
      this.$confirm('是否删除此用户', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        /* 删除*/
        postFun('/trade-admin/api/user/delete', {
          'idList': row
        }).then(res => {
          if (this.a == true) {
            alertMsg('error', '超级管理员不可被删除')
          } else {
            if (res.code == 200) {
              alertMsg('success', res.message)
              /**传-1 后台计算总条数 */
              this.formData.totalRow = -1
              /** 刷新表格 */
              this.getList()
            }
          }
        })
      }).catch(action => {
        return false
      })
    },
    deles() {
      if (this.checkBoxData.length == 0) {
        alertMsg('error', '请选择删除的内容')
      } else {
        this.dele(this.checkBoxData)
      }
    },
    /** 单行删除 */
    deleFun(id) {
      var idList = [id]
      this.dele(idList)
    },
    onTreeDataChange(list) {
      list.forEach((c, index) => {
        this.updateOrderByMenuId.push(
          {
            'id': c.id, // 菜单ID
            'createUserId': c.createUserId
          }
        )
        this.menuListFun(c, index)
      })
      //this.treeData.lists = list
      /* 排序*/
      postFun('/elcs-system/api/department/updateOrderByDepId', this.updateOrderByMenuId).then(response => {
        if (response.code == 200) {
          alertMsg('success', response.message)
          /** 刷新表格 */
          this.getList()
        }
      })
    },
    menuListFun(item, index) {
      if (item.childrenList) {
        item.childrenList.forEach((c, index) => {
          this.updateOrderByMenuId.push(
            {
              'id': c.id, // 菜单ID
              'createUserId': c.createUserId
            }
          )
          this.menuListFun(c, index)
        })
      }
    },
    // 多选框选中的内容id
    changeFun(val) {
      this.checkBoxData = val.map(x => { return x.id })
      var a = val.map(x => { return Number(x.id) })
      this.a = a.includes(1)
    },

    /** 关闭弹框 */
    handleClose() {
      this.FormVisible = false
      this.dialogFormVisible = false
      this.department = false
      /** 恢复初始化数据 */
      this.ruleForm = this.$options.data().ruleForm
      this.ruleForms = this.$options.data().ruleForms
    }
  }
}
