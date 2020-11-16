<template>
  <div class="net-total-item">
    <div class="total-vertical" :style="{'background-color': beforeColor}"></div>
    <div class="total-item-title">
      <h3 class="total-item-h3">{{ title }}</h3>
      <div class="total-item-description">{{ description }}</div>
    </div>
    <div class="total-dotted-line"></div>
    <div class="total-item-number"><span>{{ several }}</span></div>
  </div>
</template>
<script>
export default {
  // data(){
  //   return {

  //   }
  // },
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    description: {
      type: String,
      default: '默认描述'
    },
    several: {
      type: String,
      default: '0个'
    },
    beforeColor: {
      type: String,
      default: '#7E7CA3'
    },
  }
}
</script>
<style lang="scss">
h3 {
  margin: 0;
}
.net-total-item {
  min-width: 258px;
  background-color: #F6F7FC;
  padding: 12px 8px;
  min-height: 80px;
  border-radius: 6px;
  display: inline-flex;
  flex-grow: 1;
  margin: 0 12px;
  font-family:PingFangSC-Semibold,PingFang SC;
  .total-vertical {
    height: 50px;
    width: 6px;
    margin-top: 3px;
    margin-bottom: 3px;
    border-radius: 3px;
  }
  .total-item-title {
    padding-left: 14px;
    padding-top: 6px;
    font-size: 14px;
    line-height: 20px;
    .total-item-h3 {
      color: #141C49;
      font-size: 14px;
      margin-bottom: 4px;
      min-width: 86px;
    }
    .total-item-description {
      color: #ABB6CD;
    }
  }
  .total-dotted-line {
    margin-top: 28px;
    margin-left: auto;
    margin-right: 5px;
    width: 40px;
    border-top: 1px dashed #D7D8DD;
  }
  .total-item-number {
    font-size:18px;
    font-weight:600;
    color:rgba(73,90,191,1);
    line-height:25px;
    min-width:56px;
    max-width: 150px;
    padding: 0 5px;
    height:56px;
    background:rgba(231,234,246,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
