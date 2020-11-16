<template>
  <div class="reveal home-banner">
    <el-carousel arrow="never" indicator-position="none" ref="ElCarousel" :autoplay="move">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <div class="banner-item" :style="bannerList[0]">
          <div class="banner-center home-banner-1">
            <div class="images">
              <img
                :src="require('@/assets/img/home_banner_1_text.png')"
                alt=""
              />
            </div>
            <div class="sign-up">
              <router-link class="button-red home-button" to="/login">立刻报名</router-link>
            </div>
          </div>
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
    <!-- <div class="home-down">
      <svg class="icon mouse" aria-hidden="true">
        <use xlink:href="#icon_home_mouse"></use>
      </svg>
      <svg class="icon down" aria-hidden="true">
        <use xlink:href="#icon_home_down"></use>
      </svg>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      move: true,
      switchCd: false,
      bannerList: [
        {
          'background': 'url(' + require("@/assets/img/home_banner_1.jpg") + ')',
          'background-position': 'top center',
          'background-size': 'cover',
        },
        {
          'background': 'url(' + require("@/assets/img/home_banner_1.jpg") + ')',
          'background-position': 'top center',
          'background-size': 'cover',
        },
        {
          'background': 'url(' + require("@/assets/img/home_banner_1.jpg") + ')',
          'background-position': 'top center',
          'background-size': 'cover',
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
@import "../../../assets/palette.scss";
.banner-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-banner-1 {
  .images {
    margin-bottom: 60px;
    img {
      width: 787px;
    }
  }
}
.sign-up {
  text-align: center;
  margin-bottom: -20px;
}
.reveal {
  position: relative;
}
.home-down {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -98px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mouse,
  .down {
    fill: rgba(255, 255, 255, 0.7);
  }
  .mouse {
    width: 32px;
    height: 32px;
    margin-bottom: 15px;
  }
  .down {
    width: 20px;
    height: 20px;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item {
  width: calc(100vw - 14px);
  min-width: $min-container;
  height: 50vw;
}
@media (max-width: 1440px) {
  .el-carousel__item {
    height: 960px;
  }
}
</style>
<style lang="scss">
@import "../../../assets/palette.scss";
.home .reveal {
  .el-carousel__container {
    height: 50vw;
    min-width: $min-container;
  }
  .el-carousel__arrow {
    width: 80px;
    height: 80px;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.3);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    font-size: 36px;
  }
  .el-carousel__arrow--right {
    right: 0;
  }
  .el-carousel__arrow--left {
    left: 0;
  }
}
@media (max-width: 1440px) {
  .home .reveal {
    .el-carousel__container {
      height: 50vw;
      height: 960px;
    }
  }
}
</style>