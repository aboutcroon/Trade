<template>
  <div class="work-title" ref="WorkTitle">
    <div class="left-text">
      <div class="headline">{{ title }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WorkTitle',
    props: {
      title: {
        default: '优秀作品'
      },
    },
    mounted() {
      /* 修改向上移动的高度，为本身的一半 */
      const title = this.$refs.WorkTitle
      const height = title.offsetHeight
      title.style.marginTop = -(height / 2) + 'px'
    }
  }
</script>
<style lang="scss" scoped>
  .work-title {
    padding: 20px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 3px 12px 0px rgba(215, 215, 215, 0.27);
  }

  .left-text {
    padding-left: 8px;
    .headline {
      line-height: 56px;
      font-size: 24px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      color: #333333;
    }
  }
</style>