<template>
  <div class="qusetion-card" @click="handleClick">
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
    },
    methods: {
      handleClick() {
        this.$router.push({
          name: 'question',
          query: {
            articleId: this.articleId
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .qusetion-card {
    position: relative;
    height: auto;
    max-height: 60px;
    padding-left: 22px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
    line-height: 22px;
    margin-bottom: 20px;

    &:hover {
      color: #ff0000;
    }
  }
</style>