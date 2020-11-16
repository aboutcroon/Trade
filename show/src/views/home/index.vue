<template>
  <div class="home">
    <HomeBanner ref="HomeBanner" />
    <section class="background-one">
      <div class="occlude">
        <home-innovation>
          <router-link class="button-red home-button" to="/game">查看更多</router-link>
        </home-innovation>
      </div>
    </section>
    <section class="background-two">
      <div class="part container distinguished-guests">
        <sub-title title="重磅嘉宾" english="distinguished guests">
          <router-link to="/guest" class="see-more">查看更多</router-link>
        </sub-title>
        <HomeGuest />
      </div>
      <div class="part container">
        <sub-title title="获奖者荣誉" english="Honor of winners"></sub-title>
        <HomeHonor />
      </div>
    </section>
    <section class="background-three">
      <div class="part container">
        <sub-title title="关于大赛" english="About the competition"></sub-title>
        <HomeGame />
      </div>
      <div class="part container hot-news">
        <sub-title title="热点新闻" english="hot news">
          <router-link to="/news" class="button-red see-more">查看更多</router-link>
        </sub-title>
        <HomeNews />
      </div>
    </section>
    <section>
      <!-- 合作伙伴 -->
      <HomePartner />
    </section>
  </div>
</template>
<script>
import HomeBanner from './components/HomeBanner.vue'  // 轮播图
import HomeInnovation from '@/components/HomeInnovation.vue'  // 背景块
import SubTitle from '@/components/SubTitle.vue'  // 小标题
import HomeGuest from '@/components/HomeGuest.vue'
import HomeHonor from './components/HomeHonor.vue'
import HomeGame from './components/HomeGame.vue'
import HomeNews from './components/HomeNews.vue'

import HomePartner from './components/HomePartner.vue'
export default {
  components: {
    HomeBanner,
    HomeInnovation,
    SubTitle,
    HomeGuest,
    HomeHonor,
    HomeGame,
    HomeNews,
    HomePartner,
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/palette.scss";
.home {
  min-width: $min-container;
}
.occlude {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
}
.background-one {
  background: url("../../assets/img/home_background_1.jpg");
  background-position: center center;
  background-size: cover;
  .home-innovation {
    padding-top: 140px;
    padding-bottom: 186px;
  }
}
.background-two {
  background: url("../../assets/img/home_background_2.jpg");
  background-position: center center;
  background-size: cover;
}
.background-three {
  background: url("../../assets/img/home_background_3.jpg");
  background-position: center center;
  background-size: cover;
}
.distinguished-guests .see-more {
  color: #ffffff;
}
.hot-news .see-more {
  font-size: 18px;
  padding: 7px 27px;
}
</style>
