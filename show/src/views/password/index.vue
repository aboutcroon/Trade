<template>
  <AccountNumber>
    <account-block title="找回密码">
      <el-form
        v-if="type === 0"
        ref="formPhone"
        :model="formPhone"
        :rules="rulesPhone"
      >
        <el-form-item prop="mobile">
          <el-input
            ref="mobile"
            v-model="formPhone.mobile"
            placeholder="请输入11位手机号"
            @keyup.enter.native="autoFoucs('captcha')"
            @input="formPhone.mobile = formPhone.mobile.replace(/^0|[^\d]/g, '')"
            maxlength="11"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <SwipeVerification ref="swipe" />
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            ref="captcha"
            v-model="formPhone.captcha"
            placeholder="请输入验证码"
            @input="formPhone.captcha = formPhone.captcha.replace(/[^\a-\z\A-\Z0-9]/g, '')"
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
      <el-form
        v-if="type === 1"
        ref="formPassword"
        :model="formPassword"
        :rules="rulesPassword"
      >
        <el-form-item prop="password">
          <el-input
            v-model="formPassword.password"
            placeholder="请输入密码"
            @keyup.enter.native="autoFoucs('confirmPassword')"
            @input="formPassword.password = formPassword.password.replace(/[\u4e00-\u9fa5]/g, '')"
            maxlength="16"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            ref="confirmPassword"
            v-model="formPassword.confirmPassword"
            placeholder="请输入确认密码"
            @input="formPassword.confirmPassword = formPassword.confirmPassword.replace(/[\u4e00-\u9fa5]/g, '')"
            maxlength="16"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div v-else-if="type === 2" class="reset-success">
        <div class="success-logo"></div>
        <p class="text">恭喜，用户{{ username }}重置密码成功！</p>
      </div>
      <template #bottom>
        <div class="step">
          <el-button @click="clickStep" class="button-form" type="primary">{{
            stepList[type]
          }}</el-button>
        </div>
        <div class="bottom-text justify-end">
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
import SwipeVerification from '@/components/SwipeVerification.vue'
import AccountNumber from '@/components/AccountNumber.vue'
import AccountBlock from '@/components/AccountBlock.vue'
import rules from '@/api/rules.js'
export default {
  name: 'Password',
  components: {
    SwipeVerification,
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
        if (this.formPassword.confirmPassword !== '') {
          this.$refs.formPassword.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value.length < 6) {
        callback(new Error('请输入最少6位数的密码'));
      } else if (value !== this.formPassword.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      codeLoading: false, // 发送验证码的Loading
      codeTime: 60, // 禁止点击验证码的时间
      timeOutId: null, // 验证码定时器
      type: 0,
      stepList: ['下一步', '立刻重置', '直接登录'],
      codeUrl: '',
      captchaToken: '',
      username: '张三',
      formPhone: {
        mobile: '',
        captcha: '',
      },
      formPassword: {
        password: '',
        confirmPassword: ''
      },
      rulesPhone: {
        ...rules
      },
      rulesPassword: {
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
    if (this.formPhone.mobile === '') {
      this.autoFoucs('mobile')
    }
  },
  methods: {
    /* 点击验证码 */
    clickCode() {
      if (this.$refs.swipe.status) {
        /* 获取验证码 */
        if (this.codeTime === 60 && !this.codeLoading) {
          const phone = this.formPhone.mobile
          if (/^1[3-9]\d{9}$/.test(phone)) {
            this.getCaptcha(phone)
          } else {
            this.$message.error('手机号格式有误！')
          }
        }
      } else {
        this.$message.error('请拖拽滑块验证！')
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
    /* 点击下一步 */
    clickStep() {
      if (this.type === 0) {
        this.submit('formPhone')
      } else if (this.type === 1) {
        this.submit('formPassword')
      } else if (this.type === 2) {
        this.$router.push({ name: 'Login' })
      }
      // this.type += 1
      // if (this.type >= 3) {
      //   this.type = 0
      // }
    },
    /* 提交当前验证 */
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 0) {
            this.type = 1
          } else if (this.type === 1) {
            /* this.addUser() */
            this.resetPassword()
          }
        } else {
          return false;
        }
      })
    },
    /* 请求修改密码 */
    resetPassword() {
      const param = {
        mobile: this.formPhone.mobile,
        password: this.formPassword.password,
        confirmPassword: this.formPassword.confirmPassword,
        captcha: this.formPhone.captcha,
      }
      this.getForgotPassword(param).then((response) => {
        const status = response.code
        const message = response.message
        if (status === '200' || status === 200) {
          this.$message.success(message);
          this.type = 2
        } else {
          this.$message.error(message)
        }
      })
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
    /* Enter 切换聚焦 */
    autoFoucs(key) {
      this.$refs[key].focus()
    },
    /* 接口封装 */
    getMobileCaptcha(param) {
      return postFun('/trade-web/api/mobileCaptcha', param)
    },
    getVerificationCode() {
      this.getCaptcha().then(response => {
        this.codeUrl = 'data:image/png;base64,' + response.data.captcha
        this.captchaToken = response.data.captchaToken
      })
    },
    getForgotPassword(param) {
      return postFun('/trade-web/api/forgotPassword', param)
    },
  },
}
</script>
<style lang="scss" scoped>
.reset-success {
  padding-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .success-logo {
    width: 72px;
    height: 72px;
    background-color: #eee;
    margin-bottom: 24px;
  }
  .text {
    color: #999999;
  }
}
</style>