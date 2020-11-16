<template>
  <gray-block>
    <div class="judging-rules">
      <!-- <div class="title">
        <span>{{ title }}</span>
      </div>-->
      <div class="guest-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
          <el-form-item label="赛事名称：">
            <el-select v-model="formInline.paras.competitionId" placeholder="请筛选">
              <el-option
                v-for="item in matchList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评审状态">
            <el-select v-model="formInline.paras.worksStatus" placeholder="请筛选">
              <el-option
                v-for="item in workStatusList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="getList" class="btn">查询</el-button>
          <el-button type="primary" plain class="btn" @click="reset">重置</el-button>
        </el-form>

        <div v-if="dataArr.length!==0" class="guest-content">
          <Review-list-item
            v-for="(item,index) in dataArr"
            :key="index"
            :dataObj="item"
            :link="link"
            @getList="getList"
          ></Review-list-item>
        </div>
        <div class="trade-list-empty" v-else>
          <img :src="emptyUrl" class="trade-empty-icon" />
          <div class="trade-empty-msg">亲，没有作品可以进行评审哦</div>
        </div>
      </div>
      <pagination
        v-if="dataArr.length!==0"
        :page="this.formInline.pageNumber"
        :total="total"
        @pagination="handlePageNumber"
      ></pagination>
    </div>
  </gray-block>
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
      workStatusList: [],
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
      ]
    };
  },
  mounted() {
    this.getCompetitionListData();
    this.getDictData();
    this.getList();
  },
  methods: {
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
          this.matchList = [
            {
              value: "",
              label: "全部"
            }
          ];
          let list = response.data;
          for (let i of list) {
            this.matchList.push({
              value: i.competitionId,
              label: i.competitionName
            });
          }
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
  padding: 9px 15px;
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