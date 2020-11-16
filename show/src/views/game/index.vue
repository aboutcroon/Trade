<template>
  <div class="game">
    <section>
      <GameVideos />
    </section>
    <section class="part game-background-two">
      <div class="widely-tell container">
        <img :src="require('@/assets/img/game_publicity.jpg')" alt="" />
      </div>
      <home-innovation>
        <router-link class="button-red home-button" to="/login">立即报名</router-link>
      </home-innovation>
    </section>
    <section class="part">
      <div class="container">
        <sub-title title="组织机构" english="Organization" miniDown></sub-title>
        <GameOrganization />
      </div>
    </section>
    <section class="part game-background-three">
      <div class="background-top"></div>
      <div class="container">
        <sub-title
          title="大赛规则"
          english="Competition rules"
          miniDown
        ></sub-title>
        <GameRule />
      </div>
      <div class="container">
        <sub-title
          title="大赛赛程"
          english="Competition schedule"
          miniDown
        ></sub-title>
        <GameSchedule />
      </div>
      <div class="background-bottom"></div>
    </section>
    <section class="part">
      <div class="container">
        <sub-title title="奖项设置" english="Award setting" miniDown>
          <button
            class="button-tab"
            :class="{ active: prizeStatus === 0 }"
            @click="prizeStatus = 0"
          >
            创意设计奖
          </button>
          <button
            class="button-tab"
            :class="{ active: prizeStatus === 1 }"
            @click="prizeStatus = 1"
          >
            团体奖
          </button>
        </sub-title>
        <GamePrize />
      </div>
    </section>
    <section class="part game-background-four">
      <div class="container">
        <sub-title
          title="重磅嘉宾"
          english="Distinguished guests"
          miniDown
        ></sub-title>
        <HomeGuest titleColor="#333333" describeColor="#666666" />
        <div class="see-more">
          <router-link to="/">查看更多</router-link>
        </div>
      </div>
    </section>
    <section class="part">
      <div class="container">
        <sub-title
          title="人气作品排行榜"
          english="List of popular works"
          miniDown
        >
          <button
            v-for="(item, index) in rankingTitle"
            :key="index"
            class="button-tab"
            :class="{ active: rankingStatus === index }"
            @click="rankingStatus = index"
          >
            {{ item }}
          </button>
        </sub-title>
        <GameRanking :list="rankingList" />
        <div class="see-more">
          <router-link :to="{name: 'exhibition'}">查看更多</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import SubTitle from '@/components/SubTitle.vue'  // 小标题
import HomeInnovation from '@/components/HomeInnovation.vue'  // 「 乘风创业，破浪创新 世界互联中国梦 」
import HomeGuest from '@/components/HomeGuest.vue'
import GameVideos from './components/GameVideos.vue'
import GameOrganization from './components/GameOrganization.vue'
import GameRule from './components/GameRule.vue'
import GameSchedule from './components/GameSchedule.vue'
import GamePrize from './components/GamePrize.vue'
import GameRanking from './components/GameRanking.vue'

export default {
  components: {
    SubTitle,
    HomeInnovation,
    HomeGuest,
    GameVideos,
    GameOrganization,
    GameRule,
    GameSchedule,
    GamePrize,
    GameRanking,
  },
  data() {
    return {
      prizeStatus: 0, // 奖项设置tab
      rankingStatus: 0, // 排行榜tab
      rankingTitle: ['人气总榜', '月度总榜', '今日总榜'],
      rankingList: [
        {
          link: 'exhibitionWorkDetail',
          img: require("@/assets/img/game_ranking_1.jpg")
        },
        {
          link: 'exhibitionWorkDetail',
          img: require("@/assets/img/game_ranking_2.jpg")
        },
        {
          link: 'exhibitionWorkDetail',
          img: require("@/assets/img/game_ranking_3.jpg")
        },
        {
          link: 'exhibitionWorkDetail',
          img: require("@/assets/img/game_ranking_4.jpg")
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/palette.scss";
.game {
  min-width: $min-container;
}
.game-background-two {
  padding-top: 34px;
}
.widely-tell {
  img {
    width: 100%;
    background-color: red;
  }
}
.game-background-two {
  background: url(../../assets/img/game_background_2.jpg);
  background-position: center center;
  background-size: cover;
  .home-innovation {
    padding-top: 75px;
    padding-bottom: 23px;
  }
}
.game-background-three {
  margin-top: -120px;
  margin-bottom: -80px;
  background: url(../../assets/img/game_background_3.jpg);
  background-position: center center;
  background-size: cover;
  .background-top {
    height: 120px;
  }
  .background-bottom {
    height: 80px;
  }
}
.button-tab {
  margin-left: 20px;
}
.game-background-four {
  background-color: #f9f9f9;
  .see-more {
    padding-top: 60px;
  }
}
.see-more {
  text-align: right;
  padding-top: 50px;
  padding-bottom: 40px;
}
</style>