<template>
  <div class="contentBox network">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="85px" :inline="true">
            <!-- <el-form-item>
              <span
                class="icon iconfont iconfilter filter-button"
                @click="showFilter = !showFilter"
              >
                <span>筛选</span>
              </span>
            </el-form-item> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.hostIp"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入IP地址"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formData.paras.username"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入用户名"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- <el-form-item label="创建时间">
              <el-date-picker
                v-model="formData.paras.createTime"
                type="date"
                value-format="timestamp"
                placeholder="请选择创建时间"
                @change="formData.totalRow=-1;formData.pageNumber=1;getList()"
              ></el-date-picker>
            </el-form-item>-->
            <el-form-item>
              <el-input
                v-model="formData.paras.hostLabels"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入标签"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>

            <!-- <InputNmb @getList="getList" /> -->
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button
                class="cx"
                @click="formData.totalRow = -1; formData.pageNumber = 1; getList()"
              >查询</el-button>
              <!-- <el-button class="filter-item" icon="el-icon-plus" @click="addShow()">新增</el-button> -->
              <el-button class="filter-item" icon="el-icon-close" @click="dels()">批量删除</el-button>
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <!-- 筛选 -->
          <!-- <collapse-transition
            :collapseData="collapseData"
            :showFilter="showFilter"
            :formData="formData"
            @collapseFun="collapseFun"
          /> -->
          <!-- <el-collapse-transition>
            <el-row v-show="showFilter" >
              <el-col class="filter" style="margin-bottom: 20px;">
                <div class="filter-title">
                  任务状态
                </div>
                <div class="filter-divider"></div>
                <div
                  v-bind:class="{ 'filter-selected': formData.paras.status === '' }"
                  @click="formData.paras.status = '';formData.totalRow=-1;formData.pageNumber= 1;getList()">全部</div>
                <div
                  v-for="item in stateList"
                  v-bind:class="{ 'filter-selected': formData.paras.status === item.value }">
                  <span @click="formData.paras.status = item.value;formData.totalRow=-1;formData.pageNumber= 1;getList()">{{item.label}}</span>
                  <i class="el-icon-close"
                     @click="formData.paras.status = '';formData.totalRow=-1;formData.pageNumber= 1;getList()"
                     v-if="formData.paras.status === item.value"></i>
                </div>
              </el-col>
            </el-row>
          </el-collapse-transition>-->
          <el-table
            :data="list"
            element-loading-text="Loading"
            :header-cell-style="{background:'#F2F6FD'}"
            highlight-current-row
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" type="index" min-width="50">
              <template slot-scope="scope">
                <span>{{ scope.$index + (formData.pageNumber - 1) * formData.pageSize + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP地址" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.hostIp" />
                <!-- <el-link type="primary" @click="netWorkHostItem(scope.row.hostIp, scope.row.createTime, getCurrentTime())">

                </el-link> -->
              </template>
            </el-table-column>
            <el-table-column label="标签" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.hostLabels" />
              </template>
            </el-table-column>
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.username" />
              </template>
            </el-table-column>
            <el-table-column label="已部署节点数量" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.deployedNodeNumber" />
              </template>
            </el-table-column>
            <el-table-column label="已运行节点数量" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.alreadyRunNodeNumber" />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="机器状态" width="120">
              <template slot-scope="scope">
                <el-link :underline="false" :type="scope.row.hostStates | severity">
                  <!-- <span v-html="scope.row.hostStates == '1' ? '启用' :'禁用'" /> -->
                  <span v-if="scope.row.hostStates == '1'" class="icon iconfont iconactivated" />
                  <span v-else class="icon iconfont iconDisable" />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-link
                  size="mini"
                  type="primary"
                  plain
                  :underline="false"
                  @click="editFun(scope.row)"
                >
                  <span class="icon iconfont iconedit" />
                </el-link>
                <el-link
                  size="mini"
                  type="primary"
                  plain
                  :underline="false"
                  @click="realTimeNode(scope.row.hostIp, scope.row.hostLabels)"
                >
                  <span class="icon iconfont icondata-monitor" />
                </el-link>
                <el-link
                  size="mini"
                  type="danger"
                  :underline="false"
                  plain
                  @click="del(scope.row.hostIp)"
                >
                  <span class="icon iconfont icondelete" />
                </el-link>
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
      <!-- 网络新增编辑弹框及详情 -->
      <el-drawer
        :visible.sync="drawer"
        direction="rtl"
        :with-header="false"
        size="30%"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconedit">
            <span v-if="drawerType == 'new'" class="drawerHtml">新增机器设备</span>
            <span v-else class="drawerHtml">编辑机器设备</span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            ref="role"
            class="formBox"
            :model="role"
            label-width="80px"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="IP地址" prop="hostIp">
              <el-input
                v-model="role.hostIp"
                clearable
                placeholder="请输入IP地址"
                :disabled="drawerType == 'edit'?true:false"
              />
            </el-form-item>
            <el-form-item label="标签" prop="hostLabels">
              <el-input v-model="role.hostLabels" clearable placeholder="请输入标签" />
            </el-form-item>
            <!-- <el-form-item label="SSH用户名" prop="sshUser">
              <el-input v-model="role.sshUser" clearable placeholder="请输入SSH用户名" />
            </el-form-item> -->
            <!-- <el-form-item label="密码" prop="sshPassword">
              <el-input v-model="role.sshPassword" clearable placeholder="请输入密码" />
            </el-form-item> -->
            <!-- <el-form-item label="机器状态">
            <el-select v-model="role.hostStates" placeholder="请选择机器状态">
              <el-option
                v-for="item in stateList"
                :key="item.key"
                  :label="item.value"
                  :value="item.key"
              />
            </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="机器状态" prop="hostStates">
              <el-radio-group v-model="role.hostStates" @change="changeState">
                <el-radio
                  v-for="item in stateList"
                  :key="item.key"
                  :label="item.key"
                >{{ item.value }}</el-radio>
              </el-radio-group>
            </el-form-item> -->
          </el-form>
          <div class="demo-drawer__footer">
            <el-button
              :loading="loading"
              class="cx"
              @click="drawerType == 'edit' ? modifyFun() : addFun('role')"
            >保存</el-button>
            <el-button @click="handleClose()">关闭</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import network from './network.js'
export default {
  ...network
}
</script>
<style>
/* .el-form-item__label{
  margin:0 70px;
}
.el-drawer .el-form{
  width: 80%;
} */

.el-icon-s-marketing {
  font-size: 17px;
  margin-top: 3px;
}
.icondata-monitor {
  font-size: 14px;
  color: #7E7CA3;
}
/* 解决列表中的 icon 显示 bug */
.contentBox.network .el-table {
  padding-bottom: 3px;
}
</style>
