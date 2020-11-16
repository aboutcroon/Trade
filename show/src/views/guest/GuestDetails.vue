<template>
  <div class="guest-details">
    <BreadCrumbs
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '重磅嘉宾', link: 'guestList'}, {title: '嘉宾详情', link: 'guestDetails'}]"
    />
    <section class="container">
      <div class="guest-info">
        <div class="avatar">
          <img :src="require('@/assets/img/home_guest_1.jpg')" alt="">
        </div>
        <div class="info">
          <h2 class="name">{{ name }}</h2>
          <div class="position gray">{{ position }}</div>
          <div class="introduction">
            <div class="left-text gray">嘉宾简介：</div>
            <div class="text">
              <span>{{ description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="guest-works-list">
      <WorksList />
    </div> -->
  </div>
</template>
<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
import GuestCard from '@/components/GuestCard.vue'
import WorksList from './components/WorksList.vue'
export default {
  name: 'Guest',
  components: {
    BreadCrumbs,
    GuestCard,
    WorksList,
  },
  data() {
    return {
      backgroundUrl: require("@/assets/img/guest_title_background.jpg"),
      name: '舒勇',
      position: '中国社会艺术协会副主席、中国美术家协会理事',
      description: `意大利佛罗伦萨国际艺术双年展终身成就奖获得者，第 55 届威尼斯双年展国家馆参展艺术家， 
联合国教科文组织官方合作艺术家。获颁阿斯塔纳世界博览会国际艺术展金奖和终身成就奖， 
世界科学合作组织颁发的“金质奖章”获得者，意大利总理府颁发的“中意文化交流贡献奖” 
获得者。两届“一带一路”国际合作高峰论坛和 2018 年 9 月中非合作论坛北京峰会主会场、 
2019 首届亚洲文明对话大会主会场标志性人文景观作品《丝路金桥》创作者。`,
    }
  },
}
</script>
<style lang="scss" scoped>
.guest-info {
  display: flex;
  padding-top: 50px;
  padding-bottom: 100px;
  .introduction {
    display: flex;
    line-height: 1.75;
    .left-text {
      width: 80px;
      // flex-basis: 80px;
    }
    .text {
      width: calc(100% - 80px);
      flex-grow: 1;
    }
  }
}
.avatar {
  width: 380px;
  height: 380px;
  background-color: #eee;
  overflow: hidden;
  img {
    width: 380px;
  }
}
.info {
  width: calc(100% - 380px);
  padding-left: 65px;
  padding-top: 80px;
  flex-grow: 1;
  .name {
    padding-bottom: 10px;
    font-size: 32px;
    font-weight: normal;
  }
  .position {
    padding-bottom: 30px;
  }
}
.gray {
  color: #666666;
}
.guest-works-list {
  max-width: 1460px;
  margin: 0 auto;
  padding-bottom: 130px;
}
</style>