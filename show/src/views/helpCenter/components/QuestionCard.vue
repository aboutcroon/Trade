<template>
  <div class="question-card" :class="{'is-open': isSelected}" @click="handleClick">
    <div class="question-card-red-point"> </div>
    {{title}}
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        default: '问题标题'
      },
      articleId: {
        default: '0'
      },
      isSelected: {
        default: false
      },
    },
    methods: {
      handleClick() {
        this.$emit('handleQuestionClick', this.articleId)
      }
    }
  }
</script>
<style lang="scss">
  .question-card {
    position: relative;
    height: auto;
    max-height: 60px;
    line-height: 30px;
    padding-left: 22px;
    font-size: 14px;
    color: #333333;
    cursor: pointer;

    .question-card-red-point {
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