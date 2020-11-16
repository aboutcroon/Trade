<template>
  <div class="game-rule">
    <p v-for="(item, index) in ruleList" :key="index">{{item}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleList: [
        '“大众创业、万众创新”出自2014年9月夏季达沃斯论坛上李克强总理的讲话，李克强提出，要在960万平方公里土地上掀起“大众创业”、“草根创业”的新浪潮，形成“万众创新”、“人人创新”的新势态。此后，他在首届世界互联网大会、国务院常务会议和2015年《政府工作报告》等场合中频频阐释这一关键词。每到一地考察，他几乎都要与当地年轻的“创客”会面。他希望激发民族的创业精神和创新基因。',
        '此次比赛遵循公平、公正、公开的原则，以“乘风创业，破浪创新，世界互联中国梦”为核心点，参赛者可以提交艺术创作包括logo、地标等。',
        '此次奖项包括个人奖和团体奖两项，团体奖以推荐数量、质量等多方面因素决定。'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.game-rule p {
  line-height: 33px;
  margin-bottom: 10px;
  color: #333333;
}
</style>