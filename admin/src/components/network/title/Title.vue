<template>
  <div class="net-title-item">
    <div class="title-vertical" :style="{'background-color': beforeColor}"></div>
    <div class="title-item-title">
      <h3 class="title-item-h3">{{ title }}</h3>
    </div>
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
  .net-title-item {
    min-width: 258px;
    background-color: #F6F7FC;
    padding: 12px 8px;
    height: 42px;
    border-radius: 6px;
    font-family:PingFangSC-Semibold,PingFang SC;
    .title-vertical {
      display: inline-block;
      vertical-align: top;
      height: 20px;
      width: 6px;
      border-radius: 3px;
    }
    .title-item-title {
      display: inline-block;
      vertical-align: top;
      padding-left: 14px;
      font-size: 14px;
      line-height: 20px;
      .title-item-h3 {
        color: #141C49;
        font-size: 14px;
        margin-bottom: 4px;
      }
    }
  }
</style>
