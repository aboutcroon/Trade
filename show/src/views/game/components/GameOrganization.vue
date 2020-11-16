<template>
  <div class="game-organization">
    <OrganizationItem
      v-for="(item, index) in formList"
      :key="index"
      :title="item.title"
      :list="item.list"
    />
    <p class="description">(以上排名不分先后)</p>
  </div>
</template>
<script>
import OrganizationItem from './OrganizationItem'
export default {
  components: {
    OrganizationItem
  },
  data() {
    return {
      formList: [
        {
          title: '主办单位',
          list: ['中华商标协会', '中国网', '中国教育电视台']
        },
        {
          title: '承办单位',
          list: ['北京中商协知识产权咨询有限公司']
        },
        {
          title: '协办单位',
          list: ['中国人民大学中国商标品牌研究院', '香港进出口商会等', '《中华商标》杂志社', '中企商标鉴定中心', '各省市自治区商标协会', '北京大学信息科学技术学院', '各大高校联盟', '香港中华总商会']
        },
        {
          title: '支持单位',
          list: ['中央美术学院', '中国美术学院', '西安美术学院', '四川美术学院', '鲁迅美术学院', '广州美术学院', '湖北美术学院', '天津美术学院', '北京服装学院', '中国传媒大学等国内知名美术院及设计公司']
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.game-organization {
  margin-top: -5px;
}
.description {
  padding-top: 14px;
  padding-left: 125px;
  color: #999999;
}
</style>