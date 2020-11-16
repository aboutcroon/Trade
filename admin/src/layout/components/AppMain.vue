<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="cachedViews">
        <router-view v-if="!$route.meta.noCache" :key="key"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="$route.meta.noCache" :key="key"></router-view>
    </transition>-->
    <!-- <transition name="fade-transform" mode="out-in"> -->
      <keep-alive :max="10">
        <router-view :key="key" />
      </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  //min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  //.app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    //min-height: calc(100vh - 116px);
  //}

  .fixed-header + .app-main {
    // padding-top: 127px; // 之前的值
    padding-top: 105px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
