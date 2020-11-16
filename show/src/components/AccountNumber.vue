<template>
  <div class="account-number">
    <div class="mask">
      <header class="navbar container">
        <div class="logo">
          <router-link to="/"
            ><img :src="require('@/assets/img/logo.png')" alt=""
          /></router-link>
        </div>
        <div class="button-list">
          <router-link to="/" class="button-red return-button"
            >回到首页</router-link
          >
          <router-link to="/helpCenter" class="help-button">帮助中心</router-link>
        </div>
      </header>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <span
          >copyright&copy;2020.shangbiaotong&nbsp;&nbsp;All rights reserved.
          京ICP备2020040320号</span
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.account-number {
  background: url("../assets/img/account_numberbackground.jpg");
  background-position: center center;
  background-size: cover;
}
.mask {
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 36px;
  .logo img {
    width: 93px;
  }
}
.content {
  height: calc(100vh - 173px);
  min-height: 700px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.footer {
  text-align: center;
  min-height: 60px;
  line-height: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  color: rgba(255, 255, 255, 0.7);
}
</style>