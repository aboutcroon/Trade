<template>
  <div class="contentBox">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="85px" :inline="true">
            <!-- <el-row :gutter="23">
            <el-col :xs="24" :sm="24" :lg="8">-->
            <el-form-item>
              <span class="icon iconfont iconfilter filter-button" @click="showFilter = !showFilter"><span>筛选</span></span>
            </el-form-item>
            <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun"/>
            <el-form-item>
              <el-input
                v-model="formData.paras.name"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入任务名称"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- <InputNmb @getList="getList" /> -->
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button
                class="cx"
                @click="formData.totalRow=-1;formData.pageNumber= 1;getList()"
              >查询</el-button>
              <el-button class="filter-item" icon="el-icon-close" @click="dels()">批量删除</el-button>
            </el-form-item>
          </el-form>
          <!--筛选器可以考虑组件化-->
          <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun"/>
          <el-table
            v-loading="listLoading"
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
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.username" />
              </template>
            </el-table-column>
            <el-table-column label="任务id" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.id" />
              </template>
            </el-table-column>
            <el-table-column label="任务名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column label="任务状态" width="100">
              <template slot-scope="scope">
                <el-link :underline="false" :type="scope.row.status | severity">
                  <!-- <span
                    v-html="scope.row.status == '1' ? '正在执行 ' :(scope.row.status == '2' ? '成功':'失败') "
                  /> -->
                  <span>{{ typeListFun(scope.row.status,'status') }}</span>
                  <i
                    v-show="showStatusLoading(scope.row.status)"
                    class="el-icon-loading"></i>
                  <!-- <span class="icon iconfont" :class="scope.row.status == '1' ? 'el-icon-loading ' :(scope.row.status == '2' ? 'iconactivated':'iconDisable') " /> -->
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="任务类型" width="120">
              <template slot-scope="scope">
                <span>{{ typeListFun(scope.row.type,'type') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!-- <span v-html="scope.row.msg" /> -->
                <el-link :underline="false">
                  <span class="icon iconfont icondetial" @click="detailFun(scope.row)"/>
                </el-link>
                <el-link
                  size="mini"
                  type="danger"
                  :underline="false"
                  plain
                  @click="del(scope.row.id)"
                >

                  <span class="icon iconfont icondelete" />
                </el-link>
              </template>
            </el-table-column>
            <!-- <el-table-column align="left" prop="created_at" label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-link
                  size="mini"
                  type="primary"
                  plain
                  @click="editFun(scope.row)"
                >
                <span class="icon iconfont iconedit" />
              </el-link>
                <el-link
                  size="mini"
                  type="danger"
                  plain
                  @click="deleteFun(scope.row.ifsId)"
                >
                <span class="icon iconfont icondelete" />
              </el-link>
              </template>
            </el-table-column>-->
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
      <el-drawer
        :visible.sync="drawer"
        direction="rtl"
        :with-header="false"
        size="30%"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont icondetial"><span class="drawerHtml">部署详情</span></span>
          <!--<i class="el-icon-close fr" @click="handleClose"></i>-->
        </p>
        <div class="Drawer">
          <el-table
            style="margin-top: 40px;"
            :data="row"
            :show-header="false"
            :row-style="{height:'50px'}"
            :header-cell-style="{background:'#F2F6FD'}"
            :cell-style="cellStyle"
            highlight-current-row
            stripe
          >
            <el-table-column label="name" type="index" width="100">
              <template slot-scope="scope">
                <span style="padding-left: 20px;color: #8d99b2" v-html="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template slot-scope="scope">
                <el-link :underline="false" v-if="scope.row.name === '任务状态'" :type="scope.row.value | severity">
                  <span>{{ typeListFun(scope.row.value,'status') }}</span>
                </el-link>
                <span v-if="scope.row.name !== '任务状态'" style="white-space: pre-wrap;" v-html="scope.row.value" />
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="detailList"
            element-loading-text="Loading"
            :header-cell-style="{background:'#F2F6FD'}"
            :cell-style="detailCellStyle"
            highlight-current-row
            style="margin-top: 40px;"
            stripe
          >
            <el-table-column label="执行时间" :show-overflow-tooltip="true" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.time | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="脚本命令">
              <template slot-scope="scope">
                <span v-html="scope.row.shell" />
              </template>
            </el-table-column>
            <el-table-column label="IP地址">
              <template slot-scope="scope">
                <span v-html="scope.row.hostIp" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import unionMission from './unionMission.js';
export default {
  ...unionMission
}
</script>
<style scoped>
  /* .filter {
    font-size: 14px;
    line-height: 28px;
    color: #ABB6CD;
    width: 120px;
  }
  .filter div {
    cursor: hand;
  }
  .filter-title {
    font-weight: bold;
    color: #333;
    cursor: default;
  }
  .filter-selected {
    color: #495abf;
  }
  .filter-divider {
    border-bottom: solid 1px #f6f7fc;
    margin: 2px 0;
  } */
</style>
