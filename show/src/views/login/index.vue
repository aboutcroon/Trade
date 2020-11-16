<template>
  <AccountNumber>
    <account-block title="欢迎登陆">
      <div class="tab">
        <div
          class="button-tab"
          :class="{ active: type === 0 }"
          @click="clickType(0)"
        >
          <span>账号密码登录</span>
        </div>
        <div
          class="button-tab"
          :class="{ active: type === 1 }"
          @click="clickType(1)"
        >
          <span>手机号登录</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="form" v-if="type === 0" :key="type">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model.trim="form.username"
              placeholder="请输入用户名"
              @input="form.username=form.username.replace(/[^\w_]/g, '')"
              maxlength="20"
              autocomplete="on"
              @keyup.enter.native="autoFoucs('password')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="form.password"
              placeholder="请输入密码"
              @input="form.password=form.password.replace(/[\u4e00-\u9fa5]/g, '')"
              maxlength="16"
              show-password
              @keyup.enter.native="autoFoucs('imgCaptcha')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="imgCaptcha">
            <el-input
              ref="imgCaptcha"
              v-model="form.imgCaptcha"
              placeholder="请输入验证码"
              @input="form.imgCaptcha=form.imgCaptcha.replace(/[^\a-\z\A-\Z0-9]/g, '')"
              maxlength="4"
              @keyup.enter.native="clickLogin('form')"
            >
              <template slot="suffix">
                <div class="verification-code">
                  <img :src="imgCodeUrl" alt="" @click="getVerificationCode" />
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="automatic-log-in" v-if="type === 0">
          <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
        </div>
      </div>
      <div class="form" v-else-if="type === 1" :key="type">
        <el-form ref="formPhone" :model="form" :rules="rulesPhone">
          <el-form-item prop="mobile">
            <el-input
              ref="mobile"
              v-model="form.mobile"
              placeholder="请输入11位手机号"
              @input="form.mobile=form.mobile.replace(/^0|[^\d]/g, '')"
              @keyup.enter.native="autoFoucs('captcha')"
              maxlength="11"
            >
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              ref="captcha"
              v-model="form.captcha"
              placeholder="请输入验证码"
              @input="form.captcha = form.captcha.replace(/[^\a-\z\A-\Z0-9]/g, '')"
              @keyup.enter.native="clickLogin('formPhone')"
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
      </div>
      <!-- <el-form-item>
        <el-button @click="clickLogin" class="button-form" type="primary">点击登录</el-button>
      </el-form-item> -->

      <template #bottom>
        <div class="submit">
          <el-button
            @click="clickLogin(loginType)"
            class="button-form"
            type="primary"
            >点击登录</el-button
          >
        </div>
        <div class="bottom-text">
          <div class="left">
            <router-link
              v-if="type === 0"
              class="bottom-left-link"
              to="/password"
              >忘记密码</router-link
            >
          </div>
          <div class="right">
            <div class="text">
              <span>还没有账号？</span>
              <router-link class="bottom-right-link" to="/register"
                >注册</router-link
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
import { setToken, setLocalToken } from '@/api/token.js'
import { formFilter } from '@/api/form.js'
import AccountNumber from '@/components/AccountNumber.vue'
import AccountBlock from '@/components/AccountBlock.vue'
import { mapMutations } from 'vuex'
import rules from '@/api/rules.js'
export default {
  name: 'Login',
  components: {
    AccountNumber,
    AccountBlock,
  },
  data() {
    return {
      codeTime: 60, // 禁止点击验证码的时间
      timeOutId: null, // 验证码定时器
      codeLoading: false,
      type: 0, // 登录类型
      autoLogin: false, // 是否自动登录
      form: {
        username: '',
        password: '',
        captcha: '',
        imgCaptcha: '',
        captchaToken: '',
        mobile: '',
      },
      imgCodeUrl: '',
      token: '',
      rules: {
        ...rules,
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码应不少于6个字符', trigger: 'blur' }
        ],
        imgCaptcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, message: '验证码长度最少4位', trigger: 'blur' },
          { max: 4, message: '验证码长度最多4位', trigger: 'blur' }
        ]
      },
      rulesPhone: {
        ...rules
      }
    }
  },
  computed: {
    loginType() {
      return this.type === 0 ? 'form' : 'formPhone'
    },
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
    if (this.form.username === '') {
      this.autoFoucs('username')
    } else if (this.form.password === '') {
      this.autoFoucs('password')
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setToken', 'setTokenLocal']),
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
    /* 切换登录类型 */
    clickType(index) {
      this.form.captcha = ''
      this.getVerificationCode()
      this.$refs[this.loginType].resetFields()
      this.type = index
      const key = index === 0 ? 'username' : 'mobile'
      this.$nextTick(() => {
        this.autoFoucs(key)
        this.$refs[this.loginType].resetFields()
      })
    },
    /* 点击登录提交 */
    clickLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 0) {
            this.accountLogin()
          } else {
            this.mobileLogin()
          }
        } else {
          /* this.$message.error('请正确填写登录信息！'); */
          return false;
        }
      })
    },
    /* Enter 切换聚焦 */
    autoFoucs(key) {
      this.$refs[key].focus()
    },
    /* 账号密码登录 */
    accountLogin() {
      const { username, password, imgCaptcha, captchaToken } = this.form
      this.postPasswordLogin({ username, password, captcha: imgCaptcha, captchaToken }).then(response => {
        const message = response.message
        if (response.code === '200' || response.code === 200) {
          this.saveUserInfo(response)
          this.setToken(response.data.token)
          if (this.autoLogin) {
            this.setTokenLocal(response.data.token)
          }
        } else {
          this.getVerificationCode()
          this.$message.error(message)
        }
      })
    },
    /* 手机号登录 */
    mobileLogin() {
      const { mobile, captcha, captchaToken } = this.form
      const param = {
        mobile,
        captcha
      }
      this.postMobileLogin(param).then((response) => {
        const status = response.code
        const message = response.message
        if (status === '200' || status === 200) {
          this.$message.success('登录成功');
          this.saveUserInfo(response)
          this.setToken(response.data.token)
        } else {
          this.$message.error(message)
        }
      })
    },
    /* 登录后保存用户信息 */
    saveUserInfo(response) {
      const message = response.message
      this.setToken(response.data.token)
      this.setUserInfo(response.data)
      this.$router.push({ name: 'userControl' })
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
      return postFun('/trade-web/api/mobileCaptcha', param)
    },
    getVerificationCode() {
      this.getImgCaptcha().then(response => {
        this.imgCodeUrl = 'data:image/png;base64,' + response.data.captcha
        this.form.captchaToken = response.data.captchaToken
      })
    },
    /* 获取图片验证码 */
    getImgCaptcha(param) {
      return getFun('/trade-web/api/captcha', param)
    },
    /* 手机登录请求 */
    postMobileLogin(param) {
      return postFun('/trade-web/api/mobileLogin', param)
    },
    /* 密码登录请求 */
    postPasswordLogin(param) {
      return postFun('/trade-web/api/passwordLogin', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab {
  .button-tab {
    padding: 10px 14px;
  }
}
.line {
  margin-bottom: 20px;
}
</style>