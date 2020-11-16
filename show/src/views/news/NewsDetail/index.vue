<template>
  <div class="news">
    <BreadCrumbs
      title-right=""
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '新闻中心', link: 'news'},{title: '新闻详情', link: 'newsDetail'}]"
    />
    <section class="background-one">
      <div class="part container news-news-detail">
        <div class="news-detail-left">
          <div class="news-detail-container">
            <h2>{{title}}</h2>
            <div v-html="detail">

            </div>
          </div>
          <div class="news-detail-link">
            <div class="news-link">
              <svg class="icon news-detail-icon" aria-hidden="true">
                <use xlink:href="#icon_new_left"></use>
              </svg>
              <span class="news-link-title">我是上一篇文章</span>
            </div>
            <div class="news-link-center"></div>
            <div class="news-link">
              <span class="news-link-title">我是下一篇文章</span>
              <svg class="icon news-detail-icon" aria-hidden="true">
                <use xlink:href="#icon_new_right"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="news-detail-line1">
          <div class="news-card-red-line"></div>
        </div>
        <div class="news-detail-right">
          <div>
            <div class="news-detail-title">热点新闻</div>
            <div class="news-detail-line2"></div>
            <div>
              <list-item
                v-for="item in articleList"
                :key="item.articleId"
                :title="item.title"
                :isSelected="item.isSelected"
                @handleTitleClick="handleTitleClick(item.articleId)"></list-item>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import ListItem from "../components/NewsDetailListItem.vue";
  import SubTitle from "@/components/SubTitle.vue"; // 小标题
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      ListItem
    },
    props: {
      value: {
        default: '1'
      },
    },
    data() {
      return {
        backgroundUrl: require("@/assets/img/news_background.jpg"),
        // 视接入富文本的情况放 标题 和 时间 部分
        title: '',
        detail: '',

        articleId: '',
        // 热门新闻列表
        articleList: [],
      }
    },
    mounted() {
      this.getInitData()
    },
    methods: {
      getInitData() {
        this.articleId = this.$route.query.articleId
        this.getArticleData(this.articleId)
        this.getNewsListData()
      },
      getArticleData(articleId) {
        const param = {
          articleId: articleId
        }
        this.getArticle(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const data = response.data
            this.title = data.articleTitle
            this.detail = data.articleContent
          } else {
            this.$message.error(response.message)
          }
        })
      },
      getNewsListData() {
        const param = {
          pageSize: 6,
          pageNumber: 1
        }
        this.getNewsList(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const dataList = response.data.list
            const tmpList = []
            for (let item of dataList) {
              const obj = {
                articleId: item.articleId,
                title: item.articleTitle,
                isSelected: item.articleId === this.articleId
              }
              tmpList.push(obj)
            }
            this.articleList = tmpList
          } else {
            this.$message.error(response.message)
          }
        })
      },
      // 热点新闻列表点击
      handleTitleClick(articleId) {
        this.articleId = articleId
        this.getArticleData(articleId)
        this.getNewsListData()
      },

      getNewsList(param) {
        return postFun('/trade-web/api/article/pageList', param)
      },
      getArticle(param) {
        return postFun('/trade-web/api/article/listByArticleId', param)
      }
    }
  }
</script>
<style lang="scss">
  .news-news-detail {
    position: relative;
    min-height: 600px;
    display: flex;
    padding: 0;

    .news-detail-left {
      position: relative;
      display: inline-flex;
      width: 70%;
      padding: 32px 70px 50px 20px;

      .news-detail-link {
        position: absolute;
        display: flex;
        height: 15px;
        width: calc(100% - 30px);
        bottom: 35px;
        font-size: 14px;
        color: #999999;
        line-height: 15px;
        padding-right: 70px;

        .news-detail-icon {
          width: 21px;
          height: 21px;
          margin-top: -4px;
        }

        .news-link-title {
          margin: 0 18px;
        }

        .news-link-center {
          display: inline-flex;
          flex-grow: 1;
        }
        .news-link {
          display: inline-flex;
          cursor: pointer;
        }
        .news-link:hover {
          color: #ff0000;
        }
      }
    }
    /* 富文本样式 */
    .news-detail-container {
      p {
        font-family: SourceHanSansCN;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
      }
      .news-detail-time {
        color: #999999;
        line-height: 52px;
      }
    }

    .news-detail-line1 {
      position: absolute;
      width: 3px;
      left: 70%;
      top: 0;
      bottom: 0;
      border-left: 1px solid #F0F0F0;

      .news-card-red-line {
        margin-top: 69px;
        width: 3px;
        height: 38px;
        background-color: #ff0000;
      }
    }

    .news-detail-line2 {
      margin: 23px 0 15px 0;
      height: 1px;
      width: 367px;
      background-color: #F0F0F0;
    }

    .news-detail-right {
      display: inline-flex;
      width: 30%;
      padding: 70px 0 40px 50px;

      .news-detail-title {
        height: 30px;
        font-size: 30px;
        line-height: 30px;
        font-weight: bold;
        color: #333333;
      }
    }

  }
</style>