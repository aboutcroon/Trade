<template>
  <div class="news">
    <BreadCrumbs
      title="问题中心"
      title-right=""
      description="美感与设计的结合，尽在此时"
      :url="backgroundUrl"
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
              <span class="news-link-title">大赛有哪些奖项</span>
            </div>
            <div class="news-link-center"></div>
            <div class="news-link">
              <span class="news-link-title">大赛没有哪些奖项</span>
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
            <div class="news-detail-title">常问问题</div>
            <div class="news-detail-line2"></div>
            <div>
              <question-card
                v-for="item in articleList"
                :key="item.articleId"
                :title="item.title"
                :isSelected="item.isSelected"
                @handleTitleClick="handleTitleClick(item.articleId)"></question-card>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import QuestionCard from "../components/QuestionCard.vue";
  import SubTitle from "@/components/SubTitle.vue"; // 小标题
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      QuestionCard
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
        title: '大赛的作品设计过程中注意以下情况不得作为商标使用?',
        detail: '<p>1）同中华人民共和国的国家名称、国旗、国徽、国歌、军旗、军徽、军歌、勋章等相同或者近似的，以及同中央国家机关的名称、标志、所在地特定地点的名称或者标志性建筑物的名称、图形相同的；</p>' +
        '<p>2）同外国的国家名称、国旗、国徽、军旗等相同或者近似的，但经该国政府同意的除外；</p>' +
        '<p>3）同政府间国际组织的名称、旗帜、徽记等相同或者近似的，但经该组织同意或者不易误导公众的除外；</p>' +
        '<p>4）与表明实施控制、予以保证的官方标志、检验印记相同或者近似的，但经授权的除外；</p>' +
        '<p>5）同“红十字”、“红新月”的名称、标志相同或者近似的；</p>' +
        '<p>6）带有民族歧视性的；</p>' +
        '<p>7）带有欺骗性，容易使公众对商品的质量等特点或者产地产生误认的；</p>' +
        '<p>8）有害于社会主义道德风尚或者有其他不良影响的。</p>' +
        '<p>县级以上行政区划的地名或者公众知晓的外国地名，不得作为商标。但是，地名具有其他含义或者作为集体商标、证明商标组成部分的除外；已经注册的使用地名的商标继续有效。</p> ',
        articleId: '',
        // 常问问题列表
        articleList: [{
          articleId: '1',
          title: '大赛有哪些奖项',
          isSelected: false,
        },{
          articleId: '2',
          title: '大赛有哪些奖项',
          isSelected: false,
        },{
          articleId: '3',
          title: '大赛有哪些奖项',
          isSelected: false,
        },{
          articleId: '4',
          title: '大赛有哪些奖项',
          isSelected: false,
        },{
          articleId: '5',
          title: '大赛有哪些奖项',
          isSelected: false,
        },{
          articleId: '6',
          title: '大赛有哪些奖项',
          isSelected: false,
        }],
      }
    },
    mounted() {
//      this.getInitData()
    },
    methods: {
      getInitData() {
        this.articleId = this.$route.query.articleId
        this.getArticleData(this.articleId)
        this.getNewsListData()
      },
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

      h2 {
        margin-bottom: 30px;
      }
      p {
        font-size: 14px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
      }

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
          margin: 0 18px 30px 18px;
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