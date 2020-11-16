<template>
  <div class="content">
    <div class="contents">
      <el-row class="panel-group">
        <h3 style="margin:30px 0;"></h3>
        <div style="display:flex;justify-content:space-between">
          <scard title="作品数量" color="#E5F7F7" color-dot="#00B3B3" oblongColor="#B7E9E9" info="30000" unit="张" />
          <scard title="普通用户数量" color="#F7E5E5" color-dot="#B30000" oblongColor="#E9B7B7" info="300" unit="人" />
          <scard title="评委数量" color="#E5EEF7" color-dot="#005AB3" oblongColor="#B7D0E9" info="30000" />
          <scard title="文章数量" color="#F7EEE5" color-dot="#B35A00" oblongColor="#E9D0B7" info="30000" />
        </div>
      </el-row>
    </div>
    <div style="display:flex;justify-content:space-between">
      <el-row class="contents" style="width:55%;margin-right:20px;padding-top:10px;position: relative;">
        <div class="handel">
          <a href="#">210个未处理</a>
        </div>
        <div class="time">
          <el-date-picker
            v-model="value1"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="mark">
          <el-radio-group v-model="charts1" size="small" class="filters">
            <el-radio-button label="初筛" style="border:none;"></el-radio-button>
            <el-radio-button label="初审" style="border:none;"></el-radio-button>
            <el-radio-button label="复审" style="border:none;"></el-radio-button>
          </el-radio-group>
        </div>
        <universalChart height="480px" ref="proportionChart" :chart-option="diseaseChart" />
      </el-row>
      <el-row class="contents" style="width:45%;padding-top:10px;">
        <universalChart height="480px" ref="proportionChart" :chart-option="diseaseChart" />
      </el-row>
    </div>
  </div>
</template>

<script>
import leagueChain from "./leagueChain.js";
export default {
  ...leagueChain,
};
</script>

<style lang="scss" scoped>
@import "./panelsstyle";

</style>
