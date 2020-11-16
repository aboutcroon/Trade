<template>
  <div class="app-container">
    <el-dialog
      title="个人中心"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :show="show"
      @close="$emit('update:show', false)"
    >
      <section>
        <el-divider content-position="left">基本信息</el-divider>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" :disabled="isDisabled">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width:300px" :disabled="disabledName" />
          </el-form-item>
          <el-form-item label="角色" :disabled="isDisabled">
            <el-input v-model="form.role.roleName" style="width:300px" :disabled="disabledName" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.mobile" style="width:300px" type="tel" />
          </el-form-item>
          <el-divider content-position="left">修改密码</el-divider>
          <el-form-item label="是否修改密码" prop="password" style="margin-left:30px">
            <!-- <p class="yn"> -->
            <el-switch
              v-model="form.modifyPassword"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
            <!-- </p> -->
          </el-form-item>
          <el-form-item v-show="form.modifyPassword" label="用户密码" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off" style="width:300px" />
          </el-form-item>
          <el-form-item v-show="form.modifyPassword" label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" autocomplete="off" style="width:300px" />
          </el-form-item>

        </el-form>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button class="cx" @click="save('form')">保存</el-button>
        <el-button plain @click="isDisabled=false">编辑</el-button>
        <el-button @click="cancelModal">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import profile from './profile'
export default {
  ...profile
}
</script>
<style scoped lang="scss">
.title {
  border-bottom: 5px solid #e4e4e4;
  margin: 0 0 10px 0;
  padding: 0 0 15px 10px;
}
.editpsw {
  float: right;
  margin-top: -10px;
  color: #1890ff;
}
.yn{
  // display: block;
  // float: right;
  text-align: right;
  height: 30px;
  margin-right: 50px;
  // margin-bottom: 30px;
  // overflow: hidden;
}
</style>
