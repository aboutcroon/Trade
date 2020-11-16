<template>
  <div class="contentBox system-role">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <!-- <el-row :gutter="20"> -->
            <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.roleName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入角色名称"
                @keyup.enter.native="formData.pageNumber=1;getList()"
              />
            </el-form-item>
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="formData.pageNumber=1;getList()">查询</el-button>
              <!--              <el-button class="filter-item" @click="dialogFormVisible = true">添加角色</el-button>-->
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
            <el-table-column label="角色名称">
              <template slot-scope="scope">
                <span v-html="scope.row.name" />
              </template>
            </el-table-column>
            <!--          <el-table-column label="角色类型">-->
            <!--            <template slot-scope="scope">-->
            <!--              <span v-html="scope.row.type"></span>-->
            <!--            </template>-->
            <!--          </el-table-column>-->
            <!-- <el-table-column label="角色说明">
              <template slot-scope="scope">{{ scope.row.explain }}</template>
            </el-table-column>
            <el-table-column label="创建时间" width="120">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="角色状态" width="120">
              <template slot-scope="scope">
                <el-link :type="scope.row.starts | severity">
                  <span v-html="scope.row.starts == '1' ? '启用' :'禁用'" />
                </el-link>
              </template>
            </el-table-column> -->
            <el-table-column prop="created_at" label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  v-show="scope.row.name != '平台超级管理员'"
                  size="mini"
                  type="info"
                  plain
                  @click="power(scope.row)"
                ><span class="icon iconfont iconshezhi"></span></el-link>
                <!-- <el-button size="mini" plain @click="power(scope.row)" v-show="scope.row.name != '平台超级管理员'">权限设置</el-button> -->
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
      <!--   权限设置-->
       <!-- 节点新增编辑弹框及详情 -->
      <el-drawer
        class="roleDrawer"
        :visible.sync="setupdata"
        direction="rtl"
        :with-header="false"
        custom-class="demo-drawer"
        size="50%"
        :before-close="handleDialogClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconshezhi">
            <span class="drawerHtml">
              <span>{{ titledata }}</span>权限设置
            </span>
          </span>
          <i class="el-icon-close fr" @click="handleDialogClose" />
        </p>
        <div class="demo-drawer__content">
          <el-tabs v-model="activeName">
            <el-tab-pane label="权限设置" name="menu">
              <el-table
                v-loading="loading"
                :data="tabledata"
                element-loading-text="加载中"
                :header-cell-style="{background:'#F2F6FD'}"
                stripe
                default-expand-all
                row-key="menuId"
                :tree-props="{children: 'menuList', hasChildren: 'hasChildren'}"
                @selection-change="selectAll"
              >
                <el-table-column type="selection" align="center" width="55">
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.isChecked"
                      @change="(state, event)=>toDisable(state, event, scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="菜单名称" :show-overflow-tooltip="true" min-width="120">
                  <template slot-scope="scope">
                    <span v-html="scope.row.menuName" />
                  </template>
                </el-table-column>
                <!-- <el-table-column label="类型" :show-overflow-tooltip="true" width="140"><template slot-scope="scope"><span v-html="scope.row.menuFlag == '2' ? '按钮' : (scope.row.parentMenuId == '0' ? '一级菜单' : '二级菜单')"></span></template></el-table-column> -->
                <el-table-column label="URL地址" :show-overflow-tooltip="true" min-width="120">
                  <template slot-scope="scope">{{ scope.row.menuUrl }}</template>
                </el-table-column>
                <el-table-column align="center" label="菜单状态" width="80">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.status | severity">
                      <span v-html="scope.row.status == '1' ? '启用' :'禁用'" />
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="500">
                <template slot-scope="scope">
                  <el-checkbox
                    v-for="item in scope.row.buttons"
                    :key="item.menuId"
                    v-model="item.isChecked"
                    :disabled="scope.row.hasRight=='0'?true:false"
                    :label="item.menuId"
                  >{{ item.menuName }}</el-checkbox>
                </template>
              </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 计算节点 -->
            <el-tab-pane label="接口授权" name="api">
              <p>API</p>
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <br />
              <el-checkbox
                v-for="item in checkeddata"
                :key="item.menuId"
                v-model="item.checked"
                :label="item.menuId"
                style="float:left;width:30%"
              >{{ item.menuName }}</el-checkbox>
            </el-tab-pane>
          </el-tabs>

          <div class="demo-drawer__footer">
            <el-button :loading="Btnloading" class="cx" @click="hold">保存</el-button>
            <el-button @click="close">关闭</el-button>
          </div>
        </div>
      </el-drawer>
      <!-- <el-dialog title="权限设置" :visible.sync="setupdata" width="70%" :before-close="handleDialogClose" :modal-append-to-body="false">
        <span slot="title" class="dialog-footer" style="padding-bottom: 0;">
          <span>权限设置</span>
          <span style="font-size: 13px">{{ titledata }}</span>
        </span>
        <el-tabs v-model="activeName">
          <el-tab-pane label="菜单授权" name="menu">
            <el-table
              v-loading="loading"
              :data="tabledata"
              element-loading-text="加载中"
              :header-cell-style="{background:'#F2F6FD'}"
              stripe
              default-expand-all
              row-key="menuId"
              :tree-props="{children: 'menuList', hasChildren: 'hasChildren'}"
              @selection-change="selectAll"
            >
              <el-table-column type="selection" align="center" width="55">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.isChecked"
                    @change="(state, event)=>toDisable(state, event, scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column label="菜单名称" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-html="scope.row.menuName" />
                </template>
              </el-table-column>
              <el-table-column label="URL地址" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.menuUrl }}</template>
              </el-table-column>
              <el-table-column align="center" label="菜单状态" width="80">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status | severity">
                    <span v-html="scope.row.status == '1' ? '启用' :'禁用'" />
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="500">
                <template slot-scope="scope">
                  <el-checkbox
                    v-for="item in scope.row.buttons"
                    :key="item.menuId"
                    v-model="item.isChecked"
                    :disabled="scope.row.hasRight=='0'?true:false"
                    :label="item.menuId"
                  >{{ item.menuName }}</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="接口授权" name="api">
            <p>API</p>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <br>
            <el-checkbox
              v-for="item in checkeddata"
              :key="item.menuId"
              v-model="item.checked"
              :label="item.menuId"
              style="float:left;width:30%"
            >{{ item.menuName }}</el-checkbox>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button class="cx" @click="hold">保存</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import role from './role.js'
export default {
  ...role
}
</script>
<style lang="css">
/* body .el-table th.gutter {
  display: table-cell !important;
} */
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
/*/deep/ {*/
.el-table::before {
  width: 0 !important;
}
/* .roleDrawer .demo-drawer__content .el-tabs__nav {
  transform: translateX(165%) !important;
} */
/*}*/
/* 解决列表中的 icon 显示 bug */
.contentBox.system-role .el-table {
  padding-bottom: 4px;
}
</style>
