<template>
  <div class="contentBox">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <!-- <el-row :gutter="20"> -->
            <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <el-input
                v-model="formData.paras.username"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入用户名"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formData.paras.organization"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="请输入机构名称"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button class="filter-item" icon="el-icon-plus" @click="addlist">添加用户</el-button>
              <el-button class="filter-item" icon="el-icon-close" @click="deles()">批量删除</el-button>
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            :header-cell-style="{background:'#F2F6FD'}"
            stripe
            default-expand-all
            :tree-props="{children: 'childrenList', hasChildren: 'hasChildren'}"
            @selection-change="changeFun"
          >

            <el-table-column type="selection" width="55" />
            <el-table-column label="用户名">
              <template slot-scope="scope">
                <span v-html="scope.row.username" />
              </template>
            </el-table-column>
            <el-table-column label="机构名称">
              <template slot-scope="scope">
                <span v-html="scope.row.organization" />
              </template>
            </el-table-column>
            <el-table-column label="角色">
              <template slot-scope="scope">
                <span v-html="scope.row.role.roleName" />
              </template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="用户状态" width="100" align="center">
              <template slot-scope="scope">
                <el-link :type="scope.row.status | severity">
                  <span v-html="scope.row.status == '1' ? '启用' :'禁用'"></span>
                </el-link>
              </template>
            </el-table-column> -->
            <el-table-column align="center" prop="created_at" label="操作" width="250">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.status == 1"
                  size="mini"
                  type="primary"
                  plain
                  @click="addShow(scope.row)"
                >添加</el-link>
                <el-link
                  v-if="scope.row.username != departments && scope.row.username != 'admin'"
                  size="mini"
                  type="primary"
                  :underline="false"
                  plain
                  @click="editFun(scope.row)"
                >
                  <span class="icon iconfont iconedit" />
                </el-link>
                <el-link
                  v-if="scope.row.username != departments && scope.row.roleId != 0"
                  size="mini"
                  type="danger"
                  :underline="false"
                  plain
                  @click="deleFun(scope.row.id)"
                ><span class="icon iconfont icondelete" />
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
          <!-- <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" fixed :isdraggable="false"></dragTreeTable> -->
        </el-col>

      </el-row>
      <!--新增父级-->

      <el-drawer
        :visible.sync="dialogFormVisible"
        direction="rtl"
        :with-header="false"
        size="30%"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconedit">
            <span class="drawerHtml">新增用户</span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            ref="ruleForm"
            class="formBox"
            :model="ruleForm"
            label-width="80px"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="用户名:" prop="username" style="margin-bottom:20px!important;">
              <el-input v-model="ruleForm.username" style="width:80%" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="用户密码:" prop="password">
              <el-input v-model="ruleForm.password" type="password" style="width: 80%" placeholder="请输入用户密码" />
            </el-form-item>
            <el-form-item label="确认密码:" prop="confirmPassword">
              <el-input v-model="ruleForm.confirmPassword" type="password" autocomplete="off" style="width: 80%" placeholder="请输入确认密码" />
            </el-form-item>
            <!-- <el-form-item label="机构名称:" prop="organization" style="margin-bottom:20px!important;" >
              <el-input v-model="ruleForm.organization" style="width:80%"  placeholder="请输入机构名称"/>
            </el-form-item> -->
            <el-form-item label="角  色:" prop="roleId">
              <el-select v-model="ruleForm.roleId" placeholder="请选择角色" style="width: 80%" @change="getList()">
                <el-option
                  v-for="item in roleTypeList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
            <el-divider content-position="center" style="margin-top:20px;">管理人信息</el-divider>
            <el-form-item label="联系电话:">
              <el-input v-model="ruleForm.mobile" placeholder="请输入联系电话" style="width: 80%" type="tel" />
            </el-form-item>
            <el-form-item label="邮箱地址:">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址" style="width: 80%" type="email" />
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button class="cx" @click="preservation()">保存</el-button>
            <el-button @click="handleClose">关闭</el-button>
          </div>
        </div>
      </el-drawer>

      <!-- <el-dialog
        title="新增用户"
        :visible.sync="dialogFormVisible"
        width="40%"
        :modal-append-to-body="false"
      >

        <el-divider content-position="left">机构信息</el-divider>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="160px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username" style="margin-bottom:20px!important;">
            <el-input v-model="ruleForm.username" style="width:80%" />
          </el-form-item>
          <el-form-item label="用户密码:" prop="password">
            <el-input v-model="ruleForm.password" type="password" style="width: 80%" />
          </el-form-item>
          <el-form-item label="确认密码:" prop="confirmPassword">
            <el-input v-model="ruleForm.confirmPassword" type="password" autocomplete="off" style="width: 80%" />
          </el-form-item>
          <el-form-item label="机构名称:" prop="organization" style="margin-bottom:20px!important;">
            <el-input v-model="ruleForm.organization" style="width:80%" />
          </el-form-item>
          <el-form-item label="角  色:" prop="roleId">
            <el-select v-model="ruleForm.roleId" placeholder="请选择角色" style="width: 80%" @change="getList()">
              <el-option
                v-for="item in roleTypeList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
          <el-divider content-position="left">管理人信息</el-divider>
          <el-form-item label="联系电话:">
            <el-input v-model="ruleForm.mobile" style="width: 80%" type="tel" />
          </el-form-item>
          <el-form-item label="邮箱地址:">
            <el-input v-model="ruleForm.email" style="width: 80%" type="email" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button class="cx" @click="preservation('ruleForm')">保存</el-button>
          <el-button @click="handleClose">关闭</el-button>
        </div>
      </el-dialog> -->

      <!--    行新增用户-->
      <!-- <el-dialog title="新增用户" :visible.sync="department" width="40%" :modal-append-to-body="false">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name" style="margin-bottom:20px!important;">
            <el-input v-model="departmentDate.username" style="width:93%" />
          </el-form-item>
          <el-form-item label="机构名称" prop="text" style="margin-bottom:20px!important;">
            <el-input v-model="departmentDate.remark" type="textarea" style="width:93%" />
          </el-form-item>
          <el-form-item label="用户状态" prop="start" style="margin-bottom:20px!important;">
            <el-select v-model="departmentDate.status" placeholder="请选择用户状态" style="width:93%">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button class="cx" @click="save">保存</el-button>
          <el-button @click="handleClose">关闭</el-button>
        </div>
      </el-dialog> -->

      <!--    编辑-->

      <el-drawer
        :visible.sync="FormVisible"
        direction="rtl"
        :with-header="false"
        size="30%"
        custom-class="demo-drawer"
        :before-close="handleClose"
      >
        <p class="drawer-title">
          <span class="icon iconfont iconedit">
            <span class="drawerHtml">编辑用户</span>
          </span>
          <i class="el-icon-close fr" @click="handleClose" />
        </p>
        <div class="demo-drawer__content">
          <el-form
            ref="ruleForms"
            :model="ruleForms"
            :rules="rules"
            class="formBox"
            label-width="80px"
            label-position="top"
          >
            <el-form-item label="用户名:" prop="username" style="margin-bottom:20px!important;">
              <el-input v-model="ruleForms.username" style="width:80%" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="机构名称:" prop="organization" style="margin-bottom:20px!important;">
              <el-input v-model="ruleForms.organization" style="width:80%" placeholder="请输入机构名称" />
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="ruleForms.roleId" placeholder="请选择角色" style="width: 80%" @change="getList()">
                <el-option
                  v-for="item in roleTypeList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
            <el-divider content-position="left">管理人信息</el-divider>
            <el-form-item label="联系电话">
              <el-input v-model="ruleForms.mobile" placeholder="请输入联系电话" style="width: 80%" type="tel" />
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input v-model="ruleForms.email" placeholder="请输入邮箱地址" style="width: 80%" type="email" />
            </el-form-item>
            <el-divider content-position="left">修改密码</el-divider>
            <el-form-item label="是否修改密码">
              <el-switch
                v-model="ruleForms.modifyPassword"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item v-if="ruleForms.modifyPassword" label="用户密码" prop="password">
              <el-input v-model="ruleForms.password" placeholder="请输入用户密码" type="password" autocomplete="off" style="width:300px" />
            </el-form-item>
            <el-form-item v-else label="用户密码">
              <el-input v-model="ruleForms.password" placeholder="请输入用户密码" type="password" autocomplete="off" style="width:300px" />
            </el-form-item>

            <el-form-item v-if="ruleForms.modifyPassword" label="确认密码" prop="confirmPassword">
              <el-input v-model="ruleForms.confirmPassword" placeholder="请输入确认密码" type="password" autocomplete="off" style="width:300px" />
            </el-form-item>
            <el-form-item v-else label="确认密码">
              <el-input v-model="ruleForms.confirmPassword" placeholder="请输入确认密码" type="password" autocomplete="off" style="width:300px" />
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button class="cx" @click="editpreservation">保存</el-button>
            <el-button @click="handleClose">关闭</el-button>
          </div>
        </div>
      </el-drawer>

      <!-- <el-dialog title="编辑用户" :visible.sync="FormVisible" width="40%" :modal-append-to-body="false">
        <el-divider content-position="left">机构信息</el-divider>
        <el-form
          ref="ruleForms"
          :model="ruleForms"
          :rules="rules"
          label-width="160px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username" style="margin-bottom:20px!important;">
            <el-input v-model="ruleForms.username" style="width:80%" />
          </el-form-item>
          <el-form-item label="机构名称:" prop="organization" style="margin-bottom:20px!important;">
            <el-input v-model="ruleForms.organization" style="width:80%" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForms.roleId" placeholder="请选择角色" style="width: 80%" @change="getList()">
              <el-option
                v-for="item in roleTypeList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
          <el-divider content-position="left">管理人信息</el-divider>
          <el-form-item label="联系电话">
            <el-input v-model="ruleForms.mobile" style="width: 80%" type="tel" />
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="ruleForms.email" style="width: 80%" type="email" />
          </el-form-item>
          <el-divider content-position="left">修改密码</el-divider>
          <el-form-item label="是否修改密码" style="margin-left:30px">
            <el-switch
              v-model="ruleForms.modifyPassword"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item v-show="ruleForms.modifyPassword" label="用户密码" prop="password">
            <el-input v-model="ruleForms.password" type="password" autocomplete="off" style="width:300px" />
          </el-form-item>
          <el-form-item v-show="ruleForms.modifyPassword" label="确认密码" prop="confirmPassword">
            <el-input v-model="ruleForms.confirmPassword" type="password" autocomplete="off" style="width:300px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button class="cx" @click="editpreservation">保存</el-button>
          <el-button @click="handleClose">关闭</el-button>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import user from './user.js'
export default {
  ...user
}
</script>
<style lang="css">
body .el-table th.gutter {
  display: table-cell !important;
}
/**拖拽table */
.drag-tree-table {
  margin-top: 0 !important;
}
.drag-tree-table-body .tree-block:nth-child(even) {
  background: #f9fafd !important;
}
.drag-tree-table.border {
  border: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  border-bottom: none;
}
.drag-tree-table-body {
  height: auto !important;
}
.tree-column {
  padding: 8px 12px;
}
.drag-tree-table-header {
  background: #f2f6fd !important;
  height: 40px !important;
  line-height: 22px !important;
}
.tree-row {
  height: 45px !important;
  line-height: 28px !important;
  border-bottom: 0 !important;
}
button {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
}
.primary {
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
.primary:hover {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
.danger {
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  margin-left: 10px;
}
.danger:hover {
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
}
</style>
