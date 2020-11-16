<template>
  <div class="sub-title" :class="{ 'mini-down': miniDown }">
    <div class="content">
      <h2 class="text">{{ title }}</h2>
      <p class="english-name">{{ english }}</p>
    </div>
    <div class="more">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /* 标题 */
    title: {
      default: '小标题'
    },
    /* 英文名 */
    english: {
      default: 'subtitle'
    },
    /* 更小的间距 */
    miniDown: {
      type: Boolean,
      default: false
    },
  }
}
</script>
<style lang="scss" scoped>
.sub-title {
  padding-top: 50px;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sub-title .text {
  color: #ff0000;
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 500;
}
.sub-title .english-name {
  text-transform: uppercase;
  color: #cccccc;
  font-size: 18px;
}
.sub-title.mini-down {
  padding-bottom: 32px;
}
</style>