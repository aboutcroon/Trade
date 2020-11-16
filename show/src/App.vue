<template>
  <div id="app">
    <router-view v-if="refresh" />
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { getSaveToken } from '@/api/token.js'
export default {
  name: 'app',
  provide() { // 实现页面刷新
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      refresh: true
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'auth', 'token'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapMutations(['getToken']),
    ...mapActions(['getUserInfo']),
    initData() {
      /* 如果用户登录，则请求登录信息 */
      const tokenName = process.env.VUE_APP_TOKENNAME
      const token = getSaveToken(tokenName)
      if(token) {
        this.getToken()
        this.getUserInfo()
      }
    },
    reload() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true
      });
    }
  }
}
</script>

<style>
</style>
