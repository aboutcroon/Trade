<template>
  <div class="contentBox baas-node">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="85px" :inline="true" :v-loading="upLoading">
            <el-form-item>
              <span
                class="icon iconfont iconfilter filter-button"
                @click="showFilter = !showFilter"
              >
                <span>筛选</span>
              </span>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formData.paras.nodeIp"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入节点IP"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formData.paras.nodeName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入节点名称"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                v-model="formData.paras.chainName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入链名称"
                @keyup.enter.native="formData.totalRow=-1;formData.pageNumber=1;getList()"
              />
            </el-form-item>-->
            <!-- <el-form-item label="任务状态">
              <el-select
                v-model="formData.paras.status"
                placeholder="请选择任务状态"
                @change="getList()"
              >
                <el-option label="全部" value />
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>-->
            <!-- <el-form-item>
              <el-select
                v-model="formData.paras.nodeType"
                placeholder="请选择节点类型"
                @change="formData.totalRow=-1;formData.pageNumber=1;getList()"
              >
                <el-option label="全部" value />
                <el-option
                  v-for="item in nodeType"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="formData.paras.status"
                placeholder="请选择节点状态"
                @change="formData.totalRow=-1;formData.pageNumber=1;getList()"
              >
                <el-option label="全部" value />
                <el-option
                  v-for="item in statusList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>-->
            <!-- <InputNmb @getList="getList" /> -->
            <el-form-item class="queryBtn">
              <el-button
                class="cx"
                :loading="createdLoading"
                @click="formData.totalRow=-1;formData.pageNumber= 1;getList()"
              >查询</el-button>
              <el-button
                class="filter-item"
                icon="el-icon-plus"
                :loading="createdLoading"
                @click="addShow()"
              >新增</el-button>
              <!-- <el-dropdown class="columnStyle" size="small">
                <el-button>
                  新增节点
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="alternative">创建监管节点</el-dropdown-item>
                  <el-dropdown-item @click.native="createLetter">创建计算节点</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>-->
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <!--筛选器组件-->
          <collapse-transition
            :collapseData="collapseData"
            :showFilter="showFilter"
            :formData="formData"
            @collapseFun="collapseFun"
          />
          <!-- <el-table
            v-loading="listLoading"
            class="t1 node-filter-table"
            :data="chainlist"
            element-loading-text="Loading"
          >
            <el-table-column label="链名称" :show-overflow-tooltip="true" min-width="60">
              <template slot-scope="scope">
                <span v-html="scope.row.chainName" />
              </template>
            </el-table-column>
            <el-table-column label="用户名" :show-overflow-tooltip="true" min-width="60">
              <template slot-scope="scope">
                <span v-html="scope.row.username" />
              </template>
            </el-table-column>
            <el-table-column label="哈希值" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <span v-html="scope.row.hash" />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" :show-overflow-tooltip="true" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter }}</span>
              </template>
            </el-table-column>
          </el-table> -->
          <div class="node-user-list">
            <dl>
              <dt>链名称</dt>
              <dd
                v-for="(user, index) in chainlist"
                :key="index"
              >{{ user.chainName }}</dd>
            </dl>
            <dl>
              <dt>用户名</dt>
              <dd
                v-for="(user, index) in chainlist"
                :key="index"
              >{{ user.username }}</dd>
            </dl>
            <dl>
              <dt>哈希值</dt>
              <dd
                v-for="(user, index) in chainlist"
                :key="index"
              >{{ user.hash }}</dd>
            </dl>
            <dl>
              <dt>创建时间</dt>
              <dd
                v-for="(user, index) in chainlist"
                :key="index"
              >{{ user.createTime | timeFilter }}</dd>
            </dl>
          </div>

          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            :header-cell-style="{background:'#F2F6FD'}"
            highlight-current-row
            stripe
            style="margin-top:20px;"
          >
            <el-table-column label="序号" type="index" min-width="50">
              <template slot-scope="scope">
                <span>{{ scope.$index + (formData.pageNumber - 1) * formData.pageSize + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="节点类型" min-width="80">
              <template slot-scope="scope">
                <!-- <el-link :type="scope.row.nodeType | severity"> -->
                <span v-html="scope.row.nodeType == '1' ? '共识节点' :'成员节点'" />
                <!-- </el-link> -->
              </template>
            </el-table-column>
            <!-- <el-table-column label="isLeader" width="80">
              <template slot-scope="scope">
                <span v-html="scope.row.isLeader == true ? '是' :'否'" />
              </template>
            </el-table-column>-->
            <el-table-column label="节点名称" :show-overflow-tooltip="true" min-width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeName" />
              </template>
            </el-table-column>
            <el-table-column label="节点IP" :show-overflow-tooltip="true" min-width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeIp" />
              </template>
            </el-table-column>
            <el-table-column label="RPC端口	" :show-overflow-tooltip="true" min-width="80">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeRpcPort == undefined ? '——' : scope.row.nodeRpcPort" />
              </template>
            </el-table-column>
            <el-table-column label="P2P端口" :show-overflow-tooltip="true" min-width="80">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeP2pPort == undefined ? '——' : scope.row.nodeP2pPort	" />
              </template>
            </el-table-column>
            <!-- <el-table-column label="链节点的 raft 端口" :show-overflow-tooltip="true" width="130">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeRaftPort == undefined ? '————' : scope.row.nodeRaftPort" />
              </template>
            </el-table-column>-->
            <el-table-column label="所在链名称" :show-overflow-tooltip="true" min-width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.chainName" />
              </template>
            </el-table-column>
            <el-table-column label="节点哈希" :show-overflow-tooltip="true" min-width="150">
              <template slot-scope="scope">
                <span v-html="scope.row.nodeHash" />
              </template>
            </el-table-column>
            <el-table-column label="服务地址" :show-overflow-tooltip="true" min-width="250">
              <template slot-scope="scope">
                <el-link type="primary" @click="clickEvidenceLink(scope.row)">
                  <span v-html="scope.row.url" />
                  <i v-if="(evidenceLinkLoading === scope.row.id) && scope.row.nodeType === '0' || scope.row.nodeType === 0" class="el-icon-loading"></i>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="节点状态" :show-overflow-tooltip="true" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.status | statusList1Fun }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" :show-overflow-tooltip="true" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作" fixed="right" width="70">
              <template slot-scope="scope">
                <el-link
                  v-if="(scope.row.status === '4' || scope.row.status === 4) && (scope.row.nodeType === '0' || scope.row.nodeType === 0)"
                  size="mini"
                  type="primary"
                  plain
                  :underline="false"
                  @click="clickAddButton(scope.row.id)"
                >
                  <span class="icon iconfont iconadd" />
                </el-link>
                <el-link
                  v-show="
                    ((scope.row.status == 2 || scope.row.status == 6) && show)
                      || (scope.row.isLeader == true && (scope.row.status == 2 || scope.row.status == 6))
                  "
                  size="mini"
                  type="success"
                  plain
                  :underline="false"
                  @click="startFun(scope.row)"
                >启动</el-link>
                <!-- :disabled="disabled"                 -->
                <!-- <el-link
                  v-if="show"
                  size="mini"
                  type="danger"
                  plain
                  :underline="false"
                >
                  禁用
                </el-link>-->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="formData.totalRow>0"
            :total="formData.totalRow"
            :page.sync="formData.pageNumber"
            :limit.sync="formData.pageSize"
            @pagination="getList()"
          />
        </el-col>
      </el-row>
      <!-- 节点新增编辑弹框及详情 -->
      <el-drawer
        :visible.sync="dialogVisible"
        direction="rtl"
        :with-header="false"
        custom-class="demo-drawer"
        size="30%"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont icon_new">
            <span class="drawerHtml">创建节点</span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-tabs v-model="dialogType" @tab-click="handleClick">
            <el-tab-pane label="共识节点" name="alternative">
              <el-form
                ref="alternative"
                class="formBox"
                :model="role"
                label-width="80px"
                label-position="top"
                :rules="rules"
              >
                <el-form-item label="链名称" prop="chainId">
                  <el-select v-model="role.chainId" placeholder="请选择链名称" disabled="disabled">
                    <el-option
                      v-for="item in chainIdList"
                      :key="item.chainId"
                      :label="item.chainName"
                      :value="item.chainId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="IP地址" prop="nodeList.nodeIp">
                  <el-select v-model="role.nodeList.nodeIp" filterable placeholder="请选择IP地址">
                    <el-option
                      v-for="item in nodeIpList"
                      :key="item.hostIp"
                      :label="item.hostIp"
                      :value="item.hostIp"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="节点名称" prop="nodeList.nodeName">
                  <el-input
                    v-model="role.nodeList.nodeName"
                    autofocus
                    clearable
                    placeholder="请输入节点名称"
                  />
                </el-form-item>
                <el-form-item label="任务名称" prop="deployTask.name">
                  <el-input v-model="role.deployTask.name" clearable placeholder="请输入任务名称" />
                </el-form-item>
                <!--<el-form-item label="同机构共识节点" prop="currentNodeHash">-->
                <!--<el-input v-model="role.currentNodeHash" clearable placeholder="请输入共识节点哈希" />-->
                <!--</el-form-item>-->
              </el-form>
            </el-tab-pane>
            <!-- 成员节点 -->
            <el-tab-pane label="成员节点" name="createLetter">
              <el-form
                ref="createLetter"
                class="formBox"
                :model="role"
                label-width="80px"
                label-position="top"
                :rules="rules"
              >
                <el-form-item label="链名称" prop="chainId">
                  <el-select v-model="role.chainId" placeholder="请选择链名称" disabled="disabled">
                    <!-- <el-option label="全部" value /> -->
                    <el-option
                      v-for="item in chainIdList"
                      :key="item.chainId"
                      :label="item.chainName"
                      :value="item.chainId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="IP地址" prop="nodeList.nodeIp">
                  <el-select v-model="role.nodeList.nodeIp" filterable placeholder="请选择IP地址">
                    <el-option
                      v-for="item in nodeIpList"
                      :key="item.hostIp"
                      :label="item.hostIp"
                      :value="item.hostIp"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="节点名称" prop="nodeList.nodeName">
                  <el-input
                    v-model="role.nodeList.nodeName"
                    autofocus
                    clearable
                    placeholder="请输入节点名称"
                  />
                </el-form-item>
                <el-form-item label="任务名称" prop="deployTask.name">
                  <el-input v-model="role.deployTask.name" clearable placeholder="请输入任务名称" />
                </el-form-item>
                <el-form-item label="同机构共识节点" prop="nodeList.currentNodeHash">
                  <!-- <el-input v-model="role.nodeList.currentNodeHash" clearable placeholder="请输入共识节点哈希" /> -->
                  <!-- <el-select v-infinite-scroll="load" v-model="role.nodeList.currentNodeHash" placeholder="请选择"> -->
                  <el-select clearable v-model="role.nodeList.currentNodeHash" placeholder="请选择">
                    <el-option
                      v-for="item in peerNode.peerNodeList"
                      :key="item.nodeHash"
                      :label="item.nodeName"
                      :value="item.nodeHash"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <div class="demo-drawer__footer">
            <el-button
              class="cx"
              :loading="createdLoading"
              @click="dialogType == 'alternative' ? modifyFun() : addFun()"
            >保存</el-button>
            <el-button @click="handleClose()">关闭</el-button>
          </div>
        </div>
      </el-drawer>

      <el-drawer
        :visible.sync="evidenceUserInterface"
        direction="rtl"
        :with-header="false"
        custom-class="demo-drawer"
        size="30%"
        :before-close="offEvidenceUserAdd"

      >
        <p class="drawer-title">
          <span class="icon iconfont icon_new">
            <span class="drawerHtml">添加存证用户</span>
          </span>
          <i class="el-icon-close fr" @click="offEvidenceUserAdd" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            class="formBox"
            ref="form"
            :model="evidenceFormData"
            label-position="top"
          >
            <el-form-item
              label="选择创建人"
            >
              <el-select
                v-model="evidenceUserId"
                placeholder="请选择创建人"
                :loading="evidenceFormLoading"
                loading-text="正在加载用户"
              >
                <el-option
                  v-for="(item, index) in evidenceUserList"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="用户名称"
              prop="username"
              :rules="{
                required: true, message: '用户名称不能为空', trigger: 'blur'
              }"
            >
              <el-input
                v-model="evidenceFormData.username"
                placeholder="请输入用户名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              :rules="{ required: true, message: '用户密码不能为空', trigger: 'blur' }"
            >
              <el-input
                type="password"
                v-model="evidenceFormData.password"
                placeholder="请输入用户密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户类型"
            >
              <el-select v-model="evidenceFormData.userType" placeholder="请选择用户类型">
                <el-option
                  v-for="(item, index) in depositUserType"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button
              class="cx"
              :loading="createdLoading"
              @click="saveEvidenceUser">保存</el-button>
            <el-button @click="offEvidenceUserAdd()">关闭</el-button>
          </div>
        </div>
      </el-drawer>

      <el-drawer
        :visible.sync="depositCardJump"
        direction="rtl"
        :with-header="false"
        custom-class="demo-drawer node-drawer-select-deposit-user"
        size="30%"
        :before-close="closeEvidenceUserList"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconchoice">
            <span class="drawerHtml">选择跳转用户</span>
          </span>
          <i class="el-icon-close fr" @click="closeEvidenceUserList" />
        </p>
        <div class="demo-drawer__content">
          <div class="demo-drawer-block">
            <template
              v-for="(item, index) in evidenceUserList"
            >
              <div
                v-if="item.list && item.list.length > 0"
                class="node-radio-group"
                :key="index"
              >
                <div class="demo-drawer-h2">
                  <span
                    class="vertical-line"
                    :class="item.key | lineBgColor"
                  ></span>
                  <span>{{item.value}}</span>
                </div>
                <div class="demo-drawer-radio">
                  <div
                    class="radio-block"
                    v-for="(user, index) in item.list"
                    :key="index"
                  >
                    <el-radio
                      v-model="evidenceUserId"
                      :label="user.id"
                    >{{user.username}}</el-radio>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="demo-drawer__footer">
            <el-button
              type="primary"
              @click="goEvidenceLink"
              :loading="goEvidenceLoading"
            >确 定</el-button>
            <el-button @click="closeEvidenceUserList()">取 消</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import node from "./node.js";
