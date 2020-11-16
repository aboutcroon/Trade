<template>
  <div class="user-title" ref="userTitle">
    <div class="avatar" v-if="showAvatar">
      <img
        v-if="avatar"
        :src="avatar" alt=""
      />
      <svg v-else class="icon" aria-hidden="true">
        <use xlink:href="#icon_profile"></use>
      </svg>
    </div>
    <div class="left-text">
      <div class="headline" v-if="title">{{ title }}</div>
      <div class="subtitle" v-if="description">{{ description }}</div>
    </div>
    <ul class="statistics-list" v-if="statList.length != 0">
      <li
        class="statistics-item"
        v-for="(item, index) in statList"
        :key="index"
      >
        <div class="number">{{ item.number }}</div>
        <div class="text">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'UserTitle',
  props: {
    showAvatar: {
      type: Boolean,
      default: false
    },
    avatar: {
      default: ''
    },
    title: {
      default: '标题'
    },
    description: {
      default: '描述'
    },
    statList: {
      defualt() {
        return []
      }
    }
  },
  mounted() {
    /* 修改向上移动的高度，为本身的一半 */
    const title = this.$refs.userTitle
    const height = title.offsetHeight
    title.style.marginTop = -(height / 2) + 'px'
  }
}
</script>
<style lang="scss" scoped>
.user-title {
  padding: 20px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 3px 12px 0px rgba(215, 215, 215, 0.27);
}
.avatar {
  border-radius: 50%;
  width: 82px;
  height: 82px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/user_default_avatar.png");
  }
  svg {
    width: 82px;
    height: 82px;
    fill: #e2e2e2;
  }
}
.left-text {
  padding-left: 16px;
  .headline {
    padding-bottom: 5px;
    font-size: 18px;
    color: #333333;
  }
  .subtitle {
    font-size: 14px;
    color: #999999;
  }
}
.statistics-list {
  display: flex;
  margin-left: auto;
  text-align: center;
}
.statistics-item {
  padding-left: 50px;
  padding-right: 50px;
  border-right: 1px solid #e5e5e5;
  &:last-child {
    border-right: none;
  }
  .number {
    margin-bottom: 3px;
  }
  .text {
    color: #999999;
  }
}
</style>