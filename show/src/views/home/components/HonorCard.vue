<template>
  <div class="honor-card">
  <!-- <div class="honor-card" @mouseover="mouseOver()" @mouseleave="mouseLeave()"> -->
    <h2 class="title">{{ title }}</h2>
    <p class="belonging">{{ belonging }}</p>
    <p
      class="description"
      :class="{default: status}"
    >{{ description }}</p>
    <!-- <a class="more-button" href="">查看更多</a> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: '-'
    },
    belonging: {
      default: '-'
    },
    description: {
      default: '-'
    },
  },
  data() {
    return {
      status: true,
    }
  },
  methods: {
    /* 鼠标移入 */
    mouseOver() {
      this.status = false
    },
    /* 鼠标移出 */
    mouseLeave() {
      this.status = true
    }
  }
}
</script>
<style lang="scss" scoped>
.honor-card {
  width: 550px;
  height: 415px;
  background-color: #ff2a00;
  opacity: 0.8;
  position: absolute;
  top: 135px;
  left: 117px;
  color: #ffffff;
  padding: 82px 54px 0;
  &:hover {
    .description {
      opacity: 1;
    }
  }
}
.title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 13px;
}
.belonging {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 26px;
}
.description {
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  opacity: 0.6;
  /* &.default {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  } */
}
.more-button {
  position: absolute;
  right: 66px;
  bottom: 77px;
}
@media (max-width: 1366px) {
  .honor-card {
    top: 7vw;
    left: 6vw;
  }
}
</style>