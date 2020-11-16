<template>
  <div class="right-side-bar">
    <div class="right-bar-block">
      <router-link to="helpCenter">
        <div class="right-bar-icon-container">
          <svg class="icon right-bar-icon" aria-hidden="true">
            <use xlink:href="#icon_help"></use>
          </svg>
        </div>
        <div class="right-bar-tip">
          帮助中心
        </div>
      </router-link>
    </div>
    <div v-show="visible" class="right-bar-block back-to-top" @click="backToTop">
      <div class="right-bar-icon-container">
        <svg class="icon right-bar-icon" aria-hidden="true">
          <use xlink:href="#icon_top"></use>
        </svg>
      </div>
      <div class="right-bar-tip">
        返回顶部
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RightSideBar',
    props: {
      visibilityHeight: {
        type: Number,
        default: 400
      },
      backPosition: {
        type: Number,
        default: 0
      },
      transitionName: {
        type: String,
        default: 'fade'
      }
    },
    data() {
      return {
        visible: false,
        interval: null,
        isMoving: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      handleScroll() {
        this.visible = window.pageYOffset > this.visibilityHeight
      },
      backToTop() {
        if (this.isMoving) return
        const start = window.pageYOffset
        let i = 0
        this.isMoving = true
        this.interval = setInterval(() => {
          const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
          if (next <= this.backPosition) {
            window.scrollTo(0, this.backPosition)
            clearInterval(this.interval)
            this.isMoving = false
          } else {
            window.scrollTo(0, next)
          }
          i++
        }, 16.7)
      },
      easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * (--t * (t - 2) - 1) + b
      }
    }
  }
</script>

<style scoped lang="scss">
  .right-side-bar {
    position: fixed;
    bottom: 10%;
    right: 20px;
    width: 60px;
    height: 120px;
    z-index: 2;
    text-align: center;

    .right-bar-block {
      width: 60px;
      height: 60px;
      background: #FFFFFF;
      border: 1px solid #ECECEC;
      color: #999999;
      cursor: pointer;
    }

    .right-bar-icon-container {
      height: 38px;
      width: 60px;
      padding-top: 8px;
    }

    .right-bar-icon {
      height: 22px;
      width: 60px;
    }

    .right-bar-tip {
      height: 16px;
      font-size: 12px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      line-height: 16px;
    }

    .back-to-top {
      color: #ff0000;
    }
  }
</style>
