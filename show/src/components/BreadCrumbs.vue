<template>
  <div class="bread-crumbs" :style="styleObject">
    <div class="bread-crumbs-mask">
      <div class="container">
        <div class="left">
          <div class="title">
            <span v-for="(item, index) in crumb" :key="index">
              <span
                v-if="index !== 0"
                class="bar"
                :class="{active: activeLink(item.link)}"
              >/</span>
              <span
                class="title-main"
                :class="{active: activeLink(item.link)}"
                @click="clickLink(item.link)"
              >{{ item.title }}</span>
            </span>
            <span class="title-right">{{ titleRight }}</span>
          </div>
          <p class="description">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: '标题'
    },
    titleRight: {
      default: ''
    },
    description: {
      default: '描述'
    },
    /* 面包屑链接 */
    crumb: {
      default() {
        return [
          {
            title: '标题',
            link: '',
          }
        ]
      }
    },
    background: {
      default: require("@/assets/img/home_banner_1.jpg")
    },
  },
  computed: {
    styleObject() {
      return {
        'background': 'url(' + this.background + ')',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    }
  },
  created() {
    
  },
  methods: {
    clickLink(name) {
      if (name && !this.activeLink(name)) {
        this.$router.push({name: name})
      }
    },
    activeLink(value) {
      return value === this.$route.name
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/palette.scss";
.bread-crumbs {
  min-width: $min-container;
  color: #ffffff;
  background-color: #666;
}
.bread-crumbs-mask {
  width: 100%;
  min-height: 402px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
}
.bread-crumbs .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 46px;
}
// .title {
//   font-size: 36px;
//   font-weight: normal;
//   padding-bottom: 8px;
//   .title-right {
//     font-size: 16px;
//     font-weight: 400;
//     color: #ffffff;
//     opacity: 0.5;
//   }
// }
.title {
  font-size: 24px;
  font-weight: normal;
  padding-bottom: 8px;
  .title-left {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      font-size: 36px;
    }
  }
  .bar {
    padding: 0 10px;
    opacity: 0.5;
    &.active {
      opacity: 1;
    }
  }
  .title-main {
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      font-size: 36px;
      cursor: pointer;
    }
    &.active {
      opacity: 1;
      font-size: 36px;
      cursor: auto;
    }
  }
  .title-right {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.5;
  }
}
.description {
  margin-bottom: 28px;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.5;
}
.right {
  display: flex;
  align-items: center;
}
.bread-icon-right {
  margin: 0 5px;
}
.bread-icon-down {
  width: 25px;
  height: 25px;
  opacity: 0.6;
}
</style>