export default {
  ...node
};
</script>
<style lang="scss" scoped>
.t1 tbody tr:hover > td {
  background-color: #ffffff !important;
}
.t1 {
  margin-top: 14px;
  text-align: center;
}

// .baas-node .el-drawer__container .el-form-item__label {
//     float: none;
//     display: block;
//     text-align: left;
//     padding-bottom: 10px;
// }
// // .baas-agent .el-drawer__container .el-form-item {
// //   width: 100%;
// //   display: block;
// // }
// .baas-node .el-drawer__container .el-form-item__content {
//   display: block;
// }
.node-user-list {
  display: flex;
  dl, dt, dd {
    margin: 0;
    padding: 0;
  }
  dl {
    flex-grow: 1;
    border-right: 1px solid #ECEEF8;
  }
  dl:last-child {
    border-right: none;
  }
  dt, dd {
    margin-bottom: 5px;
    padding-left: 30px;
  }
  dl:first-child dt,
  dl:first-child dd {
    padding-left: 16px;
  }
  dt {
    color: #8794AE;
    font-size: 12px;
    line-height: 20px;
  }
  dd {
    color: #1D2346;
    font-size: 14px;
    line-height: 25px;
  }
  dd:last-child {
    margin-bottom: 0;
  }
}
.node-user-list {
  padding-top: 11px;
  padding-bottom: 9px;
}
</style>
<style lang="scss">
.node-filter-table thead th .cell,
.node-filter-table table td .cell {
    border-right: 1px solid #ECEEF8;
}
.node-drawer-select-deposit-user {
  .demo-drawer__content {
    overflow-y: auto;
    max-height: calc(100% - 62px);
  }
  .demo-drawer-block {
    width: 100%;
    height: auto;
    background: #f9f9fc;
    border-radius: 8px;
    padding: 25px 27px;
  }
  .node-radio-group {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .demo-drawer-h2 {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .vertical-line {
      display: inline-block;
      width: 3px;
      height: 10px;
      border-radius: 2px;
      margin-right: 5px;
    }
  }
  .radio-block {
    margin-bottom: 5px;
    .el-radio {
      display: block;
      padding: 11px 16px;
      border-radius: 8px;
      transition: all 0.3s;
      &:hover {
        padding-left: 26px;
        background: #E6E8F5;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .gray { background-color: #8794AE; }
  .red { background-color: #BF495A; }
  .green { background-color: #21BF74; }
  .yellow { background-color: #FAAD14; }
}

</style>
