<template>
  <el-collapse-transition>
    <el-row v-show="showFilter" style="margin-top:50px">
      <el-col v-for="(data, index) in collapseData" :key="index" class="filter" style="margin-right: 20px;margin-bottom:20px">
        <div class="filter-title">{{ data.typeTitle }}</div>
        <div class="filter-divider" />
        <div v-for="(val,key,i) in data.resData" :key="key">
          <div :class="{ 'filter-selected': formData.paras[key] === '' }" style="cursor:pointer" @click="clickFun(key,'',formData.paras[key])">全部</div>
          <div v-for="item in val" :key="item.key" :class="{ 'filter-selected': formData.paras[key] === item.key }">
            <span style="cursor:pointer" @click="clickFun(key,item.key,formData.paras[key])">{{ item.value }}</span>
            <i v-if="formData.paras[key] === item.key" class="el-icon-close" @click="clickFun(key,'',formData.paras[key])" />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-collapse-transition>
  <!-- <el-collapse-transition>
            <el-row v-show="showFilter" >
              <el-col class="filter" style="margin-right: 20px;">
                <div class="filter-title">
                  任务状态
                </div>
                <div class="filter-divider"></div>
                <div
                  v-bind:class="{ 'filter-selected': formData.paras.status === '' }"
                  @click="formData.paras.status = '';formData.totalRow=-1;formData.pageNumber= 1;getList()">全部</div>
                <div
                  v-for="item in stateList"
                  v-bind:class="{ 'filter-selected': formData.paras.status === item.key }">
                  <span @click="formData.paras.status = item.key;formData.totalRow=-1;formData.pageNumber= 1;getList()">{{item.value}}</span>
                  <i class="el-icon-close"
                     @click="formData.paras.status = '';formData.totalRow=-1;formData.pageNumber= 1;getList()"
                     v-if="formData.paras.status === item.key"></i>
                </div>
              </el-col>
              <el-col class="filter" style="margin-bottom: 20px;">
                <div class="filter-title">
                  任务类型
                </div>
                <div class="filter-divider"></div>
                <div
                  v-bind:class="{ 'filter-selected': formData.paras.type === '' }"
                  @click="formData.paras.type = '';formData.totalRow=-1;formData.pageNumber= 1;getList()">全部</div>
                <div
                  v-for="item in typeList"
                  v-bind:class="{ 'filter-selected': formData.paras.type === item.key }">
                  <span @click="formData.paras.type = item.key;formData.totalRow=-1;formData.pageNumber= 1;getList()">{{item.value}}</span>
                  <i class="el-icon-close"
                     @click="formData.paras.type = '';formData.totalRow=-1;formData.pageNumber= 1;getList()"
                     v-if="formData.paras.type === item.key"></i>
                </div>
              </el-col>
            </el-row>
          </el-collapse-transition> -->
</template>
<script>
export default {
  props: {
    showFilter: Boolean,
    collapseData: Array,
    formData: Object
  },
  data() {
    return {}
  },
  watch: {

  },
  methods: {
    clickFun(type, value, paras) { // type类型   value 数值
      this.$emit('collapseFun', type, value)
    }
  }
}
</script>
