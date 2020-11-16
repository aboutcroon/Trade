<template>
  <div class="news-detail-list-item" :class="{'is-open': isSelected}" @click="handleClick">
    <div class="news-item-red-point "> </div>
    {{title}}
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        default: '新闻标题'
      },
      articleId: {
        default: '0'
      },
      isSelected: {
        default: false
      }
    },
    methods: {
      handleClick() {
        this.$emit('handleTitleClick', this.articleId)
      }
    }
  }
</script>
<style lang="scss">
  .news-detail-list-item {
    position: relative;
    width: 367px;
    height: auto;
    max-height: 60px;
    line-height: 30px;
    padding-left: 22px;
    font-size: 14px;
    color: #333333;
    cursor: pointer;

    .news-item-red-point {
      position: absolute;
      left: 2px;
      top: 14px;
      width: 4px;
      height: 4px;
      background: #ff0000;
    }

    &:hover {
      color: #ff0000;
    }
    &.is-open {
      color: #ff0000;
    }
  }
</style>