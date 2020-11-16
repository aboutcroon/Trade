<template>
  <div class="guest-card" @click="getWorks">
    <div class="content">
      <div class="card-avatar">
        <span class="eventName">{{dataObj.eventName}}</span>
        <div class="img-container">
          <img :src="dataObj.picture" alt class="img-div"/>
        </div>
        <div class="box">
          <p class="name">{{dataObj.name}}</p>
        </div>
        <div class="starBox">
          <span class="trade-item-number">设计师：</span>
          <span class="trade-item-number">{{dataObj.author}}</span>
        </div>
        <div class="btnBox">
          <svg class="icon trade-item-icon" aria-hidden="true">
            <use xlink:href="#icon_like"></use>
          </svg>
          <span class="trade-item-number">{{dataObj.great}}</span>
          <svg class="icon trade-item-icon" aria-hidden="true" style="padding-top: 2px;">
            <use xlink:href="#icon_view"></use>
          </svg>
          <span class="trade-item-number">{{dataObj.visit}}</span>
        </div>
      </div>
    </div>
    <router-link to="exhibitionWorkDetail">

    </router-link>
  </div>
</template>
<script>
  export default {
    name: "works",
    props: {
      dataObj: {
        type: Object
      }
    },
    methods: {
      getWorks() {
        this.$router.push({
          name: 'exhibitionWorkDetail', // 跳转的页面
          query: {
            worksId: this.dataObj.worksId
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  .guest-card {
    overflow: hidden;
    position: relative;
    width: 25%;
    float: left;
    cursor: pointer;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }

  .card-avatar {
    transition: all 0.1s;
    position: relative;
    width: 320px;
    height: 327px;
    display: inline-block;
    overflow: hidden;
    background: #fff;
    margin-bottom: 15px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 8px 0 rgba(183, 183, 183, 0.3);

    .img-container {
      width: 320px;
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      .img-div {
        display: inline-flex;
        max-width: 320px;
        max-height: 240px;
      }
    }
  }

  .card-name {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .card-position {
    font-size: 18px;
    font-weight: 400;
    opacity: 0.5;
  }

  .eventName {
    height: 30px;
    background: #000000;
    opacity: 0.12;
    position: absolute;
    top: 0;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding: 0 10px;
  }

  .box {
    padding: 0 15px;
  }

  .name {
    font-size: 18px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 52px;
  }

  .starBox {
    position: absolute;
    bottom: 10px;
    left: 15px;
  }

  .trade-item-icon {
    width: 16px;
    height: 16px;
  }

  .trade-item-number {
    margin: 0 16px 0 6px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;

  }

  .btnBox {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .btn {
    height: 20px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    display: inline-block;
    padding-left: 1px;
    cursor: pointer;
  }

  .c00b3f5 {
    color: #00b3f5;
    border-bottom: 1px solid #00b3f5;
  }

  .cFF0000 {
    color: #ff0000;
    border-bottom: 1px solid #ff0000;
  }

  .btn:nth-child(2n + 2) {
    margin: 0 8px 0 8px;
  }
</style>