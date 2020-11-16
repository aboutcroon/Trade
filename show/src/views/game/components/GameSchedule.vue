<template>
  <div class="game-schedule">
    <ul class="name-list">
      <li v-for="(item, index) in progressList" :key="index">
        {{ item.name }}
      </li>
    </ul>
    <div class="line-list">
      <template v-for="(item, index) in progressList">
        <div class="round" :key="'round' + index" :class="{active: index <= status, glow: index === status}"></div>
        <div
          class="line"
          v-if="index !== progressList.length - 1"
          :key="'line' + index"
          :class="{active: index <= status - 1}"
        ></div>
      </template>
    </div>
    <ul class="time-list">
      <li v-for="(item, index) in progressList" :key="index">
        {{ item.time }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 1,
      progressList: [
        {
          name: '作品征集',
          time: '2020.12.06 ~ 2020.01.17'
        },
        {
          name: '作品初选',
          time: '2020.01.17 ~ 2020.01.22'
        },
        {
          name: '作品复选',
          time: '2020.01.22 ~ 2020.02.01'
        },
        {
          name: '颁奖典礼',
          time: '2020.02.06'
        }
      ],
    }
  }
}
</script>
<style lang="scss" scoped>
.game-schedule {
  max-width: 1219px;
  padding-bottom: 29px;
}
.name-list,
.line-list,
.time-list {
  display: flex;
}
.name-list,
.time-list {
  justify-content: space-between;
}
.name-list {
  padding-bottom: 20px;
  padding-left: 57px;
  padding-right: 39px;
}
.line-list {
  display: flex;
  align-items: center;
  padding-left: 69px;
  padding-right: 52px;
}
.time-list {
  padding-top: 22px;
  li {
    color: #999999;
    min-width: 158px;
    text-align: center;
  }
}
.round {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #c1c1c1;
  margin: 0 12px;
  &.active {
    background-color: #ff0000;
  }
  &.glow {
    margin: 0 15px;
    box-shadow: 0px 0px 0px 3px rgba(255, 0, 0, 0.1);
  }
}
.line {
  flex-grow: 1;
  border-bottom: 1px solid #c1c1c1;
  &.active {
    border-bottom-color: #ff0000;
  }
}
</style>