<template>
  <div class="register">
    <div class="register-item">
      <h2 class="register-title">我是注册</h2>
      <div>
        <div class="row">
          <div class="form-label">用户名：</div>
          <input type="text" v-model="form.username" />
        </div>
        <div class="row">
          <div class="form-label">手机号：</div>
          <input type="text" v-model="form.mobile" />
        </div>
        <div class="row">
          <div class="form-label">密码：</div>
          <input type="text" v-model="form.password" />
        </div>
        <div class="row">
          <div class="form-label">确认密码：</div>
          <input type="text" v-model="form.confirmPassword" />
        </div>
        <div class="row">
          <div class="form-label">验证码：</div>
          <input type="text" v-model="form.captcha" />
          <div class="verification-code">
            <img :src="codeUrl" alt="" @click="getVerificationCode" />
          </div>
        </div>
        <div class="row">
          <button @click="clickRegister">点击注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFun, postFun } from '@/api/transit.js'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        roleName: 'user',
        captcha: '',
        captchaToken: '',
      },
      codeUrl: '',
    }
  },
  mounted() {
    this.getVerificationCode()
  },
  methods: {
    clickRegister() {
      const { username, mobile, password, confirmPassword, roleName, captcha, captchaToken } = this.form
      this.postRegister({ username, mobile, password, confirmPassword, roleName, captcha, captchaToken }).then(response => {
        console.log('# response')
        console.log(response)
      })
    },
    getVerificationCode() {
      getFun('/trade-web/api/captcha').then(response => {
        this.codeUrl = 'data:image/png;base64,' + response.data.captcha
        this.form.captchaToken = response.data.captchaToken
      })
    },
    postRegister(param) {
      return postFun('/trade-web/api/register', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-child {
    justify-content: center;
    margin-bottom: 0;
  }
}
.form-label {
  width: 100px;
  text-align: right;
}
.register-item {
  width: 500px;
  margin: 0 auto;
}
.register input {
  max-width: 120px;
}
.verification-code {
  cursor: pointer;
  margin-left: 10px;
  img {
    width: 120px;
  }
}
</style>