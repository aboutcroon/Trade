<template>
  <div class="guest-card">
    <div class="content">
      <div class="card-avatar" @mouseenter="show = true" @mouseleave="show = false">
        <span class="eventName">{{dataObj.eventName}}</span>
        <div class="img-container">
          <img :src="dataObj.picture" alt/>
        </div>
        <transition>
          <div class="maskBox" v-if="show">
            <div class="roundBox">
              <el-button class="btn c00B3B3" round @click="modifyWork(dataObj.worksId)">修改</el-button>
              <el-button class="btn cB30000" round @click="deleteWork(dataObj.worksId)">删除</el-button>
              <el-button class="btn c00B3B3" round @click="checkDetail(dataObj.worksId)">查看</el-button>
            </div>
          </div>
        </transition>
        <div class="box">
          <p class="name">{{dataObj.name}}</p>
          <p class="describe">{{dataObj.describe}}</p>
        </div>
        <div class="starBox">
          <svg class="icon trade-item-icon" aria-hidden="true">
            <use xlink:href="#icon_like"></use>
          </svg>
          <span class="trade-item-number">{{dataObj.great}}</span>
          <svg class="icon trade-item-icon" aria-hidden="true" style="padding-top: 2px;">
            <use xlink:href="#icon_view"></use>
          </svg>
          <span class="trade-item-number">{{dataObj.visit}}</span>
        </div>
        <div class="btnBox">
        </div>
      </div>
    </div>
    <el-dialog
      title="中华商标协会"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确定要删除这个作品么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium" style="margin-right: 20px;">取 消</el-button>
        <el-button type="primary" @click="doDelete" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    name: "works",
    props: {
      dataObj: {
        type: Object
      }
    },
    data() {
      return {
        show: false,
        dialogVisible: false
      }
    },
    methods: {
      checkDetail(worksId) {
        this.$router.push({
          name: 'tradeDetail', // 跳转的页面
          query: {
            worksId: worksId
          }
        })
      },
      deleteWork() {
        this.dialogVisible = true
      },
      doDelete() {
        this.dialogVisible = false
        let param = {
          worksIdList: [this.dataObj.worksId]
        }
        this.postDeleteWork(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            this.$message.success(response.message)
            this.$emit('handleWorkDelete', '')
          } else {
            this.$message.error(response.message)
          }
        })
      },
      modifyWork(worksId) {
        this.$router.push({
          name: 'uploadTrade', // 跳转的页面
          query: {
            worksId: worksId
          }
        })
      },
      // 删除作品列表
      postDeleteWork(param) {
        return postFun('/trade-web/api/works/delete', param)
      },
    }
  };
</script>
<style lang="scss" scoped>
  .guest-card {
    overflow: hidden;
    position: relative;
    width: 25%;
    float: left;

    .el-button {
      padding: 10px 20px;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }

  .card-avatar {
    transition: all 0.1s;
    position: relative;
    width: 320px;
    height: 372px;
    display: inline-block;
    overflow: hidden;
    background: #fff;
    margin-bottom: 15px;

    .img-container {
      width: 320px;
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 320px;
        max-height: 240px;
      }
    }

    .maskBox {
      width: 320px;
      height: 240px;
      position: absolute;
      top: 0;
      left: 0;
      background: rgb(0, 0, 0, 0.12);

      .roundBox {
        position: absolute;
        top: 60px;
        left: 50%;
        margin-left: -77px;
      }
    }
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

  .eventName {
    height: 30px;
    background: #000000;
    opacity: 0.12;
    position: absolute;
    top: 0;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding: 0 10px;
  }

  .box {
    padding: 0 15px;
  }

  .name {
    font-size: 18px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 52px;
  }

  .describe {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .starBox {
    position: absolute;
    bottom: 10px;
    left: 15px;
  }

  .trade-item-icon {
    width: 16px;
    height: 16px;
  }

  .trade-item-number {
    margin: 0 16px 0 6px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;

  }

  .btnBox {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .btn {
    width: 144px;
    height: 35px;
    display: block;
    font-size: 14px;
    font-family: Noto Sans S Chinese;
    font-weight: 500;
    color: #454545;
  }

  .c00B3B3:hover {
    background: #00b3b3;
    border: 1px solid #00b3b3;
    color: #fff;
  }

  .cB30000:hover {
    background: #b30000;
    border: 1px solid #b30000;
    color: #fff;
  }

  .el-button + .el-button {
    margin-left: 0 !important;
    margin-top: 15px;
  }
</style>