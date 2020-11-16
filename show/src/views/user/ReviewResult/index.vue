<template>
  <div class="user-control container">
    <UserTitle
      :stat-list="statList"
      :show-avatar="false"
      :title="title"
      :description="description"
    />
    <gray-block>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="赛事名称" size="small">
          <el-input v-model="formInline.user" placeholder="赛事名称"></el-input>
        </el-form-item>
        <el-form-item label="赛事选择" size="small">
          <el-select v-model="formInline.region" placeholder="赛事选择">
            <el-option label="全部" value></el-option>
            <el-option label="未复审" value="1"></el-option>
            <el-option label="已评分" value="2"></el-option>
            <el-option label="已获奖" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖项类型" size="small">
          <el-select v-model="formInline.region" placeholder="奖项类型">
            <el-option label="全部" value></el-option>
            <el-option label="金奖" value="1"></el-option>
            <el-option label="银奖" value="2"></el-option>
            <el-option label="铜奖" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" @click="onSubmit" class="btn">查询</el-button>
        <el-button type="primary" plain size="small" class="btn">重置</el-button>
        <el-button type="success" size="small" class="btn">通过</el-button>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="赛事名称" width="150"></el-table-column>
        <el-table-column prop="name" label="赛事选择" width="120"></el-table-column>
        <el-table-column prop="province" label="奖项类型" width="120"></el-table-column>
        <el-table-column prop="city" label="作品名称" width="120"></el-table-column>
        <el-table-column prop="address" label="作品类型" width="300"></el-table-column>
        <el-table-column prop="zip" label="作品属性" width="120"></el-table-column>
        <el-table-column prop="zip" label="作品展示" width="120"></el-table-column>
        <el-table-column prop="zip" label="状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" @click="handleClick(scope.row)" class="btn" size="small">编辑</el-button>
            <el-button type="success" size="small" class="btn">通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </gray-block>
    <!-- <console-content :dataArr="dataArr" :link="link"></console-content> -->
  </div>
</template>
<script>
import GrayBlock from "../components/GrayBlock.vue";
import UserTitle from "../components/UserTitle.vue";
import ReviewList from "../components/ReviewList.vue";
export default {
  name: "ReviewManagement",
  components: {
    GrayBlock,
    UserTitle,
    ReviewList
  },
  data() {
    return {
      title: "评审作品确认",
      description: "美感与设计的结合，尽在此时",
      statList: [
        {
          number: 264,
          name: "总作品数量"
        },
        {
          number: 1589,
          name: "待审批数量"
        },
        {
          number: 290,
          name: "已通过数量"
        },
        {
          number: 189,
          name: "未通过数量"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      link: "ReviewDetail", //页面跳转路径
      dataArr: [
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型",
          type: 1
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型",
          type: 2
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型",
          type: 3
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型",
          type: 3
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型"
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型"
        },
        {
          eventName: "中华商标大赛",
          picture: require("@/assets/img/hjw.png"),
          name: "荟聚网",
          describe: "荟聚网的logo采用了新型的设采用了新型"
        }
      ],
      tableData: []
    };
  },
  methods: {
    onSubmit() {
      console.log(1111);
    }
  }
};
</script>
<style scoped>
.btn {
  margin-top: 1px;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
</style>