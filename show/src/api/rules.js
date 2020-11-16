const rules = {
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { max: 20, message: '长度在 20 个字符以内', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      required: true,
      pattern: /^1[34578]\d{9}$/, /* 可以写正则表达式呦呦呦 */
      message: '目前只支持中国大陆的手机号码',
      trigger: 'blur'
    },
    /* { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }, */
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, message: '验证码长度最少6位', trigger: 'blur' },
    { max: 6, message: '验证码长度最多6位', trigger: 'blur' }
  ],
}

export default rules