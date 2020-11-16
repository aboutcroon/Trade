<template>
  <div class="user-control container">
    <div class="user-title" ref="userTitle">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item label="赛事名称：">
          <el-select
            v-model="formInline.paras.competitionId"
            placeholder="请筛选"
            @change="resetGetList"
          >
            <el-option
              v-for="item in matchList"
              :value="item.value"
              :key="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评审状态：" v-if="judgeStage != 1">
          <el-select
            v-model="formInline.paras.worksStatus"
            placeholder="请筛选"
            @change="resetGetList"
          >
            <el-option
              v-for="item in workStatusList"
              :value="item.value"
              :key="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="resetGetList" class="btn">查询</el-button>
        <el-button type="primary" plain class="btn" @click="reset">重置</el-button>
      </el-form>
    </div>
    <gray-block>
      <div class="judging-rules">
        <!-- <div class="title">
        <span>{{ title }}</span>
        </div>-->
        <div class="guest-content">
          <el-steps :active="judgeStage" align-center>
            <el-step title="初筛"></el-step>
            <el-step title="初审"></el-step>
            <el-step title="复审"></el-step>
            <el-step title="获奖"></el-step>
          </el-steps>
          <div v-if="dataArr.length!==0 && judgeStage != 1 " class="guest-content">
            <Review-list-item
              v-for="(item,index) in dataArr"
              :key="index"
              :dataObj="item"
              :link="link"
              @getList="getList"
              :judgeStage="judgeStage"
            ></Review-list-item>
          </div>
          <div class="trade-list-empty" v-else>
            <img :src="emptyUrl" class="trade-empty-icon" />
            <div class="trade-empty-msg">亲，没有作品可以进行评审哦</div>
          </div>
        </div>
        <pagination
          v-if="dataArr.length!==0 && judgeStage != 1"
          :page="this.formInline.pageNumber"
          :total="total"
          :pageSize="this.formInline.pageSize"
          @pagination="handlePageNumber"
        ></pagination>
      </div>
    </gray-block>
  </div>
