<template>
  <div class="user-control container">
    <UserTitle
      :stat-list="statList"
      :title="title"
      :description="description"
      :show-avatar="false"
    />
    <gray-block>
      <el-row>
        <el-col :span="8">
          <div class="pictureBox">
            <span class="eventName">{{obj.competitionName}}</span>
            <div class="img-container">
              <img :src="obj.worksJpgUrl" />
            </div>
            <div style="margin-top:30px" v-show="judgeStage == 2">
              <el-button class="btn c00B3B3" round @click="updateStatuFun($event,obj.worksId,4)">通过</el-button>
              <el-button class="btn cB30000" round @click="updateStatuFun($event,obj.worksId,5)">驳回</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <el-form class="contentBox" ref="form" :model="obj" label-width="80px">
            <el-form-item label="赛事名称">
              <span>{{obj.competitionName }}</span>
            </el-form-item>
            <el-form-item label="奖项类型">
              <span>{{obj.prizeName}}</span>
            </el-form-item>
            <el-form-item label="作品名称">
              <span>{{obj.worksName}}</span>
            </el-form-item>
            <el-form-item label="作品属性">
              <span>{{worksPropertyName}}</span>
            </el-form-item>
            <el-form-item label="作品类型">
              <span>{{categoryName}}</span>
            </el-form-item>
            <el-form-item label="作品简介">
              <span>{{obj.worksDescription}}</span>
            </el-form-item>
            <el-form-item label="作品打分" v-show="judgeStage == 3">
              <div>
                <span>主旨</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starPurpose"></el-rate>
              </div>
              <div>
                <span>创意</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starIdea"></el-rate>
              </div>
              <div>
                <span>设计</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starDesign"></el-rate>
              </div>
              <div>
                <span>易用</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starUsability"></el-rate>
              </div>
              <div>
                <span>品牌</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starBrand"></el-rate>
              </div>
              <div>
                <span>延展</span>
                <el-rate :disabled="statrDisabled" allow-half v-model="obj.starExtension"></el-rate>
              </div>
            </el-form-item>
            <el-button class="user-btn cB30000" @click="scoreFun" v-show="judgeStage == 3">确认</el-button>
            <router-link to="/user">
              <el-button class="user-btn user-btn-return">返回</el-button>
            </router-link>
          </el-form>
        </el-col>
      </el-row>
    </gray-block>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getFun, postFun } from "@/api/transit.js";
import GrayBlock from "../components/GrayBlock.vue";
import UserTitle from "../components/UserTitle.vue";
export default {
  name: "ReviewDetail",
  computed: {
    ...mapGetters(["userinfo", "auth"])
  },
  components: {
    GrayBlock,
    UserTitle
  },
  data() {
    return {
      type: "0",
      title: "评审作品管理",
      description: "美感与设计的结合，尽在此时",
      statList: [],
      formInline: {
        user: "",
        region: ""
      },
      obj: {
        //   worksId:'123',
        //   eventName: '123',
        //   picture: require("@/assets/img/trade_list_empty.png"),
        //   name: '123',
        //   describe:'123',
        //   great: '123',
        //   visit: '123'
      },
      categoryName: "",
      worksPropertyName: "",
      statrDisabled: false
    };
  },
  mounted() {
    this.type = this.userinfo.roleType;
    this.judgeStage = this.$route.query.judgeStage;
    this.reviewDetailFun();
  },
  methods: {
    // 获取作品分类及作品属性
    getDictData() {
      this.getDict().then(response => {
        if (response.code === "200" || response.code === 200) {
          let data = response.data;
          for (let i of data["作品类型"]) {
            if (this.obj.categoryId == i.key) {
              this.categoryName = i.value;
            }
          }
          for (let item of data["作品属性"]) {
            if (this.obj.worksPropertyId == item.key) {
              this.worksPropertyName = item.value;
            }
          }
        } else {
          this.$message.error(message);
        }
      });
    },

    reviewDetailFun() {
      var info = {
        worksId: this.$route.query.index.toString()
      };
      postFun("/trade-web/api/judge/selectByWorksId", info).then(res => {
        if (res.code == 200) {
          this.obj = res.data;
          /**判断评分存在禁止修改 */
          // if (res.data.starPurpose) {
          //   this.statrDisabled = true;
          // }
          this.getDictData();
        }
      });
    },
    updateStatuFun(e, id, type) {
      var info = {
        worksId: id.toString(),
        worksStatus: type
      };
      postFun("/trade-web/api/judge/updateStatus", info).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**评分 */
    scoreFun() {
      var info = {
        worksId: this.$route.query.index.toString(),
        starPurpose: this.obj.starPurpose,
        starIdea: this.obj.starIdea,
        starDesign: this.obj.starDesign,
        starUsability: this.obj.starUsability,
        starBrand: this.obj.starBrand,
        starExtension:this.obj.starExtension,
      };
      postFun("/trade-web/api/judge/score", info).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message);
          this.reviewDetailFun();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取筛选列表
    getDict(param) {
      return getFun("/trade-web/api/dict", param);
    }
  }
};
</script>
<style scoped lang="scss">
.pictureBox {
  position: relative;
  width: 320px;
  height: 239px;
  margin: 0 auto;
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
}
.btn {
  width: 144px;
  height: 35px;
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #454545;
}
.c00B3B3 {
  background: #00b3b3;
  border: 1px solid #00b3b3;
  color: #fff;
}
.cB30000 {
  background: #b30000;
  border: 1px solid #b30000;
  color: #fff;
}
.el-rate {
  display: inline-block;
  margin-left: 10px;
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
.user-btn {
  height: 46px;
  width: 132px;
  padding: 15px 20px;
}
.user-btn-return {
  background-color: transparent;
  border: 1px solid #ff0000;
  color: #ff0000;
  margin-left: 20px;
}

.user-btn-return:hover {
  background-color: #ff0000;
  color: #ffffff;
}
</style>
<style  lang="scss">
.contentBox {
  .el-form-item__content {
    line-height: 40px !important;
  }
  .el-rate__icon {
    font-size: 26px !important;
  }
}
</style>