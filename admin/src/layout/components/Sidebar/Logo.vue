<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" style="width: 50px;"/>
        <!-- <span v-if="logo" class="icon iconfont" :class="logo" style="font-size: 65px;line-height: 7px;"></span> -->
        <!-- <h1 v-else class="sidebar-title">
          <span v-html="title1"></span>
        </h1>-->
        <p class="line"></p>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo2" :src="logo2" class="sidebar-logo" />
        <h1 class="sidebar-title">
          <span v-html="title1"></span>
        </h1>
        <p class="line"></p>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title1: "",
      //title1: "高级持续性威胁预警系统",
      logo:require("@/assets/trademark_frontend.png"),
      logo2: require("@/assets/trademark_frontend2.png")
      //logo:'',
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px;
  background: $white;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding: 26px 0 26px 0;
    & .sidebar-logo {
      /*width: 32px;
      height: 32px;*/
      vertical-align: middle;
      width: 142px;
      margin-right: 12px;
      // line-height: 30px;
    }

    & .sidebar-title {
      display: inherit;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      span {
        display: block;
      }
    }
    .line {
      margin: 0 28px;
      margin-top: 18px;
      height: 1px;
      background: rgba(243, 247, 253, 1);
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
