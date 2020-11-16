<template>
  <div class="login">
    <div class="login-item">
      <h2 class="login-title">我是登录</h2>
      <div>
        <div class="row">
          <div class="form-label">用户名：</div>
          <input type="text" v-model="form.username" />
        </div>
        <div class="row">
          <div class="form-label">密码：</div>
          <input type="text" v-model="form.password" />
        </div>
        <div class="row">
          <div class="form-label">验证码：</div>
          <input type="text" v-model="form.captcha" />
          <div class="verification-code">
            <img :src="codeUrl" alt="" @click="getVerificationCode" />
          </div>
        </div>
        <div class="row">
          <button @click="clickLogin">点击登录</button>
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
        password: '',
        captcha: '',
        captchaToken: '',
      },
      codeUrl: '',
      token: '',
    }
  },
  mounted() {
    this.getVerificationCode()
  },
  methods: {
    clickLogin() {
      const { username, password, captcha, captchaToken } = this.form
      this.postPasswordLogin({ username, password, captcha, captchaToken }).then(response => {
        console.log('# response')
        console.log(response)
        if(response.code === '200' || response.code === 200) {
          this.token = response.data.token
        }
      })
    },
    getVerificationCode() {
      getFun('/trade-web/api/captcha').then(response => {
        this.codeUrl = 'data:image/png;base64,' + response.data.captcha
        this.form.captchaToken = response.data.captchaToken
      })
    },
    postPasswordLogin(param) {
      return postFun('/trade-web/api/passwordLogin', param)
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

.login-item {
  width: 500px;
  margin: 0 auto;
}
.form-label {
  width: 100px;
  text-align: right;
}
.login input {
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