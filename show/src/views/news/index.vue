<template>
  <div class="news">
    <BreadCrumbs
      title-right=""
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '新闻中心', link: 'news'}]"
    />
    <section class="background-one">
      <div class="part container news-container">
        <news-card
          v-for="item in articleList"
          :articleId="item.articleId"
          :key="item.articleId"
          :day="item.day"
          :month="item.month"
          :title="item.title"
          :description="item.description"
          class="news-card-item"></news-card>
        <pagination :page="1" :total="total" @pagination="getList"></pagination>
      </div>
    </section>
  </div>
</template>
<script>
  import SubTitle from "@/components/SubTitle.vue"; // 小标题
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import NewsCard from "./components/NewsCard.vue";
  import Pagination from "./components/ElPagination.vue";
  import {getFun, postFun} from '@/api/transit.js'
  import time from '@/api/time.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      NewsCard,
      Pagination
    },
    data() {
      return {
        pageSize: 5,
        pageNumber: 1,
        total: 5,
        backgroundUrl: require("@/assets/img/news_background.jpg"),
        //新闻列表
        articleList: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 翻页
      handlePageNumber(pageNumber) {
        this.pageNumber = pageNumber
        this.getList()
      },
      // 加载数据
      getList () {
        const param = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
        this.getNewsList(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const dataList = response.data.list
            const tmpList = []
            this.total = response.data.totalRow
            for (let item of dataList) {
              const articleTime = item.createTime * 1000
              const date = new Date(articleTime)
              const month = time.timestampToTime(articleTime, 'DT2').substr(0, 7)
              const obj = {
                articleId: item.articleId,
                day: date.getDay(),
                month: month,
                title: item.articleTitle,
                description: item.articleSummary
              }
              tmpList.push(obj)
            }
            this.articleList = tmpList
          } else {
            this.$message.error(response.message)
          }
        })
      },
      getNewsList(param) {
        return postFun('/trade-web/api/article/pageList', param)
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/palette.scss";

  .background-one {
    min-width: $min-container;
  }

  .news {
    .news-card-item {
      margin-top: 30px;
    }

    .news-container {
      padding: 20px 20px 46px 20px;
    }
  }

</style>