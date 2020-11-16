<template>
  <div class="guest-card" @click="pageFun(link)">
    <div class="content">
      <div class="card-avatar" @mouseenter="show = true" @mouseleave="show = false">
        <span class="eventName">{{dataObj.eventName}}</span>
        <div class="img-container">
          <img :src="dataObj.picture" alt />
        </div>
        <div class="box">
          <p class="name">{{dataObj.name}}</p>
          <p class="describe">{{dataObj.describe}}</p>
        </div>

        <transition>
          <div class="maskBox" v-if="show" v-show="type != 5 && type != 4">
            <div class="roundBox">
              <el-button
                class="btn c00B3B3"
                round
                @click="updateStatuFun($event,dataObj.worksId,4)"
              >通过</el-button>
              <el-button
                class="btn cB30000"
                round
                @click="updateStatuFun($event,dataObj.worksId,5)"
              >驳回</el-button>
            </div>
          </div>
        </transition>

        <!-- <div class="starBox">
          <span class="trade-item-number">设计师：</span>
          <span class="trade-item-number">{{dataObj.author}}</span>
        </div>
        <div class="btnBox">
          <svg class="icon trade-item-icon" aria-hidden="true">
            <use xlink:href="#icon_like" />
          </svg>
          <span class="trade-item-number">{{dataObj.great}}</span>
          <svg class="icon trade-item-icon" aria-hidden="true" style="padding-top: 2px;">
            <use xlink:href="#icon_view" />
          </svg>
          <span class="trade-item-number">{{dataObj.visit}}</span>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getFun, postFun } from "@/api/transit.js";
export default {
  computed: {
    ...mapGetters(["userinfo", "auth"])
  },
  name: "works",
  props: {
    dataObj: {
      type: Object
    },
    link: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      type: 1
      
    };
  },
  mounted() {
    this.type = this.userinfo.roleType;
    console.log(this.dataObj);
  },
  methods: {
    pageFun(link) {
      this.$router.push({ path: link, query: { index: this.dataObj.worksId } });
    },
    updateStatuFun(e, id, type) {
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      var info = {
        worksId: id.toString(),
        worksStatus: type
      };
      postFun("/trade-web/api/judge/updateStatus", info).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message);
          this.$emit("getList");
        }else{
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.guest-card {
  overflow: hidden;
  position: relative;
  width: 25%;
  float: left;
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
  box-shadow: 0px 0px 8px 0px rgba(183, 183, 183, 0.3);
  border-radius: 8px;
  img {
    max-width: 320px;
    max-height: 240px;
  }
  .maskBox {
    width: 320px;
    height: 240px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0, 0.12);
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
.eventName {
  height: 30px;
  background: rgb(0 0 0 / 16%);
  position: absolute;
  top: 20px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 30px;
  padding: 0 10px;
  border-top-right-radius: 19px;
  border-bottom-right-radius: 19px;
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
.roundBox {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -77px;
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
.starBox {
  position: absolute;
  bottom: 10px;
  left: 15px;
}

.trade-item-icon {
  width: 16px;
  height: 16px;
  color: #999999;
}

.trade-item-number {
  margin: 0 16px 0 0px;
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
// .btn:nth-child(2n + 2) {
//   margin: 0 8px 0 8px;
// }
</style>