<template>
  <div class="home-honor">
    <div class="honor">
      <el-carousel
        ref="ElCarousel"
        arrow="never"
        indicator-position="none"
        :autoplay="move"
      >
        <el-carousel-item v-for="(item, index) in honorList" :key="index">
          <div class="honor-item" :style="honorBackground">
            <HonorCard
              :title="item.title"
              :belonging="item.belonging"
              :description="item.description"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="carousel">
        <div class="arrow prev" @click="clickSwitch('prev')" @mouseover="overSwitch" @mouseleave="leaveSwitch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon_left"></use>
          </svg>
        </div>
        <div class="arrow next" @click="clickSwitch('next')" @mouseover="overSwitch" @mouseleave="leaveSwitch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon_right"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HonorCard from './HonorCard.vue'
export default {
  components: {
    HonorCard
  },
  data() {
    return {
      move: true,
      switchCd: false,
      honorBackground:{
          'background': 'url(' + require("@/assets/img/home_honor_1.jpg") + ')',
          'background-position': 'top center',
          'background-size': 'cover',
        },
      honorList: [
        {
          title: '奖状、奖杯',
          belonging: '金奖独有',
          description: '中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证。'
        },
        {
          title: '获奖作品颁发区块链版权数字证书',
          belonging: '图片存证即上链',
          description: '中华商标（国际）创意设计大赛作品将获得区块链版权数字证书，将作品信息上链存证，存证的商标作品加盖时间戳并与注册作者关联，实现作品的确权，能够为作者提供真实性权属证明，极大地降低维权成本。作品在各个监管节点间共识，环环相扣的数据结构使其具有不可篡改性，从技术上排除了数据被篡改和删减的可能，能够最大程度上保障参赛者的权益。'
        },
        {
          title: '参加颁奖典礼',
          belonging: '为用户提供展示自身形象和实力的机会',
          description: '中华商标（国际）创意设计大赛奖颁奖盛典由中华商标协会、中国网、中国教育电视台三家行业权威机构、国家权威媒体联合主办，颁奖盛典将采用线上、线下活动的形式，届时将邀请行业领导、协会领导、大赛专家评委、国内外著名知识产权专家学者、著名企业家、品牌策划师等相关人士。'
        },
        {
          title: '获奖作品收录设计时代杂志专刊',
          belonging: '提升企业或个人在该领域的影响力，塑造个人知名度和美誉度',
          description: '中华商标（国际）创意设计大赛作品将被收录当年《INTERNI 设计时代》专刊中，将被全球设计师、设计机构及企业进行参考。《INTERNI 设计时代》杂志为中国的国际设计最新流行趋势及最新设计文化发展趋势代言人；全球最顶级、高端和先进的设计类产品的代言人。'
        },
        {
          title: '获奖作品入驻设计大赛知识产权知识产权运营管理平台',
          belonging: '一站式直达服务，省去中间环节',
          description: '中华商标（国际）创意设计大赛区块链知识产权运营管理平台应用云计算+大数据+互联网（固定互联与移动互联相结合）汇集商标品牌大数据，形成商标品牌评估、区块链存证、商标交易、区域分析、侵权调解、精准营销、地标云为内容的商标品牌数据应用中心。获奖作品入驻平台可转化为数字资产进行安全可靠的知识产权交易。'
        },
      ]
    }
  },
  methods: {
    clickSwitch(type) {
      if (this.switchCd) {
      } else {
        this.switchCd = true
        if (type === 'prev') {
          this.$refs.ElCarousel.prev()
        } else if(type === 'next') {
          this.$refs.ElCarousel.next()
        }
        let timer = setTimeout(() => {
          this.switchCd = false
        }, 450)
      }
    },
    /* 移入 */
    overSwitch() {
      this.move = false
    },
    /* 移出 */
    leaveSwitch() {
      this.move = true
    },
  }
}
</script>
<style lang="scss" scoped>
.honor-item {
  max-width: 1440px;
  height: 100%;
}
.home-honor {
  padding-bottom: 85px;
}
.honor {
  position: relative;
}
.el-carousel__item {
  max-width: 1440px;
  height: 100%;
}
</style>