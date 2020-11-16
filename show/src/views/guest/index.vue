<template>
  <div class="guest">
    <BreadCrumbs
      description="美感与设计的结合，尽在此时"
      :background="backgroundUrl"
      :crumb="[{title: '重磅嘉宾', link: 'guestList'}]"
    />
    <section class="container">
      <p class="guest-description">嘉宾排名不分先后，按姓名首字母排序</p>
      <div class="guest-list">
        <GuestCard
          v-for="(item, index) in guestList"
          :key="index"
          :titleColor="titleColor"
          :describeColor="describeColor"
          :name="item.name"
          :position="item.position"
          :description="item.description"
          :avatar="item.avatar"
          :link="item.link"
        />
      </div>
      <div class="bottom-pagination">
        <el-pagination
          class="guest-pagination"
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </section>
  </div>
</template>
<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
import GuestCard from '@/components/GuestCard.vue'
export default {
  name: 'Guest',
  components: {
    BreadCrumbs,
    GuestCard
  },
  data() {
    return {
      titleColor: '#333333',
      describeColor: '#666666',
      backgroundUrl: require("@/assets/img/guest_title_background.jpg"),
      guestList: [
        {
          name: '舒勇',
          position: '北京商标品牌创新示范区评委',
          description: `中国社会艺术协会副主席，中国美术家协会理事，意大利佛罗伦萨国际艺术双年展终身成就奖获得者，第 55 届威尼斯。双年展国家馆参展艺术家， 联合国教科文组织官方合作艺术家。获颁阿斯塔纳世界博览会国际艺术展金奖和终身成就奖，世界科学合作组织颁发的“金质奖章”获得者，意大利总理府颁发的“中意文化交流贡献奖” 获得者。两届“一带一路”国际合作高峰论坛和 2018 年 9 月中非合作论坛北京峰会主会场、2019 首届亚洲文明对话大会主会场标志性人文景观作品《丝路金桥》创作者。`,
          avatar: require("@/assets/img/home_guest_1.jpg"),
          link: 'guestDetails'
        },
        {
          name: 'Boris Grebille',
          position: '北京商标品牌创新示范区评委',
          description: `自 2012 至今 IESA 巴黎高等文化艺术管理学院院长。职业经历：法国 – 2012–现在、巴黎高等文化艺术管理学院院长、Directeur，IESA art&culture、法国 – 2008-2012、巴黎高等文化艺术管理学院研究部主任、Directeur des Etudes，IESA`,
          avatar: require("@/assets/img/sample/home_guest_1.png"),
          link: 'guestDetails'
        },
        {
          name: '杨珺',
          position: '北京商标品牌创新示范区评委',
          description: `中央美术学院教授、中国画教师、中国美术家协会会员、中央国家机关青联委员、深圳大学客座教授。1997年—2001年本科毕业于中央美术学院国画系，获学士学位。2001年—2004年任教于广西艺术学院。2004年—2007年毕业于中央美术学院，获硕士学位，师从田黎明教授，并留校任教。2007年—2010年毕业于中央美术学院，获博士学位，现为中央美术学院中国画教师，中国美术家协会会员，中央国家机关青联委员，深圳大学客座教授`,
          avatar: require("@/assets/img/sample/home_guest_2.png"),
          link: 'guestDetails'
        },
        {
          name: '河清',
          position: '北京商标品牌创新示范区评委',
          description: '清华大学双聘教授、首都师范大学特聘教授、浙江大学人文学院教授、中国美术学院兼课教授。主要著作有《破解进步论—为中国文化正名》《西方民主的乌托邦》《现代与后代—西方艺术文化小史》《全球化与国家意识的衰微》《艺术的阴谋》等',
          avatar: require("@/assets/img/sample/home_guest_3.png"),
          link: 'guestDetails'
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.guest-description {
  color: #999999;
  font-size: 18px;
  padding: 40px 0;
}
.guest-list {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.1px;
}
.bottom-pagination {
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
}
</style>
<style lang="scss">
.guest-list {
  .guest-card {
    margin-right: 52px;
    margin-bottom: 50px;
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
.guest-pagination.el-pagination {
  .btn-prev,
  .btn-next {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .number {
    min-width: 40px;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      background-color: #ff0000;
      color: #ffffff;
    }
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    line-height: 40px;
    color: #303133;
  }
}
</style>