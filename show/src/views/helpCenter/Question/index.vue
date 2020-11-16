<template>
  <div class="news">
    <BreadCrumbs
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '帮助中心', link: 'helpCenter'},{title: '问题中心', link: 'question'}]"
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
            <div class="news-link" @click="handleQuestionClick(articleDataMap[articleId].last)">
              <svg class="icon news-detail-icon" aria-hidden="true">
                <use xlink:href="#icon_new_left"></use>
              </svg>
              <span class="news-link-title">{{articleDataMap[articleDataMap[articleId].last].title}}</span>
            </div>
            <div class="news-link-center"></div>
            <div class="news-link" @click="handleQuestionClick(articleDataMap[articleId].next)">
              <span class="news-link-title">{{articleDataMap[articleDataMap[articleId].next].title}}</span>
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
                :isSelected="item.articleId == articleId"
                @handleQuestionClick="handleQuestionClick(item.articleId)"></question-card>
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
        title: '',
        detail: '',
        articleId: '',
        // 常问问题列表
        articleList: [{
          articleId: 0,
          title: '本设计大赛对参赛者身份有要求吗？',
        }, {
          articleId: 2,
          title: '可以拿之前的作品参加比赛吗？',
        }, {
          articleId: 3,
          title: '可以用两份作品参赛吗？',
        }, {
          articleId: 5,
          title: '什么样的作品，更容易获奖？',
        }, {
          articleId: 10,
          title: '在哪里可以看到我的作品？',
        }, {
          articleId: 13,
          title: '如果我获奖了，什么时候可以收到证书和奖品呢？',
        }],
        articleDataMap: {
          0: {
            title: '本设计大赛对参赛者身份有要求吗？',
            detail: '<p>本次设计大赛是针对</p>' +
            '<p>1、商标权利人；</p>' +
            '<p>2、覆盖全国各个省、市自治区的专业设计人员；</p>' +
            '<p>3、全国各大高校；</p>' +
            '<p>4、各设计培训机构及专业的设计团体；</p>' +
            '<p>5、非设计专业的设计爱好者；</p>' +
            '<p>只要注册了大赛账号并完成认证即可报名投稿参赛哦。<a href="/user">（已完成认证，去投稿>>）</a></p>',
            last: 13,
            next: 1,
          },
          1: {
            title: '这次大赛评审流程是怎么样的？',
            detail: '<p>此次大赛主题为：乘风创业，破浪创新，世界互联中国梦。</p>' +
            '<p>大赛将通过报名投稿、预审、初赛投票+专业评审打分、复赛投票+专业评审打分、评审评委打分结果公布这4个阶段评选出设计大赛奖项，具体流程如下：</p>' +
            '<p>1、报名投稿阶段（2020年12月04日-2021年1月17日）</p>' +
            '<p>2、预审阶段（2021年1月18日-2021年1月22日）对作品进行预审，符合大赛参赛标准作品进入初审。</p>' +
            '<p>3、初审阶段（2021年1月24日-2021年1月28日）-进入投票阶段参赛者不支持重新投稿</p>' +
            '<p>预赛环节通过20%人气投票，80%专业评审的选拔机制，选出作品强进入复赛。</p>' +
            '<p>专业评审将以基本要求（20分）、品牌理念（20分）、创意概念（20分）、视觉表达（20分）四个评审维度进行综合评分。</p>' +
            '<p>复审名单公示，排名不分先后。</p>' +
            '<p>4、初审入围通知（2021年1月22日-2021年1月23日）通知初审作品入围 </p>' +
            '<p>5、复赛阶段（2021年1月24日-2021年1月28日）复赛阶段通过20%人气投票，80%专业评审的选拔机制，评选出最终所有奖项。 </p>' +
            '<p>特别提示：进入复赛阶段后，最佳人气奖将100%通过投票选出，即复赛投票排名第一即可获得最佳人气奖，可同时评选上其余奖项。</p>' +
            '<p>5、决赛获奖公示（2021年2月1日-2021年2月5日）最终获奖名单将会在2021年2月1日公布。 </p>' +
            '<p>地理标志类：</p>' +
            '<p>“崇礼好礼”崇礼地理标志升级：金奖1名、银奖3名、铜奖5名、优秀奖。 </p>' +
            '<p>商标类： </p>' +
            '<p>（一）创意设计奖：金奖3名、银奖5名、铜奖8名、优秀奖； </p>' +
            '<p>（二）设计新秀奖：金奖3名、银奖5名、铜奖8名、优秀奖； </p>' +
            '<p>（三）商标应用奖：金奖3名、银奖5名、铜奖8名、优秀奖； </p>' +
            '<p>（四）最佳人气奖1名； </p>' +
            '<p>（五）最佳组织奖3个； </p>' +
            '<p>平台循环展示大赛获奖作品。</p>',
            last: 0,
            next: 2,
          },
          2: {
            title: '可以拿之前的作品参加比赛吗？',
            detail: '<p>参赛作品须为本人原创作品，围绕大赛主题，可以选用自己之前设计的作品参赛。</p>',
            last: 1,
            next: 3,
          },
          3: {
            title: '可以用两份作品参赛吗？',
            detail: '<p>参赛者每人每个奖项可提交3份作品。每幅作品可重复提交一次，最终参赛作品以最后一次上传作品为准哦。</p>',
            last: 2,
            next: 4,
          },
          4: {
            title: '什么样的作品符合参赛要求？',
            detail: '<p>1、投稿作品分为原创类、已有商标升级类。</p>' +
            '<p>2、作品可包括文字、图形、字母、数字、三维标志、颜色组合以及上述要素组合，设计风格及表现形式不限，参赛者可自由发挥，要求作品需创意独特、构思精巧，文化内涵丰富，视觉冲击力强。</p>' +
            '<p>3、每件参赛作品需注明作品参赛奖项，明确指定该作品适用的商品或服务类别，并简要说明商标含义和设计构思，字数500字以下。</p>' +
            '<p>4、作品符合《中华人民共和国商标法》的相关规定，并可以作为商标注册并使用。参赛者需提前自查作品能否注册，若作品入围后未能通过排查审核，则不能进入下一轮评奖环节。</p>',
            last: 3,
            next: 5,
          },
          5: {
            title: '什么样的作品，更容易获奖？',
            detail: '<p>1、紧密围绕大赛主题展开；</p>' +
            '<p>2、作品要撰写设计方案综述：设计创作的来源，设计思路，设计理念创意和亮点说明； </p>' +
            '<p>3、作品独具创意。</p>',
            last: 4,
            next: 6,
          },
          6: {
            title: '怎么知道自己入围初审？',
            detail: '<p>初审投票结束后，入围作品将会在2021年1月22日开始在活动页面公示，同时我们会给您发送系统通知，届时请密切留意信息。</p>',
            last: 5,
            next: 7,
          },
          7: {
            title: '最终获奖怎么通知？',
            detail: '<p>我们会在2021年2月1日大赛页面公布获奖结果，同时我们会给您发送系统通知，届时请密切留意信息。</p>',
            last: 6,
            next: 8,
          },
          8: {
            title: '投票时间是怎么安排的？',
            articleId: '<p>此次大赛有两个投票阶段，分别是初审投票和复审投票阶段。您可以通过分享投票页面进行拉票。</p>' +
            '<p>初赛投票将在2021年1月24日00:00统一开启，投票截止时间为2021年1月28日晚24：00，PC和移动端投票入口同步。</p>' +
            '<p>复审投票我们将在2021年1月24日00:00统一开启，投票截止时间为2021年1月28日晚24：00，PC和移动端投票入口同步。</p>',
            last: 7,
            next: 9,
          },
          9: {
            title: '奖项投票的话，每人每天最多能投几票？',
            detail: '<p>每天每人只能对一个作品投票1次。</p>',
            last: 8,
            next: 10,
          },
          10: {
            title: '在哪里可以看到我的作品？',
            detail: '<p>您登录到您参赛时的账号后，进入投票页面，您的参赛作品将会置顶在您专属的投票页面上，方便您跟踪票数变化。</p>' +
            '<p>您将个人作品置顶专属投票页分享出去，您的作品将始终在投票页面顶部。</p>',
            last: 9,
            next: 11,
          },
          11: {
            title: '怎么获取我的专属拉票分享页？',
            detail: '<p>登录中华商标（国际）创意设计大赛网站进入投票页-分享链接投票页面。</p>',
            last: 10,
            next: 12,
          },
          12: {
            title: '我投稿参赛了，为什么没有看到我的作品？',
            detail: '<p>请先确认是否已登录到您参赛时的账号，如已经登录，投票列表首位没有显示您的作品，麻烦您联系问问：xxxxxxx。（请备注设计大赛）</p>',
            last: 11,
            next: 13,
          },
          13: {
            title: '如果我获奖了，什么时候可以收到证书和奖品呢？',
            detail: '<p>证书与奖品将在活动结束后的1个月内发放，获奖后会有工作人员联系您，请密切关注信息。</p>',
            last: 12,
            next: 0,
          },
        }
      }
    },
    mounted() {
      this.getInitData()
    },
    methods: {
      getInitData() {
        this.articleId = this.$route.query.articleId
        this.getArticleData(this.articleId)
      },
      getArticleData(articleId) {
        this.title = this.articleDataMap[articleId].title
        this.detail = this.articleDataMap[articleId].detail
      },
      handleQuestionClick(articleId) {
        this.articleId = articleId
        this.getArticleData(this.articleId)
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