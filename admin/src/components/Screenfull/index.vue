<template>
  <div>
    <!-- <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" /> -->
    <div class="display" @click="click">
      <span class="icon iconfont screenfull-svg" :class="isFullscreen?'iconexitscreen':'iconfullscreen'"></span>
      <span class="iconHtml" v-html="isFullscreen?'取消全屏':'全屏'"></span>
    </div>
    
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>

<style scoped>

.screenfull-svg{
  font-size: 18px !important;
  vertical-align: -1.5px;
}
.iconHtml{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(29, 35, 70, 1);
    line-height:20px;
  }
/* .screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
} */
</style>
