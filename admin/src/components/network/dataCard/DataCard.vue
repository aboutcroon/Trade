<template>
  <div class="net-data-card">
    <!-- 可以替换成iconfont -->

    <div class="data-card-icon-border">
      <span class="icon iconfont iconcircle " />
    </div>
    <div class="data-card-data">{{ data }}</div>
    <div class="data-card-description"><span>{{ description }}</span></div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: String,
        default: '默认数据'
      },
      description: {
        type: String,
        default: '默认描述'
      },
    }
  }
</script>
<style lang="scss">
  .net-data-card {
    position: relative;
    display: inline-block;
    padding-left: 26px;
    height: 50px;
    color: #555466;

    .data-card-icon-border {
      position: absolute;
      left: 0;
      top: 16px;
      height: 18px;
      width: 18px;
    }

    .data-card-data {
      height: 25px;
      font-size: 18px;
      font-weight: 700;
      color: #141C49;
      line-height: 25px;
    }

    .data-card-description {
      margin-top: 4px;
      height: 20px;
      font-size: 14px;
      font-weight:400;
      color: #555466;
      line-height:20px;
    }
  }
</style>
