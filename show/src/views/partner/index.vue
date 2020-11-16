<template>
  <div class="partner">
    <BreadCrumbs
      title-right="（持续更新中）"
      description="多家机构共同发展，引领行业区块链版权风潮"
      :background="backgroundUrl"
      :crumb="[{title: '合作伙伴', link: 'partner'}]"
    />
    <section class="background-one">
      <div class="part container">
        <sub-title
          title="合作方式"
          english="About the competition"
          miniDown
        ></sub-title>
        <p class="p-style">
          {{ text }}
        </p>
      </div>
      <!-- <section class="background-three"> -->
      <div class="part container">
        <sub-title
          title="合作企业类型"
          english="Types of cooperative enterprises"
          miniDown
        ></sub-title>
        <div class="div-type">
          <p class="p-number">20+</p>
          <p class="p-text">政府机构</p>
        </div>
        <div class="div-type">
          <p class="p-number">20000+</p>
          <p class="p-text">行业协会</p>
        </div>
        <div class="div-type">
          <p class="p-number">3000+</p>
          <p class="p-text">媒体伙伴</p>
        </div>
      </div>
      <!-- 合作伙伴 -->
      <PartnerPartner />
    </section>
  </div>
</template>
<script>
import PartnerWay from "./components/PartnerWay.vue"; // 背景块
import SubTitle from "@/components/SubTitle.vue"; // 小标题
import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
import PartnerPartner from "./components/PartnerPartner.vue";
export default {
  components: {
    SubTitle,
    PartnerWay,
    PartnerPartner,
    BreadCrumbs,
  },
  data() {
    return {
      backgroundUrl: require("@/assets/img/partner_title_background.jpg"),
      text: '作为一家立足于大中华地区影响国际，帮助国内外众多行业协会、研究机构、专业媒体解决商标设计、地区地标为支撑的特色经济机构，公司一直相信“合作创造价值”，建立在双方资源互补、双赢基础上的商业合作能够为合作双方贷来丰厚的回报。公司现在采取了五种合作方式：冠名单位、协办单位、支持单位、颁奖晚宴冠名单位、企业商标定制化服务等，为不同赞助商提供各种类型宣传服务。而在合作过程中，公司表现出的专业、务实和坦诚态度，获得了合作者的极大赞誉。'
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/palette.scss";
.background-one {
  min-width: $min-container;
  background: url("../../assets/img/partner_background.jpg");
  background-position: center center;
  background-size: cover;
  background-color: #ccc;
  // height: 300px;
}
.p-style {
  // width: 1438px;
  // height: 82px;
  font-size: 16px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: #333333;
  line-height: 33px;
}
.div-type {
  display: inline-block;
  width: 33.33%;
}
.p-number {
  // width: 63px;
  // height: 28px;
  font-size: 38px;
  // font-family: Aleo;
  font-weight: bold;
  color: #333333;
  line-height: 52px;
  // margin-bottom: 18px;
}
.p-text {
  // height: 16px;
  font-size: 16px;
  // font-family: SourceHanSansCN;
  font-weight: 700;
  color: #999999;
  line-height: 52px;
}
</style>