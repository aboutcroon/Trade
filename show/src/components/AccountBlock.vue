<template>
  <div class="account-block">
    <div class="account-title">{{ title }}</div>
    <div class="account-content">
      <slot></slot>
    </div>
    <div class="account-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: '标题'
    }
  }
}
</script>
<style lang="scss" scoped>
.account-block {
  padding: 30px 60px;
  background-color: #ffffff;
  min-width: 500px;
}
.account-title {
  line-height: 1;
  text-align: center;
  color: #333333;
  font-size: 28px;
  margin-bottom: 28px;
}
.account-content {
  min-height: 365px;
}
</style>