<template>
  <div class="right-menu-item hover-effect navbar-notice">
    <el-popover
      placement="bottom"
      width="320"
      trigger="click"
      v-model="visible"
      hide=""
    >
      <div class="navbar-badge">
        <h4 class="navber-badge-title">
          <span class="navber-badge-text">全部通知</span>
          <span class="navber-badge-close" @click="visible = false">
            <span class="iconfont iconbatchdeletion"></span>
          </span>
        </h4>
        <div class="navbar-badge-content" v-if="messageList.length > 0">
          <div class="navber-badge-list">
            <el-tooltip class="item"
                effect="dark"
                :content="item.text"
                placement="top"
                v-for="(item, index) in messageList"
                :key="index"
                :open-delay="1000"
              >
                <div class="navber-badge-item"
                  :class="{'active': item.status === 1}"
                >
                  <span class="navber-badge-message">{{item.text}}</span>
                  <span class="navber-badge-time">{{currentTime(item.time)}}</span>
                  <span class="navber-badge-unread"></span>
                  <span class="icon iconfont icondelete" @click="deleteMessage(index)"></span>
                </div>
              </el-tooltip>
          </div>
          <div class="badge-list-scrollbar"></div>
          <section class="navber-badge-clear">
            <el-button type="primary" plain @click="clearMessageList">全部清除</el-button>
          </section>
        </div>
        <div class="navbar-badge-not" v-else>
          <div class="badge-message-air">
            <img :src="messageAir" alt="">
          </div>
          <p class="badge-not-text">没有新的消息通知</p>
        </div>
      </div>
      <div slot="reference" class="right-menu-item hover-effect" @click="openNotice">
        <span class="icon iconfont screenfull-svg iconnotice"></span>
        <span class="iconHtml">通知</span>
        <span class="navber-badge-number" v-if="unreadNumber > 0">{{noticeNumber}}</span>
      </div>
    </el-popover>
  </div>
</template>
<script>
import Bus from '@/utils/refreshBus'
import util from '@/api/util'
import { isLocalName, getLocal, setLocal } from '@/utils/local'  // 引入 localStorage 设置方法
export default {
  data () {
    return {
      visible: false, // 消息通知框开关
      messageAir: require('@/assets/notice-message-air.png'),
      localName: 'baasNoticeList', // localStorage 存储的名称
      messageList: [] // 消息列表
    }
  },
  watch: {
    // 点击消息后去掉未读小红点
    visible () {
      if(this.visible === false) {
        this.messageList.forEach(item => {
          item.status = 0
        })
        this.setMessageLocal()
      }
    }
  },
  computed: {
    // 通知大于 99 条显示 99+
    noticeNumber () {
      return this.unreadNumber > 99 ? '99+' : this.unreadNumber
    },
    // 未读通知数量
    unreadNumber () {
      let number = 0
      this.messageList.forEach((item, index) => {
        number += item.status
      })
      return number
    }
  },
  mounted () {
    this.addMessage()
    this.getMessageList()
  },
  methods: {
    // 点击事件
    openNotice () {},
    // 给消息列表添加消息
    addMessage () {
      Bus.$on('add-notice', (data) => {
        this.messageList.unshift(data)
        this.setMessageLocal()
      })
    },
    // 删除消息列表中的某条消息
    deleteMessage (index) {
      this.messageList.splice(index, 1)
      this.setMessageLocal()
    },
    // 清空消息列表
    clearMessageList () {
      this.messageList = []
      this.setMessageLocal()
    },
    // 转换为时间差格式
    currentTime (tiem) {
      return util.timeDifference(tiem)
    },
    // 在 localStorage 中存储消息
    setMessageLocal () {
      this.deleteExtraMessage(100)
      setLocal(this.localName, this.messageList)
    },
    // 限制条数，删除多余历史条数
    deleteExtraMessage (number) {
      if (this.messageList.length > number) {
        let extra = this.messageList.length - number
        this.messageList.splice(number, extra)
      }
    },
    // 获取消息列表
    getMessageList () {
      if(isLocalName(this.localName)){
        this.messageList = getLocal(this.localName)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-notice {
  .iconHtml {
    font-size: 14px;
  }
  display: inline-block;
  .navber-badge-number {
    display: inline;
    font-size: 12px;
    line-height: 17px;
    padding: 1px 6px;
    max-width: 35px;
    background: rgba(191, 73, 90, 1);
    border-radius: 10px;
    color: #ffffff;
  }
}
</style>
<style lang="scss">
.navbar-badge {
  .navber-badge-title {
    margin: 0;
    padding: 5px 0 16px;
    display: flex;
    justify-content: space-between;
    .navber-badge-text {
      padding: 0 10px;
      color: #1D2346;
    }
    .navber-badge-close {
      cursor: pointer;
      padding-right: 4px;
      .iconbatchdeletion {
        font-size: 10px;
      }
    }
  }
  .navbar-badge-not {
    color: #909399;
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px 0 18px;
    height: 213px;
    .badge-message-air {
      padding-top: 53px;
      text-align: center;
      img {
        width: 100px;
      }
    }
    p {
      margin-top: 28px;
      font-size:12px;
      font-weight:500;
      color:#8794AE;
      line-height:17px;
    }
  }
  .navber-badge-list {
    height: 151px;
    overflow-y: auto;
    padding-right: 5px;
    margin-bottom: 18px;
    color: #8e91a2;
    font-size: 12px;
    line-height: 12px;
    // 隐藏火狐滚动条
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1px;
      background-color: #3b3783;
    }
    &::-webkit-scrollbar-track {
      background: #d8d8d8;
    }
    .navber-badge-item {
      border-radius: 6px;
      display: flex;
      padding: 9px 28px 9px 23px;
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      transition: background-color .25s ease;
      .navber-badge-time {
        color: #c3c9d6;
        font-size: 12px;
        margin-left: auto;
      }
      .navber-badge-message {
        max-width: 15em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .navber-badge-unread {
        display: none;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #bf495a;
        position: absolute;
        top: 14px;
        left: 10px;
      }
      .icon.iconfont.icondelete {
        visibility: hidden;
        position: absolute;
        top: 9px;
        right: 10px;
        color: #bf495a;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        background-color: #f2f5fa;
        .icon.iconfont.icondelete {
          visibility: visible;
        }
      }
      &.active {
        .navber-badge-message {
          color: #1d2346;
        }
        .navber-badge-time {
          color: #8794ae;
        }
        .navber-badge-unread {
          display: block;
        }
      }
    }
  }
  .navber-badge-clear {
    text-align: center;
    .el-button {
      width: 200px;
      min-height: 36px;
      border: none;
      color: #8794ae;
      &:hover, &:focus {
        color: #fff;
      }
    }
  }
}
</style>
