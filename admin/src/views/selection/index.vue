<template>
  <div class="contentBox system-article">
    <div style="width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <el-form-item label="赛事名称">
              <el-select v-model="formData.paras.competitionName" value-key="" placeholder="请筛选" clearable @change="getList()" >
                <el-option v-for="item in gamesList"
                  :key="item.competitionId"
                  :label="item.competitionName"
                  :value="item.competitionName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推荐人名称" label-width="90px">
              <el-input v-model="formData.paras.referenceName" prefix-icon="iconfont icon-sousuo iconsearchsvg" clearable placeholder="请输入" @keyup.enter.native="getList()" />
            </el-form-item>
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button class="filter-item" @click="reset()">重置</el-button>
              <el-button class="filter-item" @click="$store.commit('export/showExportBox')">导出</el-button>
            </el-form-item>
          </el-form>
          <ExportBtn></ExportBtn>
          <el-table :data="tableData" style="width: 100%" row-key="id" :header-cell-style="{background:'#F2F6FD'}" stripe default-expand-all  v-loading="loading">
            <el-table-column type="selection" width="55" />
            <el-table-column label="赛事名称" :show-overflow-tooltip="true" prop="competitionName"></el-table-column>
            <el-table-column label="推荐人" :show-overflow-tooltip="true" prop="referenceName"></el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true" prop="competitorMobile" width="160px"></el-table-column>
            <el-table-column label="推荐作品数量" :show-overflow-tooltip="true" prop="recommendedWorksCount" width="120px"></el-table-column>
            <el-table-column label="获奖作品数量" :show-overflow-tooltip="true" prop="awardsWorksCount" width="120px"></el-table-column>
            <el-table-column label="团体奖值" :show-overflow-tooltip="true" prop="groupAward"></el-table-column>
            <el-table-column label="所获得奖项" :show-overflow-tooltip="true" prop="menuUrl"></el-table-column>
            <el-table-column align="center" prop="created_at" label="操作" width="80px">
              <template slot-scope="">
                <el-button size="mini" type="sucess" plain @click="dialogFormVisible = true">评奖</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="评奖确认" :visible.sync="dialogFormVisible" width="25%">
            <el-form :model="form">
              <el-form-item label="评奖等级" style="">
                <el-select v-model="form.region" placeholder="请选择奖励级别">
                  <el-option label="一等奖" value="0"></el-option>
                  <el-option label="二等奖" value="1"></el-option>
                  <el-option label="三等奖" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="color:red;">点击确认，即确认大赛奖项，请慎重</div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="open(form.region)">确 定</el-button>
            </div>
          </el-dialog>
          <pagination v-show="formData.totalRow>0" :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize" @pagination="getList" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import selection from "./selection.js";
export default {
  ...selection,
};
</script>
<style lang="scss">
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
</style>
