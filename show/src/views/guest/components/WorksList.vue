<template>
  <div class="work-list">
    <el-carousel arrow="never" indicator-position="none" ref="ElCarousel" :autoplay="move">
      <el-carousel-item v-for="(item, index) in 3" :key="index">
        <div class="work-list-content">
          <WorksItem v-for="item in 4" :key="item"/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="carousel">
      <div class="arrow prev" @click="clickSwitch('prev')" @mouseover="overSwitch" @mouseleave="leaveSwitch">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon_left"></use>
        </svg>
      </div>
      <div class="arrow next" @click="clickSwitch('next')" @mouseover="overSwitch" @mouseleave="leaveSwitch">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon_right"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import WorksItem from './WorksItem.vue'
export default {
  components: {
    WorksItem
  },
  data() {
    return {
      move: true,
      switchCd: false,
    }
  },
  methods: {
    clickSwitch(type) {
      if (this.switchCd) {

      } else {
        this.switchCd = true
        if (type === 'prev') {
          this.$refs.ElCarousel.prev()
        } else if(type === 'next') {
          this.$refs.ElCarousel.next()
        }
        let timer = setTimeout(() => {
          this.switchCd = false
        }, 450)
      }
    },
    /* 移入 */
    overSwitch() {
      this.move = false
    },
    /* 移出 */
    leaveSwitch() {
      this.move = true
    },
  }
}
</script>
<style lang="scss" scoped>
.work-list-content {
  padding: 10px 10px;
  min-height: 350px;
  display: flex;
  justify-content: space-between;
}
</style>