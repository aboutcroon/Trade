<template>
  <section class="game-videos">
    <div class="container">
      <div class="videos-top">
        <h2 class="title">LIVE视频</h2>
        <p class="text">美感与设计的结合，尽在此时</p>
      </div>
      <div class="arrangement">
        <div class="videos" ref="videos">
          <video
            autoplay
            controls
            :poster="require('@/assets/img/posterimage.jpg')"
            loop
            muted
          >
            <source
              :src="require('@/assets/videos/jojo.mp4')"
              type="video/mp4"
            />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <div class="video-info">
            <svg class="icon icon-game-video" aria-hidden="true">
              <use xlink:href="#icon_video"></use>
            </svg>
            <span>正在播放：</span>
            <span>{{ videoInfo }}</span>
          </div>
        </div>
        <div class="schedule">
          <h2 class="title">大赛安排</h2>
          <div class="package">
            <ul class="content">
              <li
                v-for="(item, index) in list"
                :key="index"
                class="schedule-item"
                :class="{ active: index <= schedule - 1 }"
              >
                <div
                  class="round"
                  :class="{
                    active: index <= schedule,
                    glow: index === Number(schedule),
                  }"
                ></div>
                <div class="text">
                  <div class="left">
                    <div class="name">{{ item.name }}</div>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <div class="right">{{ item.status }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="container">
        <svg class="icon icon-game-speaker" aria-hidden="true">
          <use xlink:href="#icon_speaker"></use>
        </svg>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      schedule: 3, // 当前时间节点（从 0 开始）
      videoInfo: '浣熊',
      message: '第三届（2019）中华商标创意设计大赛新闻发布会暨启动仪式在京举行',
      /* 时间安排数据 */
      list: [
        {
          name: '启动发布会',
          time: '2020-12-06',
          status: '已结束',
        },
        {
          name: '正式征稿',
          time: '2020-12-06',
          status: '已结束',
        },
        {
          name: '报名截止',
          time: '2020-12-17',
          status: '正在进行',
        },
        {
          name: '初审结束时间',
          time: '2020-12-22',
          status: '未开始',
        },
        {
          name: '评审会',
          time: '2020-12-30',
          status: '未开始',
        },
        {
          name: '复审结束时间',
          time: '2020-02-01',
          status: '未开始',
        },
        {
          name: '颁奖典礼',
          time: '2020-02-06',
          status: '未开始',
        },
      ]
    }
  },
  created() {
    /* console.log('this.$refs.videos')
    console.log(this.$refs.videos.children[0]) */
    this.$nextTick(() => {
      const videoElem = this.$refs.videos.children[0]
      videoElem.play()
      /* if (videoElem.paused) {
        videoElem.play()
      } else {
        videoElem.pause();
      } */
    })

  }
}
</script>
<style lang="scss" scoped>
.game-videos {
  padding-top: 145px;
  background-color: #000;
  background: url("../../../assets/img/game_background_1.jpg");
  background-position: center center;
  background-size: cover;
}

.videos {
  display: flex;
  position: relative;
  video {
    outline: none;
    width: 1006px;
    height: 566px;
  }
  .video-info {
    color: #ffffff;
    position: absolute;
    top: 26px;
    left: 18px;
    display: flex;
    align-content: center;
  }
  .icon-game-video {
    width: 22px;
    height: 22px;
    fill: #ff0000;
    margin-right: 8px;
  }
}

.videos-top {
  margin-bottom: 32px;
  .title {
    margin-bottom: 10px;
    color: #ffffff;
    font-size: 36px;
    font-weight: normal;
  }
  .text {
    color: #ffffff;
    opacity: 0.5;
  }
}

.arrangement {
  display: flex;
  margin-bottom: 50px;
  .schedule {
    flex-grow: 1;
    background-color: rgba(255, 255, 255, 0.2);
    position: relative;
  }
  .schedule .title {
    padding: 13.4px 24px;
    color: #ffffff;
    font-size: 18px;
    font-weight: normal;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .schedule .package {
    height: 432px;
    margin-left: 33px;
    margin-top: 24px;
    border-left: 1px dashed #acb4d7;
    margin-bottom: 54px;
  }
  .schedule .content {
    position: relative;
    margin-bottom: -60px;
  }

  .schedule .content .round {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #bbbbbb;
    position: absolute;
    left: -4px;
    &.active {
      background-color: #ffffff;
    }
    &.glow {
      box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.3);
    }
  }
  .schedule .schedule-item {
    color: #ffffff;
    position: relative;
    border-left: 1px solid transparent;
    margin-left: -1px;
    &.active {
      border-left-color: #ffffff;
    }
  }
  .schedule-item .name {
    margin-top: -2px;
    line-height: 1;
    font-size: 16px;
    margin-bottom: 11px;
  }
  .schedule-item .time {
    line-height: 1;
    font-size: 12px;
    opacity: 0.5;
  }
  .schedule-item .right {
    font-size: 14px;
    width: 95px;
  }
  .schedule-item .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;
    padding-bottom: 35px;
    /* .left .name {
      margin-bottom: 2px;
    } */
  }
  /* .schedule .content .line {
    
    height: 138px;
    position: absolute;
  } */
  .schedule .content .dotted-line {
    border-right: 1px dashed #acb4d7;
    height: 138px;
  }
}
.message {
  padding: 22px 0;
  background-color: #f5f5f5;
  .container {
    display: flex;
    align-items: center;
  }
  .icon-game-speaker {
    width: 20px;
    height: 20px;
    fill: #ff0000;
    margin-right: 15px;
  }
}
</style>