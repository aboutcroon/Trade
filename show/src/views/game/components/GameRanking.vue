<template>
  <div class="game-ranking">
    <ul class="ranking-list">
      <li class="preview" v-for="(item, index) in list" :key="index">
        <router-link :to="{name: item.link}">
          <img :src="item.img" alt="">
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ranking-list {
  display: flex;
  justify-content: space-between;
}
.preview {
  a {
    display: block;
  }
}
</style>