<template>
  <div class="guest-card">
    <div class="content">
      <div class="card-avatar">
        <div class="eventName" v-show="dataObj.eventName">
          <span class="eventLabel">{{dataObj.eventName}}</span>
          <div class="eventBack"></div>
        </div>
        <div class="img-container" @click="getWorks">
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
          <svg class="icon trade-item-icon" aria-hidden="true" @click="good" style="cursor: pointer">
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
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "works",
    props: {
      dataObj: {
        type: Object
      },
    },
    computed: {
      ...mapGetters(['userinfo', 'auth'])
    },
    methods: {
      getWorks() {
        this.$router.push({
          name: 'exhibitionWorkDetail', // 跳转的页面
          query: {
            worksId: this.dataObj.worksId
          }
        })
      },
      // 点赞
      good() {
        if(this.userinfo.roleType) {
          this.$message.success('假装点赞成功了')
        } else {
          this.$message.error('点赞前请先登录账号')
        }
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
      cursor: pointer;
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
    position: absolute;
    top: 14px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;


    .eventLabel {
      vertical-align: top;
      display: inline-block;
      background: #FF0000;
      line-height: 30px;
      padding: 0 10px;
    }

    .eventBack {
      vertical-align: top;
      display: inline-block;
      line-height: 0;
      width: 0;
      height: 0 ;
      border-top: 15px solid red;
      border-right: 10px solid transparent;
      border-bottom: 15px solid red;
    }
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