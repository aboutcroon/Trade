<template>
  <div>
    <div class="home-game">
      <div class="game-img">
        <img :src="images" alt="" />
      </div>
      <div class="game-info">
        <h2 class="title">大赛历史与发展</h2>
        <div class="line"></div>
        <p class="text">{{ text }}</p>
      </div>
    </div>
    <div class="home-publicity">
      <img :src="publicity[0]" alt="" />
      <img :src="publicity[1]" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: require("@/assets/img/home_game.jpg"),
      text: '中华商标创意设计大赛是由与中华商标协会、中国网、中国教育电视台联合主办，面向世界优秀的设计人才和设计团队的，立足大中华地区影响国际。旨在帮助解决商标设计，各地区以地理标志为支撑的特色经济产业广，知识产权确权与保护等问题。',
      publicity: [
        require("@/assets/img/home_publicity_1.jpg"),
        require("@/assets/img/home_publicity_2.jpg"),
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
$red: #ff0000;
.home-game {
  display: flex;
  align-items: center;
}
.game-img {
  text-align: center;
  max-width: 59%;
  height: 576px;
  overflow: hidden;
  img {
    height: 100%;
  }
}
.game-info {
  margin-left: -55px;
  padding: 72px 45px;
  width: calc(41% + 62px);
  height: 468px;
  background: #f5f5f5;
  position: relative;
}
.title {
  font-size: 24px;
  font-weight: 500;
  color: #111111;
  margin-bottom: 26px;
}
.line {
  width: 58px;
  border-bottom: 4px solid $red;
  margin-bottom: 32px;
}
.text {
  font-size: 16px;
  font-weight: 400;
  color: #111111;
  line-height: 35px;
}
.more {
  position: absolute;
  right: 58px;
  bottom: 82px;
  color: $red;
}
.home-publicity {
  margin-top: 40px;
  img {
    width: calc(50% - 20px);
    &:first-child {
      margin-right: 40px;
    }
  }
}
</style>