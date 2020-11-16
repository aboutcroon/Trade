<template>
  <div class="game-prize">
    <p class="description">
      该奖项意在鼓励商标设计师大胆发挥想象力，设计出让人耳目一新而且又符合商标注册规则并且能够进行注册的作品，所有作品均应属于作者原创作品。
    </p>
    <ul class="prize-list">
      <li>
        <div class="images">
          <img :src="require('@/assets/img/game_prize_1.jpg')" alt="" />
        </div>
        <div class="text">
          <span class="before">{{ nameList[0].before }}</span>
          <span class="after">{{ nameList[0].after }}</span>
        </div>
      </li>
      <li v-for="item in 3" :key="item">
        <div class="images">
          <img :src="require('@/assets/img/game_prize_2.jpg')" alt="" />
        </div>
        <div class="text">
          <span class="before">{{ nameList[item].before }}</span>
          <span class="after">{{ nameList[item].after }}</span>
        </div>
      </li>
    </ul>
    <p class="description-bottom">
      获得上述所有商标设计奖的金奖、银奖、铜奖的作品的所有权原则归主办方所有；如参赛者明确表示不放弃所有权，将仅获应得奖金的百分之五十。上述奖金金额均为税前。
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameList: [
        {
          before: '金奖3名',
          after: '10000元、奖杯奖状'
        },
        {
          before: '银奖6名',
          after: '5000元、奖状'
        },
        {
          before: '铜奖8名',
          after: '2000元、奖状'
        },
        {
          before: '优秀奖若干',
          after: '奖状'
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.game-prize {
  padding-bottom: 60px;
}
.description-bottom {
  color: #999999;
}
.prize-list {
  display: flex;
  justify-content: space-between;
  padding-top: 85px;
  padding-bottom: 60px;
  padding-left: 48px;
  padding-right: 92px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
.images {
  margin-bottom: 34px;
}
</style>