</template>
<script>
import { getFun, postFun } from "@/api/transit.js";
import GrayBlock from "../components/GrayBlock.vue";
import ReviewListItem from "../components/ReviewListItem.vue";
import pagination from "../components/ReviewPagination";
import time from "@/api/time.js";
export default {
  name: "contentWork",
  components: {
    GrayBlock,
    ReviewListItem,
    pagination
  },
  data() {
    return {
      emptyUrl: require("@/assets/img/trade_list_empty.png"),
      title: "待审批作品",
      link: "/user/ReviewDetail", //页面跳转路径
      formInline: {
        pageNumber: 1,
        pageSize: 8,
        paras: {
          competitionId: "",
          worksStatus: ""
        }
      },
      total: 0,
      matchList: [],
      trialList: [
        { value: "", label: "全部" },
        { value: 3, label: "未初审" },
        { value: 4, label: "初审通过" },
        { value: 5, label: "初审驳回" }
      ], //初审下拉
      reviewList: [
        { value: "", label: "全部" },
        { value: 6, label: "未复审" },
        { value: 7, label: "已评分" }
      ], //复审下拉
      winList: [
        { value: "", label: "全部" },
        { value: 8, label: "未获奖" },
        { value: 9, label: "已获奖" }
      ], //获奖下拉
      dataArr: [
        // {
        //   worksId:'123',
        //   eventName: '123',
        //   picture: require("@/assets/img/trade_list_empty.png"),
        //   name: '123',
        //   describe:'123',
        //   great: '123',
        //   visit: '123'
        // }
      ],
      judgeStage: 1 //赛事阶段
    };
  },
  mounted() {
    /* 修改向上移动的高度，为本身的一半 */
    const title = this.$refs.userTitle;
    const height = title.offsetHeight;
    title.style.marginTop = -(height / 2) + "px";
    this.getCompetitionListData();

    //this.getDictData();
  },
  methods: {
    resetGetList() {
      this.formInline.pageNumber = 1;
      this.getList();
    },
    // 重置
    reset() {
      this.formInline.paras.worksStatus = "";
      this.formInline.paras.competitionId = "";
      this.getList();
    },
    // 获取赛事名称
    getCompetitionListData() {
      this.getCompetitionList().then(response => {
        if (response.code === "200" || response.code === 200) {
          this.matchList = [];
          let list = response.data;
          for (let i of list) {
            this.matchList.push({
              value: i.competitionId,
              label: i.competitionName
            });
          }
          if (this.matchList) {
            this.formInline.paras.competitionId = this.matchList[0].value;
          }
          this.selectStageByCompetitionId();
          this.getList();
        } else {
          this.$message.error(message);
        }
      });
    },
    // 获取筛选列表
    getDictData() {
      this.getDict().then(response => {
        if (response.code === "200" || response.code === 200) {
          let data = response.data;
          this.workStatusList = [
            {
              value: "",
              label: "全部"
            }
          ];
          for (let i of data["作品状态"]) {
            this.workStatusList.push({
              value: i.key,
              label: i.value
            });
          }
        } else {
          this.$message.error(message);
        }
      });
    },
    // 翻页
    handlePageNumber(pageNumber) {
      this.formInline.pageNumber = pageNumber.page;
      this.getList();
    },
    // 加载数据
    getList(page) {
      const param = time.nullValueFun(this.formInline);
      param.paras = time.nullValueFun(param.paras);
      postFun("/trade-web/api/judge/pageList", param).then(res => {
        if (res.code === "200" || res.code === 200) {
          let dataList = res.data.list;
          let tmpList = [];
          this.total = res.data.totalRow;
          for (let item of dataList) {
            const obj = {
              worksId: item.worksId,
              eventName: item.competitionName,
              picture: item.worksJpgUrl,
              name: item.worksName,
              describe: item.worksDescription,
              great: item.agreeNumber,
              visit: item.starValue
            };
            tmpList.push(obj);
          }
          this.dataArr = tmpList;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**获取当前阶段 */
    // 加载数据
    selectStageByCompetitionId() {
      var param = {
        competitionId: this.formInline.paras.competitionId
      };
      postFun(
        "/trade-web/api/competition/selectStageByCompetitionId",
        param
      ).then(res => {
        if (res.code === "200" || res.code === 200) {
          this.judgeStage = res.data.judgeStage + 1;
          this.workStatusList =
            this.judgeStage == 2
              ? this.trialList
              : this.judgeStage == 3
              ? this.reviewList
              : this.winList;
        }
      });
    },
    // 获取赛事名称
    getCompetitionList(param) {
      return getFun("/trade-web/api/competition/list", param);
    },
    // 获取筛选列表
    getDict(param) {
      return getFun("/trade-web/api/dict", param);
    }
  }
};
</script>
<style scoped lang="scss">
.user-title {
  padding: 20px;
  margin-bottom: 32px;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 3px 12px 0px rgba(215, 215, 215, 0.27);
  width: 100%;
}
.check {
  float: right;
  font-size: 14px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: #999999;
  line-height: 28px;
}
.guest-content {
  /* display: flex;
  justify-content: space-between; */
  overflow: hidden;
  width: 100%;
}
.btn {
  margin-top: 1px;
  padding: 11px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.trade-list-empty {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .trade-empty-icon {
    width: 114px;
    height: 114px;
    margin: 0 auto;
  }

  .trade-empty-msg {
    text-align: center;
    margin-top: 25px;
    height: 18px;
    font-size: 16px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #999999;
  }
}
</style>
<style lang="scss">
.user-control {
  .el-steps--horizontal {
    width: 80%;
    margin: 0 auto;
  }
  .el-step__icon.is-text {
    color: #fff;
    border: 1px solid #c1c1c1;
  }
  .el-step__head.is-finish .is-text {
    background: #f00;
    color: #f00;
    border: 1px solid #f00;
  }
  .el-step__title.is-finish {
    color: #f00;
  }
  .el-step__title.is-process {
    font-weight: inherit;
  }
  .el-step__title.is-wait {
    color: #303133;
  }
  .el-step__icon {
    width: 20px;
    height: 20px;
  }
}
</style>