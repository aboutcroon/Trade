<template>
  <div class="net-legend">
    <!-- 可以替换成iconfont -->
    <div class="net-legend-icon" :style="{'background-color': beforeColor}">
    </div>
    <div class="legend-title">{{ title }}</div>
    <div class="legend-message" v-if="showMessage"><span>{{ message }}</span></div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '默认数据'
      },
      message: {
        type: String,
        default: '超出正常值'
      },
      showMessage: {
        type: Boolean,
        default: false
      },
      beforeColor: {
        type: String,
        default: '#BF495A'
      },
    }
  }
</script>
<style lang="scss">
  .net-legend {
    position: relative;
    display: inline-block;
    padding-left: 15px;
    height: auto;
    color: #555466;

    .net-legend-icon {
      position: absolute;
      left: 0;
      top: 5px;
      height: 9px;
      width: 9px;
      border-radius: 5px;
      background-color: inherit;
    }

    .legend-title {
      height:20px;
      font-size:14px;
      font-weight:400;
      color: #485465;
      line-height:20px;
    }

    .legend-message {
      height:20px;
      font-size:14px;
      font-weight:500;
      color:#BF495A;
      line-height:20px;
    }
  }
</style>
