<template>
  <el-form-item class="sw">
    <div class="swspan">
      <span :model="switchData" :class="icon" @click="switchFun()" />
    </div>
    <el-input-number v-model="num" controls-position="right" :min="5" :max="60" :step="5" />
    <span class="swtext">s</span>
  </el-form-item>
</template>

<script>
export default {
  name: "InputNmb",
  components: {},
  data() {
    return {
      num: 2,
      switchData: false,
      timer: "",
      icon: "icon iconfont iconstart"
    };
  },
  // beforeDestroy() {
  //   if (this.timer) {
  //     clearInterval(this.timer); //关闭
  //   }
  // },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (this.timer) {
        this.icon = "icon iconfont iconstart";
        clearInterval(this.timer); //关闭
      }
    }
  },
  methods: {
    switchFun() {
      this.switchData = !this.switchData;
      console.log(this.switchData);
      if (this.switchData == true) {
        this.setIntervalFun();
        this.icon = "icon iconfont iconstop";
        console.log(1111);
      } else {
        this.clearInterval();
        this.icon = "icon iconfont iconstart";
        console.log(222222);
      }
    },
    /** 定时任务 */
    setIntervalFun() {
      this.timer = setInterval(() => {
        /** 传-1 后台计算总条数 */
        // this.getList(-1)
        this.$emit("getList");
      }, this.num * 1000);
    },
    /** 关闭定时 */
    clearInterval() {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss">
.swspan {
  display: inline-block;
  position: absolute;
  left: 0px;
  z-index: 5;
  width: 31px;
  height: 32px;
  background: rgba(73, 90, 191, 1);
  border-radius: 8px 0px 0px 8px;
  color: #fff;
  cursor:pointer;
}
.swspan span {
  display: inline-block;
  padding-left: 9px;
  font-size: 12px;
}
.sw .el-input-number.is-controls-right .el-input__inner {
  padding-right: 30px !important;
}
.sw .el-input-number span {
  background: rgba(221, 224, 243, 1);
}
.sw .el-input-number span i {
  font-size: 14px;
  font-weight: 700;
}
.swtext {
  display: inline-block;
  position: absolute;
  right: 40px;
  top: 0;
}
</style>
