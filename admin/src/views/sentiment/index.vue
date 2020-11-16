<template>
  <div class="contentBox system-article">
    <div style="width: 100%">
      <el-row :gutter="40" class="widthHeight" style="margin: 0; padding-top: 20px">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <!-- <el-row :gutter="23">
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item >
              <span class="icon iconfont iconfilter filter-button" @click="showFilter = !showFilter"><span>筛选</span></span>
            </el-form-item>
             <el-form-item style="width:170px">
                <el-select v-model="formData.menuName" value-key="" placeholder="请筛选" clearable @change="getList()" >
                <el-option v-for="item in gamesList"
                  :key="item.competitionId"
                  :label="item.competitionName"
                  :value="item.competitionName">
                </el-option>
              </el-select>
            </el-form-item>

             <el-form-item style="width:170px">
              <el-input v-model="formData.sfdsf" prefix-icon="iconfont icon-sousuo iconsearchsvg" clearable placeholder="作品属性" @keyup.enter.native="getList()" />
            </el-form-item>
             <el-form-item >
              <el-date-picker style="width:170px" v-model="formData.paras.time" type="datetimerange" :picker-options="pickerOptions" range-separator="-" start-placeholder="开始" end-placeholder="结束" align="right" />
            </el-form-item>

            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-carousel trigger="click" height="40px" style="width:320px; " arrow="always" :autoplay="false" :loop="false">
                <el-carousel-item>
                  <el-button class="cx" @click="getList()">查询</el-button>
                  <el-button class="filter-item" icon="" @click="addShow()">重置</el-button>
                  <el-button class="filter-item" icon="" @click="addShow()">导出</el-button>
                </el-carousel-item>
                <el-carousel-item>
                  <el-button class="cx" @click="getList()">查询</el-button>
                  <el-button class="filter-item" icon="" @click="addShow()">初筛通过</el-button>
                  <el-button class="filter-item" icon="" @click="addShow()">初筛确认</el-button>
                </el-carousel-item>
              </el-carousel>

              <!-- <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">初审通过</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">初审确认</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">普通奖项确认</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">人气奖项确认</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">分配</el-button> -->
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun" />
          <el-table :data="list" style="width: 100%" row-key="id" :header-cell-style="{ background: '#F2F6FD' }" stripe default-expand-all @selection-change="changeFun">
            <el-table-column type="selection" width="55" />
            <el-table-column label="赛事名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.competitionName" />
              </template>
            </el-table-column>
            <el-table-column label="奖项类型">
              <template slot-scope="scope">
                <span v-html="scope.row.prizeName " />
              </template>
            </el-table-column>
            <el-table-column label="作品属性" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.propertyName }}</template>
            </el-table-column>
            <el-table-column label="作品类型" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.categoryName }}</template>
            </el-table-column>
            <el-table-column label="作品名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksName }}</template>
            </el-table-column>
            <el-table-column label="普通用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column label="评委用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.judgeUserName }}</template>
            </el-table-column>
            <el-table-column label="作品状态" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksStatus | severity }}</template>
            </el-table-column>
            <el-table-column label="上传时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter13 }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="作品评分" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksScore }}</template>
            </el-table-column>
            <el-table-column label="所获奖项" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.prizeRateName }}</template>
            </el-table-column> -->
            <el-table-column label="作品缩略图" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksJpgUrl |imgs}}</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作" min-width="200" fixed="right">
              <template slot-scope="scope">
                <el-link class="icon iconfont icontask" size="mini" type="primary" plain @click="goOpus(scope.row.worksId)">查看&nbsp;&nbsp;</el-link>
                <el-link class="icon iconfont iconchehuisekuai" size="mini" type="danger" plain @click="deleteFun(scope.row.menuId)">驳回&nbsp;&nbsp;</el-link>
                <el-link class="icon iconfont iconactivated" size="mini" type="success" plain @click="adoptFun(scope.row)">通过</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="formData.totalRow > 0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
        </el-col>
      </el-row>
      <!-- 权限弹框及详情 -->

    </div>
  </div>
</template>
<script>
import elect from "./elect.js";
export default {
  ...elect,
};
</script>
<style lang="scss" scoped>
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
.selectForm {
  margin: 0 10px;
  width: 90%;
  height: 200px;
  // background: #ccc;
  text-align: center;
  img {
    width: 40%;
  }
  .el-form-item {
    margin: 0 auto;
    width: 60%;
    .el-input {
      width: 70%;
    }
  }
}
/deep/ .el-carousel__arrow{
  width: 20px;
  height:20px;
  background-color: #fff;
  border-radius: 0;
  color:#000;

}
/deep/ .el-carousel__item {
  display: flex;
  padding: 3px 50px !important;
}
/deep/ .el-carousel__indicators{
  display: none !important;
}
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
</style>
