<template>
  <div class="guest-card">
    <div class="content">
      <div class="card-avatar">
        <img :src="avatar" alt="" />
      </div>
      <div class="card-name" :style="{ color: titleColor }">{{ name }}</div>
      <div class="card-position" :style="{ color: describeColor }">
        {{ position }}
      </div>
    </div>
    <div class="float" @click="clickLink(link)">
      <h2 class="float-name">{{ name }}</h2>
      <div class="float-position">{{ position }}</div>
      <div class="float-description"><span>{{ description }}</span></div>
      <div class="more">
        <router-link :to="{name: link}">查看更多</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GuestCard',
  props: {
    name: {
      default: '姓名'
    },
    position: {
      default: '描述'
    },
    description: {
      default: '内容'
    },
    avatar: {
      default: ' '
    },
    link: {
      default: '/'
    },
    titleColor: {
      default: '#f8f8f8'
    },
    describeColor: {
      default: '#9e9ea1'
    }
  },
  created() {
  },
  methods: {
    clickLink(name) {
      this.$router.push({name: name})
    }
  }
}
</script>
<style lang="scss" scoped>
.guest-card {
  overflow: hidden;
  position: relative;
  width: 320px;
  height: 402px;
  &:hover {
    cursor: pointer;
    .float {
      top: 0;
    }
    .card-avatar {
      height: 402px;
    }
  }
}
.content {
  width: 100%;
  height: 100%;
}
.card-avatar {
  transition: all 0.1s;
  width: 320px;
  height: 320px;
  overflow: hidden;
  img {
    width: 320px;
  }
  margin-bottom: 15px;
}
.card-name {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5px;
}
.card-position {
  font-size: 18px;
  font-weight: 400;
  opacity: 0.5;
}

.float {
  padding: 76px 25px 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0.9;
  background-color: #ff0000;
  color: #ffffff;
}
.float-name {
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 13px;
}
.float-position {
  font-size: 18px;
  margin-bottom: 22px;
}
.float-description {
  font-size: 14px;
  line-height: 27px;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.more {
  position: absolute;
  left: 25px;
  bottom: 70px;
}
</style>