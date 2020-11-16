<template>
  <div class="help-center">
    <BreadCrumbs
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '帮助中心', link: 'helpCenter'}]"
    />
    <section class="background-one">
      <div class="part container news-container">
        <div class="input-container">
          <el-input class="keyword-input" v-model="keyword" placeholder="请输入要搜索的问题"></el-input>
          <el-button type="primary" @click="handleSearch(keyword)">搜索</el-button>
        </div>
        <gray-block>
          <div class="question-container">
            <div class="question-column">
              <div>
                <div class="question-type">基础问题</div>
                <div class="question-divider"></div>
                <question-card2
                  v-for="item in articleList.list1"
                  :title="item.title"
                  :key="item.articleId"
                  :articleId="item.articleId"></question-card2>
              </div>
            </div>
            <div class="question-column">
              <div class="question-type">投票攻略</div>
              <div class="question-divider"></div>
              <question-card2
                v-for="item in articleList.list2"
                :title="item.title"
                :key="item.articleId"
                :articleId="item.articleId"></question-card2>
            </div>
            <div class="question-column">
              <div class="question-type">证书及奖品发放</div>
              <div class="question-divider"></div>
              <question-card2
                v-for="item in articleList.list3"
                :title="item.title"
                :key="item.articleId"
                :articleId="item.articleId"></question-card2>
            </div>
            <div class="question-column">
              <div class="question-type">评审规则</div>
              <div class="question-divider"></div>
              <question-card2
                v-for="item in articleList.list4"
                :title="item.title"
                :key="item.articleId"
                :articleId="item.articleId"></question-card2>
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

        // 搜索
        keyword: '',
        // 问题列表
        articleList: {
          list1: [{
            title: '本设计大赛对参赛者身份有要求吗？',
            articleId: 0,
          },
            {
              title: '这次大赛评审流程是怎么样的？',
              articleId: 1,
            },
            {
              title: '可以拿之前的作品参加比赛吗？',
              articleId: 2,
            },
            {
              title: '可以用两份作品参赛吗？',
              articleId: 3,
            },{
              title: '什么样的作品符合参赛要求？',
              articleId: 4,
            },
            {
              title: '什么样的作品，更容易获奖？',
              articleId: 5,
            },
            {
              title: '怎么知道自己入围初审？',
              articleId: 6,
            },
            {
              title: '最终获奖怎么通知？',
              articleId: 7,
            }],
          list2: [{
            title: '投票时间是怎么安排的？',
            articleId: 8,
          },
            {
              title: '奖项投票的话，每人每天最多能投几票？',
              articleId: 9,
            },
            {
              title: '在哪里可以看到我的作品？',
              articleId: 10,
            },
            {
              title: '怎么获取我的专属拉票分享页？',
              articleId: 11,
            },
            {
              title: '我投稿参赛了，为什么没有看到我的作品？',
              articleId: 12,
            }],
          list3: [{
            title: '如果我获奖了，什么时候可以收到证书和奖品呢？',
            articleId: 13,
          }],
          list4: [],
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 搜索
      handleSearch(keyword) {
        if (!keyword.trim()) {
          this.$message.error('请输入关键词')
          return false
        }
        if (this.search(this.articleList.list1, keyword)) {
          return true
        } else if (this.search(this.articleList.list2, keyword)) {
          return true
        } else if (this.search(this.articleList.list3, keyword)) {
          return true
        } else if (this.search(this.articleList.list4, keyword)) {
          return true
        } else {
          this.$message.error('没有搜索到相关问题')
        }
      },
      search(list, keyword) {
        const reg = new RegExp(keyword)
        const arr = []
        for (let i of list) {
          if (reg.test(i.title)) {
            arr.push(i.articleId)
          }
        }
        if (arr.length > 0) {
          this.$router.push({
            name: 'question',
            query: {
              articleId: arr[0]
            }
          })
          return true
        } else {
          return false
        }
      }
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

        .question-divider {
          width: 50px;
          height: 3px;
          background: #FF0000;
          margin: 14px 0 16px 22px;
        }
      }
    }
  }

</style>