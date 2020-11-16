<template>
  <div class="contentBox system-article">
    <div style="width: 100%">
      <el-row
        :gutter="40"
        class="widthHeight"
        style="margin: 0; padding-top: 20px"
      >
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form
            ref="form"
            class="option"
            :model="formData"
            label-width="80px"
            :inline="true"
          >
            <!-- <el-row :gutter="23">
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item label="用户名称">
              <el-input
                v-model="formData.username"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            
            <el-form-item label="用户类型">
              <el-select
                v-model="formData.status"
                placeholder="请选择用户类型"
                @change="getList()"
              >
                <el-option label="全部" value />
                <el-option
                  v-for="item in stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            

            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">重置</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">导出</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">新增</el-button>
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            :header-cell-style="{background:'#F2F6FD'}"
            highlight-current-row
            stripe
          >
            <el-table-column label="用户ID" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.id" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户类型" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                  <span v-html="scope.row.role.roleName" />
              </template>
            </el-table-column>
            <el-table-column label="普通用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column label="联系电话" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column label="作品数量" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.menuUrl }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="created_at"
              label="操作"
              width="300"
            >
              <template slot-scope="scope">
                <el-link class="icon iconfont icontask" size="mini" type="primary" plain @click="editFun(scope.row)">查看&nbsp;&nbsp;</el-link>
                <el-link class="icon iconfont icontask" size="mini" type="primary" plain @click="editFun(scope.row)">编辑&nbsp;&nbsp;</el-link>
                <el-link class="icon iconfont iconactivated" size="mini" type="success" plain @click="deleteFun(scope.row.menuId)">通过</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="formData.totalRow > 0"
            :total="formData.totalRow"
            :page.sync="formData.pageNumber"
            :limit.sync="formData.pageSize"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import JudgesUser from './JudgesUser.js';
export default {
  ...JudgesUser
};
</script>
<style lang="scss">
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
</style>
