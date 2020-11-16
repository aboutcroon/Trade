<template>
  <div class="help-center">
    <BreadCrumbs
      title="帮助中心"
      title-right=""
      description=" "
      :url="backgroundUrl"
    />
    <section class="background-one">
      <div class="part container news-container">
        <div class="input-container">
          <el-input class="keyword-input"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <gray-block>
          <div class="question-container">
            <div class="question-column">
              <div>
                <div class="question-type">法律法规</div>
                <div class="question-divider"> </div>
                <question-card2 title="问题标题q"></question-card2>
                <question-card2 title="问题标题1"></question-card2>
                <question-card2 title="问题标题2问题标题2问题标题2问题标题2问题标题2问题标题2"></question-card2>
                <question-card2 title="问题标题3"></question-card2>
                <question-card2 title="问题标题4"></question-card2>
              </div>
            </div>
            <div class="question-column">
              <div class="question-type">大赛相关问题分类</div>
              <div class="question-divider"></div>
              <question-card2 title="问题标题q"></question-card2>
              <question-card2 title="问题标题1"></question-card2>
              <question-card2 title="问题标题2问题标题2问题标题2问题标题2问题标题2问题标题2"></question-card2>
              <question-card2 title="问题标题3"></question-card2>
              <question-card2 title="问题标题4问题标题3"></question-card2>
              <question-card2 title="问题标题3问题标题3问题标题3"></question-card2>
              <question-card2 title="问题标题4"></question-card2>
            </div>
            <div class="question-column">
              <div class="question-type">大赛相关问题分类</div>
              <div class="question-divider"></div>
              <question-card2 title="问题标题q"></question-card2>
              <question-card2 title="问题标题1"></question-card2>
              <question-card2 title="问题标题2问题标题2问题标题2问题标题2问题标题2问题标题2"></question-card2>
              <question-card2 title="问题标题3"></question-card2>
              <question-card2 title="问题标题4"></question-card2>
            </div>
            <div class="question-column">
              <div class="question-type">大赛相关问题分类</div>
              <div class="question-divider"></div>
              <question-card2 title="问题标题q"></question-card2>
              <question-card2 title="问题标题1"></question-card2>
              <question-card2 title="问题标题2问题标题2问题标题2问题标题2问题标题2问题标题2"></question-card2>
              <question-card2 title="问题标题3"></question-card2>
              <question-card2 title="问题标题4"></question-card2>
            </div>
          </div>
        </gray-block>
      </div>
    </section>

  </div>
</template>
<script>
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import GrayBlock from "../user/components/GrayBlock.vue";
  import QuestionCard2 from "./components/QuestionCard2.vue";
  export default {
    components: {
      BreadCrumbs,
      GrayBlock,
      QuestionCard2
    },
    data() {
      return {
        pageSize: 5,
        pageNumber: 1,
        total: 5,
        backgroundUrl: require("@/assets/img/help_background.jpg"),
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
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/palette.scss";

  .background-one {
    min-width: $min-container;
    padding-bottom: 50px;
  }

  .help-center {
    .input-container {
      display: flex;
      justify-content: center;
      margin: 20px 0 30px 0;

      .keyword-input {
        width: 410px;
        margin-right: 24px;
      }

      .el-button {
        width: 126px;
        height: 50px;
      }
    }

    .question-container {
      display: flex;
      justify-content: space-between;
      margin: 0 35px;

      .question-column {
        width: 20%;

        .question-type {
          padding-left: 22px;
          height: 20px;
          font-size: 16px;
          font-family: SourceHanSansCN;
          font-weight: 500;
          color: #333333;
        }

        .question-divider{
          width: 50px;
          height: 3px;
          background: #FF0000;
          margin: 14px 0 16px 22px;
        }
      }
    }
  }

</style>