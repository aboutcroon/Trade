<template>
  <div class="user-title" ref="userTitle">
    <el-steps :active="2" align-center>
      <el-step title="初筛"></el-step>
      <el-step title="初审"></el-step>
      <el-step title="复审"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  name: "UserTitle",
  props: {
    activeNum: {
      type: Number
    }
  },
  mounted() {
    /* 修改向上移动的高度，为本身的一半 */
    const title = this.$refs.userTitle;
    const height = title.offsetHeight;
    title.style.marginTop = -(height / 2) + "px";
  }
};
</script>
<style lang="scss" scoped>
.user-title {
  padding: 20px;
  margin-bottom: 32px;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 3px 12px 0px rgba(215, 215, 215, 0.27);
  width: 100%;
  text-align: center;
}
</style>
<style lang="scss">
.user-title {
  .el-steps--horizontal {
    width: 80%;
    margin: 0 auto;
  }
  .el-step__icon.is-text {
    color: #fff;
    border: 1px solid #c1c1c1;
  }
  .el-step__head.is-finish .is-text {
    background: #f00;
    color: #f00;
    border: 1px solid #f00;
  }
  .el-step__title.is-finish{
    color: #f00;
  }
  .el-step__icon {
    width: 20px;
    height: 20px;
  }
}
</style>