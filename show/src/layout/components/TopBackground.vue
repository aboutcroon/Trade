<template>
  <div class="top-background" :style="background">
    <div class="mask"></div>
  </div>
</template>
<script>
export default {
  name: 'TopBackground',
  data() {
    return {
      background: {
        'background': 'url(' + require("@/assets/img/user_background.jpg") + ')',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/palette.scss";
.top-background {
  min-width: $min-container;
}
.top-background .mask {
  min-width: $min-container;
  min-height: 402px;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>