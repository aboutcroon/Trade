<template>
  <div class="contentBox system-access">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <!-- <el-row :gutter="23">
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.ifsId"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入接口ID"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- </el-col>
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.ifsName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入接口名称"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- </el-col>
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.controllerMethod"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入控制器方法"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button
                class="cx"
                @click="formData.totalRow=-1;formData.pageNumber= 1;getList()"
              >查询</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">添加接口</el-button>
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
            <el-table-column label="序号" type="index" min-width="50">
              <template slot-scope="scope">
                <span>{{ scope.$index + (formData.pageNumber - 1) * formData.pageSize + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="接口ID" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.ifsId" />
              </template>
            </el-table-column>
            <el-table-column label="接口名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.ifsName" />
              </template>
            </el-table-column>
            <el-table-column label="控制器方法" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.controllerMethod" />
              </template>
            </el-table-column>
            <el-table-column label="接口状态" width="120">
              <template slot-scope="scope">
                <el-link :type="scope.row.start | severity">
                  <span v-html="scope.row.status == '1' ? '启用' :'禁用'" />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" align="center" label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-link
                  size="mini"
                  type="primary"
                  :underline="false"
                  plain
                  @click="editFun(scope.row)"
                ><span class="icon iconfont iconedit" />
                </el-link>
                <el-link
                  size="mini"
                  type="danger"
                  :underline="false"
                  plain
                  @click="deleteFun(scope.row.ifsId)"
                >
                  <span class="icon iconfont icondelete" />
                </el-link>
                <!-- <el-button size="mini" type="primary" plain @click="editFun(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" plain @click="deleteFun(scope.row.ifsId)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="formData.totalRow>0"
            :total="formData.totalRow"
            :page.sync="formData.pageNumber"
            :limit.sync="formData.pageSize"
            @pagination="getList"
          />
        </el-col>
      </el-row>
      <!-- 接口弹框及详情 -->

      <el-drawer
        :visible.sync="dialogVisible"
        direction="rtl"
        :with-header="false"
        size="30%"
        custom-class="demo-drawer"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconedit">
            <span v-if="dialogType==='edit'" class="drawerHtml">编辑接口</span>
            <span v-else class="drawerHtml">新增接口</span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            ref="role"
            :model="role"
            :rules="rules"
            class="formBox"
            label-width="80px"
            label-position="top"
          >
            <el-form-item v-if="dialogType == 'edit' ? true : false" label="接口ID">
              <el-input v-model="role.ifsId" clearable placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="接口名称" prop="ifsName">
              <el-input v-model="role.ifsName" clearable placeholder="请输入接口名称" />
            </el-form-item>
            <el-form-item label="控制方法" prop="controllerMethod">
              <el-input v-model="role.controllerMethod" clearable placeholder="请输入控制方法" />
            </el-form-item>
            <el-form-item label="接口状态" prop="status">
              <el-select v-model="role.status" placeholder="请选择接口状态">
                <el-option
                  v-for="item in stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button :loading="loading" class="cx" @click="dialogType == 'edit' ? modifyFun() : addFun()">保存</el-button>
            <el-button @click="handleClose()">关闭</el-button>
          </div>
        </div>
      </el-drawer>

      <!-- <el-dialog
        width="30%"
        :visible.sync="dialogVisible"
        :title="dialogType==='edit'?'编辑接口':'新增接口'"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <el-form :model="role" label-width="80px" label-position="left" :rules="rules">
          <el-form-item v-if="dialogType == 'edit' ? true : false" label="接口ID">
            <el-input v-model="role.ifsId" clearable placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="接口名称" prop="ifsName">
            <el-input v-model="role.ifsName" clearable placeholder="请输入接口名称" />
          </el-form-item>
          <el-form-item label="控制方法" prop="controllerMethod">
            <el-input v-model="role.controllerMethod" clearable placeholder="请输入控制方法" />
          </el-form-item>
          <el-form-item label="接口状态" prop="status">
            <el-select v-model="role.status" placeholder="请选择接口状态">
              <el-option
                v-for="item in stateList"
                :key="item.key"
                  :label="item.value"
                  :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align:center;" class="dialog-footer">
          <el-button class="cx" @click="dialogType == 'edit' ? modifyFun() : addFun()">保存</el-button>
          <el-button @click="handleClose()">关闭</el-button>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import access from './access.js'
export default {
  ...access
}
</script>
<style lang="scss">
.system-access {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
</style>
