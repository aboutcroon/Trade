<template>
  <div class="partner">
    <div class="container">
      <SubTitle title="合作伙伴" english="cooperative partner" />
      <div class="child">
        <div class="row">
          <a href="" v-for="(item, index) in cooperativeList" :key="index">
            <img :src="item" alt="" />
          </a>
        </div>
        <!-- <div class="row">
          <img
            v-for="(item, index) in cooperativeBottom"
            :key="index"
            :src="item"
            alt=""
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/SubTitle.vue'  // 小标题
export default {
  components: {
    SubTitle
  },
  data() {
    return {
      cooperativeList: [
        // {
        //   img: require("@/assets/img/footer_partner_1.png"),
        //   link: 'http://www.cta.org.cn/',
        // },
        // {
        //   img: require("@/assets/img/footer_partner_2.png"),
        //   link: 'xxxxx',
        // },
        require("@/assets/img/footer_partner_1.png"),
        require("@/assets/img/footer_partner_2.png"),
        require("@/assets/img/footer_partner_3.png"),
        require("@/assets/img/footer_partner_4.png"),
        require("@/assets/img/footer_partner_5.png"),
        require("@/assets/img/footer_partner_6.png"),
      ],
      cooperativeBottom: [
        require("@/assets/img/footer_partner_7.png"),
        require("@/assets/img/footer_partner_8.png"),
        require("@/assets/img/footer_partner_9.png"),
        require("@/assets/img/footer_partner_10.png"),
        require("@/assets/img/footer_partner_11.png"),
        require("@/assets/img/footer_partner_12.png"),
        require("@/assets/img/footer_partner_13.png"),
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.partner {
  background-color: #f9f9f9;
  padding-bottom: 20px;
}
.partner .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  img {
    cursor: pointer;
    filter: contrast(0%);
    transition: filter 0.3s;
    &:hover {
      filter: contrast(100%);
    }
  }
}
</style>