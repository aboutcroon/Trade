<template>
  <div class="home-innovation container">
    <div class="images">
      <img :src="require('@/assets/img/home-innovation.png')" alt="">
    </div>
    <p class="text">
      <span>乘李克强总理达沃斯论坛讲话批示之风，开创大众事业；冲开产业、行业之波浪，在创新、创意的激流中前进！</span>
      <br>
      <span>达成习主席提出更加开放并与世界互联的中国梦，实现中华民族的伟大复兴！</span>
    </p>
    <div class="innovation-button">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeInnovation'
}
</script>
<style lang="scss" scoped>
.images {
  img {
    width: 674px;
    height: 175px;
  }
  margin-bottom: 28px;
}
.text {
  color: #333333;
  font-size: 16px;
  width: 568px;
  line-height: 32px;
  margin-bottom: 70px;
}
</style>