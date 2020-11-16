<template>
  <div class="contentBox">
    <div style="width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <!-- <el-row :gutter="23">
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.menuName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入菜单名称"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.menuUrl"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入URL地址"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
            <!-- <el-form-item>
              <el-select v-model="formData.status" placeholder="请选择菜单状态" @change="getList()">
                <el-option label="全部" value />
                <el-option
                  v-for="item in stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item> -->
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addShow();">添加</el-button>
              <!-- <el-button class="filter-item" @click="addShow();role.menuFlag='menu'">添加菜单</el-button>
                <el-button class="filter-item" @click="addShow();role.menuFlag='btn'">添加按钮</el-button>
                <el-button class="filter-item" @click="sortMenuVisible = true">菜单排序</el-button>-->
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <!-- <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            row-key="menuId"
            highlight-current-row
            :tree-props="{children: 'menuList', hasChildren: 'hasChildren'}"
            @current-change="handleCurrentChange"
            @sort-change='sortChange'
          >
            <el-table-column label="菜单名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.menuName"></span>
              </template>
            </el-table-column>
            <el-table-column label="类型" :show-overflow-tooltip="true" width="140">
              <template slot-scope="scope">
                <span v-html="scope.row.menuFlag == '2' ? '按钮' : '菜单'"></span>
              </template>
            </el-table-column>
            <el-table-column label="URL地址" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.menuUrl }}</template>
            </el-table-column>
            <el-table-column align="center" label="菜单状态" width="120">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | severity">
                  <span v-html="scope.row.status == '1' ? '启用' :'禁用'"></span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作" width="300">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="editFun(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" plain @click="deleteFun(scope.row.menuId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>-->
          <dragTreeTable :data="treeData" :on-drag="onTreeDataChange" fixed />
        </el-col>
      </el-row>
      <!-- 权限弹框及详情 -->

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
            <span v-if="role.menuFlag== '1'">
              <span v-if="dialogType==='edit'" class="drawerHtml">编辑菜单</span>
              <span v-else class="drawerHtml">新增菜单</span>
            </span>
            <span v-else>
              <span v-if="dialogType==='edit'" class="drawerHtml">编辑按钮</span>
              <span v-else class="drawerHtml">新增按钮</span>
            </span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            ref="formRole"
            class="formBox"
            :model="role"
            label-width="80px"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="类型" prop="menuFlag">
              <el-radio v-model="role.menuFlag" label="1">菜单</el-radio>
              <el-radio v-model="role.menuFlag" label="2">按钮</el-radio>
            </el-form-item>
            <el-form-item :label="role.menuFlag== '1' ? '菜单名称':'按钮名称'" prop="menuName">
              <el-input
                v-model="role.menuName"
                :placeholder="role.menuFlag== '1' ? '请输入菜单名称' : '请输入按钮名称'"
              />
            </el-form-item>
            <el-form-item :label="role.menuFlag == '1' ? '菜单URL':'控制器方法'" prop="menuUrl">
              <el-input v-model="role.menuUrl" placeholder="请输入菜单URL" />
            </el-form-item>
            <el-form-item :label="role.menuFlag == '1' ? '菜单状态':'按钮状态'" prop="status">
              <el-select v-model="role.status" placeholder="请选择菜单状态">
                <el-option
                  v-for="item in stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="role.menuFlag== '1'? true : false" label="图标">
              <el-input v-model="role.menuIcon" placeholder="请输入图标类名" />
            </el-form-item>
            <el-form-item v-if="role.menuFlag== '1'? true : false" label="是否在侧边栏显示">
              <el-select v-model="role.hiddened" placeholder="请选择是否在侧边栏显示">
                <el-option
                  v-for="item in hiddenList"
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
        width="40%"
        :visible.sync="dialogVisible"
        :title="role.menuFlag== '1'? (dialogType==='edit' ? '编辑菜单':'新增菜单') : (dialogType==='edit' ? '编辑按钮' : '新增按钮')"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <el-form ref="formRole" :model="role" label-width="135px" label-position="left" :rules="rules">
          <el-form-item label="类型" prop="menuFlag">
            <el-radio v-model="role.menuFlag" label="1">菜单</el-radio>
            <el-radio v-model="role.menuFlag" label="2">按钮</el-radio>
          </el-form-item>
          <el-form-item :label="role.menuFlag== '1' ? '菜单名称':'按钮名称'" prop="menuName">
            <el-input
              v-model="role.menuName"
              :placeholder="role.menuFlag== '1' ? '请输入菜单名称' : '请输入按钮名称'"
            />
          </el-form-item>
          <el-form-item :label="role.menuFlag == '1' ? '菜单URL':'控制器方法'" prop="menuUrl">
            <el-input v-model="role.menuUrl" placeholder="请输入菜单URL" />
          </el-form-item>
          <el-form-item :label="role.menuFlag == '1' ? '菜单状态':'按钮状态'" prop="status">
            <el-select v-model="role.status" placeholder="请选择菜单状态">
              <el-option
                v-for="item in stateList"
                :key="item.key"
                  :label="item.value"
                  :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="role.menuFlag== '1'? true : false" label="图标">
            <el-input v-model="role.menuIcon" placeholder="请输入图标类名" />
          </el-form-item>
          <el-form-item v-if="role.menuFlag== '1'? true : false" label="是否在侧边栏显示">
            <el-select v-model="role.hiddened" placeholder="请选择是否在侧边栏显示">
              <el-option
                v-for="item in hiddenList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="orderNumber">
            <el-input
              v-model.number="role.orderNumber"
              @input="role.orderNumber = role.orderNumber.replace(/[^\d]/g,'')"
              maxlength="3"
              placeholder="请输入排序"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align:center;" class="dialog-footer">
          <el-button :loading="loading" class="cx" @click="dialogType == 'edit' ? modifyFun() : addFun()">保存</el-button>
          <el-button @click="handleClose()">关闭</el-button>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import menu from './menu.js'
export default {
  ...menu
}
</script>
<style scoped>
  .drag-tree-table-body {
    height: auto !important;
    background:#eee;
  }
  .drag-tree-table{
    margin-top:0!important
  }
.app-container {
  height: 100%;
}
.hasTagsView .app-main {
  overflow: scroll;
}
.el-menu {
  border-right: none !important;
}
</style>
<style>
.drag-tree-table-body .tree-block:nth-child(even){
    background:#F9FAFD!important
  }
.custom-theme {
  height: 100%;
}
.custom-theme .el-card__body {
  height: calc(100% - 60px);
  overflow: scroll !important;
}
.el-menu-vertical .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: block !important;
}
</style>
