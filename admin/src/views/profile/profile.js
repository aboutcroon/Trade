import {
  getList,
  postFun,
  getFun
} from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import Pagination from '@/components/Pagination' // 分页
import { getUserInfo } from '@/utils/auth'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
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
        if (this.form.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: '',
        userId: '',
        username: '',
        roleId: '',
        mobile: '',
        email: '',
        status: '',
        position: '',
        password: '',
        confirmPassword: '',
        modifyPassword: false,
        role: {
          roleName: ''
        }
      },
      // 判断roleId 用户
      roleId: getUserInfo()['role']['roleId'],
      userID: getUserInfo(),
      // 省
      province: [],

      isDisabled: true,
      disabledName: true,
      dialogFormVisible: this.show,

      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }

    }
  },

  watch: {
    show() {
      this.dialogFormVisible = this.show
    }
  },
  mounted() {
    // this.getMessage()
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    // this.getMessage()
  },
  methods: {
    async save(form) {
      this.form = this.util.nullValueFun(this.form)
      postFun('/baas-admin/api/user/modify', this.form).then(res => {
        if (res.code == 200){
          alertMsg('success', '修改成功')
          var userInfo = getUserInfo()
          userInfo.username = this.form.username
          localStorage.setItem('trademark.admin.userInfo', JSON.stringify(userInfo));
          this.$store.state.user.name = this.form.username//动态修改用户名称
        }

      })
      this.dialogFormVisible = false
      this.isDisabled = true
      // }
      // })
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.dialogFormVisible = false
      this.isDisabled = true
      // 不重新定义 点击取消后 不能输入input
      this.form.modifyPassword = false
      this.form = {
        id: '',
        userId: '',
        username: '',
        roleId: '',
        userName: '',
        mobile: '',
        email: '',
        status: '',
        position: '',
        password: '',
        confirmPassword: '',
        modifyPassword: false,
        role: {
          roleName: ''
        }
      }
      this.getMessage()
    },
    async getMessage() {
      // 信息
      const { data } = await getFun('/trade-admin/api/role/current', {})
      this.form.id = data.id
      this.form.username = data.username
      this.form.roleId = data.roleId
      this.form.mobile = data.mobile
      this.form.email = data.email
      this.form.status = data.roleType
      this.form.organization = data.organization
      this.form.role.roleName = data.roleName
    }
  }
}
