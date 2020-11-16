<template>
  <div class="news-news-card" @click="getNews">
    <div class="news-card-left">
      <div>
        <div class="news-card-day">{{day}}</div>
        <div class="news-card-line1"></div>
        <div class="news-card-month">{{month}}</div>
      </div>
    </div>
    <div class="news-card-line2"></div>
    <div class="news-card-center">
      <div>
        <div class="news-card-title">{{title}}</div>
        <div class="news-card-info">{{description}}</div>
      </div>
    </div>
    <div class="news-card-right">
      <svg class="icon news-card-icon" aria-hidden="true">
        <use xlink:href="#icon_new_details_right"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      articleId: {
        default: '1'
      },
      day: {
        default: '1'
      },
      month: {
        default: '2020-11'
      },
      title: {
        default: '新闻标题'
      },
      description: {
        default: '我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述'
      }
    },
    methods: {
      getNews() {
        this.$router.push({
          name: 'newsDetail', // 跳转的页面
          query: {
            articleId: this.articleId
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .news-news-card {
    width: 100%;
    height: 162px;
    display: flex;
    padding: 45px 88px 39px 47px;
    background: #F9F9F9;
    cursor: pointer;

    .news-card-left {
      display: inline-flex;
      height: 78px;
      width: 136px;
      text-align: center;

      .news-card-day {
        display: block;
        height: 36px;
        margin-top: 5px;
        font-size: 36px;
        line-height: 36px;
        color: #333333;
        font-weight: bold;
      }

      .news-card-line1 {
        display: block;
        height: 3px;
        width: 22px;
        margin: 9px 47px;
        background: #E4E4E4;
      }

      .news-card-month {
        display: block;
        font-size: 16px;
        color: #BBBBBB;
        line-height: 16px;
      }
    }

    .news-card-line2 {
      width: 1px;
      height: 75px;
      margin-top: 2px;
      background: #E6E6E6;
    }

    .news-card-center {
      display: inline-flex;
      height: 78px;
      width: 500px;
      flex-grow: 1;
      padding: 0 158px 0 44px;

      .news-card-title {
        width: 100%;
        height: 24px;
        font-size: 20px;
        line-height: 24px;
        font-weight: bold;
        color: #333333;
        overflow: hidden;
      }
      .news-card-info {
        width: 100%;
        max-height: 37px;
        margin-top: 22px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
        overflow: hidden;

      }
    }

    .news-card-right {
      display: inline-flex;
      height: 78px;
      width: 49px;

      .news-card-icon {
        margin-top: 14px;
        width: 49px;
        height: 46px;
        color: #E6E6E6;
      }
    }

    &:hover {
      .news-card-line1 {
        background: #FF0000;
      }
      .news-card-title {
        color: #FF0000;
      }
      .news-card-icon {
        color: #FF0000;
      }
    }
  }
</style>