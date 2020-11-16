<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="普通用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.region" placeholder="请选用户类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在企业/学校">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所在专业">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="推荐人名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style lang="less" scoped>
</style>
