<template>
  <div class="works-item">
    <div class="images">
      <img :src="img" alt="">
    </div>
    <div class="name">{{name}}</div>
    <div class="works-item-info">
      <div class="author"><span>设计师：</span>{{author}}</div>
      <div class="like">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon_like"></use>
        </svg>
        <span>{{like}}</span>
      </div>
      <div class="view">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon_view"></use>
        </svg>
        <span>{{view}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WorksItem',
  props: {
    name: {
      default: '-'
    },
    author: {
      default: '-'
    },
    like: {
      default: 0
    },
    view: {
      default: 0
    },
    img: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.works-item {
  max-width: 320px;
  box-shadow: 0px 0px 8px 0px rgba(183, 183, 183, 0.3);
  .images {
    width: 320px;
    height: 240px;
    background-color: #ccc;
  }
  .name {
    color: #333333;
    line-height: 1;
    padding: 18px 14px;
  }
  .works-item-info {
    display: flex;
    color: #999999;
    padding: 0 14px 18px;
    .icon {
      margin-right: 5px;
      width: 16px;
      height: 16px;
    }
    .like {
      margin-left: auto;
      padding-right: 16px;
    }
  }
}
</style>