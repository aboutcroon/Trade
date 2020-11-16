<template>
  <el-dialog
  title="导出数据"
  :visible.sync="$store.state.export.show"
  width="25%"
  :before-close="handleClose">
  <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
    <el-form-item label="导出数据">
      <el-select v-model="form.exprotData" placeholder="请选择导出数据" clearable  >
        <el-option v-for="item in $store.state.export.exprotData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="赛事名称">
      <el-select v-model="form.eventName" placeholder="请选择赛事名称" clearable  >
        <el-option v-for="item in $store.state.export.mockName"
          :key="item.competitionId"
          :label="item.competitionName"
          :value="item.competitionName">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="赛事类型">
      <el-input v-model="form.eventType" size="small"></el-input>
    </el-form-item>
    <el-form-item label="奖项类型">
      <el-input v-model="form.zrewardType" size="small"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  data () {
    return {
      form:{
        exprotData:1,
        eventName:null,
        eventType:null,
        rewardType:null
      },
      rules:{},
    }
  },
  mounted () {
    this.$store.dispatch('export/async')
    this.$store.dispatch('export/competitionList')
  },
  methods: {
    handleClose(){
      this.$store.commit('export/closeExportBox')
      Object.assign(this.$data,this.$options.data())
    }
  },
  computed: {
   
  }

}
</script>

<style>

</style>