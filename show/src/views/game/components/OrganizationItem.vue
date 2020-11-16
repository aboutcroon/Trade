<template>
  <div class="organization-item">
    <div class="title">{{title}}</div>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: ''
    },
    list: {
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.organization-item {
  display: flex;
  align-items: flex-start;
  .title {
    color: #666666;
    margin-top: 17px;
    padding-left: 10px;
    line-height: 1;
    min-width: 125px;
    border-left: 2px solid #ff0000;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    line-height: 51px;
  }
  .list-item {
    margin-right: 32px;
  }
}
</style>