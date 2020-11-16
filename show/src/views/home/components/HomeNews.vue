<template>
  <div class="home-news">
    <div class="left">
      <div class="images">
        <img :src="require('@/assets/img/home_news_1.jpg')" alt="" />
      </div>
      <h2 class="title">第三届（2019）中华商标创意设计大赛新闻发布会暨启动仪式在京举行</h2>
      <p class="text">2018年12月29日，以“商标设计激发创新活力，献礼祖国70周年”为主题的第三届（2019）中华商标创意设计大赛（下称大赛）新闻发布会暨启动仪式在京举行。</p>
      <div class="row more">
        <span class="more-text" href="" @click="clickLink('newsDetail')">查看更多</span>
      </div>
    </div>
    <ul class="right" @click="clickLink('newsDetail')">
      <li class="list" v-for="(item, index) in rightList" :key="index">
        <div class="images">
          <img :src="item.img" alt="" />
        </div>
        <div class="description">
          <h2 class="title">{{ item.title }}</h2>
          <p class="text">{{ item.text }}</p>
          <div class="row more">
            <span class="more-text" href="">查看更多</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightList: [
        {
          title: '示范区与约瑟基金开展合作洽谈',
          img: require("@/assets/img/home_news_2.jpg"),
          text: '2018年12月11日下午，北京商标品牌创新示范区行政负责人王华鑫总率创新示范区团队与约瑟基金董事长陈九霖及董事总经理...',
        },
        {
          title: '商标通大厦直通车：北京香黛宫品牌文化有限公司总...',
          img: require("@/assets/img/home_news_3.jpg"),
          text: '近日，北京香黛宫品牌文化有限公司总裁龚航宇携团队今日来创新大厦考察办公地点，创新大厦项目张川华总接待了来访客户并详......',
        },
        {
          title: '商标通平台将开通第三届（2019）中华商标创意设计...',
          img: require("@/assets/img/home_news_4.jpg"),
          text: '第三届（2019）中华商标创意设计大赛的筹备工作已拉开帷幕。北京商标通有限公司作为承办单位，积极开展筹备各项工作......',
        }
      ]
    }
  },
  methods: {
    clickLink(name) {
      this.$router.push({name: name})
    }
  }
}
</script>
<style lang="scss" scoped>
$red: #FF0000;
.home-news {
  display: flex;
  padding-bottom: 54px;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #111111;
  }
  .text {
    font-size: 14px;
    font-weight: 400;
    color: #777777;
  }
  .more {
    font-size: 16px;
    font-weight: 400;
    color: #111111;
    position: absolute;
    left: 0;
    bottom: 12px;
  }
  .left {
    width: 46%;
    padding-right: 20px;
    position: relative;
    .images {
      margin-bottom: 32px;
      img {
        width: 100%;
      }
    }
    .title {
      margin-bottom: 18px;
    }
    .more-text:hover {
      cursor: pointer;
      color: $red;
    }
  }
  .right {
    width: 54%;
    margin: -20px 0;
    .list {
      cursor: pointer;
      padding: 20px;
      display: flex;
      transition: all 0.3s;
      &:hover {
        background-color: #fff;
        .title {
          color: $red;
        }
        .more-text {
          color: $red;
        }
      }
    }
    .title {
      margin-bottom: 22px;
    }
    .description {
      padding-left: 28px;
      position: relative;
    }
    .more {
      left: 28px;
    }
  }
}
</style>