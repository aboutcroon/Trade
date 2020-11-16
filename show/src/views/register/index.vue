<template>
  <AccountNumber>
    <account-block title="欢迎注册">
      <div class="tab">
        <div
          class="button-tab"
          :class="{ active: type === 0 }"
          @click="clickType(0)"
        >
          <span>个人注册</span>
        </div>
        <div
          class="button-tab"
          :class="{ active: type === 1 }"
          @click="clickType(1)"
        >
          <span>机构注册</span>
        </div>
      </div>
      <div class="line"></div>
      <p class="description">请选择账号类型，一旦成功建立账号，类型不可更改</p>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model.trim="form.username"
            placeholder="请输入用户名"
            @input="form.username = form.username.replace(/[^\a-\z\A-\Z0-9_]/g, '')"
            @keyup.enter.native="autoFoucs('mobile')"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input
            ref="mobile"
            v-model="form.mobile"
            placeholder="请输入11位手机号"
            @input="form.mobile = form.mobile.replace(/^0|[^\d]/g, '')"
            @keyup.enter.native="autoFoucs('password')"
            maxlength="11"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model.trim="form.password"
            placeholder="请输入密码"
            @input="form.password = form.password.replace(/[\u4e00-\u9fa5]/g, '')"
            @keyup.enter.native="autoFoucs('confirmPassword')"
            maxlength="16"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            ref="confirmPassword"
            v-model.trim="form.confirmPassword"
            placeholder="请输入确认密码"
            @input="form.confirmPassword = form.confirmPassword.replace(/[\u4e00-\u9fa5]/g, '')"
            @keyup.enter.native="autoFoucs('captcha')"
            maxlength="16"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            ref="captcha"
            v-model="form.captcha"
            placeholder="请输入验证码"
            @input="form.captcha = form.captcha.replace(/[^\a-\z\A-\Z0-9]/g, '')"
            @keyup.enter.native="clickRegister('form')"
            maxlength="6"
          >
            <template slot="suffix">
              <i class="el-icon-loading" v-if="codeLoading"></i>
              <span
                class="get-code"
                :class="{ 'color-gray': codeTime < 60 || codeLoading }"
                @click="clickCode"
                >{{ codeText }}</span
              >
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #bottom>
        <div class="submit">
          <el-button
            @click="clickRegister('form')"
            class="button-form"
            type="primary"
            >立刻注册</el-button
          >
        </div>
        <div class="bottom-text">
          <div class="left">
            <el-checkbox v-model="protocol"></el-checkbox>
            <span>阅读并接受《用户协议》及《法律协议》</span>
            <!-- <router-link
              v-if="type === 0"
              class="bottom-left-link"
              to="/password"
              ></router-link
            > -->
          </div>
          <div class="right">
            <div class="text">
              <span>已有账号？</span>
              <router-link class="bottom-right-link" to="/login"
                >登录</router-link
              >
            </div>
          </div>
        </div>
      </template>
    </account-block>
  </AccountNumber>
</template>
<script>
import { getFun, postFun } from '@/api/transit.js'
import AccountNumber from '@/components/AccountNumber.vue'
import AccountBlock from '@/components/AccountBlock.vue'
import rules from '@/api/rules.js'
export default {
  name: 'Register',
  components: {
    AccountNumber,
    AccountBlock
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('请输入最少6位数的密码'));
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value.length < 6) {
        callback(new Error('请输入最少6位数的密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      codeLoading: false, // 发送验证码的Loading
      codeTime: 60, // 禁止点击验证码的时间
      timeOutId: null, // 验证码定时器
      protocol: false, // 同意用户协议
      type: 0,
      form: {
        username: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        roleType: 5,
        captcha: '',
        captchaToken: '',
      },
      codeUrl: '',
      rules: {
        ...rules,
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    codeText() {
      // 个位数补0
      // let value = null
      // if ((this.codeTime+'').length < 2) {
      //   value = '0' + this.codeTime
      // } else {
      //   value = this.codeTime
      // }
      // return Number(value) < 60 ? value + 's 后重新获取' : '获取验证码'
      return this.codeTime < 60 ? this.codeTime + 's 后重新获取' : '获取验证码'
    }
  },
  mounted() {
    this.getVerificationCode()
    this.initFoucs()
  },
  methods: {
    initFoucs() {
      if (this.form.username === '') {
        this.autoFoucs('username')
      } else if (this.form.mobile === '') {
        this.autoFoucs('mobile')
      }
    },
    /* 点击tab切换 */
    clickType(index) {
      this.type = index
      this.initFoucs()
    },
    /* 点击验证码 */
    clickCode() {
      /* 获取验证码 */
      if (this.codeTime === 60 && !this.codeLoading) {
        const phone = this.form.mobile
        if (/^1[3-9]\d{9}$/.test(phone)) {
          this.getCaptcha(phone)
        } else {
          this.$message.error('手机号格式有误！')
        }
      }
    },
    /* 计时器函数 */
    timeFn() {
      this.codeTime -= 1
      if (this.codeTime >= 0) {
        setTimeout(this.timeFn, 1000)
      } else {
        this.codeTime = 60
        window.clearTimeout(this.timeOutId)
      }
    },
    /* 点击注册 */
    clickRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          /* this.$message.error('请正确填写注册信息！'); */
          return false;
        }
      })
    },
    /* 新增用户 */
    addUser() {
      if (this.protocol) {
        const { username, mobile, password, confirmPassword, captcha, captchaToken } = this.form
        const roleType = this.type === 0 ? 5 : 4
        const param = {
          username, mobile, password, confirmPassword, roleType, captcha
        }
        this.postRegister(param).then(response => {
          const status = response.code
          const message = response.message
          if (status === '200' || status === 200) {
            this.$message.success('注册成功');
          } else {
            this.getVerificationCode()
            this.$message.error(message);
          }
        })
      } else {
        this.$message.error('请接受用户协议和法律协议');
      }
    },
    /* Enter 切换聚焦 */
    autoFoucs(key) {
      this.$refs[key].focus()
    },
    /* 获取验证码 */
    getCaptcha(mobile) {
      this.codeLoading = true
      this.getMobileCaptcha({ mobile }).then(response => {
        const status = response.code
        const message = response.message
        if (status === '200' || status === 200) {
          this.codeLoading = false
          this.$message.success('发送成功');
          /* 开启计时器 */
          this.codeTime -= 1
          this.timeOutId = setTimeout(this.timeFn, 1000)
        } else {
          this.codeLoading = false
          this.$message.error(message);
        }
      })
    },
    /* 接口封装 */
    getMobileCaptcha(param) {
      return postFun('/trade-web/api/register/mobileCaptcha', param)
    },
    getVerificationCode() {
      getFun('/trade-web/api/captcha').then(response => {
        this.codeUrl = 'data:image/png;base64,' + response.data.captcha
        this.form.captchaToken = response.data.captchaToken
      })
    },
    postRegister(param) {
      return postFun('/trade-web/api/register', param)
    },
  }
}
</script>
<style lang="scss" scoped>
.description {
  text-align: center;
  color: #ff9c00;
  font-size: 14px;
  padding: 14px 0;
}
.submit {
  margin-bottom: 20px;
}
</style>